'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';
import Button from '@/app/components/Button';
import { AiAssistant } from '@/app/components/AiAssistant';
import { UsersIcon, StarIcon, GlobeIcon, TrophyIcon, BarChartIcon } from '@/app/components/Icons';

interface Debate {
    id: string;
    title: string;
    topic: string;
    status: string;
    createdAt: string;
    participants: Array<{ name: string }>;
}

export default function DashboardPage() {
    const router = useRouter();
    const [debates, setDebates] = useState<Debate[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ name: string; rating: number } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const fetchDebates = async () => {
            try {
                const response = await fetch('/api/debates', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDebates(data);
                    setUser({ name: 'Debater', rating: 1200 });
                } else {
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Failed to fetch debates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDebates();
    }, [router]);

    if (loading) {
        return (
            <>
                <Header>
                    <Navigation />
                </Header>
                <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
                    <p className="text-slate-400">Loading...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header>
                <Navigation />
            </Header>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                        <p className="text-slate-400">Here's your debate activity and performance.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <TrophyIcon size={20} className="text-amber-400" strokeWidth={1.5} />
                                <p className="text-slate-400 text-sm">Current Rating</p>
                            </div>
                            <p className="text-4xl font-bold text-blue-400">{user?.rating}</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <BarChartIcon size={20} className="text-blue-400" strokeWidth={1.5} />
                                <p className="text-slate-400 text-sm">Total Debates</p>
                            </div>
                            <p className="text-4xl font-bold">{debates.length}</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-slate-400 text-sm">Active Debates</p>
                            </div>
                            <p className="text-4xl font-bold">{debates.filter(d => d.status === 'active').length}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/modes/friendly">
                                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 group">
                                    <UsersIcon size={20} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                    <span>Friendly Debate</span>
                                </Button>
                            </Link>
                            <Link href="/modes/famous">
                                <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2 group">
                                    <StarIcon size={20} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                    <span>Famous Personalities</span>
                                </Button>
                            </Link>
                            <Link href="/modes/online">
                                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2 group">
                                    <GlobeIcon size={20} className="group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                                    <span>Online Debates</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Debates List */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Recent Debates</h2>
                        {debates.length === 0 ? (
                            <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
                                <p className="text-slate-400 mb-4">No debates yet. Start by creating one!</p>
                                <Link href="/debates/create">
                                    <Button variant="primary">Create Debate</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {debates.map((debate) => (
                                    <Link key={debate.id} href={`/debates/${debate.id}`}>
                                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition cursor-pointer">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">{debate.title}</h3>
                                                    <p className="text-slate-400 mb-2">{debate.topic}</p>
                                                    <div className="flex gap-2">
                                                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">
                                                            {debate.status}
                                                        </span>
                                                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">
                                                            {debate.participants.length} participants
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-slate-500 text-sm">
                                                    {new Date(debate.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Assistant */}
            <AiAssistant debateId="dashboard" debateMode="friendly" />
        </>
    );
}
