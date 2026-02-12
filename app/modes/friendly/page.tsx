'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';

export default function FriendlyDebatePage() {
    const [numPersons, setNumPersons] = useState(2);
    const [debateTitle, setDebateTitle] = useState('');
    const [debateTopic, setDebateTopic] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateDebate = async () => {
        if (!debateTitle || !debateTopic || numPersons < 2) {
            alert('Please fill in all fields');
            return;
        }

        setIsCreating(true);
        try {
            const response = await fetch('/api/debates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: debateTitle,
                    topic: debateTopic,
                    isPublic: false,
                    mode: 'friendly',
                    numPersons: numPersons,
                    maxParticipants: numPersons
                })
            });

            if (response.ok) {
                const debate = await response.json();
                // Redirect to the debate room
                window.location.href = `/debate/${debate.id}`;
            }
        } catch (error) {
            console.error('Error creating debate:', error);
            alert('Failed to create debate');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/modes" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Modes
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Friendly Debate</h1>
                    <p className="text-gray-400">Debate with friends or colleagues on topics you care about</p>
                </div>

                {/* Main Form */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Create a New Debate</h2>

                            {/* Debate Title */}
                            <div className="mb-6">
                                <label className="block text-white font-semibold mb-2">Debate Title</label>
                                <input
                                    type="text"
                                    value={debateTitle}
                                    onChange={(e) => setDebateTitle(e.target.value)}
                                    placeholder="e.g., AI Impact on Employment"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
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
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setNumPersons(Math.max(2, numPersons - 1))}
                                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        −
                                    </button>
                                    <div className="text-4xl font-bold text-blue-400 w-20 text-center">
                                        {numPersons}
                                    </div>
                                    <button
                                        onClick={() => setNumPersons(Math.min(8, numPersons + 1))}
                                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-gray-400 text-sm mt-3">2-8 participants (including you)</p>
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
                    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 h-fit">
                        <h3 className="text-xl font-bold text-white mb-4">💡 Tips</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex gap-2">
                                <span>✓</span>
                                <span>Be specific with your debate title</span>
                            </li>
                            <li className="flex gap-2">
                                <span>✓</span>
                                <span>Provide context in the topic description</span>
                            </li>
                            <li className="flex gap-2">
                                <span>✓</span>
                                <span>2-4 people works best for good pacing</span>
                            </li>
                            <li className="flex gap-2">
                                <span>✓</span>
                                <span>AI assistant will provide feedback</span>
                            </li>
                            <li className="flex gap-2">
                                <span>✓</span>
                                <span>Share the room code with friends</span>
                            </li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <h4 className="text-white font-semibold mb-2">🤖 AI Assistant</h4>
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
