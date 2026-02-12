import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import prisma from '@/lib/prisma';
import { Side } from '@prisma/client';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId, content, side } = await req.json();

            if (!debateId || !content) {
                return NextResponse.json(
                    { error: 'Debate ID and content are required' },
                    { status: 400 }
                );
            }

            const argument = await prisma.argument.create({
                data: {
                    content,
                    debateId,
                    userId,
                    side: side as Side || Side.NEUTRAL
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            return NextResponse.json(argument, { status: 201 });
        } catch (error) {
            console.error('Argument submission error:', error);
            return NextResponse.json(
                { error: 'Failed to submit argument' },
                { status: 500 }
            );
        }
    });
}
