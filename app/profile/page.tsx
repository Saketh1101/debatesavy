'use client';

import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';
import Button from '@/app/components/Button';

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <>
            <Header>
                <Navigation />
            </Header>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold mb-12">Your Profile</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Profile Card */}
                        <div className="md:col-span-2">
                            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold">D</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Debater</h2>
                                        <p className="text-slate-400">debater@example.com</p>
                                    </div>
                                </div>
                                <div className="border-t border-slate-700 pt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Member Since</span>
                                        <span>January 2026</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Total Debates</span>
                                        <span>0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Average Score</span>
                                        <span>--</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rating Card */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                            <h3 className="text-lg font-semibold mb-4">Your Rating</h3>
                            <p className="text-4xl font-bold text-blue-400 mb-4">1,200</p>
                            <p className="text-sm text-slate-400">
                                Your ELO rating is calculated based on debate performance quality.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
                        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                        <div className="space-y-3">
                            <Button variant="outline" size="lg" className="w-full">
                                Edit Profile
                            </Button>
                            <Button variant="outline" size="lg" className="w-full">
                                Change Password
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full text-red-400 border-red-500/50 hover:bg-red-500/10"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
