import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import store from '@/lib/memory';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { title, topic, isPublic = false, mode = 'friendly' } = await req.json();

            if (!title || !topic) {
                return NextResponse.json(
                    { error: 'Title and topic are required' },
                    { status: 400 }
                );
            }

            const id = 'debate_' + Math.random().toString(36).substr(2, 9);
            const created = store.createDebate({ id, title, topic, mode, userId, userName: 'Demo User' });
            return NextResponse.json(created, { status: 201 });
        } catch (error) {
            console.error('Debate creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create debate' },
                { status: 500 }
            );
        }
    });
}

export async function GET(request: NextRequest) {
    return withAuth(request, async (_req, userId) => {
        const list = store.listDebatesForUser(userId || 'user_demo');
        return NextResponse.json(list);
    });
}
