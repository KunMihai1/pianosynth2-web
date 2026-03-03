'use client';

import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ProfileMenu() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/20 rounded-md shadow-lg z-50">
            <ul className="flex flex-col">
                <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-slate-700">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/settings" className="block px-4 py-2 hover:bg-slate-700">
                        Settings
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-slate-700 cursor-pointer" >
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    );
}