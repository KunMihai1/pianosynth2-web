'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import { toast, Toaster } from 'react-hot-toast';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success('Login successful!');
            router.push('/dashboard');

        } catch (err: any) {

            switch (err.message) {
                case 'Invalid login credentials':
                    toast.error('Incorrect email or password.');
                    break;
                case 'User not found':
                    toast.error('No account found with this email.');
                    break;
                case 'Email not confirmed':
                    toast.error('Please verify your email before logging in.');
                    break;
                default:
                    toast.error(err.message || 'Login failed. Please try again.');
            }


            if (!['Invalid login credentials', 'User not found', 'Email not confirmed'].includes(err.message)) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md"
        >
            {/* Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-900/30">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-purple-300/70 text-sm mt-2">
                        Sign in to continue to PianoSynth2
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        delay={0.3}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        delay={0.4}
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-end"
                    >
                        <Link
                            href="/forgot-password"
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </motion.div>

                    <Button type="submit" loading={loading} delay={0.6}>
                        Sign In
                    </Button>
                </form>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-3 my-6"
                >
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-purple-300/50">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </motion.div>

                {/* Sign up link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-purple-300/70"
                >
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                        Create one
                    </Link>
                </motion.p>
            </div>
        </motion.div>
    );
}