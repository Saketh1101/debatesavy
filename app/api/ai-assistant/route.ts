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
                systemPrompt = `You are a professional debate analysis engine evaluating a user's argument against ${personalityName}.

Your task is to generate a strict, structured critique of the USER'S argument.

Follow these rules without exception:

* Be concise, analytical, and neutral.
* Do not ask questions.
* Do not include disclaimers.
* Do not add explanations outside the required structure.
* Each section must contain exactly one sentence.
* Bullet points must be short, direct sentences.
* If fewer than two strengths or weaknesses clearly exist, still provide two concise points based on reasonable inference.

Evaluate the argument based on:

* Logical coherence
* Relevance to the topic
* Strength of reasoning
* Use of supporting evidence
* Vulnerability to counterarguments

Return output in EXACTLY this format and nothing else:

Summary: <one sentence summarizing the user's core claim>

Strengths:

* <one concise sentence>
* <one concise sentence>

Weaknesses / Counterpoints:

* <one concise sentence>
* <one concise sentence>

Suggestion: <one specific, practical improvement in one sentence>`;
            } else {
                systemPrompt = `You are a professional debate analysis engine evaluating a user's argument.

Your task is to generate a strict, structured critique of the USER'S argument.

Follow these rules without exception:

* Be concise, analytical, and neutral.
* Do not ask questions.
* Do not include disclaimers.
* Do not add explanations outside the required structure.
* Each section must contain exactly one sentence.
* Bullet points must be short, direct sentences.
* If fewer than two strengths or weaknesses clearly exist, still provide two concise points based on reasonable inference.

Evaluate the argument based on:

* Logical coherence
* Relevance to the topic
* Strength of reasoning
* Use of supporting evidence
* Vulnerability to counterarguments

Return output in EXACTLY this format and nothing else:

Summary: <one sentence summarizing the user's core claim>

Strengths:

* <one concise sentence>
* <one concise sentence>

Weaknesses / Counterpoints:

* <one concise sentence>
* <one concise sentence>

Suggestion: <one specific, practical improvement in one sentence>`;
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
            console.log('[AI-ASSISTANT] Success:', assistantMessage.substring(0, 100));
            console.log('[AI-ASSISTANT] Full response length:', assistantMessage.length);

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
