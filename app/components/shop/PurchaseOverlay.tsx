'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface PurchaseOverlayProps {
    visible: boolean;
    message?: string;
}

const PurchaseOverlay: FC<PurchaseOverlayProps> = ({
    visible,
    message = 'Processing your transaction…',
}) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-yellow-500/30" />
                            <Loader2
                                size={40}
                                className="absolute inset-0 m-auto text-yellow-400 animate-spin"
                            />
                        </div>
                        <p className="text-white text-lg font-semibold">{message}</p>
                        <p className="text-slate-400 text-sm">Please do not close this page</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PurchaseOverlay;
