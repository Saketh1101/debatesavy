'use client';

import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';

export default function LeaderboardPage() {
    const topDebaters = [
        { rank: 1, name: 'Alex Chen', rating: 1850, debates: 42 },
        { rank: 2, name: 'Jordan Lee', rating: 1720, debates: 38 },
        { rank: 3, name: 'Sam Johnson', rating: 1680, debates: 35 },
        { rank: 4, name: 'Taylor Brown', rating: 1640, debates: 32 },
        { rank: 5, name: 'Morgan Davis', rating: 1580, debates: 28 },
    ];

    return (
        <>
            <Header>
                <Navigation />
            </Header>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
                    <p className="text-slate-400 mb-12">Top debaters ranked by ELO rating</p>

                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700 bg-slate-900">
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Debates</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {topDebaters.map((debater) => (
                                        <tr key={debater.rank} className="hover:bg-slate-700/50 transition">
                                            <td className="px-6 py-4 text-sm font-semibold text-blue-400">#{debater.rank}</td>
                                            <td className="px-6 py-4 text-sm">{debater.name}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-400 font-semibold">{debater.rating}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{debater.debates}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
