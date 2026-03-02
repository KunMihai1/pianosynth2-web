'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function StatsSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'playtime';

    const handleChange = (newType: string) => {
        router.push(`/dashboard?type=${newType}`);
    };

    return (
        <div className="flex gap-4 mb-4">
            {['playtime', 'currency'].map((t) => (
                <button
                    key={t}
                    onClick={() => handleChange(t)}
                    className={`px-4 py-2 rounded-md font-medium ${type === t ? 'bg-purple-600 text-white' : 'bg-slate-700 text-purple-200'
                        }`}
                >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
            ))}
        </div>
    );
}