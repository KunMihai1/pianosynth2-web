'use client';

import Link from 'next/link';

export default function ProfileMenu() {
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
                    <Link href="/help" className="block px-4 py-2 hover:bg-slate-700">
                        Help
                    </Link>
                </li>
            </ul>
        </div>
    );
}