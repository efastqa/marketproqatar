import React, { useState } from 'react';
import { 
  X, 
  Award, 
  TrendingUp, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  Building2, 
  Coins, 
  ArrowRight,
  RefreshCw,
  Phone,
  MessageSquare
} from 'lucide-react';
import { GoldRateData } from '../types';
import { CURRENT_SRILANKA_GOLD_RATES, calculateGoldValue } from '../services/goldRateService';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface GoldRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates?: GoldRateData;
}

export const GoldRateModal: React.FC<GoldRateModalProps> = ({
  isOpen,
  onClose,
  rates = CURRENT_SRILANKA_GOLD_RATES
}) => {
  const [karat, setKarat] = useState<'24K' | '22K' | '18K'>('22K');
  const [unit, setUnit] = useState<'grams' | 'poun'>('poun');
  const [weight, setWeight] = useState<number>(1); // 1 sovereign (8g) by default
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const calculation = calculateGoldValue(karat, Number(weight) || 0, unit, rates);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Sri Lanka Live Gold Rate & Bullion Calculator
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  Live Market
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official rates for Matale & Sri Lanka bullion markets • Central Bank & Sea Street benchmark
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Rate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* 22K Sovereign (Highlighted) */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-slate-50 dark:to-slate-800/50 border-2 border-amber-400/80 shadow-md">
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                Most Popular
              </span>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block mb-0.5">
                22 Karat (916) Sovereign
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                Rs. {rates.poun22k.toLocaleString()}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-amber-300/30">
                <span>Per 1 Gram:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  Rs. {rates.gram22k.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                Standard jewelry purity in Sri Lanka
              </span>
            </div>

            {/* 24K Pure Sovereign */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                24 Karat (999) Pure Sovereign
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                Rs. {rates.poun24k.toLocaleString()}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Per 1 Gram:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  Rs. {rates.gram24k.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                Pure bullion bars, coins & gold biscuits
              </span>
            </div>

            {/* 18K & Silver */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                    18 Karat (750) Per Gram:
                  </span>
                  <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    Rs. {rates.gram18k.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500">Gemstone rings & Italian jewelry</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                    925 Sterling Silver / Gram:
                  </span>
                  <div className="text-sm font-black text-slate-900 dark:text-white font-mono">
                    Rs. {rates.silverGram.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Live Gold Value Calculator */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-sm">
                  Instant Gold Jewelry Value Calculator
                </h3>
                <p className="text-[11px] text-slate-500">
                  Calculate real market value and bank advance for your gold in Matale
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Karat Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gold Purity (Karat)
                </label>
                <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  {(['22K', '24K', '18K'] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setKarat(k)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        karat === k 
                          ? 'bg-amber-500 text-slate-950 shadow-sm' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unit Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Weight Unit
                </label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => {
                      setUnit('poun');
                      setWeight(1);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      unit === 'poun' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Sovereign (Poun / 8g)
                  </button>
                  <button
                    onClick={() => {
                      setUnit('grams');
                      setWeight(8);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      unit === 'grams' 
                        ? 'bg-amber-500 text-slate-950 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Grams (g)
                  </button>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enter Weight ({unit === 'poun' ? 'Poun / Sovereigns' : 'Grams'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight || ''}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 1"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Calculation Output Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300/40 dark:border-amber-500/20 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    Estimated Market Bullion Value
                  </span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                    Rs. {calculation.marketValueLKR.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {calculation.weightGrams}g ({calculation.weightPoun} Sovereign) • {calculation.pureGoldGrams}g pure gold
                  </span>
                </div>

                <div className="sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-4">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    Bank Pawning Advance (approx 78%)
                  </span>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                    Rs. {calculation.pawningEstimateLKR.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    BOC, People's Bank, ComBank estimate
                  </span>
                </div>

                <div className="sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-4">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                    Jewelry Making Charge (~8%)
                  </span>
                  <div className="text-xl font-black text-slate-700 dark:text-slate-300 font-mono mt-0.5">
                    Rs. {calculation.makingChargeEstimateLKR.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Crafting fee for chains, rings, bangles
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Sri Lanka Bullion & Matale Trading Guide */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300/30 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Matale Bullion & Jewelry Trading Guidelines</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
              <li><strong>Hallmark Inspection:</strong> Look for the <strong>916</strong> hallmark stamp for 22 Karat gold and <strong>750</strong> for 18 Karat gold.</li>
              <li><strong>1 Sovereign:</strong> In Sri Lanka, one gold sovereign (Poun) is traditionally <strong>8.00 grams</strong>.</li>
              <li><strong>Matale Jewelers:</strong> Certified jewelry shops in Matale Town (King Street and Mandandawela) follow the official Colombo Sea Street bullion index.</li>
              <li><strong>Ceylon Gem Setting:</strong> 18K and 22K yellow and white gold are standard for mounting Ceylon Blue Sapphires and natural rubies.</li>
            </ul>
          </div>

          {/* Contact Helpline */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white">
            <div>
              <span className="text-xs font-bold text-amber-300">Looking to Buy, Sell Gold or Inquire with Matale Jewelers?</span>
              <p className="text-[11px] text-slate-300 mt-0.5">Connect with certified sellers and jewelers on ebuymatale.lk</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={PLATFORM_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
