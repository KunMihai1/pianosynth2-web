'use client';

import { FC } from 'react';
import { LucideCoins, Search } from 'lucide-react';

interface CurrencyBarProps {
  balance: number;
  onSearchChange: (value: string) => void;
}

const CurrencyBar: FC<CurrencyBarProps> = ({ balance, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-slate-800/60 backdrop-blur-sm rounded-xl px-5 py-3 border border-slate-700/50">
      {/* Wallet balance */}
      <div className="flex items-center gap-2">
        <LucideCoins size={22} className="text-yellow-400" />
        <span className="text-yellow-300 font-bold text-lg">{balance.toLocaleString()}</span>
        <span className="text-slate-400 text-sm">coins</span>
      </div>

      {/* Search bar */}
      <div className="relative flex-1 max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search items..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-600/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/40 transition"
        />
      </div>
    </div>
  );
};

export default CurrencyBar;