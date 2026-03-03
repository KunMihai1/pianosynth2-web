'use client';

import { useEffect, useState } from 'react';
import AppHeader from '../../components/layout/AppHeader';
import QuickActions from '../../components/dashboard/QuickActions';
import UserInfo from '../../components/dashboard/UserInfo';
import RecentActivity from '../../components/dashboard/RecentActivity';
import { formatPlaytime } from '../../lib/utils';
import { fetchUserNameBalancePlaytime, getUserSession } from '../../lib/supabaseApi';
import { requireAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

type UserProfileData = {
    total_playtime_seconds: number;
    wallet_balance: number;
    display_name: string;
};



export default function DashboardPage() {
    const [user, setUser] = useState<{ username: string; playtime: number; currency: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recentActivities = [
        { type: 'play' as const, description: 'Played "Fur Elise"', date: '2026-03-02' },
        { type: 'achievement' as const, description: 'Unlocked "Piano Pro Level 1"', date: '2026-03-01' },
        { type: 'purchase' as const, description: 'Bought "Grand Piano Skin"', date: '2026-02-28' },
    ];

    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);


                const sessionData = await requireAuth();
                if (!sessionData) {
                    router.replace('/login');
                    return;
                }

                const { userId, token } = sessionData;


                const profile: UserProfileData = await fetchUserNameBalancePlaytime(userId, token);
                console.log("Profile response:", profile);


                setUser({
                    username: profile.display_name ?? sessionData.userId,
                    playtime: profile.total_playtime_seconds,
                    currency: profile.wallet_balance,
                });

            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) return <p className="p-6">Loading profile...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <AppHeader username={user?.username} />

            <main className="max-w-4xl mx-auto p-6 space-y-6">
                {user && (
                    <UserInfo
                        username={user.username}
                        playtime={formatPlaytime(user.playtime)}
                        currency={user.currency}
                    />
                )}

                <QuickActions />

                <RecentActivity activities={recentActivities} />
            </main>
        </div>
    );
}