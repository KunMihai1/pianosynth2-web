'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    delay?: number;
}

export default function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    delay = 0,
}: InputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5, ease: 'easeOut' }}
            className="relative w-full"
        >
            <label className="block text-sm font-medium text-purple-200 mb-1.5 tracking-wide">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`
            w-full px-4 py-3 rounded-xl
            bg-white/5 backdrop-blur-sm
            border transition-all duration-300
            text-white placeholder-purple-300/40
            outline-none
            ${icon ? 'pl-10' : ''}
            ${focused
                            ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)] bg-white/10'
                            : 'border-white/10 hover:border-white/20'
                        }
          `}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{
                        width: focused ? '90%' : '0%',
                        x: '-50%',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
}
