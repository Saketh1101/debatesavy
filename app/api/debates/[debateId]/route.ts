import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ debateId: string }> }
) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId } = await params;

            const debate = await prisma.debate.findUnique({
                where: { id: debateId },
                include: {
                    participants: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            rating: true,
                        },
                    },
                    arguments: {
                        include: {
                            analysis: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                        orderBy: {
                            timestamp: 'asc',
                        },
                    },
                    analysis: true,
                },
            });

            if (!debate) {
                return NextResponse.json(
                    { error: 'Debate not found' },
                    { status: 404 }
                );
            }

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

            const debate = await prisma.debate.update({
                where: { id: debateId },
                data: {
                    status,
                    startedAt: status === 'active' ? new Date() : undefined,
                    endedAt: status === 'completed' ? new Date() : undefined,
                },
            });

            return NextResponse.json(debate);
        } catch (error) {
            console.error('Update debate error:', error);
            return NextResponse.json(
                { error: 'Failed to update debate' },
                { status: 500 }
            );
        }
    });
}
