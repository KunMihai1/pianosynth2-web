'use client';

import { useEffect, useState } from 'react';
import { fetchUserAllStats, getUserSession } from '../../lib/supabaseApi';
import { formatPlaytime } from '../../lib/utils';
import { LucideCoins } from 'lucide-react';


type UserProfileData = {
    display_name: string;
    email: string;
    total_playtime_seconds: number;
    wallet_balance: number;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const sessionData = await getUserSession();
                if (!sessionData) throw new Error('User not logged in');

                const { userId, token } = sessionData;
                const data = await fetchUserAllStats(userId, token);
                console.log("Profile response:", data);

                setProfile({
                    display_name: data.display_name,
                    email: data.email,
                    total_playtime_seconds: data.total_playtime_seconds,
                    wallet_balance: data.wallet_balance,
                });
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) return <p className="p-6 text-white">Loading profile...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
    if (!profile) return null;

    return (
        <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                            {profile.display_name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold">{profile.display_name}</h1>
                            <p className="text-slate-400">
                                {profile?.email ? profile.email : "No email"}
                            </p>
                            <p className="mt-2 text-indigo-400 font-medium">MIDI Player</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard
                        label="Total Playtime"
                        value={formatPlaytime(profile.total_playtime_seconds)}
                    />
                    <StatCard
                        label="Wallet Balance"
                        value={
                            <div className="flex items-center justify-center gap-1">
                                <LucideCoins size={20} className="text-yellow-400" />
                                <span className="text-yellow-300 font-bold">
                                    {profile.wallet_balance.toLocaleString()}
                                </span>
                                <span className="text-slate-400 text-sm">coins</span>
                            </div>
                        }
                    />
                </div>

            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string | number | React.ReactNode }) {
    return (
        <div className="bg-slate-800 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-slate-400 text-sm">{label}</p>
        </div>
    );
}