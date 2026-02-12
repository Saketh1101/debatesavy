'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import { AiAssistant } from '@/app/components/AiAssistant';

enum Side {
    PRO = 'PRO',
    CON = 'CON',
    NEUTRAL = 'NEUTRAL'
}

interface Argument {
    id: string;
    userId: string;
    user: {
        id: string;
        name: string;
    };
    content: string;
    timestamp: string | Date; // API returns ISO string
    score?: number;
    side: Side;
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
    const [selectedSide, setSelectedSide] = useState<Side>(Side.PRO);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState<any>(null);
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const aiRef = useRef<any>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken) {
            router.push('/auth/login');
            return;
        }
        setToken(savedToken);

        fetchDebate(savedToken);

        // Poll for updates every 3 seconds
        pollingInterval.current = setInterval(() => {
            fetchDebate(savedToken, true);
        }, 3000);

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, [debateId, router]);

    const fetchDebate = async (authToken: string, isPolling = false) => {
        try {
            const response = await fetch(`/api/debates/${debateId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDebate(data);
                if (!isPolling) setLoading(false);
            } else if (!isPolling) {
                // If the server returned 404 immediately after creation, the in-memory
                // store may be inconsistent across worker processes. Try to recover by
                // checking a locally stored created debate payload (set by the create
                // page) and use it as a fallback so the UI doesn't show the demo placeholder.
                if (response.status === 404) {
                    try {
                        const stored = localStorage.getItem('createdDebate');
                        if (stored) {
                            const parsed = JSON.parse(stored);
                            if (parsed && parsed.id === debateId) {
                                setDebate(parsed);
                                localStorage.removeItem('createdDebate');
                                setLoading(false);
                                return;
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to use createdDebate fallback', e);
                    }
                }
                // Only redirect on initial load failure, not polling glitches
                setLoading(false);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error fetching debate:', error);
            if (!isPolling) {
                setDebate(null);
                setLoading(false);
            }
        }
    };

    const handleAnalyzeDebate = async () => {
        if (!debate || !token) return;
        const argumentMessages = (debate.arguments || []).map(arg => ({
            author: arg.user?.name || arg.userId,
            content: arg.content,
        }));

        if (argumentMessages.length === 0) {
            setSummaryError('No arguments found to analyze. Add some PRO or CON points first.');
            return;
        }

        // Build a system metadata message with title/topic/mode/participants
        const metaParts: string[] = [];
        if (debate.title) metaParts.push(`Debate Title: ${debate.title}`);
        if (debate.topic) metaParts.push(`Topic: ${debate.topic}`);
        if (debate.mode) metaParts.push(`Mode: ${debate.mode}`);
        if (debate.participants && debate.participants.length > 0) {
            const names = debate.participants.map(p => p.name).filter(Boolean).join(', ');
            if (names) metaParts.push(`Participants: ${names}`);
        }

        const systemMessage = { author: 'system', content: metaParts.join('\n') };

        const messages = [systemMessage, ...argumentMessages];

        setSummaryLoading(true);
        setSummaryError(null);
        setSummaryResult(null);

        try {
            const res = await fetch('/api/ai-assistant/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ messages }),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Summary API error');
            }

            const data = await res.json();
            setSummaryResult(data.result);

            // Scroll to the summary panel so user sees it immediately
            setTimeout(() => {
                document.getElementById('debate-summary')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (err: any) {
            console.error('Analyze error:', err);
            setSummaryError(err?.message || 'Failed to analyze debate');
        } finally {
            setSummaryLoading(false);
        }
    };

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
                    side: selectedSide
                }),
            });

            if (response.ok) {
                const newArg = await response.json();
                setDebate(prev => prev ? {
                    ...prev,
                    arguments: [...(prev.arguments || []), newArg]
                } : null);
                setArgument('');
                // Refresh full state to be sure
                fetchDebate(token);
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

    const proArguments = debate.arguments?.filter(arg => arg.side === Side.PRO) || [];
    const conArguments = debate.arguments?.filter(arg => arg.side === Side.CON) || [];

    // Helper to render a point that could be a string, an object with various key names, etc.
    const colorMap: Record<string, string> = { blue: 'text-blue-300', red: 'text-red-300', purple: 'text-purple-300' };
    const formatPoint = (p: any, color: string) => {
        if (typeof p === 'string') return p;
        if (typeof p !== 'object' || p === null) return String(p);
        // Try common key names the LLM might use for the title/label
        const title = p.label || p.title || p.name || p.point || '';
        // Try common key names for the body/description
        const body = p.description || p.text || p.detail || p.explanation || p.content || '';
        if (title && body) {
            return <><span className={`font-semibold ${colorMap[color] || 'text-slate-200'}`}>{title}:</span> {body}</>;
        }
        // If only one field has content, show it
        if (title) return title;
        if (body) return body;
        // Last resort: join all string values from the object
        const allVals = Object.values(p).filter(v => typeof v === 'string' && v.trim()).join(' — ');
        return allVals || JSON.stringify(p);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-950 pb-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <Link href="/dashboard" className="text-slate-400 hover:text-white mb-2 inline-block text-sm">
                                ← Back to Dashboard
                            </Link>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{debate.title}</h1>
                            <p className="text-slate-400 mt-1">{debate.topic}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${debate.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                    debate.status === 'completed' ? 'bg-slate-700 text-slate-300' :
                                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                {debate.status.toUpperCase()}
                            </span>
                            <button
                                onClick={handleAnalyzeDebate}
                                disabled={summaryLoading || (debate.arguments?.length || 0) === 0}
                                className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-semibold disabled:opacity-50"
                            >
                                {summaryLoading ? 'Analyzing...' : 'Analyze Debate'}
                            </button>
                        </div>
                    </div>

                    {/* Split View Arena */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 min-h-[500px]">
                        {/* PRO Column */}
                        <div className="bg-slate-900/50 rounded-xl border border-blue-500/20 flex flex-col">
                            <div className="p-4 border-b border-blue-500/20 bg-blue-500/5 rounded-t-xl">
                                <h2 className="text-lg font-bold text-blue-400 text-center">PRO (Support)</h2>
                            </div>
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[600px]">
                                {proArguments.map(arg => (
                                    <ArgumentCard key={arg.id} arg={arg} color="blue" />
                                ))}
                                {proArguments.length === 0 && (
                                    <div className="text-center text-slate-500 py-10 italic">
                                        No arguments in support yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CON Column */}
                        <div className="bg-slate-900/50 rounded-xl border border-red-500/20 flex flex-col">
                            <div className="p-4 border-b border-red-500/20 bg-red-500/5 rounded-t-xl">
                                <h2 className="text-lg font-bold text-red-400 text-center">CON (Oppose)</h2>
                            </div>
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[600px]">
                                {conArguments.map(arg => (
                                    <ArgumentCard key={arg.id} arg={arg} color="red" />
                                ))}
                                {conArguments.length === 0 && (
                                    <div className="text-center text-slate-500 py-10 italic">
                                        No arguments in opposition yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Error Banner */}
                    {summaryError && (
                        <div className="max-w-7xl mx-auto px-4 py-3 bg-red-700/10 border border-red-500/20 text-red-200 rounded-lg mb-4">
                            <strong className="font-semibold">Error:</strong>
                            <span className="ml-2">{summaryError}</span>
                        </div>
                    )}

                    {/* Summary Panel */}
                    {summaryResult && (
                        <div id="debate-summary" className="max-w-7xl mx-auto px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg mt-6 mb-40">
                            <h3 className="text-white font-bold mb-2 text-lg">Debate Summary</h3>
                            {summaryResult.summary && <p className="text-slate-300 mb-3">{summaryResult.summary}</p>}
                            {Array.isArray(summaryResult.proPoints) && summaryResult.proPoints.length > 0 && (
                                <div className="mb-3">
                                    <strong className="text-blue-400">PRO points:</strong>
                                    <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                                        {summaryResult.proPoints.map((p: any, i: number) => (
                                            <li key={i}>{formatPoint(p, 'blue')}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Array.isArray(summaryResult.conPoints) && summaryResult.conPoints.length > 0 && (
                                <div className="mb-3">
                                    <strong className="text-red-400">CON points:</strong>
                                    <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                                        {summaryResult.conPoints.map((p: any, i: number) => (
                                            <li key={i}>{formatPoint(p, 'red')}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Array.isArray(summaryResult.suggestedRebuttals) && summaryResult.suggestedRebuttals.length > 0 && (
                                <div className="mb-3">
                                    <strong className="text-purple-400">Suggested rebuttals:</strong>
                                    <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                                        {summaryResult.suggestedRebuttals.map((p: any, i: number) => (
                                            <li key={i}>{formatPoint(p, 'purple')}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* If nothing structured was found, show whatever text the LLM returned */}
                            {!summaryResult.summary && !summaryResult.proPoints && !summaryResult.conPoints && (
                                <p className="text-slate-300 whitespace-pre-wrap">{summaryResult.raw || JSON.stringify(summaryResult, null, 2)}</p>
                            )}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 md:p-6 shadow-2xl z-40">
                        <div className="max-w-4xl mx-auto">
                            <form onSubmit={handleSubmitArgument} className="space-y-4">
                                <div className="flex gap-4 mb-2 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSide(Side.PRO)}
                                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedSide === Side.PRO
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        Support (PRO)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSide(Side.CON)}
                                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedSide === Side.CON
                                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/25 ring-2 ring-red-400/50'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        Oppose (CON)
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <textarea
                                        value={argument}
                                        onChange={(e) => setArgument(e.target.value)}
                                        placeholder={`Type your argument to ${selectedSide === Side.PRO ? 'support' : 'oppose'} the motion...`}
                                        rows={2}
                                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !argument.trim()}
                                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold px-6 rounded-lg transition-colors"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Assistant */}
            {token && debate && <AiAssistant ref={aiRef} debateId={debate.id} debateMode={debate.mode} personalityName={debate.personalityName} />}
        </>
    );
}

function ArgumentCard({ arg, color }: { arg: Argument, color: 'blue' | 'red' }) {
    const borderColor = color === 'blue' ? 'border-blue-500/30' : 'border-red-500/30';
    const bgColor = color === 'blue' ? 'bg-blue-500/5' : 'bg-red-500/5';

    return (
        <div className={`p-4 rounded-lg border ${borderColor} ${bgColor} animate-in fade-in slide-in-from-bottom-2`}>
            <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-slate-200 text-sm">{arg.user?.name || 'Unknown User'}</span>
                <span className="text-xs text-slate-500">
                    {new Date(arg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{arg.content}</p>
        </div>
    );
}
