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
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-emerald-500/10 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-emerald-950/30 border-y border-amber-300/40 dark:border-amber-500/20 py-1.5 px-4 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Live Gold Rates Stream */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
          {/* Live Pulsing Badge */}
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-extrabold shrink-0 bg-amber-400/25 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="tracking-wide">Sri Lanka Live Gold</span>
          </div>

          {/* 22K Sovereign (Poun) */}
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={onOpenModal}>
            <span className="font-semibold text-slate-600 dark:text-slate-400">22K Sovereign (8g):</span>
            <span className="font-black text-amber-600 dark:text-amber-400 font-mono">
              Rs. {rates.poun22k.toLocaleString()}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 shrink-0 hidden sm:block"></div>

          {/* 24K Sovereign */}
          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={onOpenModal}>
            <span className="font-semibold text-slate-600 dark:text-slate-400">24K Sovereign:</span>
            <span className="font-black text-slate-900 dark:text-white font-mono">
              Rs. {rates.poun24k.toLocaleString()}
            </span>
          </div>

          <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 shrink-0 hidden md:block"></div>

          {/* 22K Per Gram */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-800 dark:text-slate-200 shrink-0 hover:scale-105 transition-transform duration-200">
            <span className="font-semibold text-slate-600 dark:text-slate-400">22K / Gram:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
              Rs. {rates.gram22k.toLocaleString()}
            </span>
          </div>

          {/* Daily Trend */}
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold shrink-0 animate-pulseSubtle">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{rates.changePercent}% (+Rs. {rates.change24h})</span>
          </div>
        </div>

        {/* Action Button with Shine Effect */}
        <button
          onClick={onOpenModal}
          className="relative overflow-hidden flex items-center gap-1 text-[11px] font-extrabold text-amber-800 dark:text-amber-200 hover:text-amber-950 dark:hover:text-white shrink-0 ml-auto bg-gradient-to-r from-amber-400/25 to-amber-300/30 hover:from-amber-400/40 hover:to-amber-300/50 px-3 py-1 rounded-full border border-amber-400/50 shadow-xs hover:shadow-sm transition-all transform active:scale-95 group"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none"></div>
          <Sparkles className="w-3 h-3 text-amber-500 group-hover:rotate-12 transition-transform" />
          <span>Gold Calculator & Details</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
