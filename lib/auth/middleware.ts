import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './jwt';

export async function withAuth(
    request: NextRequest,
    handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
    // First, check Authorization header
    const authHeader = request.headers.get('authorization');
    let token: string | null = null;

    if (authHeader) {
        token = extractTokenFromHeader(authHeader);
    }

    // Fallback: check cookie named `token` (useful for prototype/local setups)
    if (!token) {
        try {
            const cookieToken = request.cookies.get && request.cookies.get('token');
            if (cookieToken && (cookieToken as any).value) {
                token = (cookieToken as any).value;
            } else if (typeof cookieToken === 'string') {
                token = cookieToken;
            }
        } catch (e) {
            // ignore cookie read errors
        }
    }

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    return handler(request, decoded.userId);
}
