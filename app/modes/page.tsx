'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';

export default function ModesPage() {
    const modes = [
        {
            id: 'friendly',
            title: 'Friendly Debate',
            description: 'Debate with friends or colleagues. Choose the number of participants and debate topic.',
            badge: 'Social',
            color: 'from-blue-500 to-blue-600',
            href: '/modes/friendly',
            features: [
                'Select number of participants',
                'Custom debate topics',
                'Real-time interaction',
                'Performance analytics'
            ]
        },
        {
            id: 'famous',
            title: 'Famous Personalities',
            description: 'Debate against AI representations of famous personalities. Experience their unique argument styles.',
            badge: 'Premium',
            color: 'from-purple-500 to-purple-600',
            href: '/modes/famous',
            features: [
                'Debate legendary figures',
                'Learn argument techniques',
                'Historical context',
                'Personality-specific insights'
            ]
        },
        {
            id: 'online',
            title: 'Online Debates',
            description: 'Join live debates with random participants. Find opponents based on your interests and skill level.',
            badge: 'Competitive',
            color: 'from-green-500 to-green-600',
            href: '/modes/online',
            features: [
                'Random matchmaking',
                'Category selection',
                'Difficulty levels',
                'Global leaderboard'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-16">
                {/* Title Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Choose Your Debate Mode
                    </h1>
                    <p className="text-xl text-gray-400">
                        Select how you want to engage in debates
                    </p>
                </div>

                {/* Mode Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {modes.map((mode) => (
                        <Link key={mode.id} href={mode.href}>
                            <div className="h-full bg-slate-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-800 hover:border-blue-500">
                                {/* Header with gradient */}
                                <div className={`bg-gradient-to-r ${mode.color} p-8`}>
                                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-white mb-4">
                                        {mode.badge}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white leading-tight">{mode.title}</h2>
                                </div>
                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-300 mb-6">
                                        {mode.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-6">
                                        {mode.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                                <span className="text-sm text-gray-400">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button className={`w-full bg-gradient-to-r ${mode.color} text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300`}>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-8">Every Mode Includes</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
                            <h4 className="text-lg font-bold text-blue-300 mb-3">🤖 Intelligent AI Assistant</h4>
                            <p className="text-gray-300">Real-time feedback and smart suggestions to strengthen your arguments and counter points effectively.</p>
                        </div>
                        <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300">
                            <h4 className="text-lg font-bold text-emerald-300 mb-3">📊 Deep Analytics</h4>
                            <p className="text-gray-300">Track your performance metrics, win rates, argument quality scores, and skill progression over time.</p>
                        </div>
                        <div className="p-6 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-600/10 border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300">
                            <h4 className="text-lg font-bold text-violet-300 mb-3">💬 Pure Text Focus</h4>
                            <p className="text-gray-300">No distractions—just intelligent debate. Emphasis on your arguments, reasoning, and debate excellence.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
