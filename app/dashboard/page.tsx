'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';
import Button from '@/app/components/Button';
import { AiAssistant } from '@/app/components/AiAssistant';

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
                <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 flex items-center justify-center">
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

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-slate-400 text-lg">Ready to improve your debate skills?</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition">
                            <p className="text-slate-400 text-sm mb-2">Current Rating</p>
                            <p className="text-4xl font-bold text-purple-300">{user?.rating}</p>
                            <p className="text-slate-500 text-xs mt-2">+45 this month</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
                            <p className="text-slate-400 text-sm mb-2">Debates Completed</p>
                            <p className="text-4xl font-bold text-blue-300">{debates.length}</p>
                            <p className="text-slate-500 text-xs mt-2">8 wins, 2 losses</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 backdrop-blur border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition">
                            <p className="text-slate-400 text-sm mb-2">Win Rate</p>
                            <p className="text-4xl font-bold text-cyan-300">80%</p>
                            <p className="text-slate-500 text-xs mt-2">vs 45% average</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Start Debating</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/modes/friendly">
                                <div className="bg-gradient-to-br from-purple-600/20 to-slate-900/20 backdrop-blur border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/60 transition cursor-pointer group">
                                    <div className="text-5xl mb-4">💬</div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition">Friendly Debate</h3>
                                    <p className="text-slate-400">Discuss with friends in a casual setting</p>
                                </div>
                            </Link>
                            <Link href="/modes/famous">
                                <div className="bg-gradient-to-br from-blue-600/20 to-slate-900/20 backdrop-blur border border-blue-500/30 rounded-xl p-8 hover:border-blue-500/60 transition cursor-pointer group">
                                    <div className="text-5xl mb-4">🎭</div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition">Famous Figures</h3>
                                    <p className="text-slate-400">Debate against historical personalities</p>
                                </div>
                            </Link>
                            <Link href="/modes/online">
                                <div className="bg-gradient-to-br from-cyan-600/20 to-slate-900/20 backdrop-blur border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition cursor-pointer group">
                                    <div className="text-5xl mb-4">🏆</div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">Tournaments</h3>
                                    <p className="text-slate-400">Compete in global tournaments</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Debates */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Recent Debates</h2>
                            <Link href="/leaderboard">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>

                        {debates.length > 0 ? (
                            <div className="space-y-4">
                                {debates.slice(0, 5).map((debate) => (
                                    <div key={debate.id} className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/30 transition">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-2">{debate.title}</h3>
                                                <p className="text-slate-400 mb-3">{debate.topic}</p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs bg-purple-500/20 border border-purple-500/50 rounded-full px-3 py-1 text-purple-300">
                                                        {debate.status}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(debate.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/debates/${debate.id}`}>
                                                <Button variant="primary" size="sm">View</Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-lg p-12 text-center">
                                <p className="text-slate-400 mb-6">No debates yet. Start your first one!</p>
                                <Link href="/modes/friendly">
                                    <Button variant="primary">Create Debate</Button>
                                </Link>
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
