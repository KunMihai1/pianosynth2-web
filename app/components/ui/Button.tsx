'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'ghost';
    disabled?: boolean;
    loading?: boolean;
    delay?: number;
    className?: string;
}

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    loading = false,
    delay = 0,
    className = '',
}: ButtonProps) {
    const baseClasses =
        'relative w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 overflow-hidden';

    const variants = {
        primary: `
      bg-gradient-to-r from-purple-500 to-pink-500
      hover:from-purple-400 hover:to-pink-400
      text-white shadow-lg shadow-purple-500/25
      hover:shadow-purple-500/40 hover:scale-[1.02]
      active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
        ghost: `
      bg-transparent border border-white/15
      text-purple-200 hover:text-white
      hover:bg-white/5 hover:border-white/25
      active:scale-[0.98]
    `,
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            className={`${baseClasses} ${variants[variant]} ${className}`}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Please wait...</span>
                </div>
            ) : (
                children
            )}

            {/* Shimmer effect */}
            {variant === 'primary' && !disabled && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut',
                    }}
                />
            )}
        </motion.button>
    );
}
