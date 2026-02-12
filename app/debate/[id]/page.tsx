'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { AiAssistant } from '@/app/components/AiAssistant';

interface Argument {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: Date;
    score?: number;
}

interface DebateParticipant {
    id: string;
    name: string;
    role?: string;
}

interface DebateRoom {
    id: string;
    title: string;
    topic: string;
    mode: 'friendly' | 'famous' | 'online';
    status: 'pending' | 'active' | 'completed';
    participants: DebateParticipant[];
    arguments: Argument[];
    personalityName?: string;
    category?: string;
}

export default function DebateRoomPage() {
    const router = useRouter();
    const params = useParams();
    const debateId = params.id as string;

    const [debate, setDebate] = useState<DebateRoom | null>(null);
    const [argument, setArgument] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken) {
            router.push('/auth/login');
            return;
        }
        setToken(savedToken);

        // Load debate details
        const loadDebate = async () => {
            try {
                const response = await fetch(`/api/debates/${debateId}`, {
                    headers: {
                        'Authorization': `Bearer ${savedToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDebate(data);
                } else {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error loading debate:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDebate();
    }, [debateId, router]);

    const handleSubmitArgument = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!argument.trim() || !token) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/arguments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    debateId,
                    content: argument,
                }),
            });

            if (response.ok) {
                const newArg = await response.json();
                setDebate(prev => prev ? {
                    ...prev,
                    arguments: [...(prev.arguments || []), newArg]
                } : null);
                setArgument('');
            }
        } catch (error) {
            console.error('Error submitting argument:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <p className="text-slate-400">Loading debate...</p>
                </div>
            </>
        );
    }

    if (!debate) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                    <p className="text-slate-400">Debate not found</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
                        ← Back to Dashboard
                    </Link>

                    {/* Debate Header */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{debate.title}</h1>
                                <p className="text-xl text-slate-300">{debate.topic}</p>
                            </div>
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg capitalize">
                                {debate.mode} • {debate.status}
                            </span>
                        </div>

                        {/* Participants */}
                        <div className="flex gap-4 flex-wrap">
                            {debate.participants.map((p) => (
                                <div key={p.id} className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg">
                                    <span className="text-sm">{p.name}</span>
                                    {p.role && <span className="text-xs text-slate-400">({p.role})</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Arguments Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Debate Arguments</h2>

                                {/* Arguments List */}
                                <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                                    {debate.arguments && debate.arguments.length > 0 ? (
                                        debate.arguments.map((arg) => (
                                            <div key={arg.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                                <div className="flex justify-between items-start mb-2">
                                                    <p className="font-semibold text-white">{arg.userName}</p>
                                                    <span className="text-xs text-slate-400">
                                                        {arg.timestamp instanceof Date
                                                            ? arg.timestamp.toLocaleTimeString()
                                                            : new Date(arg.timestamp).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 mb-2">{arg.content}</p>
                                                {arg.score && (
                                                    <div className="text-sm text-blue-400">
                                                        Score: {arg.score.toFixed(1)}/10
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 text-center py-8">No arguments yet. Be the first to argue!</p>
                                    )}
                                </div>

                                {/* Submit Argument Form */}
                                <form onSubmit={handleSubmitArgument} className="space-y-4 border-t border-slate-700 pt-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Your Argument</label>
                                        <textarea
                                            value={argument}
                                            onChange={(e) => setArgument(e.target.value)}
                                            placeholder="Share your well-reasoned argument..."
                                            rows={4}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !argument.trim()}
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Argument'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar - Stats and Info */}
                        <div className="space-y-6">
                            {/* Mode Info */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Debate Info</h3>
                                <div className="space-y-3 text-slate-300">
                                    <div>
                                        <p className="text-sm text-slate-400">Mode</p>
                                        <p className="font-semibold capitalize">{debate.mode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Status</p>
                                        <p className="font-semibold capitalize">{debate.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Participants</p>
                                        <p className="font-semibold">{debate.participants.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Arguments</p>
                                        <p className="font-semibold">{debate.arguments?.length || 0}</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Insights */}
                            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                                <h3 className="text-lg font-bold text-white mb-4">💡 AI Insights</h3>
                                <div className="space-y-2 text-slate-300 text-sm">
                                    <p>• Use evidence to support your claims</p>
                                    <p>• Address opposing viewpoints directly</p>
                                    <p>• Keep arguments concise and focused</p>
                                    <p>• Build on previous arguments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Assistant */}
            {token && <AiAssistant debateId={debate.id} debateMode={debate.mode} personalityName={debate.personalityName} />}
        </>
    );
}
