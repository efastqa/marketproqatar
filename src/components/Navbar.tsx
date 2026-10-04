import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Sun, 
  Moon, 
  SlidersHorizontal,
  LayoutDashboard,
  User,
  Sparkles, 
  ChevronDown, 
  X, 
  Menu, 
  Calculator, 
  TrendingUp, 
  Car, 
  Crown, 
  Smartphone, 
  Trees,
  Award,
  CloudSun,
  Coins
} from 'lucide-react';
import { MATALE_LOCATIONS, PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { Category, FilterState, GoldRateData, MataleWeatherData } from '../types';
import { CurrencyCode, CURRENCIES } from '../utils/currency';
import { BrandLogo } from './BrandLogo';
import { GoldRateBar } from './GoldRateBar';
import { MataleWeatherWidget } from './MataleWeatherWidget';

interface NavbarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categories: Category[];
  savedCount: number;
  unreadCount: number;
  onOpenPostAd: () => void;
  onOpenChat: () => void;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang?: string;
  onToggleLang?: () => void;
  onOpenFiltersDrawer: () => void;
  onOpenAdvertisingHub: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (curr: CurrencyCode) => void;
  onOpenFinanceModal: () => void;
  onOpenSpecialPlatesModal: () => void;
  onOpenValuationModal: () => void;
  onOpenMetrashGuideModal: () => void;
  onOpenCompareModal: () => void;
  compareCount?: number;
  onOpenInstallApp?: () => void;
  onOpenSavedAlerts?: () => void;
  savedAlertsCount?: number;
  // Live Gold & Weather
  goldRates?: GoldRateData;
  onOpenGoldModal?: () => void;
  weather?: MataleWeatherData;
  onOpenWeatherModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  filters,
  onFilterChange,
  categories,
  savedCount,
  unreadCount,
  onOpenPostAd,
  onOpenChat,
  onOpenFavorites,
  onOpenAdmin,
  onOpenContact,
  isDarkMode,
  onToggleDarkMode,
  currentLang,
  onToggleLang,
  onOpenFiltersDrawer,
  onOpenAdvertisingHub,
  currency,
  onChangeCurrency,
  onOpenFinanceModal,
  onOpenSpecialPlatesModal,
  onOpenValuationModal,
  onOpenMetrashGuideModal,
  onOpenCompareModal,
  compareCount = 0,
  onOpenInstallApp,
  onOpenSavedAlerts,
  savedAlertsCount = 0,
  goldRates,
  onOpenGoldModal,
  weather,
  onOpenWeatherModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Announcement Bar: Sri Lanka Matale Hotline & Live Status */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Sri Lanka • Matale Marketplace
            </span>
            <span className="hidden lg:inline text-emerald-100 text-xs">
              Buy & Sell Lands, Tea Estates, Ceylon Blue Sapphires, Vehicles & Spices
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            {/* Weather Quick Pill */}
            {onOpenWeatherModal && (
              <MataleWeatherWidget 
                weather={weather} 
                onOpenModal={onOpenWeatherModal} 
                variant="pill" 
              />
            )}

            {/* Direct Support Hotline */}
            <a
              href={`tel:0743383338`}
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Matale Support: <strong className="text-white font-bold">{PLATFORM_PHONE_DISPLAY}</strong></span>
            </a>

            <div className="h-3 w-px bg-emerald-500/40 hidden sm:block"></div>

            {onOpenInstallApp && (
              <button
                onClick={onOpenInstallApp}
                className="hidden sm:flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full border border-white/30 transition-colors text-[11px] font-bold shadow-sm"
                title="Install ebuymatale.lk App"
              >
                <Smartphone className="w-3 h-3 text-amber-300" />
                <span>Get App</span>
              </button>
            )}

            <div className="h-3 w-px bg-emerald-500/40 hidden sm:block"></div>

            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded border border-amber-400/40 transition-colors text-[11px]"
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Sri Lanka Live Gold Rate Bar */}
      {onOpenGoldModal && (
        <GoldRateBar rates={goldRates} onOpenModal={onOpenGoldModal} />
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <BrandLogo size="md" />
            </a>
          </div>

          {/* Search Bar with Location Pill */}
          <div className="hidden lg:flex flex-1 max-w-xl items-center bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-1 pl-3 shadow-inner">
            {/* Location selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLocationDropdownOpen(!locationDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 pr-3 border-r border-slate-300 dark:border-slate-700 hover:text-emerald-600 whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="max-w-[120px] truncate">{filters.location || 'All Matale'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 max-h-72 overflow-y-auto">
                  <div className="p-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Matale Area / Zone
                  </div>
                  {MATALE_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onFilterChange({ location: loc === 'All Matale District' ? '' : loc });
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        (filters.location === loc || (!filters.location && loc === 'All Matale District'))
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {(filters.location === loc || (!filters.location && loc === 'All Matale District')) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search Tea Land, Ceylon Blue Sapphire, House in Matale, Prado..."
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Drawer Launcher */}
            <button
              onClick={onOpenFiltersDrawer}
              className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Right Action Icons & Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Matale Marketplace Tools Hub Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setLocationDropdownOpen(false);
                }}
                className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Matale Tools & Services"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline">Matale Hub</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Services & Market Data
                  </div>

                  {onOpenGoldModal && (
                    <button
                      onClick={() => {
                        onOpenGoldModal();
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                    >
                      <Coins className="w-4 h-4 text-amber-500" />
                      <div>
                        <span>Sri Lanka Gold Rates</span>
                        <span className="block text-[10px] text-slate-400 font-normal">24K, 22K Sovereign & Calculator</span>
                      </div>
                    </button>
                  )}

                  {onOpenWeatherModal && (
                    <button
                      onClick={() => {
                        onOpenWeatherModal();
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                    >
                      <CloudSun className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span>Matale Weather Station</span>
                        <span className="block text-[10px] text-slate-400 font-normal">Knuckles climate & 5-day forecast</span>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onOpenMetrashGuideModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span>Land & Gem Buying Guide</span>
                      <span className="block text-[10px] text-slate-400 font-normal">Bim Saviya deeds & NGJA certificates</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenSpecialPlatesModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <Crown className="w-4 h-4 text-amber-500" />
                    <div>
                      <span>VIP Gems & Prime Estates</span>
                      <span className="block text-[10px] text-slate-400 font-normal">Rare Ceylon Blue Sapphires & Estates</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenFinanceModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <Calculator className="w-4 h-4 text-teal-500" />
                    <div>
                      <span>Bank Loan & Lease Calc</span>
                      <span className="block text-[10px] text-slate-400 font-normal">BOC, ComBank, HNB & Sampath rates</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLocationDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="px-2 sm:px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Change Currency"
              >
                <span>{CURRENCIES[currency]?.flag}</span>
                <span className="hidden sm:inline font-mono">{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-44 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-1.5 z-50 space-y-0.5">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                    const c = CURRENCIES[code];
                    const isSelected = currency === code;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          onChangeCurrency(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span>{c.code}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Chat Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Live Chat"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Primary Action: Post Ad */}
            <button
              onClick={onOpenPostAd}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell in Matale (+)</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Bar (< lg screens) */}
        <div className="mt-2.5 lg:hidden flex items-center gap-1.5">
          <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 px-3 py-1.5 shadow-inner">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search Land, Gems, Cars in Matale..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="p-0.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onOpenFiltersDrawer}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 animate-fadeIn">
          {/* Quick Action: Post Ad */}
          <button
            onClick={() => {
              onOpenPostAd();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Post Free Ad in Matale</span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
            {onOpenGoldModal && (
              <button
                onClick={() => {
                  onOpenGoldModal();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Gold Rate Calc</span>
              </button>
            )}

            {onOpenWeatherModal && (
              <button
                onClick={() => {
                  onOpenWeatherModal();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5"
              >
                <CloudSun className="w-4 h-4 text-emerald-500" />
                <span>Matale Weather</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenMetrashGuideModal();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Land & Gem Guide</span>
            </button>

            <button
              onClick={() => {
                onOpenSpecialPlatesModal();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>VIP Showcase</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Direct Matale Support:</span>
            <a href="tel:0743383338" className="font-bold text-emerald-600">
              {PLATFORM_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
