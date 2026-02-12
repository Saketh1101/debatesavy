import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ debateId: string }> }
) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId } = await params;

            const debate = {
                id: debateId,
                title: 'AI Ethics in Modern Society',
                topic: 'Should AI have rights?',
                status: 'active',
                createdAt: new Date(),
                participants: [
                    { id: userId, name: 'You', email: 'user@example.com', rating: 1600 }
                ],
                arguments: [
                    {
                        id: 'arg_1',
                        content: 'AI should have rights because...',
                        timestamp: new Date(),
                        analysis: { id: 'ana_1', score: 8.5 },
                        user: { id: 'user_1', name: 'Opponent' }
                    }
                ],
                analysis: { id: 'debate_ana_1', overallScore: 7.8 }
            };

            return NextResponse.json(debate);
        } catch (error) {
            console.error('Get debate error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch debate' },
                { status: 500 }
            );
        }
    });
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ debateId: string }> }
) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId } = await params;
            const { status } = await req.json();

            if (!status) {
                return NextResponse.json(
                    { error: 'Status is required' },
                    { status: 400 }
                );
            }

            const updatedDebate = {
                id: debateId,
                title: 'AI Ethics in Modern Society',
                topic: 'Should AI have rights?',
                status: status,
                createdAt: new Date(),
                startedAt: status === 'active' ? new Date() : undefined,
                endedAt: status === 'completed' ? new Date() : undefined,
                participants: [],
                arguments: [],
                analysis: null,
            };

            return NextResponse.json(updatedDebate);
        } catch (error) {
            console.error('Update debate error:', error);
            return NextResponse.json(
                { error: 'Failed to update debate' },
                { status: 500 }
            );
        }
    });
}
