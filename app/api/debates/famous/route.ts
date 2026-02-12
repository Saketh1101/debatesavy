import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

// Mock famous personalities database
const famousPersonalities = [
    {
        id: 'alan_turing',
        name: 'Alan Turing',
        title: 'Computer Scientist & Mathematician',
        description: 'Pioneer of theoretical computer science and AI',
        argumentStyle: 'Logical, mathematical, probes assumptions deeply',
        keyBeliefs: 'Believes in the possibility of machine intelligence',
        background: 'Turing was a brilliant mathematician who helped crack the Enigma code and pioneered computer science.',
    },
    {
        id: 'marie_curie',
        name: 'Marie Curie',
        title: 'Physicist & Chemist',
        description: 'Pioneer of radioactivity research',
        argumentStyle: 'Evidence-based, persistent, challenges conventional wisdom',
        keyBeliefs: 'Science transcends gender and borders',
        background: 'First woman to win Nobel Prize, conducted pioneering research on radioactivity.',
    },
    {
        id: 'socrates',
        name: 'Socrates',
        title: 'Philosopher',
        description: 'Ancient Greek philosopher who pioneered the Socratic method',
        argumentStyle: 'Questions assumptions, uses dialogue to find truth',
        keyBeliefs: 'True knowledge comes from self-examination',
        background: 'Ancient Greek philosopher known for his method of inquiry and wisdom.',
    },
    {
        id: 'stephen_hawking',
        name: 'Stephen Hawking',
        title: 'Theoretical Physicist',
        description: 'Pioneer of black hole physics and cosmology',
        argumentStyle: 'Scientific rigor, explains complex ideas simply',
        keyBeliefs: 'Universe operates by physical laws',
        background: 'Renowned cosmologist who made groundbreaking discoveries about black holes.',
    },
];

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { personalityId, topic } = await req.json();

            if (!personalityId || !topic) {
                return NextResponse.json(
                    { error: 'Personality ID and topic are required' },
                    { status: 400 }
                );
            }

            const personality = famousPersonalities.find(p => p.id === personalityId);
            if (!personality) {
                return NextResponse.json(
                    { error: 'Personality not found' },
                    { status: 404 }
                );
            }

            const debateId = 'debate_' + Math.random().toString(36).substr(2, 9);

            const debate = {
                id: debateId,
                title: `Debate with ${personality.name}`,
                topic,
                mode: 'famous',
                personalityId,
                personality,
                status: 'active',
                createdAt: new Date(),
                participants: [
                    { id: userId, name: 'You', role: 'user' },
                    { id: personality.id, name: personality.name, role: 'personality', isAI: true },
                ],
                arguments: [],
                analysis: null,
                maxParticipants: 2,
                isPublic: false,
            };

            return NextResponse.json(debate, { status: 201 });
        } catch (error) {
            console.error('Famous personality debate error:', error);
            return NextResponse.json(
                { error: 'Failed to create famous personality debate' },
                { status: 500 }
            );
        }
    });
}

export async function GET(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            return NextResponse.json(famousPersonalities);
        } catch (error) {
            console.error('Fetch personalities error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch personalities' },
                { status: 500 }
            );
        }
    });
}
