import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import store from '@/lib/memory';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId, content, side } = await req.json();

            if (!debateId || !content) {
                return NextResponse.json(
                    { error: 'Debate ID and content are required' },
                    { status: 400 }
                );
            }

            const arg = {
                id: 'arg_' + Math.random().toString(36).substr(2, 9),
                content,
                debateId,
                userId,
                side: side || 'NEUTRAL',
                user: { id: userId, name: 'Demo User' },
                timestamp: new Date().toISOString()
            };

            // Ensure debate exists in store and add argument
            store.ensureDebateExists(debateId);
            store.addArgumentToDebate(debateId, arg);

            return NextResponse.json(arg, { status: 201 });
        } catch (error) {
            console.error('Argument submission error:', error);
            return NextResponse.json(
                { error: 'Failed to submit argument' },
                { status: 500 }
            );
        }
    });
}
