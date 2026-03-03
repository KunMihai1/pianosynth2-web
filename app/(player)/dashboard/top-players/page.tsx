'use client';

import Card from '../../../components/ui/Card';
import { useState, useEffect } from 'react';
import { fetchAllNameBalancePlaytime, getUserSession } from '../../../lib/supabaseApi';
import { formatPlaytime } from '../../../lib/utils';
import { LucideCoins } from 'lucide-react';
import { requireAuth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import { formatCoins } from '@/app/lib/utils';

type PlayerProfile = {
    user_id: string;
    display_name: string;
    total_playtime_seconds: number;
    wallet_balance: number;
};

export default function TopPlayersPage() {
    const [sortBy, setSortBy] = useState<'playtime' | 'currency'>('playtime');
    const [players, setPlayers] = useState<{ name: string; playtime: number; currency: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        async function loadPlayers() {
            try {
                setLoading(true);
                const session = await requireAuth();
                if (!session) {
                    router.replace('/login');
                    return;
                }

                const profiles: PlayerProfile[] = await fetchAllNameBalancePlaytime(session.token);

                setPlayers(
                    profiles.map((p) => ({
                        name: p.display_name ?? 'Unknown',
                        playtime: p.total_playtime_seconds,
                        currency: p.wallet_balance,
                    }))
                );
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to load players');
            } finally {
                setLoading(false);
            }
        }

        loadPlayers();
    }, []);

    // Sort players when sortBy changes
    const sortedPlayers = [...players].sort((a, b) => b[sortBy] - a[sortBy]);

    if (loading) return <p className="p-6 text-white">Loading players...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
    if (sortedPlayers.length === 0) return <p className="p-6 text-white">No players found.</p>;

    const maxValue = sortedPlayers[0][sortBy];
    const totalPlaytime = players.reduce((sum, p) => sum + p.playtime, 0);
    const totalCurrency = players.reduce((sum, p) => sum + p.currency, 0);

    const renderLucidCoins = (amount: number) => (
        <span className="flex items-center gap-1 whitespace-nowrap">
            <LucideCoins size={16} className="text-yellow-400" />
            <span className="font-bold text-yellow-300">
                {formatCoins(amount)}
            </span>
            <span className="text-slate-400 text-sm">coins</span>
        </span>
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white flex">

            {/* Left sidebar */}
            <aside className="w-64 p-6 bg-slate-800 flex flex-col gap-6">
                <h2 className="text-xl font-bold">Stats Summary</h2>
                <Card className="p-4 flex justify-between items-center min-w-0">
                    <span>Total Players: </span>
                    <span>{players.length}</span>
                </Card>
                <Card className="p-4 flex justify-between items-center min-w-0">
                    <span>Total Playtime: </span>
                    <span>{formatPlaytime(totalPlaytime)}</span>
                </Card>
                <Card className="p-4 flex justify-between items-center">
                    <span>Total Currency:</span>
                    {renderLucidCoins(totalCurrency)}
                </Card>
            </aside>

            {/* Main list */}
            <main className="flex-1 max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4">Top Players</h1>

                {/* Sort selector */}
                <div className="flex gap-4 mb-6">
                    {['playtime', 'currency'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSortBy(type as 'playtime' | 'currency')}
                            className={`px-4 py-2 rounded-md font-medium transition-all
                                ${sortBy === type
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-slate-700 text-purple-200 hover:bg-purple-500 hover:text-white'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Player list */}
                <div className="space-y-4">
                    {sortedPlayers.map((player, i) => (
                        <Card
                            key={player.name + i}
                            className="flex justify-between items-center p-4 transition-transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                {/* Rank badge */}
                                <span className={`px-2 py-1 rounded-full font-bold text-sm
                                    ${i === 0 ? 'bg-yellow-400 text-black' :
                                        i === 1 ? 'bg-gray-300 text-black' :
                                            i === 2 ? 'bg-orange-300 text-black' : 'bg-slate-700 text-purple-200'}`}
                                >
                                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                                </span>

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                    {player.name.charAt(0)}
                                </div>

                                {/* Name */}
                                <span className="font-semibold">{player.name}</span>
                            </div>

                            <div className="flex flex-col items-end w-40">
                                {/* Mini stats */}
                                <div className="flex gap-2 text-sm text-purple-200">
                                    <span>⏱ {formatPlaytime(player.playtime)}</span>
                                    {renderLucidCoins(player.currency)}
                                </div>

                                {/* Progress bar with labels */}
                                <div className="w-full bg-slate-700 h-4 rounded-full mt-2 relative">
                                    {/* Filled part of the bar */}
                                    <div
                                        className={`h-4 rounded-full transition-all ${sortBy === 'playtime' ? 'bg-green-700' : 'bg-rose-700'}`}
                                        style={{ width: `${maxValue > 0 ? (player[sortBy] / maxValue) * 100 : 0}%` }}
                                    ></div>

                                    {/* Label in the middle */}
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-amber-400 flex items-center gap-1">
                                        {sortBy === 'playtime'
                                            ? formatPlaytime(player.playtime)
                                            : renderLucidCoins(player.currency)
                                        }
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Right panel for top 3 highlights */}
            <aside className="w-64 p-6 bg-slate-800 flex flex-col gap-6">
                <h2 className="text-xl font-bold">Top 3 Players</h2>
                {sortedPlayers.slice(0, 3).map((player, i) => (
                    <Card key={player.name + i} className="p-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-bold mb-2">
                            {player.name.charAt(0)}
                        </div>
                        <span className="font-semibold">{player.name}</span>
                        <span className="text-purple-200 text-sm">
                            {sortBy === 'playtime' ? `⏱ ${formatPlaytime(player.playtime)}` : renderLucidCoins(player.currency)}
                        </span>
                        <span className="text-2xl mt-1">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                    </Card>
                ))}
            </aside>
        </div>
    );
}