import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        console.log('[TEST-AI] Message received:', message);
        console.log('[TEST-AI] API Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        console.log('[TEST-AI] API Key:', process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 10) + '...');

        // For now, return mock data to verify the flow works
        return NextResponse.json({
            success: true,
            response: 'Test response: In a debate, always support your claims with evidence!',
            note: 'This is a test response. Real Gemini integration coming soon.'
        });

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error('[TEST-AI] Error:', errorMsg);

        return NextResponse.json(
            { error: `Test API Error: ${errorMsg}` },
            { status: 500 }
        );
    }
}
