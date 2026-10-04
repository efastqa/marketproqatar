import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Car, 
  Building2, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Info,
  Trees
} from 'lucide-react';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface ValuationPreset {
  category: 'gems' | 'lands' | 'cars' | 'properties' | 'gadgets';
  model: string;
  year: number | string;
  lowLKR: number;
  avgLKR: number;
  highLKR: number;
  demand: 'Hot' | 'High' | 'Steady';
  depreciationTrend: string;
  advice: string;
}

const VALUATION_DATABASE: ValuationPreset[] = [
  {
    category: 'gems',
    model: 'Natural Ceylon Royal Blue Sapphire (4-6 Carats Unheated)',
    year: 'Certified NGJA',
    lowLKR: 2800000,
    avgLKR: 3600000,
    highLKR: 4500000,
    demand: 'Hot',
    depreciationTrend: 'Consistent capital appreciation (+8% to 15% / year) globally for unheated Ceylon gems',
    advice: 'Official National Gem & Jewellery Authority (NGJA) certificate and origin report command top international export prices.'
  },
  {
    category: 'gems',
    model: 'Padparadscha Pink-Orange Ceylon Sapphire (2.5 - 3.5 Carats)',
    year: 'Unheated Natural',
    lowLKR: 1800000,
    avgLKR: 2400000,
    highLKR: 3200000,
    demand: 'Hot',
    depreciationTrend: 'Rare collector gemstone with ultra-high global liquidity',
    advice: 'High clarity and balanced 50/50 lotus blossom pink-orange saturation yield top valuations.'
  },
  {
    category: 'lands',
    model: 'Knuckles / Rattota Tea & Spice Estate (Per Acre)',
    year: 'Sinnakkara Deed',
    lowLKR: 6500000,
    avgLKR: 8500000,
    highLKR: 12000000,
    demand: 'High',
    depreciationTrend: 'Strong capital growth in Matale high-country eco & plantation zones',
    advice: 'Full clear Bim Saviya / Sinnakkara title, perennial stream access, and mature black pepper crops add 20% valuation premium.'
  },
  {
    category: 'lands',
    model: 'Prime Residential Land Plot (Per Perch - Aluvihare / Matale Town)',
    year: 'Clear Title Deeds',
    lowLKR: 550000,
    avgLKR: 750000,
    highLKR: 980000,
    demand: 'Hot',
    depreciationTrend: 'Steadily rising (+10% / year) in close proximity to Matale Clock Tower and top schools',
    advice: 'Road access 15ft+, Ceylon Electricity Board (CEB) connection, and municipal pipe water guarantee rapid sale.'
  },
  {
    category: 'cars',
    model: 'Toyota Land Cruiser Prado TX-L 2.8L Turbo Diesel (2020-2022)',
    year: 2021,
    lowLKR: 41000000,
    avgLKR: 45000000,
    highLKR: 49500000,
    demand: 'Hot',
    depreciationTrend: 'Extremely strong resale value and high demand in Sri Lanka',
    advice: 'Toyota Lanka service records, genuine mileage, and original paint command peak price.'
  },
  {
    category: 'cars',
    model: 'Bajaj RE 4S 205cc Sri Lanka Three-Wheeler (Tuk Tuk)',
    year: 2023,
    lowLKR: 1450000,
    avgLKR: 1650000,
    highLKR: 1850000,
    demand: 'Hot',
    depreciationTrend: 'High liquidity and low running cost across Central Province',
    advice: 'Clear revenue license, updated emission test, and clean canopy ensure same-day sale.'
  },
  {
    category: 'properties',
    model: 'Matale Modern 2-Story Residential Residence (4 Bed / 3 Bath)',
    year: '10-15 Perches',
    lowLKR: 24000000,
    avgLKR: 29500000,
    highLKR: 36000000,
    demand: 'High',
    depreciationTrend: 'Consistent rental yield and capital appreciation in Matale municipal area',
    advice: 'Boundary wall, roller shutter gate, and approved municipal building plan ensure top mortgage approval.'
  },
  {
    category: 'gadgets',
    model: 'Apple iPhone 16 Pro Max 512GB (TRCSL Approved)',
    year: 2024,
    lowLKR: 420000,
    avgLKR: 455000,
    highLKR: 490000,
    demand: 'Hot',
    depreciationTrend: 'Stable premium demand across Central Province',
    advice: 'Official TRCSL approval and valid Apple Care invoice retain peak liquidity.'
  }
];

