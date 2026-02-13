'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';

interface Argument {
    id: string;
    userId: string;
    user: {
        id: string;
        name: string;
    };
    content: string;
    timestamp: string | Date;
}

// Component to format AI feedback with proper structure
function FeedbackFormatter({ feedback }: { feedback: string }) {
    if (!feedback || feedback.trim().length === 0) {
        return <p className="text-slate-400 text-xs">No feedback received</p>;
    }

    const parts = feedback.split(/\n(?=Summary:|Strengths:|Weaknesses|Suggestion:)/);

    const rendered = parts.map((part, idx) => {
        const trimmed = part.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('Summary:')) {
            return (
                <div key={idx} className="pb-2 border-b border-slate-600/30">
                    <span className="font-bold text-blue-300">Summary:</span>
                    <p className="text-slate-300 mt-1">{trimmed.replace('Summary:', '').trim()}</p>
                </div>
            );
        }

        if (trimmed.startsWith('Strengths:')) {
            const content = trimmed.replace('Strengths:', '').trim();
            const bullets = content.split('\n').filter(line => line.trim().startsWith('*'));
            return (
                <div key={idx} className="pb-2 border-b border-slate-600/30">
                    <span className="font-bold text-green-300">Strengths:</span>
                    <ul className="mt-1 space-y-1 text-slate-300 ml-2">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="list-disc">{bullet.replace('*', '').trim()}</li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (trimmed.startsWith('Weaknesses')) {
            const content = trimmed.replace('Weaknesses / Counterpoints:', '').replace('Weaknesses / CounterPoints:', '').trim();
            const bullets = content.split('\n').filter(line => line.trim().startsWith('*'));
            return (
                <div key={idx} className="pb-2 border-b border-slate-600/30">
                    <span className="font-bold text-yellow-300">Weaknesses / Counterpoints:</span>
                    <ul className="mt-1 space-y-1 text-slate-300 ml-2">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="list-disc">{bullet.replace('*', '').trim()}</li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (trimmed.startsWith('Suggestion:')) {
            return (
                <div key={idx}>
                    <span className="font-bold text-purple-300">Suggestion:</span>
                    <p className="text-slate-300 mt-1">{trimmed.replace('Suggestion:', '').trim()}</p>
                </div>
            );
        }

        return null;
    }).filter(Boolean);

    // If no formatted sections found, show raw feedback
    if (rendered.length === 0) {
        return (
            <div className="text-slate-300 text-xs whitespace-pre-wrap bg-slate-950/50 p-2 rounded border border-slate-700">
                {feedback}
            </div>
        );
    }

    return (
        <div className="space-y-3 text-xs">
            {rendered}
        </div>
    );
}

export default function SplitViewDebatePage() {
    const router = useRouter();
    const params = useParams();
    const debateId = params.id as string;

    const [debate, setDebate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    // User 1 (Left side)
    const [user1Arg, setUser1Arg] = useState('');
    const [user1Feedback, setUser1Feedback] = useState<string | null>(null);
    const [user1Loading, setUser1Loading] = useState(false);

    // User 2 (Right side)
    const [user2Arg, setUser2Arg] = useState('');
    const [user2Feedback, setUser2Feedback] = useState<string | null>(null);
    const [user2Loading, setUser2Loading] = useState(false);

    // Shared state
    const [error, setError] = useState<string | null>(null);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken) {
            router.push('/auth/login');
            return;
        }
        setToken(savedToken);

        fetchDebate(savedToken);

        // Poll for updates every 2 seconds
        pollingInterval.current = setInterval(() => {
            fetchDebate(savedToken, true);
        }, 2000);

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, [debateId, router]);

    const fetchDebate = async (authToken: string, isPolling = false) => {
        try {
            const response = await fetch(`/api/debates/${debateId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });

            if (response.ok) {
                const data = await response.json();
                setDebate(data);
                if (!isPolling) setLoading(false);
            } else if (!isPolling) {
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

    const submitArgument = async (content: string, userId: string, setLoading: any) => {
        if (!content.trim() || !token) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/arguments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    debateId,
                    content,
                    side: 'NEUTRAL',
                    demoUser: userId, // Track which demo user submitted this
                }),
            });

            if (response.ok) {
                await fetchDebate(token);
                if (userId === 'user1') setUser1Arg('');
                else setUser2Arg('');
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to submit argument');
        } finally {
            setLoading(false);
        }
    };

    const getFeedback = async (userId: string, isUser1: boolean) => {
        if (!debate || !token) return;

        // Filter by demoUser field for split-view, or userId as fallback
        const userArgs = debate.arguments?.filter((arg: any) =>
            arg.demoUser === userId || (arg.demoUser === undefined && arg.userId === userId)
        ) || [];
        if (userArgs.length === 0) {
            setError(`No arguments found for ${isUser1 ? 'User 1' : 'User 2'}`);
            return;
        }

        const setFeedbackLoading = isUser1 ? setUser1Loading : setUser2Loading;

        setFeedbackLoading(true);
        setError(null);

        try {
            const userArgumentsText = userArgs.map((arg: any) => arg.content).join('\n\n');

            console.log('[getFeedback] Sending to AI:', {
                userId,
                argumentCount: userArgs.length,
                textLength: userArgumentsText.length
            });

            const res = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: userArgumentsText,
                    context: 'friendly-debate',
                    debateId,
                    debateTopic: debate.topic,
                }),
            });

            console.log('[getFeedback] Response status:', res.status);

            if (!res.ok) {
                const txt = await res.text();
                console.error('[getFeedback] API error:', res.status, txt);
                throw new Error(txt || 'Feedback API error');
            }

            const data = await res.json();
            console.log('[getFeedback] Full response data:', data);
            console.log('[getFeedback] Response text length:', data.response?.length);
            console.log('[getFeedback] First 200 chars:', data.response?.substring(0, 200));
            <>
                <Header />
                <div className="min-h-screen bg-slate-950">
                    <div className="max-w-full mx-auto px-2 py-4">
                        {/* Header */}
                        <div className="mb-4">
                            <Link href={`/debate/${debateId}`} className="text-blue-400 hover:text-blue-300 text-sm mb-2 inline-block">
                                ← Back to Normal View
                            </Link>
                            <h1 className="text-3xl font-bold text-white">{debate.title}</h1>
                            <p className="text-slate-400">{debate.topic}</p>
                        </div>

                        {/* Error Banner */}
                        {error && (
                            <div className="max-w-full mx-auto px-2 py-3 bg-red-700/10 border border-red-500/20 text-red-200 rounded-lg mb-4">
                                <strong>Error:</strong>
                                <span className="ml-2">{error}</span>
                            </div>
                        )}

                        {/* Split View Container */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {/* USER 1 - LEFT SIDE */}
                            <div className="bg-slate-900/50 rounded-xl border border-blue-500/20 flex flex-col h-[calc(100vh-250px)]">
                                {/* Header */}
                                <div className="p-3 border-b border-blue-500/20 bg-blue-500/5 rounded-t-xl">
                                    <h2 className="text-lg font-bold text-blue-400">User 1 (Demo)</h2>
                                </div>

                                {/* Arguments List */}
                                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                                    {user1Args.map((arg: any) => (
                                        <div key={arg.id} className="p-3 rounded-lg border border-blue-500/30 bg-blue-500/5">
                                            <span className="text-xs text-slate-500">
                                                {new Date(arg.timestamp).toLocaleTimeString()}
                                            </span>
                                            <p className="text-slate-300 text-sm mt-1">{arg.content}</p>
                                        </div>
                                    ))}
                                    {user1Args.length === 0 && (
                                        <div className="text-center text-slate-500 text-sm italic py-8">
                                            No arguments yet
                                        </div>
                                    )}
                                </div>

                                {/* Feedback Section */}
                                {user1Feedback && (
                                    <div className="p-3 border-t border-blue-500/20 bg-slate-800/50">
                                        <h3 className="font-bold text-blue-300 mb-3 text-sm">AI Feedback</h3>
                                        <div className="max-h-[200px] overflow-y-auto">
                                            <FeedbackFormatter feedback={user1Feedback} />
                                        </div>
                                    </div>
                                )}

                                {/* Input Area */}
                                <div className="p-3 border-t border-blue-500/20 bg-slate-900">
                                    <textarea
                                        value={user1Arg}
                                        onChange={(e) => setUser1Arg(e.target.value)}
                                        placeholder="Type User 1 argument..."
                                        rows={2}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => submitArgument(user1Arg, 'user1', setUser1Loading)}
                                            disabled={user1Loading || !user1Arg.trim()}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-3 py-2 rounded text-sm transition-colors"
                                        >
                                            {user1Loading ? 'Sending...' : 'Send'}
                                        </button>
                                        <button
                                            onClick={() => getFeedback('user1', true)}
                                            disabled={user1Loading || user1Args.length === 0}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-3 py-2 rounded text-sm transition-colors"
                                        >
                                            {user1Loading ? 'Analyzing...' : 'Get Feedback'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* USER 2 - RIGHT SIDE */}
                            <div className="bg-slate-900/50 rounded-xl border border-red-500/20 flex flex-col h-[calc(100vh-250px)]">
                                {/* Header */}
                                <div className="p-3 border-b border-red-500/20 bg-red-500/5 rounded-t-xl">
                                    <h2 className="text-lg font-bold text-red-400">User 2 (Demo)</h2>
                                </div>

                                {/* Arguments List */}
                                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                                    {user2Args.map((arg: any) => (
                                        <div key={arg.id} className="p-3 rounded-lg border border-red-500/30 bg-red-500/5">
                                            <span className="text-xs text-slate-500">
                                                {new Date(arg.timestamp).toLocaleTimeString()}
                                            </span>
                                            <p className="text-slate-300 text-sm mt-1">{arg.content}</p>
                                        </div>
                                    ))}
                                    {user2Args.length === 0 && (
                                        <div className="text-center text-slate-500 text-sm italic py-8">
                                            No arguments yet
                                        </div>
                                    )}
                                </div>

                                {/* Feedback Section */}
                                {user2Feedback && (
                                    <div className="p-3 border-t border-red-500/20 bg-slate-800/50">
                                        <h3 className="font-bold text-red-300 mb-3 text-sm">AI Feedback</h3>
                                        <div className="max-h-[200px] overflow-y-auto">
                                            <FeedbackFormatter feedback={user2Feedback} />
                                        </div>
                                    </div>
                                )}

                                {/* Input Area */}
                                <div className="p-3 border-t border-red-500/20 bg-slate-900">
                                    <textarea
                                        value={user2Arg}
                                        onChange={(e) => setUser2Arg(e.target.value)}
                                        placeholder="Type User 2 argument..."
                                        rows={2}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white text-sm placeholder-slate-500 focus:border-red-500 focus:outline-none resize-none mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => submitArgument(user2Arg, 'user2', setUser2Loading)}
                                            disabled={user2Loading || !user2Arg.trim()}
                                            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-3 py-2 rounded text-sm transition-colors"
                                        >
                                            {user2Loading ? 'Sending...' : 'Send'}
                                        </button>
                                        <button
                                            onClick={() => getFeedback('user2', false)}
                                            disabled={user2Loading || user2Args.length === 0}
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-3 py-2 rounded text-sm transition-colors"
                                        >
                                            {user2Loading ? 'Analyzing...' : 'Get Feedback'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="max-w-full mx-auto px-2 py-2 bg-slate-900/30 border border-slate-700 rounded-lg text-slate-400 text-xs text-center">
                            💡 Manage both users from one screen! Type arguments for User 1 (left) and User 2 (right), then click "Get Feedback" to see AI analysis.
                        </div>
                    </div>
                </div>
            </>
    );
}
