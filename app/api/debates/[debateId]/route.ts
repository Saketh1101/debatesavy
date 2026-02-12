import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
// Prisma removed for prototype; returning mock data.

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ debateId: string }> }
) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId } = await params;
            // Return a mock debate object for the stateless prototype.
            const now = new Date().toISOString();
            const debate = {
                id: debateId,
                title: 'Demo Debate',
                topic: 'Demo Topic',
                status: 'pending',
                createdAt: now,
                updatedAt: now,
                participants: [
                    { id: userId, name: 'Demo User', rating: 1600 }
                ],
                arguments: [],
                analysis: null
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

            // Return a mock updated object
            const updated = {
                id: debateId,
                status,
                startedAt: status === 'active' ? new Date().toISOString() : null,
                endedAt: status === 'completed' ? new Date().toISOString() : null
            };

            return NextResponse.json(updated);
        } catch (error) {
            console.error('Update debate error:', error);
            return NextResponse.json(
                { error: 'Failed to update debate' },
                { status: 500 }
            );
        }
    });
}
