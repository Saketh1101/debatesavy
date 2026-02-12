import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

const mockResponses: { [key: string]: string[] } = {
    'logical_fallacy': [
        '💡 This looks like a potential logical fallacy. Try rephrasing your argument to be more logically sound.',
        '🤔 Watch out for circular reasoning. Can you support this with independent evidence?',
    ],
    'strengthen_argument': [
        '✨ Great start! Try adding specific statistics or expert quotes to strengthen this.',
        '📊 This argument could be more convincing with a real-world example.',
        '🎯 Consider addressing the counterargument to make your position more robust.',
    ],
    'general': [
        '💬 Interesting point! Have you thought about the broader implications?',
        '⚡ That\'s persuasive! The connection is clear and logical.',
        '🌟 You\'re making progress! Keep building on this momentum.',
        '📈 Your debate skills are improving. Focus on adding more evidence.',
    ],
    'feedback': [
        '✅ Your argument was well-structured and persuasive.',
        '📝 Consider organizing your points more clearly.',
        '🎤 Your tone was engaging and respectful.',
        '🏆 Strong performance overall!',
    ]
};

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { message, context = 'dashboard', debateId } = await req.json();

            if (!message) {
                return NextResponse.json(
                    { error: 'Message is required' },
                    { status: 400 }
                );
            }

            // Determine response type based on message content
            let responseArray = mockResponses['general'];
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('fallacy') || lowerMessage.includes('logical') || lowerMessage.includes('wrong')) {
                responseArray = mockResponses['logical_fallacy'];
            } else if (lowerMessage.includes('strengthen') || lowerMessage.includes('improve') || lowerMessage.includes('better')) {
                responseArray = mockResponses['strengthen_argument'];
            } else if (lowerMessage.includes('feedback') || lowerMessage.includes('how') || lowerMessage.includes('was')) {
                responseArray = mockResponses['feedback'];
            }

            // Select random response
            const response = responseArray[Math.floor(Math.random() * responseArray.length)];

            // Save message to mock database
            const assistantMessage = {
                id: 'msg_' + Math.random().toString(36).substr(2, 9),
                userId,
                message,
                response,
                context,
                debateId: debateId || null,
                createdAt: new Date(),
            };

            return NextResponse.json({
                success: true,
                response,
                messageId: assistantMessage.id,
            });
        } catch (error) {
            console.error('AI Assistant error:', error);
            return NextResponse.json(
                { error: 'Failed to process message' },
                { status: 500 }
            );
        }
    });
}
