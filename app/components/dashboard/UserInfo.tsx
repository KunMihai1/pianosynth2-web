'use client';

import Card from '../ui/Card';
import { LucideCoins } from 'lucide-react';
import { formatCoins } from '@/app/lib/utils';

interface UserInfoProps {
    username: string;
    playtime: string;
    currency: number;
}

export default function UserInfo({ username, playtime, currency }: UserInfoProps) {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-2">{username}'s Info</h2>
            <ul className="space-y-1">
                <li>🎹 Playtime: {playtime}</li>
                <li className="flex items-center gap-1">
                    <LucideCoins size={18} className="text-yellow-400" />
                    <span className="font-bold text-yellow-300">
                        {formatCoins(currency)}
                    </span>
                    <span className="text-slate-400 text-sm">coins</span>
                </li>
            </ul>
        </Card>
    );
}