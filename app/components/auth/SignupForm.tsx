'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabaseClient';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { toast, Toaster } from 'react-hot-toast';

export default function SignupForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: name } },
            });

            if (error) throw error;

            toast.success('Signup successful! Redirecting...');
            router.push('/dashboard');

        } catch (err: any) {
            console.error(err);


            switch (err.message) {
                case 'User already registered':
                case 'User already exists':
                    toast.error('This email is already registered. Try logging in.');
                    break;
                case 'Password should be at least 6 characters':
                    toast.error('Password must be at least 6 characters.');
                    break;
                default:
                    toast.error(err.message || 'Signup failed. Please try again.');
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
            <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-900/30">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-purple-300/70 text-sm mt-2">
                        Join PianoSynth2 and start creating
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        delay={0.3}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        delay={0.35}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        delay={0.4}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        delay={0.45}
                    />

                    <div className="pt-2">
                        <Button type="submit" loading={loading} delay={0.5}>
                            Create Account
                        </Button>
                    </div>
                </form>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 my-6"
                >
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-purple-300/50">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </motion.div>

                {/* Sign in link */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-sm text-purple-300/70"
                >
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                        Sign in
                    </Link>
                </motion.p>
            </div>
        </motion.div>
    );
}