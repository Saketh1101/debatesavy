'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import { UsersIcon, StarIcon, GlobeIcon, RobotIcon, BarChartIcon, MessageCircleIcon } from '@/app/components/Icons';

export default function ModesPage() {
    const modes = [
        {
            id: 'friendly',
            title: 'Friendly Debate',
            description: 'Debate with friends or colleagues. Choose the number of participants and debate topic.',
            icon: UsersIcon,
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
            icon: StarIcon,
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
            icon: GlobeIcon,
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
                    {modes.map((mode) => {
                        const IconComponent = mode.icon;
                        return (
                            <Link key={mode.id} href={mode.href}>
                                <div className="h-full bg-slate-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-800 hover:border-blue-500">
                                    {/* Header with gradient */}
                                    <div className={`bg-gradient-to-r ${mode.color} p-8 text-center`}>
                                        <div className="flex justify-center mb-4 text-slate-100 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent size={48} className="hover:text-white transition-colors duration-300" strokeWidth={1.2} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{mode.title}</h2>
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
                                            Get Started →
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">All modes include:</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                            <div className="text-blue-400 mt-1 flex-shrink-0">
                                <RobotIcon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-blue-400 font-semibold mb-2">AI Assistant</h4>
                                <p className="text-gray-400 text-sm">Get real-time feedback and suggestions on your arguments</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                            <div className="text-blue-400 mt-1 flex-shrink-0">
                                <BarChartIcon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-blue-400 font-semibold mb-2">Analytics</h4>
                                <p className="text-gray-400 text-sm">Track your performance and improve your debate skills</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                            <div className="text-blue-400 mt-1 flex-shrink-0">
                                <MessageCircleIcon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-blue-400 font-semibold mb-2">Text-Based</h4>
                                <p className="text-gray-400 text-sm">Pure text debates - focus on your arguments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
