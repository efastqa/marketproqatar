import React, { useState } from 'react';
import { Listing } from '../types';
import { MapPin, Navigation, Eye, CheckCircle2, Phone, MessageSquare, X, ExternalLink, Mountain, Sparkles, Trees } from 'lucide-react';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';

interface MataleMapExplorerProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onOpenChat: (listing: Listing) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
  currency?: CurrencyCode;
}

interface MataleZone {
  id: string;
  name: string;
  nameSi: string;
  cx: number;
  cy: number;
  radius: number;
  highlight: string;
  description: string;
}

const MATALE_ZONES: MataleZone[] = [
  { id: 'matale_town', name: 'Matale Town', nameSi: 'මාතලේ නගරය', cx: 250, cy: 300, radius: 24, highlight: 'bg-emerald-500', description: 'Commercial Hub, Clock Tower, Gold & Gem Merchants' },
  { id: 'aluvihare', name: 'Aluvihare', nameSi: 'අලුවිහාරේ', cx: 250, cy: 260, radius: 20, highlight: 'bg-amber-500', description: 'Historic Rock Temple, Peaceful Residential Land' },
  { id: 'ukuwela', name: 'Ukuwela', nameSi: 'උකුවෙල', cx: 240, cy: 350, radius: 18, highlight: 'bg-blue-500', description: 'Kandy-Matale border, Green Residential Plots' },
  { id: 'rattota', name: 'Rattota', nameSi: 'රත්තොට', cx: 330, cy: 300, radius: 22, highlight: 'bg-teal-500', description: 'Spice Gardens, Tea Estates, Mountain View Land' },
  { id: 'riverston', name: 'Riverston & Knuckles', nameSi: 'රිවස්ටන් / නකල්ස්', cx: 380, cy: 260, radius: 26, highlight: 'bg-indigo-500', description: 'World Heritage Foothills, Eco-Resort Land, Cool Misty Climate' },
  { id: 'dambulla', name: 'Dambulla', nameSi: 'දඹුල්ල', cx: 230, cy: 110, radius: 26, highlight: 'bg-yellow-500', description: 'UNESCO Cave Temple, Major Economic Center & Commercial Land' },
  { id: 'sigiriya', name: 'Sigiriya', nameSi: 'සීගිරිය', cx: 320, cy: 90, radius: 22, highlight: 'bg-rose-500', description: 'Tourism Hotspot, Hotel Lands & Luxury Villas' },
  { id: 'galewela', name: 'Galewela', nameSi: 'ගලේවෙල', cx: 160, cy: 150, radius: 20, highlight: 'bg-lime-500', description: 'Agricultural Farms, Coconut Plantations' },
  { id: 'naula', name: 'Naula & Bowatenna', nameSi: 'නාවුල', cx: 240, cy: 180, radius: 20, highlight: 'bg-cyan-500', description: 'Northern Matale, Scenic Lake & Agricultural Land' },
  { id: 'yatawatta', name: 'Yatawatta & Palapathwela', nameSi: 'යටවත්ත', cx: 190, cy: 260, radius: 18, highlight: 'bg-emerald-600', description: 'Paddy Lands, Spice Farms, Residential Plots' },
  { id: 'elkaduwa', name: 'Elkaduwa', nameSi: 'ඇල්කඩුව', cx: 290, cy: 380, radius: 18, highlight: 'bg-emerald-700', description: 'Hunnas Falls, Tea Plantations & Highland Bungalows' },
];

