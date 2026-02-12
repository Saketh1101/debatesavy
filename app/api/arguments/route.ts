import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId, content } = await req.json();

            if (!debateId || !content) {
                return NextResponse.json(
                    { error: 'Debate ID and content are required' },
                    { status: 400 }
                );
            }

            const argument = await prisma.argument.create({
                data: {
                    debateId,
                    userId,
                    content,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            return NextResponse.json(argument, { status: 201 });
        } catch (error) {
            console.error('Argument creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create argument' },
                { status: 500 }
            );
        }
    });
}
