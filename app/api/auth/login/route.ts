import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Only accept a single demo account for the prototype
        const DEMO_EMAIL = 'abhi@gmail.com';
        const DEMO_PASSWORD = 'Zxcvbnm@1234';

        if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = {
            id: 'user_demo',
            email: DEMO_EMAIL,
            name: 'Abhi Demo',
            rating: 1600,
        };

        const token = generateToken(user.id, user.email);

        return NextResponse.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
