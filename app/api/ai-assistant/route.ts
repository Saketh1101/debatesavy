import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
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

            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const fullPrompt = `${systemPrompt}\n\nUser message: ${message}`;
            const result = await model.generateContent(fullPrompt);
            const assistantMessage = result.response.text() || 'I could not generate a response. Please try again.';

            return NextResponse.json({
                success: true,
                response: assistantMessage,
                messageId: 'msg_' + Math.random().toString(36).substr(2, 9),
            });
        } catch (error) {
            console.error('AI Assistant error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            console.error('Detailed error:', errorMsg);

            return NextResponse.json(
                { error: `AI API Error: ${errorMsg}` },
                { status: 500 }
            );
        }
    });
}
