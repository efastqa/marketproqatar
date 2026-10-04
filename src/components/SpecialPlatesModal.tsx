import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Trees, 
  Award, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  Car
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';

export interface SpecialItem {
  id: string;
  type: 'gem' | 'estate' | 'vip_plate';
  title: string;
  subtitle: string;
  codeOrSpec: string;
  priceLKR: number;
  sellerName: string;
  sellerPhone: string;
  isVerified: boolean;
  views: number;
  isFeatured?: boolean;
}

export const SPECIAL_ITEMS: SpecialItem[] = [
  {
    id: 'spec-1',
    type: 'gem',
    title: 'Natural Ceylon Royal Blue Sapphire (5.14 Cts)',
    subtitle: 'Vivid Royal Blue • Unheated • NGJA Certified',
    codeOrSpec: '5.14 Carats • Cushion Cut',
    priceLKR: 4200000,
    sellerName: 'Matale Crown Gem Merchants',
    sellerPhone: '0743383338',
    isVerified: true,
    views: 4120,
    isFeatured: true
  },
  {
    id: 'spec-2',
    type: 'gem',
    title: 'Natural Ceylon Padparadscha (3.10 Cts)',
    subtitle: 'Rare Lotus Blossom Color • SSEF & NGJA Reports',
    codeOrSpec: '3.10 Carats • Oval Brilliant',
    priceLKR: 3800000,
    sellerName: 'Central Gem Vault',
    sellerPhone: '0743383338',
    isVerified: true,
    views: 3290,
    isFeatured: true
  },
  {
    id: 'spec-3',
    type: 'estate',
    title: 'Historic 10-Acre Knuckles View Tea & Cardamom Estate',
    subtitle: 'Rattota Foothills • Natural Waterfall Stream',
    codeOrSpec: '10.0 Acres • Sinnakkara Deed',
    priceLKR: 85000000,
    sellerName: 'Highland Estates Sri Lanka',
    sellerPhone: '0743383338',
    isVerified: true,
    views: 2950,
    isFeatured: true
  },
  {
    id: 'spec-4',
    type: 'vip_plate',
    title: 'VIP Vehicle Registration Number: CP CAR-7777',
    subtitle: 'Central Province Premium Series • Official DMT Transfer',
    codeOrSpec: 'CP CAR-7777',
    priceLKR: 1250000,
    sellerName: 'Matale VIP Motors',
    sellerPhone: '0743383338',
    isVerified: true,
    views: 1840,
    isFeatured: false
  }
];

interface SpecialPlatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
}

export const SpecialPlatesModal: React.FC<SpecialPlatesModalProps> = ({
  isOpen,
  onClose,
  currency = 'LKR'
}) => {
  const [filterType, setFilterType] = useState<'all' | 'gem' | 'estate' | 'vip_plate'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = SPECIAL_ITEMS.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                VIP Showcase • Rare Ceylon Gems & Prime Estates
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exclusive high-value listings curated for discerning buyers in Matale & worldwide
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

        {/* Filters */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              All VIP ({SPECIAL_ITEMS.length})
            </button>
            <button
              onClick={() => setFilterType('gem')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'gem'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              💎 Rare Gems
            </button>
            <button
              onClick={() => setFilterType('estate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'estate'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              🌱 Prime Estates
            </button>
            <button
              onClick={() => setFilterType('vip_plate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'vip_plate'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              🚗 VIP Plates
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search VIP items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Listings List */}
        <div className="p-5 sm:p-6 space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-amber-300/40 dark:border-amber-500/20 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                    {item.codeOrSpec}
                  </span>
                  {item.isVerified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.subtitle} • Seller: <strong>{item.sellerName}</strong>
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                  {formatPriceWithCurrency(item.priceLKR, currency)}
                </div>
                <a
                  href={`https://wa.me/94743383338?text=${encodeURIComponent(`Salam! Inquiring about VIP listing: ${item.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Inquire Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
