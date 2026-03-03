'use client';

import { FC, useMemo } from 'react';
import ShopItemCard from './ShopItemCard';
import { ShopItem } from './types/shop';


interface ShopLayoutProps {
    items: ShopItem[];
    balance: number;
    searchTerm: string;
    purchasing?: boolean;
    onBuy: (item: ShopItem) => void;
    onDownload: (item: ShopItem) => Promise<void>;
}

const categories = ["Featured", "Skins", "Boosts", "Packs"];

const ShopLayout: FC<ShopLayoutProps> = ({ items, balance, searchTerm, purchasing, onBuy, onDownload }) => {
    const filteredItems = useMemo(() => {
        if (!searchTerm) return items;
        return items.filter(i =>
            i.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [items, searchTerm]);

    return (
        <div className="space-y-8">
            {categories.map(category => {
                const catItems = filteredItems.filter(i => i.category === category);
                if (catItems.length === 0) return null;

                return (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-white mb-4">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {catItems.map(item => (
                                <ShopItemCard key={item.id} item={item} balance={balance} purchasing={purchasing} onBuy={onBuy} onDownload={onDownload} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShopLayout;