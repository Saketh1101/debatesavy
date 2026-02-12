import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        console.log('[AI-ASSISTANT] Starting...');

        try {
            const { message, context = 'dashboard', debateId, personalityName, debateTopic } = await req.json();

            if (!message) {
                return NextResponse.json(
                    { error: 'Message is required' },
                    { status: 400 }
                );
            }

            // Build system prompt based on debate context
            let systemPrompt = 'You are an AI debate assistant providing concise, constructive feedback on debate arguments.';

            if (personalityName) {
                systemPrompt = `You are an expert debate coach assisting a user who is arguing against ${personalityName}.
Be concise, constructive, and respectful. Produce a short, structured critique with these four parts (each 1 sentence when possible):
1) Summary: one-sentence summary of the user's argument.
2) Strengths: list up to two concise strengths (what the argument does well).
3) Weaknesses / Counterpoints: list up to two concise weaknesses or likely counterarguments.
4) Suggestion: one practical, specific improvement the user can make to strengthen the argument.
Use neutral, action-oriented language. Do not ask clarifying questions, do not ramble, and avoid filler phrases.`;
            } else {
                systemPrompt = `You are an expert debate coach assisting a user.
Be concise, constructive, and respectful. Produce a short, structured critique with these four parts (each 1 sentence when possible):
1) Summary: one-sentence summary of the user's argument.
2) Strengths: list up to two concise strengths (what the argument does well).
3) Weaknesses / CounterPoints: list up to two concise weaknesses or likely counterarguments.
4) Suggestion: one practical, specific improvement the user can make to strengthen the argument.
Use neutral, action-oriented language. Do not ask clarifying questions, do not ramble, and avoid filler phrases.`;
            }

            if (debateTopic) {
                systemPrompt += ` The debate topic is: "${debateTopic}"`;
            }

            // Call Ollama HTTP API (local or remote) to generate assistant response
            const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
            const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama2';
            const fullPrompt = `${systemPrompt}\n\nUser message: ${message}`;

            // Simple fetch with timeout
            const timeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS || '15000');
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeoutMs);

            let text: string;
            try {
                const resp = await fetch(`${OLLAMA_URL}/api/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ model: OLLAMA_MODEL, prompt: fullPrompt, max_tokens: 512 }),
                    signal: controller.signal,
                });
                clearTimeout(id);

                if (!resp.ok) {
                    const body = await resp.text().catch(() => '');
                    console.error('[AI-ASSISTANT] Ollama error:', resp.status, body);
                    throw new Error(`Ollama API error: ${resp.status}`);
                }

                text = await resp.text();
            } catch (e) {
                clearTimeout(id);
                console.error('[AI-ASSISTANT] Ollama fetch failed:', e);
                throw e;
            }

            // Parse response (attempt JSON, fallback to raw text)
            let assistantMessage = '';
            try {
                const parsed = JSON.parse(text);
                // if model returned structured content, try to extract a text field
                assistantMessage = parsed.response || parsed.text || JSON.stringify(parsed);
            } catch (e) {
                assistantMessage = text || 'I could not generate a response. Please try again.';
            }
            console.log('[AI-ASSISTANT] Success:', assistantMessage.substring(0, 50));

            return NextResponse.json({
                success: true,
                response: assistantMessage,
                messageId: 'msg_' + Math.random().toString(36).substr(2, 9),
            });
        } catch (error) {
            console.error('[AI-ASSISTANT] ERROR:', error);
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            console.error('[AI-ASSISTANT] Detailed error:', errorMsg);
            if (error instanceof Error) {
                console.error('[AI-ASSISTANT] Stack:', error.stack);
            }

            return NextResponse.json(
                { error: `AI API Error: ${errorMsg}` },
                { status: 500 }
            );
        }
    });
}