export const MataleMapExplorer: React.FC<MataleMapExplorerProps> = ({
  listings,
  onSelectListing,
  onOpenChat,
  selectedLocation = 'All Matale',
  onLocationChange,
  currency = 'LKR'
}) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredListing, setHoveredListing] = useState<Listing | null>(null);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'lands' | 'gems' | 'vehicles' | 'properties'>('all');

  // Filter listings based on viewMode and activeZone
  const filteredListings = listings.filter((item) => {
    if (viewMode === 'lands' && item.category !== 'lands') return false;
    if (viewMode === 'gems' && item.category !== 'gems') return false;
    if (viewMode === 'vehicles' && item.category !== 'vehicles') return false;
    if (viewMode === 'properties' && item.category !== 'properties') return false;

    if (activeZone) {
      const zone = MATALE_ZONES.find(z => z.id === activeZone);
      if (zone) {
        const zoneKeyword = zone.name.toLowerCase().split(' ')[0];
        return item.location.toLowerCase().includes(zoneKeyword);
      }
    }
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Central Province, Sri Lanka
            </span>
            <span className="text-xs text-slate-300">මාතලේ දිස්ත්‍රික්කය</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            Matale District Interactive Property & Gem Map
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Explore verified land plots, tea estates, certified Ceylon gem mines, and properties across Matale.
          </p>
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            All Items ({listings.length})
          </button>
          <button
            onClick={() => setViewMode('lands')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'lands'
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            🌱 Lands & Estates
          </button>
          <button
            onClick={() => setViewMode('gems')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'gems'
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            💎 Ceylon Gems
          </button>
          <button
            onClick={() => setViewMode('properties')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'properties'
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            🏡 Houses & Villas
          </button>
          <button
            onClick={() => setViewMode('vehicles')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'vehicles'
                ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            🚗 Vehicles
          </button>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* SVG Interactive Map (Spans 8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-b from-slate-950 via-slate-900 to-[#062016] p-4 sm:p-6 relative flex flex-col justify-between overflow-hidden">
          
          {/* Controls Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 mb-2">
            <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/80 text-xs text-white">
              <Mountain className="w-3.5 h-3.5 text-emerald-400" />
              <span>Click a zone below or tap pins:</span>
            </div>

            {activeZone && (
              <button
                onClick={() => setActiveZone(null)}
                className="flex items-center gap-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-3 py-1 rounded-xl text-xs font-bold border border-rose-500/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Map Filter</span>
              </button>
            )}
          </div>

          {/* Interactive SVG Rendering Matale District Geometry */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center my-2">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(5,150,105,0.15)] select-none"
            >
              <defs>
                <linearGradient id="mataleMapGrad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#047857" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.7" />
                </linearGradient>
                <filter id="zoneGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Matale District Stylized Boundary Contour */}
              <path
                d="M 230 40 
                   C 300 45, 360 70, 390 120 
                   C 420 170, 440 230, 410 300 
                   C 380 370, 330 430, 270 450 
                   C 210 460, 160 410, 140 340 
                   C 120 280, 140 200, 160 130 
                   Z"
                fill="url(#mataleMapGrad)"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="6 3"
                opacity="0.8"
              />

              {/* Knuckles Mountain Range Ridge Shading on East */}
              <path
                d="M 330 230 Q 380 280 370 360"
                stroke="#34d399"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.4"
              />
              <text x="390" y="320" fill="#6ee7b7" fontSize="10" fontWeight="bold" opacity="0.8">
                Knuckles Range
              </text>

              {/* Highway A9 (Kandy - Matale - Dambulla) Transit Spine */}
              <path
                d="M 240 450 Q 248 350 250 300 Q 245 250 240 180 Q 235 130 230 70"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Zone Circles & Labels */}
              {MATALE_ZONES.map((zone) => {
                const isSelected = activeZone === zone.id;
                const zoneListingCount = listings.filter((l) => 
                  l.location.toLowerCase().includes(zone.name.toLowerCase().split(' ')[0])
                ).length;

                return (
                  <g
                    key={zone.id}
                    onClick={() => setActiveZone(isSelected ? null : zone.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={zone.radius + 8}
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="2"
                        className="animate-ping origin-center"
                      />
                    )}

                    {/* Zone Base Circle */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={zone.radius}
                      fill={isSelected ? '#10b981' : '#1e293b'}
                      stroke={isSelected ? '#ffffff' : '#334155'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      opacity={isSelected ? 0.95 : 0.8}
                      className="transition-all duration-300 group-hover:scale-110 origin-center"
                    />

                    {/* Zone Pin Dot */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="4"
                      fill={isSelected ? '#ffffff' : '#10b981'}
                    />

                    {/* Zone Name Label */}
                    <text
                      x={zone.cx}
                      y={zone.cy + zone.radius + 13}
                      textAnchor="middle"
                      fill={isSelected ? '#34d399' : '#e2e8f0'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? '900' : '600'}
                      className="pointer-events-none transition-all drop-shadow-md"
                    >
                      {zone.name}
                    </text>

                    {/* Listing Count Pill */}
                    {zoneListingCount > 0 && (
                      <g transform={`translate(${zone.cx + 8}, ${zone.cy - zone.radius - 4})`}>
                        <rect x="0" y="0" width="18" height="14" rx="7" fill="#f59e0b" />
                        <text x="9" y="10" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">
                          {zoneListingCount}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Zone Selector Buttons */}
          <div className="z-10 mt-3 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 min-w-max">
              {MATALE_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeZone === zone.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {zone.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Active Zone Listings (Spans 4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/80 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {activeZone ? 'Selected Area' : 'All Matale Listings'}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {activeZone ? MATALE_ZONES.find(z => z.id === activeZone)?.name : 'Matale District, Sri Lanka'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {filteredListings.length} Available
              </span>
            </div>

            {activeZone && (
              <p className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                {MATALE_ZONES.find(z => z.id === activeZone)?.description}
              </p>
            )}

            {/* Scrollable Listings List */}
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredListings.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
                  <p className="text-xs font-bold">No ads found in this zone matching filters.</p>
                  <button
                    onClick={() => {
                      setActiveZone(null);
                      setViewMode('all');
                    }}
                    className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    View all Matale listings
                  </button>
                </div>
              ) : (
                filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => onSelectListing(listing)}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        {listing.category === 'gems' ? '💎 Certified Gem' : listing.category === 'lands' ? '🌱 Land' : listing.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {listing.title}
                      </h4>
                      <div className="text-xs font-black text-slate-900 dark:text-white font-mono mt-0.5">
                        {formatPriceWithCurrency(listing.price, currency)}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        <span className="truncate">{listing.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Looking for specific property or gem?</span>
            <a
              href={PLATFORM_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
