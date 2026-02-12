import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        console.log('[AI-ASSISTANT] Starting...');
        console.log('[AI-ASSISTANT] API Key exists:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        console.log('[AI-ASSISTANT] API Key length:', process.env.GOOGLE_GENERATIVE_AI_API_KEY?.length);

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
                systemPrompt = `You are an AI debate assistant helping a user debate against ${personalityName}. 
Provide concise, constructive feedback on their argument (2-3 sentences). 
Focus on: logical soundness, evidence quality, potential counterarguments, and persuasiveness.
Be encouraging but also critically evaluate their position.`;
            } else {
                systemPrompt = `You are an AI debate assistant. 
Provide concise, constructive feedback on the user's argument (2-3 sentences).
Focus on: logical soundness, evidence quality, potential counterarguments, and persuasiveness.
Be encouraging but also critically evaluate their position.`;
            }

            if (debateTopic) {
                systemPrompt += ` The debate topic is: "${debateTopic}"`;
            }

            // Call Google Generative AI API
            if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
                throw new Error('GOOGLE_GENERATIVE_AI_API_KEY not found in environment');
            }

            console.log('[AI-ASSISTANT] Creating GoogleGenerativeAI...');
            let genAI;
            let model;
            try {
                genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
                console.log('[AI-ASSISTANT] Getting model...');
                model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            } catch (initErr) {
                console.error('[AI-ASSISTANT] Failed to initialize:', initErr);
                throw initErr;
            }

            const fullPrompt = `${systemPrompt}\n\nUser message: ${message}`;
            console.log('[AI-ASSISTANT] Calling generateContent...');
            let result;
            try {
                result = await model.generateContent(fullPrompt);
                console.log('[AI-ASSISTANT] Got response');
            } catch (apiErr) {
                console.error('[AI-ASSISTANT] API call failed:', apiErr);
                throw new Error(`Gemini API error: ${apiErr instanceof Error ? apiErr.message : 'Unknown'}`);
            }

            const assistantMessage = result.response.text() || 'I could not generate a response. Please try again.';
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
