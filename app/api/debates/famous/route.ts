import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

// Mock famous personalities database
const famousPersonalities = [
    {
        id: 'stephen_hawking',
        name: 'Stephen Hawking',
        title: 'Theoretical Physicist',
        description: 'Pioneer of black hole physics and cosmology',
        argumentStyle: 'Scientific rigor, explains complex ideas simply',
        keyBeliefs: 'Universe operates by physical laws',
        background: 'Renowned cosmologist who made groundbreaking discoveries about black holes.',
    },
    {
        id: 'marquess',
        name: 'Marquess',
        title: 'Nobleman & Philosopher',
        description: 'Influential thinker and political theorist',
        argumentStyle: 'Eloquent, philosophical, references classical knowledge',
        keyBeliefs: 'Society requires structure and intellectual discourse',
        background: 'A distinguished nobleman known for philosophical inquiry and political thought.',
    },
    {
        id: 'shakespeare',
        name: 'William Shakespeare',
        title: 'Playwright & Poet',
        description: 'Master of human nature and dramatic expression',
        argumentStyle: 'Poetic, uses literary examples, explores human psychology',
        keyBeliefs: 'All the world is a stage; human nature is complex and multifaceted',
        background: 'Greatest playwright in the English language, renowned for exploring the depths of human emotion and society.',
    },
    {
        id: 'abraham_lincoln',
        name: 'Abraham Lincoln',
        title: 'Political Leader & Statesman',
        description: 'Preserver of the American Union and advocate for freedom',
        argumentStyle: 'Humble yet persuasive, uses historical examples and moral reasoning',
        keyBeliefs: 'Liberty and equality are fundamental rights of all people',
        background: 'American president who led the nation through the Civil War and championed the abolition of slavery.',
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
