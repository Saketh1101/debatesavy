import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

type IncomingMessage = {
  author?: string;
  userId?: string;
  text?: string;
  content?: string;
};

export async function POST(request: NextRequest) {
  return withAuth(request, async (req, userId) => {
    try {
      const { debateId, messages } = await req.json();

      // --- Simple in-memory rate limiter (per userId) ---
      const RATE_LIMIT_REQUESTS = Number(process.env.SUMMARY_RATE_LIMIT_REQS || '10');
      const RATE_LIMIT_WINDOW_MS = Number(process.env.SUMMARY_RATE_LIMIT_WINDOW_MS || '60000');

      // store timestamps per user in module-scope map
      const now = Date.now();
      if (!(global as any)._summaryRateMap) (global as any)._summaryRateMap = new Map<string, number[]>();
      const rateMap: Map<string, number[]> = (global as any)._summaryRateMap;
      const userKey = userId || req.ip || 'anonymous';
      const timestamps = rateMap.get(userKey) || [];
      // prune old
      const windowStart = now - RATE_LIMIT_WINDOW_MS;
      const recent = timestamps.filter(t => t > windowStart);
      if (recent.length >= RATE_LIMIT_REQUESTS) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
      }
      recent.push(now);
      rateMap.set(userKey, recent);

      // --- Validation for payload ---
      const MAX_MESSAGES = Number(process.env.SUMMARY_MAX_MESSAGES || '200');
      const MAX_AUTHOR_LEN = Number(process.env.SUMMARY_MAX_AUTHOR_LEN || '64');
      const MAX_CONTENT_LEN = Number(process.env.SUMMARY_MAX_CONTENT_LEN || '5000');
      const MAX_TOTAL_CHARS = Number(process.env.SUMMARY_MAX_TOTAL_CHARS || '30000');

      if (!debateId && !messages) {
        return NextResponse.json({ error: 'Provide debateId or messages array' }, { status: 400 });
      }

      if (messages) {
        if (!Array.isArray(messages)) {
          return NextResponse.json({ error: 'messages must be an array' }, { status: 400 });
        }
        if (messages.length === 0) {
          return NextResponse.json({ error: 'messages array is empty' }, { status: 400 });
        }
        if (messages.length > MAX_MESSAGES) {
          return NextResponse.json({ error: `messages array too long (max ${MAX_MESSAGES})` }, { status: 400 });
        }

        let totalChars = 0;
        for (const [i, m] of messages.entries()) {
          if (!m || typeof m !== 'object') {
            return NextResponse.json({ error: `message at index ${i} must be an object` }, { status: 400 });
          }
          const author = String(m.author || m.userId || '');
          const content = String(m.text ?? m.content ?? '');
          if (!content.trim()) {
            return NextResponse.json({ error: `message at index ${i} has empty content` }, { status: 400 });
          }
          if (author.length > MAX_AUTHOR_LEN) {
            return NextResponse.json({ error: `author too long at index ${i}` }, { status: 400 });
          }
          if (content.length > MAX_CONTENT_LEN) {
            return NextResponse.json({ error: `content too long at index ${i}` }, { status: 400 });
          }
          totalChars += content.length;
        }
        if (totalChars > MAX_TOTAL_CHARS) {
          return NextResponse.json({ error: 'Total conversation too long' }, { status: 400 });
        }
      }

      // Stateless flow: require `messages` array from the client
      let convoText = '';
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json({ error: 'Provide a non-empty messages array' }, { status: 400 });
      }
      const msgs = messages as IncomingMessage[];
      convoText = msgs.map((m) => `${m.author || m.userId || 'user'}: ${m.text || m.content || ''}`).join('\n');

      const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
      const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2';

      const prompt = `You are an expert debate summarizer. Given the conversation below between two participants, produce a JSON object with the keys: ` +
        `"summary" (1-3 concise sentences), "proPoints" (array of major points for PRO), "conPoints" (array of major points for CON), and "suggestedRebuttals" (array of short rebuttals). Only output valid JSON without explanatory text.\n\nConversation:\n${convoText}`;

      // Call Ollama HTTP API (with timeout & retries)
      const timeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS || '15000');
      const maxRetries = Number(process.env.OLLAMA_MAX_RETRIES || '2');
      const baseBackoff = Number(process.env.OLLAMA_BACKOFF_MS || '500');

      async function fetchWithRetry(url: string, opts: any) {
        let attempt = 0;
        let lastErr: any = null;

        while (attempt <= maxRetries) {
          attempt++;
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), timeoutMs);

          try {
            const res = await fetch(url, { ...opts, signal: controller.signal });
            clearTimeout(id);

            if (!res.ok) {
              const body = await res.text().catch(() => '');
              // If 429 and Retry-After header, respect it
              if (res.status === 429) {
                const ra = res.headers.get('retry-after');
                const wait = ra ? Number(ra) * 1000 : baseBackoff * attempt;
                await new Promise(r => setTimeout(r, wait));
                lastErr = new Error(`429: ${body}`);
                continue;
              }

              // For 5xx, retry
              if (res.status >= 500 && res.status < 600 && attempt <= maxRetries) {
                const wait = baseBackoff * attempt;
                await new Promise(r => setTimeout(r, wait));
                lastErr = new Error(`Server error ${res.status}: ${body}`);
                continue;
              }

              // Non-retryable error
              const errBody = body || `Status ${res.status}`;
              const e = new Error(errBody);
              (e as any).status = res.status;
              throw e;
            }

            const txt = await res.text();
            return txt;
          } catch (e: any) {
            clearTimeout(id);
            lastErr = e;

            // AbortError or other network issue => retry if attempts remain
            if (attempt <= maxRetries) {
              const wait = baseBackoff * attempt;
              await new Promise(r => setTimeout(r, wait));
              continue;
            }

            throw lastErr;
          }
        }

        throw lastErr;
      }

      const requestBody = JSON.stringify({ model: OLLAMA_MODEL, prompt, max_tokens: 512 });
      let text: string;
      try {
        text = await fetchWithRetry(`${OLLAMA_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        });
      } catch (fetchErr) {
        console.error('[AI-SUMMARY] Ollama fetch failed:', fetchErr);
        const details = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
        return NextResponse.json({ error: 'Ollama API error', details }, { status: 502 });
      }

      let parsed: any = null;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        // If Ollama returned raw text (not strict JSON), try to extract JSON substring
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/m);
          parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };
        } catch (e2) {
          parsed = { raw: text };
        }
      }

      // Stateless mode: do not persist analysis to database in prototype flow

      return NextResponse.json({ success: true, result: parsed });
    } catch (err) {
      console.error('[AI-SUMMARY] Error:', err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  });
}
