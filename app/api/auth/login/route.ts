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

        // Mock user for demo
        const mockPassword = 'hashed_password_demo';
        const user = {
            id: 'user_1',
            email,
            password: mockPassword,
            name: 'Demo User',
            rating: 1600,
        };

        // For demo, allow any password
        const token = generateToken(user.id, user.email);

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                rating: user.rating,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
