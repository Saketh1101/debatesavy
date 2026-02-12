import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

// Mock online debate pool
const debateCategories = [
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'politics', label: 'Politics', icon: '🏛️' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'philosophy', label: 'Philosophy', icon: '💭' },
    { id: 'economics', label: 'Economics', icon: '💰' },
    { id: 'environment', label: 'Environment', icon: '🌍' },
];

const activeDictionaries = [
    {
        id: 'online_1',
        title: 'Is AI a threat to humanity?',
        category: 'tech',
        difficulty: 'intermediate',
        participants: 2,
        duration: '12 min',
        status: 'active',
    },
    {
        id: 'online_2',
        title: 'Should renewable energy be the primary source?',
        category: 'environment',
        difficulty: 'beginner',
        participants: 1,
        duration: '5 min',
        status: 'waiting',
    },
    {
        id: 'online_3',
        title: 'Remote work vs Office work',
        category: 'economics',
        difficulty: 'beginner',
        participants: 2,
        duration: '18 min',
        status: 'active',
    },
];

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { category, difficulty } = await req.json();

            if (!category || !difficulty) {
                return NextResponse.json(
                    { error: 'Category and difficulty are required' },
                    { status: 400 }
                );
            }

            // Simulate matchmaking - return an active debate or create one
            const matchedDebate = activeDictionaries.find(
                d => d.category === category && d.difficulty === difficulty && d.participants < 2
            );

            if (matchedDebate) {
                // Join existing debate
                const debate = {
                    id: matchedDebate.id,
                    title: matchedDebate.title,
                    topic: matchedDebate.title,
                    mode: 'online',
                    category,
                    difficulty,
                    status: 'active',
                    createdAt: new Date(),
                    participants: [
                        { id: userId, name: 'You', joinedAt: new Date() },
                        { id: 'opponent_' + Math.random().toString(36).substr(2, 6), name: 'Opponent', joinedAt: new Date(Date.now() - 60000) },
                    ],
                    matchCode: matchedDebate.id,
                };
                return NextResponse.json(debate, { status: 200 });
            } else {
                // Create new debate room
                const newDebateId = 'debate_' + Math.random().toString(36).substr(2, 9);
                const debate = {
                    id: newDebateId,
                    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Debate (${difficulty})`,
                    topic: `Debate on ${category}`,
                    mode: 'online',
                    category,
                    difficulty,
                    status: 'waiting_for_opponent',
                    createdAt: new Date(),
                    participants: [
                        { id: userId, name: 'You', joinedAt: new Date() },
                    ],
                    matchCode: newDebateId,
                };
                return NextResponse.json(debate, { status: 201 });
            }
        } catch (error) {
            console.error('Online debate matchmaking error:', error);
            return NextResponse.json(
                { error: 'Failed to find opponent' },
                { status: 500 }
            );
        }
    });
}

export async function GET(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { searchParams } = new URL(request.url);
            const category = searchParams.get('category');
            const difficulty = searchParams.get('difficulty');

            // Return available debates
            const availableDebates = category
                ? activeDictionaries.filter(
                    d => d.category === category && (!difficulty || d.difficulty === difficulty)
                )
                : activeDictionaries;

            return NextResponse.json({
                categories: debateCategories,
                activeDebates: availableDebates,
                waitingCount: availableDebates.filter(d => d.status === 'waiting').length,
            });
        } catch (error) {
            console.error('Online debates fetch error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch online debates' },
                { status: 500 }
            );
        }
    });
}
