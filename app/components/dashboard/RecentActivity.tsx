'use client';

import Card from '../ui/Card';

interface Activity {
    type: 'play' | 'achievement' | 'purchase';
    description: string;
    date: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    if (!activities.length) return <p>No recent activity yet.</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-2 text-purple-100">Recent Activity</h2>
            <div className="space-y-2">
                {activities.map((activity, index) => (
                    <Card key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span>
                                {activity.type === 'play' && '🎹'}
                                {activity.type === 'achievement' && '🏆'}
                                {activity.type === 'purchase' && '🛒'}
                            </span>
                            <span>{activity.description}</span>
                        </div>
                        <span className="text-purple-200 text-sm">{activity.date}</span>
                    </Card>
                ))}
            </div>
        </div>
    );
}