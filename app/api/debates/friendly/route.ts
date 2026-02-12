import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import store from '@/lib/memory';

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

            // Create and store the debate in memory
            const debate = store.createDebate({
                id: debateId,
                title,
                topic,
                mode: 'friendly',
                userId,
                userName: 'You'
            });

            // Add additional bot participants to the created debate
            const storedDebate = store.getDebate(debateId);
            if (storedDebate && numPersons > 1) {
                // Add bot participants
                for (let i = 1; i < numPersons; i++) {
                    storedDebate.participants.push({
                        id: `bot_${i}`,
                        name: `Bot ${i}`
                    });
                }
            }

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
            // Return friendly debates from memory store
            const allDebates = store.listDebatesForUser(userId);
            const friendlyDebates = allDebates.filter(debate => debate.mode === 'friendly');

            return NextResponse.json(friendlyDebates);
        } catch (error) {
            console.error('Friendly debates fetch error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch friendly debates' },
                { status: 500 }
            );
        }
    });
}
