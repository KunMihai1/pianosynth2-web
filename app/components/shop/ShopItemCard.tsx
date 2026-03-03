'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideCoins, Download, Loader2, Music } from 'lucide-react';
import { ShopItem } from './types/shop';

interface ShopItemCardProps {
    item: ShopItem;
    balance: number;
    purchasing?: boolean;
    onBuy: (item: ShopItem) => void;
    onDownload: (item: ShopItem) => Promise<void>;
}

const ShopItemCard: FC<ShopItemCardProps> = ({ item, balance, purchasing, onBuy, onDownload }) => {
    const canBuy = !item.owned && balance >= item.price && !purchasing;
    const isDownloadable = item.item_type === 'downloadable' && item.owned;
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await onDownload(item);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-slate-800 rounded-xl p-4 flex flex-col items-center text-center gap-2"
        >
            {item.owned && (
                <span className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    Owned
                </span>
            )}
            <div className="w-24 h-24 bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
                ) : item.item_type === 'downloadable' ? (
                    <Music size={36} className="text-yellow-400" />
                ) : (
                    <div className="text-slate-400">No Image</div>
                )}
            </div>
            <h3 className="text-white font-semibold">{item.name}</h3>
            <p className="text-slate-300 text-sm">{item.description}</p>

            {/* Show Download button for owned downloadable items, Buy button otherwise */}
            {isDownloadable ? (
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="mt-2 w-full py-2 rounded-md font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2"
                >
                    {downloading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Download size={16} />
                    )}
                    {downloading ? 'Downloading...' : 'Download'}
                </button>
            ) : (
                <button
                    disabled={!canBuy}
                    onClick={() => onBuy(item)}
                    className={`mt-2 w-full py-2 rounded-md font-bold ${canBuy
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : item.owned
                            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                            : "bg-slate-600 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    <LucideCoins size={16} className="inline mr-1" />
                    {item.owned ? 'Purchased' : item.price}
                </button>
            )}
        </motion.div>
    );
};

export default ShopItemCard;