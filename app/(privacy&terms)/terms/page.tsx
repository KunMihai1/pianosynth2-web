'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <div className="min-h-screen p-12 bg-gradient-to-br from-[#0f0520] via-purple-950 to-indigo-950 text-white flex flex-col items-center">

            {/* Logo / App Name as clickable */}
            <Link href="/">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="mb-12 flex items-center gap-3 cursor-pointer"
                >
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P2</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold">PianoSynth2</h1>
                </motion.div>
            </Link>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md rounded-3xl p-8 sm:p-12 space-y-6"
            >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Terms of Service
                </h2>

                <p className="text-purple-200/70 leading-relaxed">
                    By using <span className="text-white font-semibold">PianoSynth2</span>, you agree to use the app responsibly. The software is provided "as-is" without guarantees.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Device & MIDI Use</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    PianoSynth2 may collect information about the musical keyboards you connect (such as keyboard name, PID, and VID) for proper device recognition. You are responsible for connecting only authorized devices.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Liability</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    PianoSynth2 is not liable for any damage or data loss resulting from the use of the app. Always back up your work and use the app at your own risk.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Changes to Terms</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    We may update these Terms from time to time. Continued use of PianoSynth2 constitutes acceptance of the updated Terms.
                </p>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-12"
            >
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
                    >
                        ← Back to PianoSynth2
                    </motion.button>
                </Link>
            </motion.div>

        </div>
    );
}