import React from 'react';
import { Sparkles, TrendingUp, ChevronRight, Award } from 'lucide-react';
import { GoldRateData } from '../types';
import { CURRENT_SRILANKA_GOLD_RATES } from '../services/goldRateService';

interface GoldRateBarProps {
  rates?: GoldRateData;
  onOpenModal: () => void;
}

export const GoldRateBar: React.FC<GoldRateBarProps> = ({
  rates = CURRENT_SRILANKA_GOLD_RATES,
  onOpenModal
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-emerald-500/10 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-emerald-950/30 border-y border-amber-300/40 dark:border-amber-500/20 py-1.5 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
          {/* Badge */}
          <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-extrabold shrink-0 bg-amber-400/25 px-2 py-0.5 rounded-full border border-amber-400/40">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Sri Lanka Live Gold Rate</span>
          </div>

          {/* 22K Sovereign (Poun) */}
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0">
            <span className="font-semibold text-slate-600 dark:text-slate-400">22K Sovereign (8g):</span>
            <span className="font-black text-amber-600 dark:text-amber-400 font-mono">
              Rs. {rates.poun22k.toLocaleString()}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 shrink-0 hidden sm:block"></div>

          {/* 24K Sovereign */}
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0">
            <span className="font-semibold text-slate-600 dark:text-slate-400">24K Sovereign:</span>
            <span className="font-black text-slate-900 dark:text-white font-mono">
              Rs. {rates.poun24k.toLocaleString()}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 shrink-0 hidden md:block"></div>

          {/* 22K Per Gram */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0">
            <span className="font-semibold text-slate-600 dark:text-slate-400">22K / Gram:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
              Rs. {rates.gram22k.toLocaleString()}
            </span>
          </div>

          {/* Daily Trend */}
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold shrink-0">
            <TrendingUp className="w-3 h-3" />
            <span>+{rates.changePercent}% (+Rs. {rates.change24h})</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenModal}
          className="flex items-center gap-1 text-[11px] font-extrabold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 hover:underline shrink-0 ml-auto bg-amber-400/20 hover:bg-amber-400/30 px-2.5 py-0.5 rounded-full border border-amber-400/40 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Gold Calculator & Details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
