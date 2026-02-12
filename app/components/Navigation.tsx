'use client';

import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="flex items-center gap-4">
            <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white transition px-3 py-2 rounded-md text-sm font-medium"
            >
                Dashboard
            </Link>
            <Link
                href="/leaderboard"
                className="text-slate-300 hover:text-white transition px-3 py-2 rounded-md text-sm font-medium"
            >
                Leaderboard
            </Link>
            <Link
                href="/profile"
                className="text-slate-300 hover:text-white transition px-3 py-2 rounded-md text-sm font-medium"
            >
                Profile
            </Link>
        </nav>
    );
}
