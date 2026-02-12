import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        console.log('Test API - API Key present:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        console.log('Test API - Message:', message);

        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return NextResponse.json(
                { error: 'Google Generative AI API key not configured' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('Test API - Calling Gemini...');
        const result = await model.generateContent(message);
        const response = result.response.text();

        console.log('Test API - Success:', response.substring(0, 50));

        return NextResponse.json({
            success: true,
            response,
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.error('Test API - Error:', errorMsg);
        console.error('Test API - Full error:', error);

        return NextResponse.json(
            { error: `Test API Error: ${errorMsg}` },
            { status: 500 }
        );
    }
}
