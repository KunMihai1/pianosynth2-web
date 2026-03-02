'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

export default function AppHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-6 bg-slate-900 shadow-md">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
                PianoSynth2
            </Link>

            <nav className="flex items-center gap-6 text-purple-200">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/top-players">Top Players</Link>
                <Link href="/shop">Shop</Link>
            </nav>

            <div className="relative">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold"
                >
                    U
                </button>
                {menuOpen && <ProfileMenu />}
            </div>
        </header>
    );
}