import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId, content } = await req.json();

            if (!debateId || !content) {
                return NextResponse.json(
                    { error: 'Debate ID and content are required' },
                    { status: 400 }
                );
            }

            const argument = {
                id: 'arg_' + Math.random().toString(36).substr(2, 9),
                debateId,
                userId,
                content,
                timestamp: new Date(),
                user: {
                    id: userId,
                    name: 'You',
                },
            };

            return NextResponse.json(argument, { status: 201 });
        } catch (error) {
            console.error('Argument creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create argument' },
                { status: 500 }
            );
        }
    });
}
