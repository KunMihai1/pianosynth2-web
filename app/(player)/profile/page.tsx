'use client';

import { useEffect, useState } from 'react';
import { fetchUserAllStats, getUserSession } from '../../lib/supabaseApi';
import { formatPlaytime } from '../../lib/utils';
import { LucideCoins } from 'lucide-react';
import { requireAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import { formatCoins } from '@/app/lib/utils';

type UserProfileData = {
    display_name: string;
    email: string;
    total_playtime_seconds: number;
    wallet_balance: number;
};

type MostUsedDeviceData = {
    device_name: string;
    nr_keys: number;
    device_playtime_seconds: number;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mostUsedDevice, setMostUsedDevice] = useState<MostUsedDeviceData | null>(null);


    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            try {
                const sessionData = await requireAuth();
                if (!sessionData) {
                    router.replace('/login');
                    return;
                }

                const { userId, token } = sessionData;
                const data = await fetchUserAllStats(userId, token);
                console.log("Profile response:", data);

                if (data.profile) {
                    setProfile({
                        display_name: data.profile.display_name,
                        email: data.profile.email,
                        total_playtime_seconds: data.profile.total_playtime_seconds,
                        wallet_balance: data.profile.wallet_balance,
                    });
                }

                if (data.mostUsedDevice) {
                    setMostUsedDevice({
                        device_name: data.mostUsedDevice.device_name,
                        nr_keys: data.mostUsedDevice.nr_keys,
                        device_playtime_seconds: data.mostUsedDevice.device_playtime ?? data.mostUsedDevice.device_playtime_seconds ?? 0,
                    });
                }

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
                                    {formatCoins(profile.wallet_balance)}
                                </span>
                                <span className="text-slate-400 text-sm">coins</span>
                            </div>
                        }
                    />

                    <StatCard
                        label="Most Used Device"
                        value={
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-lg">
                                    {mostUsedDevice?.device_name ?? "PC keyboard"}
                                </span>
                                <span className="text-slate-400 text-sm">
                                    {mostUsedDevice?.nr_keys ?? 18} keys &middot; {formatPlaytime(mostUsedDevice?.device_playtime_seconds ?? profile.total_playtime_seconds)}
                                </span>
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
            {/* Value */}
            <div className="text-2xl font-bold text-white mb-1">{value}</div>

            {/* Label */}
            <p className="text-indigo-400 font-bold text-sm">{label}</p>
        </div>
    );
}