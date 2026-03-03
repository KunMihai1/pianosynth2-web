'use client';

export function formatPlaytime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

export const formatCoins = (amount: number) =>
    new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(amount);