interface MarketValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
  onOpenPostAdWithValuation?: (title: string, price: number) => void;
}

export const MarketValuationModal: React.FC<MarketValuationModalProps> = ({
  isOpen,
  onClose,
  currency = 'LKR',
  onOpenPostAdWithValuation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'gems' | 'lands' | 'cars' | 'properties' | 'gadgets'>('gems');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Good'>('Like New');

  const filteredItems = VALUATION_DATABASE.filter(item => item.category === selectedCategory);
  const currentItem = filteredItems[selectedIndex] || filteredItems[0] || VALUATION_DATABASE[0];

  // Adjust price based on selected condition
  const multiplier = condition === 'Brand New' ? 1.05 : condition === 'Like New' ? 1.0 : 0.92;
  const estimatedLow = Math.round(currentItem.lowLKR * multiplier);
  const estimatedAvg = Math.round(currentItem.avgLKR * multiplier);
  const estimatedHigh = Math.round(currentItem.highLKR * multiplier);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Matale Market Valuation & Price Index
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official market benchmarks for Ceylon Gems, Lands, Estates, Houses & Vehicles in Matale, Sri Lanka
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => {
                setSelectedCategory('gems');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'gems'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">Ceylon Gems</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('lands');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'lands'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Trees className="w-5 h-5" />
              <span className="text-xs">Lands & Estates</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('cars');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'cars'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Car className="w-5 h-5" />
              <span className="text-xs">Motors & Vehicles</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('properties');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'properties'
                  ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs">Houses & Property</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('gadgets');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'gadgets'
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-xs">Electronics</span>
            </button>
          </div>

          {/* Model Selector & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Benchmark Item in Matale / Sri Lanka:
              </label>
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:border-emerald-600"
              >
                {filteredItems.map((item, idx) => (
                  <option key={item.model} value={idx}>
                    {item.model} ({item.year})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Condition Rating:
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['Brand New', 'Like New', 'Good'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                      condition === c
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Valuation Card Display */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-800/40 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Matale Market Benchmark • {currentItem.year}
                </span>
                <h3 className="text-lg sm:text-xl font-black mt-0.5">{currentItem.model}</h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Demand: {currentItem.demand}
                </span>
              </div>
            </div>

            {/* Price Tri-Band */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <span className="text-[10px] sm:text-xs text-slate-400 block mb-0.5">Quick Sale Value</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-300">
                  {formatPriceWithCurrency(estimatedLow, currency)}
                </span>
              </div>

              <div className="bg-gradient-to-b from-emerald-600/30 to-emerald-800/40 rounded-2xl p-3 sm:p-4 border border-emerald-400/50 shadow-inner">
                <span className="text-[10px] sm:text-xs text-emerald-300 font-bold block mb-0.5">
                  ★ Fair Market Median
                </span>
                <span className="text-sm sm:text-lg md:text-2xl font-black text-white">
                  {formatPriceWithCurrency(estimatedAvg, currency)}
                </span>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                <span className="text-[10px] sm:text-xs text-slate-400 block mb-0.5">Peak Dealer Retail</span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-300">
                  {formatPriceWithCurrency(estimatedHigh, currency)}
                </span>
              </div>
            </div>

            {/* Market Insights & Tips */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Sri Lanka Market Insight: </span>
                  <span className="text-slate-200">{currentItem.depreciationTrend}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300">Matale Advisory: </span>
                  <span className="text-slate-200">{currentItem.advice}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`${PLATFORM_WHATSAPP_LINK}&text=${encodeURIComponent(`Hello! I want a professional valuation & deed/gem check for my ${currentItem.model} in Matale, Sri Lanka`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Request Free Valuation & Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenPostAdWithValuation && (
                <button
                  onClick={() => {
                    onOpenPostAdWithValuation(currentItem.model, estimatedAvg);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-colors"
                >
                  List Ad at {formatPriceWithCurrency(estimatedAvg, currency)}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
