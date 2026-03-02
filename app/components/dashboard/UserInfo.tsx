'use client';

import Card from '../ui/Card';

interface UserInfoProps {
    username: string;
    playtime: number;
    currency: number;
}

export default function UserInfo({ username, playtime, currency }: UserInfoProps) {
    return (
        <Card>
            <h2 className="text-xl font-bold mb-2">{username}'s Info</h2>
            <ul className="space-y-1">
                <li>🎹 Playtime: {playtime} hrs</li>
                <li>💰 Currency: {currency}</li>
            </ul>
        </Card>
    );
}