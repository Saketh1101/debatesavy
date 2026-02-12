import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { title, topic, isPublic = false, mode = 'friendly' } = await req.json();

            if (!title || !topic) {
                return NextResponse.json(
                    { error: 'Title and topic are required' },
                    { status: 400 }
                );
            }

            const debate = await prisma.debate.create({
                data: {
                    title,
                    topic,
                    isPublic,
                    mode,
                    status: 'pending',
                    participants: {
                        connect: { id: userId }
                    }
                },
                include: {
                    participants: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            });

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
            const debates = await prisma.debate.findMany({
                where: {
                    participants: {
                        some: {
                            id: userId
                        }
                    }
                },
                include: {
                    participants: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: { arguments: true }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            });

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
