import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { title, topic, isPublic = false } = await req.json();

            if (!title || !topic) {
                return NextResponse.json(
                    { error: 'Title and topic are required' },
                    { status: 400 }
                );
            }

            const debate = {
                id: 'debate_' + Math.random().toString(36).substr(2, 9),
                title,
                topic,
                isPublic,
                status: 'pending',
                createdAt: new Date(),
                participants: [{ id: userId, name: 'You' }],
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
    return withAuth(request, async (req, userId) => {
        try {
            const debates = [
                {
                    id: 'debate_1',
                    title: 'AI Ethics in Modern Society',
                    topic: 'Should AI have rights?',
                    status: 'completed',
                    createdAt: new Date(),
                    participants: [{ id: userId, name: 'You' }],
                },
            ];

            return NextResponse.json(debates);
        } catch (error) {
            console.error('Get debates error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch debates' },
                { status: 500 }
            );
        }
    });
}
