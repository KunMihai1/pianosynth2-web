'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0520] via-purple-950 to-indigo-950 overflow-hidden">
            {/* Animated background orbs */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]"
                animate={{
                    x: [0, 80, -40, 0],
                    y: [0, -60, 40, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                style={{ top: '-10%', left: '-10%' }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[100px]"
                animate={{
                    x: [0, -60, 50, 0],
                    y: [0, 50, -30, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                style={{ bottom: '-5%', right: '-5%' }}
            />
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px]"
                animate={{
                    x: [0, 40, -30, 0],
                    y: [0, -40, 20, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                style={{ top: '50%', left: '60%' }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-purple-300/30"
                    style={{
                        top: `${15 + i * 15}%`,
                        left: `${10 + i * 14}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-10 w-full px-4 py-12">
                {children}
            </div>
        </div>
    );
}
