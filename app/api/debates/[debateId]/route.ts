import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import store from '@/lib/memory';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ debateId: string }> }
) {
    return withAuth(request, async (req, userId) => {
        try {
            const { debateId } = await params;
            store.ensureDebateExists(debateId);
            const debate = store.getDebate(debateId);
            if (!debate) {
                return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
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

            // Return a mock updated object
            const d = store.getDebate(debateId);
            if (!d) return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
            d.status = status;
            d.startedAt = status === 'active' ? new Date().toISOString() : undefined;
            d.endedAt = status === 'completed' ? new Date().toISOString() : undefined;
            d.updatedAt = new Date().toISOString();
            return NextResponse.json(d);
        } catch (error) {
            console.error('Update debate error:', error);
            return NextResponse.json(
                { error: 'Failed to update debate' },
                { status: 500 }
            );
        }
    });
}
