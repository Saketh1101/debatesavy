'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface HeaderProps {
    children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
    return (
        <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <span className="text-xl font-semibold text-white hidden sm:inline">DebateIQ</span>
                </Link>
                {children}
            </div>
        </header>
    );
}
