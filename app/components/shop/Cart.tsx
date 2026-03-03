'use client';

import { FC } from 'react';
import { ShopItem } from './types/shop';
import { LucideTrash, LucideCoins } from 'lucide-react';

interface CartProps {
    items: ShopItem[];
    onRemove: (item: ShopItem) => void;
    total?: number;
}

const Cart: FC<CartProps> = ({ items, onRemove, total }) => {
    const totalPrice = total ?? items.reduce((acc, i) => acc + i.price, 0);

    if (items.length === 0) return <p className="text-white">Your cart is empty.</p>;

    return (
        <div className="bg-slate-900 rounded-xl p-4 space-y-4">
            {items.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-800 p-3 rounded-md">
                    <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LucideCoins className="text-yellow-400" />
                        <span className="text-white font-bold">{item.price}</span>
                        <button onClick={() => onRemove(item)} className="text-red-500 hover:text-red-400">
                            <LucideTrash size={18} />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center font-bold text-white text-lg">
                <span>Total:</span>
                <div className="flex items-center gap-1">
                    <LucideCoins className="text-yellow-400" />
                    {totalPrice}
                </div>
            </div>
        </div>
    );
};

export default Cart;