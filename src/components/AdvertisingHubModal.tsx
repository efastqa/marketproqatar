import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Crown, 
  Flame, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Phone, 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  CreditCard, 
  HelpCircle, 
  ArrowRight, 
  Eye, 
  Award,
  Layers,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { ADVERTISING_PACKAGES, COMMERCIAL_BANNER_ADS, PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { AdPackage, Listing, PaymentTransaction } from '../types';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';
import confetti from 'canvas-confetti';

interface AdvertisingHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackageForPost?: (pkg: AdPackage) => void;
  userListings?: Listing[];
  onBoostListing?: (listingId: string, pkg: AdPackage) => void;
  currency?: CurrencyCode;
}

export const AdvertisingHubModal: React.FC<AdvertisingHubModalProps> = ({
  isOpen,
  onClose,
  onSelectPackageForPost,
  userListings = [],
  onBoostListing,
  currency = 'LKR',
}) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'commercial' | 'boost_existing' | 'guidelines'>('packages');
  const [selectedListingToBoost, setSelectedListingToBoost] = useState<string>(userListings[0]?.id || '');
  const [selectedBoostPackage, setSelectedBoostPackage] = useState<string>('pkg-vip');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'QPay' | 'ApplePay' | 'QNB' | 'NAPS_Debit'>('QPay');

  // ROI Calculator states
  const [calcItemType, setCalcItemType] = useState<'gem' | 'estate' | 'car' | 'property' | 'tech'>('gem');
  const [calcListingPrice, setCalcListingPrice] = useState<number>(3500000);
  const [calcSelectedPlan, setCalcSelectedPlan] = useState<'free' | 'bump_24h' | 'featured_7d' | 'vip_gold'>('vip_gold');

  const handleApplyBoost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListingToBoost) return;
    const pkg = ADVERTISING_PACKAGES.find(p => p.id === selectedBoostPackage);
    if (!pkg) return;

    if (onBoostListing) {
      onBoostListing(selectedListingToBoost, pkg);
    }
    setPaymentSuccess(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      setPaymentSuccess(false);
      onClose();
    }, 2500);
  };

  const getEstimatedViews = (plan: string) => {
    switch (plan) {
      case 'vip_gold': return { views: '4,500 - 9,200', inquiries: '25 - 40 WhatsApp/Calls', daysToSell: '2 - 4 Days' };
      case 'featured_7d': return { views: '1,800 - 3,500', inquiries: '12 - 20 WhatsApp/Calls', daysToSell: '4 - 7 Days' };
      case 'bump_24h': return { views: '800 - 1,500', inquiries: '5 - 10 WhatsApp/Calls', daysToSell: '5 - 9 Days' };
      default: return { views: '200 - 450', inquiries: '1 - 4 Inquiries', daysToSell: '14 - 30 Days' };
    }
  };

  const currentEstimates = getEstimatedViews(calcSelectedPlan);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white relative flex items-center justify-between border-b border-emerald-900/40">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/30 uppercase tracking-wide">
                Matale Marketplace Advertising
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                100% Free & Paid Options
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Advertising on ebuymatale.lk (දැන්වීම් ප්‍රවර්ධනය)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Post unlimited free classified ads or multiply your buyer reach with Matale's #1 verified marketplace network.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 dark:bg-slate-800/80 p-2 sm:px-6 border-b border-slate-200 dark:border-slate-700/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Free vs. Paid Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('commercial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'commercial'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Banners & Showrooms</span>
          </button>

          <button
            onClick={() => setActiveTab('boost_existing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'boost_existing'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Boost My Active Ad</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guidelines'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sri Lanka Ad Regulations (නීති රීති)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ALL PACKAGES COMPARISON */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              
              {/* Top Quick Overview Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Free Classified Advertising</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Always <strong>Rs. 0</strong> to publish lands, gems, vehicles, and electronics in Matale.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
                    <Crown className="w-4 h-4" />
                    <span>Paid Premium Visibility</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Up to <strong>10x faster sales</strong> with Top Homepage placement, golden badges, and interactive map pins.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                    <span>Commercial & Corporate</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Dedicated dealer profiles, billboard banners, and bulk listing management for Sri Lankan enterprises.
                  </p>
                </div>
              </div>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {ADVERTISING_PACKAGES.map((pkg) => {
                  const isGold = pkg.tier === 'vip_gold';
                  const isFeatured = pkg.tier === 'featured_7d';
                  const isFree = pkg.isFree;

                  return (
                    <div
                      key={pkg.id}
                      className={`rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all relative ${
                        isGold
                          ? 'bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-900 border-2 border-amber-400 shadow-xl shadow-amber-500/10 dark:text-white'
                          : isFeatured
                          ? 'bg-gradient-to-b from-rose-500/10 via-rose-500/5 to-slate-900 border-2 border-rose-500 shadow-lg text-slate-900 dark:text-white'
                          : isFree
                          ? 'bg-white dark:bg-slate-800/90 border-2 border-emerald-500/60 shadow-sm text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                      }`}
                    >
                      {pkg.isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                          MOST POPULAR IN QATAR
                        </div>
                      )}

                      {isFree && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                          100% FREE ALWAYS
                        </div>
                      )}

                      <div>
                        {/* Header of Card */}
                        <div className="flex items-center justify-between gap-1 mb-2 pt-1">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                            isGold 
                              ? 'bg-amber-400 text-slate-950' 
                              : isFeatured 
                              ? 'bg-[#8A1538] text-white' 
                              : isFree
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          }`}>
                            {pkg.badge}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {pkg.durationDays} {pkg.durationDays === 1 ? 'Day' : 'Days'}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {pkg.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                          {pkg.tagline}
                        </p>

                        {/* Price Display */}
                        <div className="mt-4 pb-3 border-b border-slate-200 dark:border-slate-700/70 flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                            {pkg.priceQAR === 0 ? '0' : formatPriceWithCurrency(pkg.priceQAR, currency)}
                          </span>
                          {pkg.priceQAR === 0 && (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              QAR (FREE)
                            </span>
                          )}
                        </div>

                        {/* Views Multiplier badge */}
                        <div className="mt-3 py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-500 dark:text-slate-300 text-[11px]">Estimated Reach:</span>
                          <span className="text-amber-500 dark:text-amber-400 font-extrabold flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> {pkg.viewsMultiplier} Views
                          </span>
                        </div>

                        {/* Feature List */}
                        <ul className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                          {pkg.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isGold 
                                  ? 'text-amber-500' 
                                  : isFeatured 
                                  ? 'text-rose-500' 
                                  : 'text-emerald-500'
                              }`} />
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Action Button */}
                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {isFree ? (
                          <button
                            onClick={() => {
                              onClose();
                              if (onSelectPackageForPost) onSelectPackageForPost(pkg);
                            }}
                            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                          >
                            Post Free Ad Now
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onClose();
                              if (onSelectPackageForPost) onSelectPackageForPost(pkg);
                            }}
                            className={`w-full py-2.5 rounded-xl font-black text-xs shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                              isGold
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950'
                                : isFeatured
                                ? 'bg-gradient-to-r from-[#8A1538] to-rose-700 text-white'
                                : 'bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800'
                            }`}
                          >
                            Choose {pkg.badge} ({pkg.priceQAR} QAR)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive ROI & View Reach Simulator */}
              <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" /> Matale Ad Visibility Estimator
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Simulate Views & Speed of Sale for your Item
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">
                    Based on over 25,000+ completed Matale & Sri Lanka inquiries
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">Item Category</label>
                    <select
                      value={calcItemType}
                      onChange={(e: any) => {
                        setCalcItemType(e.target.value);
                        if (e.target.value === 'car') setCalcListingPrice(18500000);
                        if (e.target.value === 'property') setCalcListingPrice(35000000);
                        if (e.target.value === 'watch') setCalcListingPrice(1200000);
                        if (e.target.value === 'phone') setCalcListingPrice(350000);
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <option value="property">🌳 Land / Tea & Spice Estate</option>
                      <option value="watch">💎 Ceylon Sapphire / Gemstone</option>
                      <option value="car">🚗 Vehicle / Toyota Prado / Van</option>
                      <option value="phone">📱 Smartphone / Tech Gadget</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">Advertising Package</label>
                    <select
                      value={calcSelectedPlan}
                      onChange={(e: any) => setCalcSelectedPlan(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <option value="free">Free Standard Listing (Rs. 0)</option>
                      <option value="bump_24h">Express 24h Bump (Rs. 1,600)</option>
                      <option value="featured_7d">Featured Pro 7-Day (Rs. 4,200)</option>
                      <option value="vip_gold">VIP Gold Spotlight 30-Day (Rs. 8,500)</option>
                    </select>
                  </div>

                  {/* Calculated Result Box */}
                  <div className="bg-gradient-to-r from-emerald-950/60 to-slate-800 p-3 rounded-2xl border border-emerald-800/50 flex flex-col justify-center">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300">Expected Buyer Views:</span>
                      <strong className="text-amber-400 font-black">{currentEstimates.views}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300">Direct Inquiries:</span>
                      <strong className="text-emerald-400 font-bold">{currentEstimates.inquiries}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Est. Time to Sell:</span>
                      <strong className="text-white font-bold">{currentEstimates.daysToSell}</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CORPORATE & COMMERCIAL BANNER ADS */}
          {activeTab === 'commercial' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 p-5 sm:p-6 rounded-3xl border border-purple-800/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30 uppercase">
                      For Sri Lanka Gem Dealers, Developers & Banks
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Corporate Brand Advertising & Top Billboard Placement
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl">
                      Reach over 35,000+ monthly active Sri Lankan and diaspora buyers looking for prime lands, Ceylon gems, and premium investments in Matale.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <a
                      href={`https://wa.me/94743383338?text=${encodeURIComponent('Ayubowan! I want to book a Prime Banner or Business Sponsor ad on ebuymatale.lk')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat with Ad Desk (074 338 3338)</span>
                    </a>
                    <a
                      href="tel:0743383338"
                      className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call {PLATFORM_PHONE_DISPLAY}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sample Live Commercial Banners in Matale */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>Current Sponsored Partner Campaigns in Matale & Sri Lanka</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMERCIAL_BANNER_ADS.map((banner) => (
                    <div
                      key={banner.id}
                      className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 overflow-hidden shadow-md flex flex-col justify-between group hover:border-emerald-500 transition-all"
                    >
                      <div className="relative aspect-[16/8] bg-slate-950 overflow-hidden">
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                          {banner.badgeText}
                        </span>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <p className="text-xs font-semibold text-emerald-300">{banner.advertiserName}</p>
                          <h5 className="text-sm font-bold truncate">{banner.title}</h5>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {banner.subtitle}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-emerald-500" /> {banner.impressions.toLocaleString()} views
                          </span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {banner.status === 'active' ? '● Live Across Matale' : 'Ended'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`https://wa.me/94743383338?text=${encodeURIComponent(`Ayubowan! Inquiring about ${banner.title} on ebuymatale.lk`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors"
                          >
                            {banner.ctaText}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOOST AN EXISTING ACTIVE AD */}
          {activeTab === 'boost_existing' && (
            <div className="space-y-6">
              {paymentSuccess ? (
                <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-300 dark:border-emerald-800 space-y-3 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Ad Successfully Boosted & Activated!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your listing is now prominently featured in Matale search results, category headers, and on the Matale District Interactive Map.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplyBoost} className="space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      Upgrade an Active Listing to Top Visibility
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select any of your listed items to apply instant Flash Bump, Featured Pro, or VIP Gold placement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                        1. Select Item to Boost *
                      </label>
                      <select
                        value={selectedListingToBoost}
                        onChange={(e) => setSelectedListingToBoost(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                      >
                        {userListings.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.title} - Rs. {l.price.toLocaleString()} ({l.location})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                        2. Choose Paid Boost Tier *
                      </label>
                      <select
                        value={selectedBoostPackage}
                        onChange={(e) => setSelectedBoostPackage(e.target.value)}
                        className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                      >
                        <option value="pkg-vip">👑 VIP Gold Top Ad (Rs. 8,500 - 30 Days / 10x Views)</option>
                        <option value="pkg-featured">⭐ Featured Pro Badge (Rs. 4,200 - 7 Days / 5x Views)</option>
                        <option value="pkg-bump">⚡ Express 24h Re-Bump (Rs. 1,600 - #1 Top Rank)</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                      3. Select Sri Lanka Payment Gateway
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('LankaPay')}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                          selectedPaymentMethod === 'LankaPay' || selectedPaymentMethod === 'QPay'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>💳 LankaPay</span>
                        <span className="text-[10px] text-slate-400 font-normal">All Sri Lanka Banks</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('ApplePay')}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                          selectedPaymentMethod === 'ApplePay'
                            ? 'border-slate-900 bg-slate-900 text-white ring-2 ring-slate-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🍎 Apple Pay</span>
                        <span className="text-[10px] text-slate-400 font-normal">Instant 1-Click</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('CommercialBank')}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                          selectedPaymentMethod === 'CommercialBank' || selectedPaymentMethod === 'QNB'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🏛️ ComBank / BOC</span>
                        <span className="text-[10px] text-slate-400 font-normal">Direct Online Transfer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('Card')}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                          selectedPaymentMethod === 'Card' || selectedPaymentMethod === 'NAPS_Debit'
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🇱🇰 Visa / Mastercard</span>
                        <span className="text-[10px] text-slate-400 font-normal">Local & International</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-600 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/30 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>
                        Confirm & Boost Ad ({
                          selectedBoostPackage === 'pkg-vip' ? 'Rs. 8,500' : selectedBoostPackage === 'pkg-featured' ? 'Rs. 4,200' : 'Rs. 1,600'
                        })
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: SRI LANKA ADVERTISING GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">
                  Advertising & Fair Trade Standards in Sri Lanka (මාතලේ වෙළඳ නීති රීති)
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  ebuymatale.lk complies with the Sri Lanka Consumer Affairs Authority (CAA) Act No. 9 of 2003, National Gem and Jewellery Authority (NGJA) regulations, and land registry title clearance standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Community Listings
                  </h5>
                  <p className="text-slate-500">
                    Matale district residents and Sri Lankan sellers can post standard classified listings free of charge without upfront listing fees.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ceylon Gems & NGJA Certification
                  </h5>
                  <p className="text-slate-500">
                    High-value Ceylon sapphires, rubies, and gemstones should state carat weight, clarity, and certified laboratory memos (NGJA, GIC, or CGL).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Land & Estate Deeds (Sinnakkara)
                  </h5>
                  <p className="text-slate-500">
                    Land and plantation listings must specify clear deed types (Sinnakkara freehold, Bim Saviya title) and surveyed perch or acre measurements.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Buyer Protection & Escrow
                  </h5>
                  <p className="text-slate-500">
                    Buyers are protected against fraudulent deals. Escrow funds remain secured until physical inspection or legal deed conveyance in Matale.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Sri Lanka LankaPay, Card & Apple Pay Processing with 24/7 Support</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold"
            >
              Close
            </button>
            <a
              href={PLATFORM_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Support ({PLATFORM_PHONE_DISPLAY})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
