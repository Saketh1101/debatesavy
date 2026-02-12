import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
// Removed Prisma for serverless prototype; returning in-memory/mock responses.

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

            const now = new Date().toISOString();
            const debate = {
                id: 'debate_' + Math.random().toString(36).substr(2, 9),
                title,
                topic,
                isPublic,
                mode,
                status: 'pending',
                createdAt: now,
                updatedAt: now,
                participants: [
                    { id: userId, name: 'Demo User', image: null }
                ],
                _count: { arguments: 0 }
            };

            return NextResponse.json(debate, { status: 201 });
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
        // Serverless prototype: return an empty list or a small mock set.
        const sample = [];
        return NextResponse.json(sample);
    });
}
