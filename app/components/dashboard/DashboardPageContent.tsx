'use client';

import AppHeader from '../layout/AppHeader';
import QuickActions from './QuickActions';
import UserInfo from './UserInfo';
import RecentActivity from './RecentActivity';
import { formatPlaytime } from '@/app/lib/utils';

type UserProfileData = {
    total_playtime_seconds: number;
    wallet_balance: number;
    display_name: string;
};

type DashboardPageContentProps = {
    profile: UserProfileData;
};

export default function DashboardPageContent({ profile }: DashboardPageContentProps) {
    const recentActivities = [
        { type: 'play' as const, description: 'Played "Fur Elise"', date: '2026-03-02' },
        { type: 'achievement' as const, description: 'Unlocked "Piano Pro Level 1"', date: '2026-03-01' },
        { type: 'purchase' as const, description: 'Bought "Grand Piano Skin"', date: '2026-02-28' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <AppHeader username={profile.display_name} />

            <main className="max-w-4xl mx-auto p-6 space-y-6">
                <UserInfo
                    username={profile.display_name}
                    playtime={formatPlaytime(profile.total_playtime_seconds)}
                    currency={profile.wallet_balance}
                />

                <QuickActions />

                <RecentActivity activities={recentActivities} />
            </main>
        </div>
    );
}