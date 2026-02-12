import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { numPersons, title, topic } = await req.json();

            if (!numPersons || !title || !topic || numPersons < 2) {
                return NextResponse.json(
                    { error: 'Invalid parameters. Need numPersons >= 2, title, and topic' },
                    { status: 400 }
                );
            }

            const debateId = 'debate_' + Math.random().toString(36).substr(2, 9);

            // Create friendly debate with mock participants
            const debate = {
                id: debateId,
                title,
                topic,
                mode: 'friendly',
                numPersons,
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date(),
                participants: [
                    { id: userId, name: 'You', role: 'creator' },
                    ...Array.from({ length: numPersons - 1 }, (_, i) => ({
                        id: `bot_${i + 1}`,
                        name: `Bot ${i + 1}`,
                        role: 'participant',
                        isAI: true,
                    }))
                ],
                arguments: [],
                analysis: null,
                maxParticipants: numPersons,
                isPublic: false,
            };

            return NextResponse.json(debate, { status: 201 });
        } catch (error) {
            console.error('Friendly debate creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create friendly debate' },
                { status: 500 }
            );
        }
    });
}

export async function GET(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            // Return mock friendly debates
            const debates = [
                {
                    id: 'debate_friendly_1',
                    title: 'Is AI good for society?',
                    topic: 'Artificial Intelligence',
                    mode: 'friendly',
                    numPersons: 3,
                    status: 'completed',
                    createdAt: new Date(),
                    participants: 3,
                }
            ];

            return NextResponse.json(debates);
        } catch (error) {
            console.error('Friendly debates fetch error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch friendly debates' },
                { status: 500 }
            );
        }
    });
}
