'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';

export default function FamousPersonalitiesPage() {
    const router = useRouter();
    const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
    const [debateTopic, setDebateTopic] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);

    // Mock famous personalities
    const personalities = [
        {
            id: 'stephen_hawking',
            name: 'Stephen Hawking',
            title: 'Theoretical Physicist',
            description: 'Pioneer of black hole physics and cosmology',
            argumentStyle: 'Scientific rigor, explains complex ideas simply',
            keyBeliefs: 'Universe operates by physical laws',
            image: '🌌'
        },
        {
            id: 'marquess',
            name: 'Marquess',
            title: 'Nobleman & Philosopher',
            description: 'Influential thinker and political theorist',
            argumentStyle: 'Eloquent, philosophical, references classical knowledge',
            keyBeliefs: 'Society requires structure and intellectual discourse',
            image: '👑'
        },
        {
            id: 'shakespeare',
            name: 'William Shakespeare',
            title: 'Playwright & Poet',
            description: 'Master of human nature and dramatic expression',
            argumentStyle: 'Poetic, uses literary examples, explores human psychology',
            keyBeliefs: 'All the world is a stage; human nature is complex and multifaceted',
            image: '🎭'
        },
        {
            id: 'abraham_lincoln',
            name: 'Abraham Lincoln',
            title: 'Political Leader & Statesman',
            description: 'Preserver of the American Union and advocate for freedom',
            argumentStyle: 'Humble yet persuasive, uses historical examples and moral reasoning',
            keyBeliefs: 'Liberty and equality are fundamental rights of all people',
            image: '🎩'
        }
    ];

    const handleStartDebate = async () => {
        if (!selectedPersonality || !debateTopic) {
            alert('Please select a personality and enter a topic');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first');
            return;
        }

        setIsCreating(true);
        try {
            const response = await fetch('/api/debates/famous', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    personalityId: selectedPersonality,
                    topic: debateTopic
                })
            });

            if (response.ok) {
                const debate = await response.json();
                window.location.href = `/debate/${debate.id}`;
            }
        } catch (error) {
            console.error('Error creating debate:', error);
            alert('Failed to create debate');
        } finally {
            setIsCreating(false);
        }
    };

    const selectedPersonalityData = personalities.find(p => p.id === selectedPersonality);

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/modes" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Modes
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Famous Personalities</h1>
                    <p className="text-gray-400">Debate against AI representations of legendary thinkers and scientists</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Personalities List */}
                    <div className="md:col-span-2 space-y-4">
                        {personalities.map((personality) => (
                            <div
                                key={personality.id}
                                onClick={() => setSelectedPersonality(personality.id)}
                                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedPersonality === personality.id
                                    ? 'border-blue-500 bg-slate-800'
                                    : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className="text-4xl">{personality.image}</div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">{personality.name}</h3>
                                        <p className="text-blue-400 text-sm">{personality.title}</p>
                                        <p className="text-gray-400 text-sm mt-2">{personality.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Personality Details */}
                    {selectedPersonalityData && (
                        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg border border-blue-500 p-6 h-fit sticky top-4">
                            <div className="text-6xl text-center mb-4">{selectedPersonalityData.image}</div>
                            <h3 className="text-2xl font-bold text-white text-center mb-2">{selectedPersonalityData.name}</h3>
                            <p className="text-blue-400 text-center text-sm mb-4">{selectedPersonalityData.title}</p>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-white font-semibold text-sm mb-1">Argument Style</h4>
                                    <p className="text-gray-400 text-sm">{selectedPersonalityData.argumentStyle}</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm mb-1">Key Beliefs</h4>
                                    <p className="text-gray-400 text-sm">{selectedPersonalityData.keyBeliefs}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Debate Topic Section */}
                {selectedPersonalityData && (
                    <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Choose Your Debate Topic</h2>

                        <div className="mb-6">
                            <label className="block text-white font-semibold mb-2">What would you like to debate?</label>
                            <textarea
                                value={debateTopic}
                                onChange={(e) => setDebateTopic(e.target.value)}
                                placeholder={`Ask a question or propose a topic for ${selectedPersonalityData.name}...`}
                                rows={4}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                            />
                        </div>

                        <button
                            onClick={handleStartDebate}
                            disabled={isCreating || !debateTopic}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all disabled:opacity-50"
                        >
                            {isCreating ? 'Starting Debate...' : `Start Debate with ${selectedPersonalityData.name}`}
                        </button>
                    </div>
                )}

                {!selectedPersonalityData && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">Select a personality to get started</p>
                    </div>
                )}
            </main>
        </div>
    );
}
