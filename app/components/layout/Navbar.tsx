'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Help', href: '#help' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const router = useRouter();
    const [session, setSession] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(!!session);
        };
        checkSession();
    }, []);

    const handleSignIn = (e: React.MouseEvent) => {
        e.preventDefault();
        if (session) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-6xl px-6 py-4">
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-lg shadow-purple-900/10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                        >
                            <span className="text-white font-bold text-sm">P2</span>
                        </motion.div>
                        <span className="text-white font-bold text-lg tracking-tight group-hover:text-purple-200 transition-colors">
                            PianoSynth2
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="relative px-4 py-2 text-sm text-purple-200/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <button
                                onClick={handleSignIn}
                                className="px-4 py-2 text-sm text-purple-200 hover:text-white transition-colors"
                            >
                                Sign In
                            </button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Link
                                href="/signup"
                                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden md:hidden"
                        >
                            <div className="p-4 space-y-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-3 text-sm text-purple-200/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <hr className="border-white/10 my-2" />
                                <button
                                    onClick={handleSignIn}
                                    className="block px-4 py-3 text-sm text-purple-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    Sign In
                                </button>
                                <Link
                                    href="/signup"
                                    className="block px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-center"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
