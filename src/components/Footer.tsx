import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Globe, 
  ArrowUp, 
  LayoutDashboard, 
  MessageSquare, 
  Smartphone,
  Trees,
  Award
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenPostAd: () => void;
  onOpenMap: () => void;
  onOpenContact: () => void;
  onOpenInstallApp?: () => void;
  onOpenGoldModal?: () => void;
  onOpenWeatherModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenPostAd,
  onOpenMap,
  onOpenContact,
  onOpenInstallApp,
  onOpenGoldModal,
  onOpenWeatherModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
              Start Selling Across Matale & Central Province Today
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Have Land, Ceylon Gems, a House or Vehicle to Sell in Matale?
            </h3>
            <p className="text-xs text-emerald-100 mt-1 max-w-xl">
              Connect with thousands of buyers across Matale, Kandy, Colombo, and international gem & estate investors on ebuymatale.lk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenPostAd}
              className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Post Free Ad Now
            </button>
            <a
              href="tel:0743383338"
              className="px-4 py-3 bg-slate-950/40 hover:bg-slate-950/60 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{PLATFORM_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Matale Hotline */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sri Lanka's dedicated Matale online classifieds portal. Specialized in verified land & tea estates, certified Ceylon Blue Sapphires, residential properties, vehicles, live Sri Lanka gold rates, and Matale highland weather updates.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Matale Central Helpline:</span>
              </div>
              <a
                href="tel:0743383338"
                className="text-base font-black text-amber-400 hover:underline block font-mono"
              >
                {PLATFORM_PHONE_DISPLAY}
              </a>
              <span className="text-[11px] text-slate-500 block">
                Serving Matale Town, Aluvihare, Rattota, Ukuwela, Dambulla & Central Province.
              </span>
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  🌱 Lands & Plantations
                </a>
              </li>
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  💎 Ceylon Gems & Sapphires
                </a>
              </li>
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  🏡 Houses & Commercial Plots
                </a>
              </li>
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  🚗 Vehicles & Three-Wheelers
                </a>
              </li>
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  🌿 Matale Black Pepper & Spices
                </a>
              </li>
              <li>
                <a href="#marketplace-section" className="hover:text-emerald-400 transition-colors">
                  📱 Mobiles & Solar Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Matale Locations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Key Locations
            </h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Matale Town & Clock Tower</button></li>
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Aluvihare Rock Temple Area</button></li>
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Rattota (Tea & Spices)</button></li>
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Riverston & Knuckles Foothills</button></li>
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Ukuwela & Kandy Border</button></li>
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Dambulla & Sigiriya</button></li>
            </ul>
          </div>

          {/* Col 4: Market Tools & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">
              Market Tools & Services
            </h4>
            <ul className="space-y-2">
              {onOpenGoldModal && (
                <li>
                  <button onClick={onOpenGoldModal} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1">
                    <span className="text-amber-400">🪙</span> Sri Lanka Gold Rates (24K/22K)
                  </button>
                </li>
              )}
              {onOpenWeatherModal && (
                <li>
                  <button onClick={onOpenWeatherModal} className="hover:text-sky-400 transition-colors text-left flex items-center gap-1">
                    <span className="text-sky-400">🌤️</span> Matale Weather Station
                  </button>
                </li>
              )}
              <li><button onClick={onOpenMap} className="hover:text-emerald-400 transition-colors">Interactive District Map</button></li>
              <li><button onClick={onOpenContact} className="hover:text-emerald-400 transition-colors">Customer Support</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-emerald-400 transition-colors text-amber-400">Admin Portal</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 ebuymatale.lk. All rights reserved. Made for Matale, Sri Lanka.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
