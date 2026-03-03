'use client';

import { FC, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Clock, X, CheckCircle } from 'lucide-react';

interface DownloadModalProps {
    signedUrl: string;
    fileName: string;
    expiresInSeconds?: number;
    onClose: () => void;
}

const DownloadModal: FC<DownloadModalProps> = ({
    signedUrl,
    fileName,
    expiresInSeconds = 60,
    onClose,
}) => {
    const [secondsLeft, setSecondsLeft] = useState(expiresInSeconds);
    const [expired, setExpired] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setExpired(true);
            return;
        }
        const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const handleDownload = useCallback(async () => {
        if (expired) return;

        setDownloadError(null); // reset previous errors

        try {
            const res = await fetch(signedUrl);
            if (!res.ok) throw new Error('Failed to fetch file');

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err: any) {
            console.error("Download failed", err);
            setDownloadError("Download failed 😢. Please try again.");
        }
    }, [signedUrl, fileName, expired]);

    const progressPercent = (secondsLeft / expiresInSeconds) * 100;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle size={32} className="text-emerald-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white text-center mb-1">
                        Purchase Confirmed!
                    </h3>
                    <p className="text-slate-400 text-sm text-center mb-5">
                        Your file is ready to download
                    </p>

                    {/* File name */}
                    <div className="bg-slate-900 rounded-lg px-4 py-3 mb-5 text-center">
                        <p className="text-white font-medium text-sm truncate">{fileName}</p>
                    </div>

                    {/* Timer bar */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock size={12} />
                                Link expires in
                            </span>
                            <span
                                className={`text-xs font-mono font-bold ${secondsLeft <= 10 ? 'text-red-400' : 'text-yellow-400'
                                    }`}
                            >
                                {expired ? 'Expired' : `${secondsLeft}s`}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${secondsLeft <= 10 ? 'bg-red-500' : 'bg-emerald-500'
                                    }`}
                                initial={{ width: '100%' }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.5, ease: 'linear' }}
                            />
                        </div>
                    </div>

                    {/* Download button */}
                    {downloadError ? (
                        <div className="text-center py-3 rounded-xl bg-red-600/30 text-red-400 font-semibold text-sm">
                            {downloadError}
                        </div>
                    ) : expired ? (
                        <div className="text-center py-3 rounded-xl bg-slate-700 text-slate-400 font-semibold text-sm">
                            Link expired — you can still re-download from the shop
                        </div>
                    ) : (
                        <button
                            onClick={handleDownload}
                            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
                        >
                            <Download size={18} />
                            Download Now
                        </button>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DownloadModal;
