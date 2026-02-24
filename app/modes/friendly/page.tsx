'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';

export default function FriendlyDebatePage() {
    const router = useRouter();
    const [numPersons, setNumPersons] = useState(2);
    const [debateTitle, setDebateTitle] = useState('');
    const [debateTopic, setDebateTopic] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    const handleCreateDebate = async () => {
        if (!debateTitle || !debateTopic || numPersons < 2) {
            alert('Please fill in all fields');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first');
            return;
        }

        setIsCreating(true);
        try {
            const response = await fetch('/api/debates/friendly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    numPersons,
                    title: debateTitle,
                    topic: debateTopic
                })
            });

            if (response.ok) {
                const debate = await response.json();
                // Store debate locally so the room works without a DB
                localStorage.setItem(`debate_${debate.id}`, JSON.stringify(debate));
                // Redirect to the debate room
                window.location.href = `/debate/${debate.id}`;
            } else {
                const err = await response.json();
                alert(err.error || 'Failed to create debate');
            }
        } catch (error) {
            console.error('Error creating debate:', error);
            alert('Failed to create debate');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/modes" className="text-blue-400 hover:text-blue-300 mb-4 inline-block flex items-center gap-2">
                        <span>←</span> Back to Modes
                    </Link>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-2">Friendly Debate</h1>
                    <p className="text-slate-400 text-lg">Engage in thoughtful discussions with friends and colleagues</p>
                </div>

                {/* Main Form */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-8">Create a Debate</h2>

                            {/* Debate Title */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">Debate Title</label>
                                <input
                                    type="text"
                                    value={debateTitle}
                                    onChange={(e) => setDebateTitle(e.target.value)}
                                    placeholder="e.g., The Future of AI"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                                />
                            </div>

                            {/* Debate Topic */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">Debate Topic</label>
                                <textarea
                                    value={debateTopic}
                                    onChange={(e) => setDebateTopic(e.target.value)}
                                    placeholder="Describe the debate topic in detail..."
                                    rows={4}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                                />
                            </div>

                            {/* Number of Persons */}
                            <div className="mb-8">
                                <label className="block text-white font-semibold mb-4">Number of Participants</label>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setNumPersons(Math.max(2, numPersons - 1))}
                                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-all hover:scale-110 active:scale-95 text-xl"
                                        title="Decrease participants"
                                    >
                                        -
                                    </button>
                                    <div className="text-5xl font-bold text-blue-400 w-20 text-center">
                                        {numPersons}
                                    </div>
                                    <button
                                        onClick={() => setNumPersons(Math.min(8, numPersons + 1))}
                                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-all hover:scale-110 active:scale-95 text-xl"
                                        title="Increase participants"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-gray-400 text-sm mt-4">Between 2 and 8 participants (including you)</p>
                            </div>

                            {/* Create Button */}
                            <button
                                onClick={handleCreateDebate}
                                disabled={isCreating}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                            >
                                {isCreating ? 'Creating Debate...' : 'Create Debate'}
                            </button>
                        </div>
                    </div>

                    {/* Side Panel - Tips */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30 p-6 h-fit">
                        <h3 className="text-xl font-bold text-white mb-4">Tips for Great Debates</h3>
                        <ul className="space-y-3 text-gray-300 text-sm">
                            <li className="flex gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Be specific with your debate title</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Provide context in the topic description</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-green-400">✓</span>
                                <span>2-4 people works best for good pacing</span>
                            </li>
                            <li className="flex gap-2">
                                <span>AI assistant will provide feedback</span>
                            </li>
                            <li className="flex gap-2">
                                <span>Share the room code with friends</span>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-white font-semibold">AI Assistant</h4>
                            </div>
                            <p className="text-gray-400 text-sm">
                                An AI will monitor your debate, provide real-time suggestions, and generate analytics after completion.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
