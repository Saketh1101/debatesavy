'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';

export default function OnlineDebatesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const categories = [
        { id: 'tech', label: 'Technology', icon: '💻', color: 'from-blue-500 to-blue-600' },
        { id: 'politics', label: 'Politics', icon: '🏛️', color: 'from-red-500 to-red-600' },
        { id: 'science', label: 'Science', icon: '🔬', color: 'from-green-500 to-green-600' },
        { id: 'sports', label: 'Sports', icon: '⚽', color: 'from-yellow-500 to-yellow-600' },
        { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: 'from-pink-500 to-pink-600' },
        { id: 'philosophy', label: 'Philosophy', icon: '💭', color: 'from-purple-500 to-purple-600' },
        { id: 'economics', label: 'Economics', icon: '💰', color: 'from-amber-500 to-amber-600' },
        { id: 'environment', label: 'Environment', icon: '🌍', color: 'from-teal-500 to-teal-600' },
    ];

    const difficulties = [
        { id: 'beginner', label: 'Beginner', description: 'General knowledge required' },
        { id: 'intermediate', label: 'Intermediate', description: 'Some expertise needed' },
        { id: 'expert', label: 'Expert', description: 'Deep knowledge required' },
    ];

    const activeDebates = [
        {
            id: 'active_1',
            title: 'Is AI a threat to humanity?',
            category: 'tech',
            difficulty: 'intermediate',
            participants: 2,
            duration: '12 min',
            waitingFor: 'Players'
        },
        {
            id: 'active_2',
            title: 'Should renewable energy be the primary source?',
            category: 'environment',
            difficulty: 'beginner',
            participants: 1,
            duration: '5 min',
            waitingFor: 'Opponent'
        },
        {
            id: 'active_3',
            title: 'Remote work vs Office work',
            category: 'economics',
            difficulty: 'beginner',
            participants: 2,
            duration: '18 min',
            waitingFor: 'Players'
        },
    ];

    const handleFindOpponent = async () => {
        if (!selectedCategory || !selectedDifficulty) {
            alert('Please select category and difficulty level');
            return;
        }

        setIsSearching(true);
        // Simulate finding an opponent
        setTimeout(() => {
            // In real app, would call API to find match
            window.location.href = '/debate/online_match_1';
            setIsSearching(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/modes" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Modes
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Online Debates</h1>
                    <p className="text-gray-400">Join live debates with players worldwide. Get matched with opponents based on your interests and skill level.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Panel - Matchmaking */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Category Selection */}
                        <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Select a Category</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === cat.id
                                            ? 'border-blue-500 bg-slate-800'
                                            : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{cat.icon}</div>
                                        <div className="text-white font-semibold">{cat.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Selection */}
                        {selectedCategory && (
                            <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Select Difficulty Level</h2>
                                <div className="space-y-3">
                                    {difficulties.map((diff) => (
                                        <button
                                            key={diff.id}
                                            onClick={() => setSelectedDifficulty(diff.id)}
                                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedDifficulty === diff.id
                                                ? 'border-blue-500 bg-slate-800'
                                                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="font-semibold text-white">{diff.label}</div>
                                            <div className="text-sm text-gray-400">{diff.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Find Opponent Button */}
                        {selectedCategory && selectedDifficulty && (
                            <button
                                onClick={handleFindOpponent}
                                disabled={isSearching}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 text-lg"
                            >
                                {isSearching ? '🔍 Searching for Opponent...' : '🎮 Find Opponent'}
                            </button>
                        )}
                    </div>

                    {/* Right Panel - Active Debates */}
                    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 h-fit">
                        <h3 className="text-xl font-bold text-white mb-4">🔴 Active Debates</h3>
                        <div className="space-y-3">
                            {activeDebates.map((debate) => (
                                <Link key={debate.id} href={`/debate/${debate.id}`}>
                                    <div className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg cursor-pointer transition-all border border-slate-700 hover:border-blue-500">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-white font-semibold text-sm flex-1">{debate.title}</h4>
                                            <span className="text-xs bg-red-900 text-red-200 px-2 py-1 rounded">LIVE</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                                            <div>👥 {debate.participants} players</div>
                                            <div>⏱️ {debate.duration}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Waiting for: {debate.waitingFor}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <h4 className="text-white font-semibold mb-2">📊 Global Stats</h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div>Debates Today: <span className="text-blue-400 font-semibold">2,847</span></div>
                                <div>Active Players: <span className="text-green-400 font-semibold">1,234</span></div>
                                <div>Avg Rating: <span className="text-yellow-400 font-semibold">1,564</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
