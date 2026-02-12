import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import store from '@/lib/memory';

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
                // Join existing debate - in reality, we'd need to handle this differently
                // For now, we'll create a new debate with the matched participant
                const debate = store.createDebate({
                    id: matchedDebate.id,
                    title: matchedDebate.title,
                    topic: matchedDebate.title,
                    mode: 'online',
                    userId,
                    userName: 'You'
                });

                // Add opponent to the debate
                const storedDebate = store.getDebate(matchedDebate.id);
                if (storedDebate) {
                    storedDebate.participants.push({
                        id: 'opponent_' + Math.random().toString(36).substr(2, 6),
                        name: 'Opponent'
                    });
                    (storedDebate as any).category = category;
                    (storedDebate as any).difficulty = difficulty;
                    (storedDebate as any).status = 'active';
                }

                return NextResponse.json(debate, { status: 200 });
            } else {
                // Create new debate room
                const newDebateId = 'debate_' + Math.random().toString(36).substr(2, 9);
                const debate = store.createDebate({
                    id: newDebateId,
                    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Debate (${difficulty})`,
                    topic: `Debate on ${category}`,
                    mode: 'online',
                    userId,
                    userName: 'You'
                });

                // Add additional metadata
                const storedDebate = store.getDebate(newDebateId);
                if (storedDebate) {
                    (storedDebate as any).category = category;
                    (storedDebate as any).difficulty = difficulty;
                    (storedDebate as any).status = 'waiting_for_opponent';
                }

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
