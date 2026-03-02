'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Privacy() {
    return (
        <div className="min-h-screen p-12 bg-gradient-to-br from-[#0f0520] via-purple-950 to-indigo-950 text-white flex flex-col items-center">

            
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
                    Privacy Policy
                </h2>

                <p className="text-purple-200/70 leading-relaxed">
                    At <span className="text-white font-semibold">PianoSynth2</span>, we value your privacy. We do not sell your personal information, and any data collected is used solely to improve your experience with the app.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Data We Collect</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    When you use PianoSynth2, we may collect certain information about the musical keyboards you connect, including:
                </p>
                <ul className="list-disc list-inside text-purple-200/70 leading-relaxed space-y-1">
                    <li>The name of your keyboard (e.g., Yamaha P-125, Novation Launchkey)</li>
                    <li>The PID (Product ID) and VID (Vendor ID) of the device</li>
                </ul>
                <p className="text-purple-200/70 leading-relaxed">
                    This data is used only to ensure **proper device recognition and compatibility**, and to improve MIDI integration features. We do **not share this information with third parties**.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Usage Data</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    We may also collect usage data, such as which features you use and session activity, to help refine features and provide a better piano experience. This information is stored securely and only used internally.
                </p>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">Consent</h3>
                <p className="text-purple-200/70 leading-relaxed">
                    By using PianoSynth2, you consent to the collection and use of the above information. We are committed to keeping your data safe and transparent.
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