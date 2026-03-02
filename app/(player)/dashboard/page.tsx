'use client';

import { useEffect, useState } from 'react';
import AppHeader from '../../components/layout/AppHeader';
import QuickActions from '../../components/dashboard/QuickActions';
import UserInfo from '../../components/dashboard/UserInfo';
import RecentActivity from '../../components/dashboard/RecentActivity';

import { supabase } from '../../lib/supabaseClient';
import { fetchUserProfile } from '../../lib/supabaseApi';

type UserProfileData = {
    total_playtime_seconds: number;
    wallet_balance: number;
};

export default function DashboardPage() {
    const [user, setUser] = useState<{ username: string; playtime: number; currency: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const recentActivities = [
        { type: 'play', description: 'Played "Fur Elise"', date: '2026-03-02' },
        { type: 'achievement', description: 'Unlocked "Piano Pro Level 1"', date: '2026-03-01' },
        { type: 'purchase', description: 'Bought "Grand Piano Skin"', date: '2026-02-28' },
    ];

    // 1️⃣ Get session + fetch profile
    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);

                // Get user ID + JWT
                const sessionData = await getUserSession();
                if (!sessionData) throw new Error('User not logged in');

                const { userId, token } = sessionData;

                // Fetch profile from your Supabase Edge Function
                const profile: UserProfileData = await fetchUserProfile(userId, token);

                // Update state
                setUser({
                    username: sessionData.userId, // Or email if you want
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
            <AppHeader />

            <main className="max-w-4xl mx-auto p-6 space-y-6">
                {user && (
                    <UserInfo
                        username={user.username}
                        playtime={user.playtime}
                        currency={user.currency}
                    />
                )}

                <QuickActions />

                <RecentActivity activities={recentActivities} />
            </main>
        </div>
    );
}

// Make sure getUserSession() is imported or declared in this file
async function getUserSession() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session || error) {
        console.log("Not logged in or error:", error);
        return;
    }

    const userId = session.user.id;
    const token = session.access_token;

    console.log("User ID:", userId);
    console.log("JWT:", token);

    return { userId, token };
}