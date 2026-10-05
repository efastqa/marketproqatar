import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Car, 
  Building2, 
  Smartphone, 
  Trees,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Calculator,
  Coins,
  CloudSun,
  Award
} from 'lucide-react';
import { FilterState, Category, HeroSpotlightConfig } from '../types';
import { MATALE_LOCATIONS, PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK, INITIAL_HERO_SPOTLIGHT } from '../data/mockData';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categories: Category[];
  onOpenMap: () => void;
  onOpenPostAd: () => void;
  onOpenFinanceModal?: () => void;
  onOpenSpecialPlatesModal?: () => void;
  onOpenValuationModal?: () => void;
  onOpenMetrashGuideModal?: () => void;
  onOpenAdvertisingHub?: () => void;
  spotlightConfig?: HeroSpotlightConfig;
  onOpenSavedAlerts?: () => void;
  savedAlertsCount?: number;
  onOpenGoldModal?: () => void;
  onOpenWeatherModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  categories,
  onOpenMap,
  onOpenPostAd,
  onOpenFinanceModal,
  onOpenSpecialPlatesModal,
  onOpenValuationModal,
  onOpenMetrashGuideModal,
  onOpenAdvertisingHub,
  spotlightConfig = INITIAL_HERO_SPOTLIGHT,
  onOpenSavedAlerts,
  savedAlertsCount = 0,
  onOpenGoldModal,
  onOpenWeatherModal
}) => {
  const currentSpotlight = spotlightConfig || INITIAL_HERO_SPOTLIGHT;
  const trendingSearches = [
    'Tea Estate Rattota',
    'Ceylon Blue Sapphire',
    'Residential Land Aluvihare',
    'Matale Town House',
    'Toyota Prado Matale',
    'Bajaj Three Wheeler',
    'Black Pepper Matale'
  ];

  const handleExecuteSearch = (customQuery?: string) => {
    if (customQuery !== undefined) {
      onFilterChange({ searchQuery: customQuery });
    }
    const el = document.getElementById('marketplace-section') || document.querySelector('main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 pt-4 pb-8 transition-colors animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Bento Cell 1: Main Search & Hero Headline (Spans 8 cols on desktop) */}
          <div className="md:col-span-8 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-emerald-900/40 shadow-xl flex flex-col justify-between animate-fadeInUp">
            {/* Ambient Lighting & Pattern with Smooth Motion */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-floatGentle"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none animate-pulseSubtle"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10 shadow-xs hover:bg-white/15 transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Sri Lanka's #1 Matale Marketplace
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Land Deeds & NGJA Gems
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Buy, Sell & Trade in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                  Matale, Sri Lanka
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl">
                Discover fertile tea & spice estates in Rattota, certified Ceylon Blue Sapphires, residential land in Aluvihare, houses, vehicles, and real-time gold rates & weather.
              </p>

              {/* Quick Feature Shortcut Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
                {onOpenGoldModal && (
                  <button
                    onClick={onOpenGoldModal}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <Coins className="w-3 h-3 text-amber-400" /> Gold Rates (24K / 22K)
                  </button>
                )}

                {onOpenWeatherModal && (
                  <button
                    onClick={onOpenWeatherModal}
                    className="px-2.5 py-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <CloudSun className="w-3 h-3 text-sky-400" /> Matale Weather
                  </button>
                )}

                {onOpenSpecialPlatesModal && (
                  <button
                    onClick={onOpenSpecialPlatesModal}
                    className="px-2.5 py-1 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <Sparkles className="w-3 h-3" /> VIP Gems & Estates
                  </button>
                )}

                {onOpenFinanceModal && (
                  <button
                    onClick={onOpenFinanceModal}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <Calculator className="w-3 h-3" /> Bank Loan Calc (BOC/ComBank)
                  </button>
                )}

                {onOpenMetrashGuideModal && (
                  <button
                    onClick={onOpenMetrashGuideModal}
                    className="px-2.5 py-1 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 text-teal-200 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <ShieldCheck className="w-3 h-3" /> Land & Gem Guide
                  </button>
                )}
              </div>

              {/* In-Hero Search Input Box with Focus Glow */}
              <div className="mt-6 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-emerald-400">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-5 h-5 text-emerald-300 shrink-0" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
                    placeholder="Search by keyword, estate type, or gem..."
                    className="w-full bg-transparent text-white placeholder:text-slate-300 text-xs sm:text-sm focus:outline-none"
                  />
                </div>

                {/* Location Select */}
                <div className="sm:border-l sm:border-white/20 px-3 py-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <select
                    value={filters.location}
                    onChange={(e) => onFilterChange({ location: e.target.value })}
                    className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="" className="text-slate-900">All Matale District</option>
                    {MATALE_LOCATIONS.filter(l => l !== 'All Matale District').map((loc) => (
                      <option key={loc} value={loc} className="text-slate-900">{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Search Execution Button with Dynamic Shine */}
                <button
                  onClick={() => handleExecuteSearch()}
                  className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-1.5 group"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none"></div>
                  <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Search Matale</span>
                </button>
              </div>

              {/* Trending Keywords */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px] text-slate-300">
                <span className="font-bold text-amber-300">Popular:</span>
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleExecuteSearch(term)}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 px-2 py-0.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Free Ad Posting
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Verified Matale Sellers
                </span>
              </div>

              <button
                onClick={onOpenMap}
                className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 hover:underline group"
              >
                <span>Interactive Matale District Map</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bento Cell 2: Spotlight Card (Spans 4 cols on desktop) with Smooth Hover Lift */}
          <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-950">
              <img
                src={currentSpotlight.imageUrl}
                alt={currentSpotlight.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md animate-pulseSubtle">
                {currentSpotlight.badge}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xl font-black font-mono text-amber-300">
                  {currentSpotlight.price}
                </div>
                <div className="text-xs font-bold truncate">
                  {currentSpotlight.title}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span className="truncate">{currentSpotlight.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
              {currentSpotlight.description}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onOpenPostAd}
                className="relative overflow-hidden py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-600 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1 hover:scale-102 active:scale-95 group/btn"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-700 pointer-events-none"></div>
                <span>Sell in Matale</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
              
              <a
                href={PLATFORM_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1 hover:scale-102 active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
