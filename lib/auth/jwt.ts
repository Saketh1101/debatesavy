import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Prefer SESSION_SECRET (used in .env.example) for consistency, fall back to JWT_SECRET
const JWT_SECRET = process.env.SESSION_SECRET || process.env.JWT_SECRET || 'default-secret';
const TOKEN_EXPIRY = '7d';

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
}

export function generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): { userId: string; email: string } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        return decoded;
    } catch {
        return null;
    }
}

export function extractTokenFromHeader(header: string): string | null {
    const parts = header.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
    }
    return null;
}
