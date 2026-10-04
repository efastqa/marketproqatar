import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  FileCheck2, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare,
  Lock,
  Trees,
  Award,
  Car
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface LandGemsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LandGemsGuideModal: React.FC<LandGemsGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'land' | 'gems' | 'vehicle' | 'escrow'>('land');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Sri Lanka Land & Ceylon Gemstones Verification Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official guide for clear deed checks in Matale, NGJA gem certification & safe transactions
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

        {/* Tab Selector */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('land')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'land'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>Land Deed & Bim Saviya</span>
          </button>

          <button
            onClick={() => setActiveTab('gems')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'gems'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ceylon Gems & NGJA Certs</span>
          </button>

          <button
            onClick={() => setActiveTab('vehicle')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'vehicle'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicle RMV Transfer</span>
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'escrow'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>ebuymatale.lk Buyer Protection</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-8 space-y-6">
          {activeTab === 'land' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                <h3 className="font-black text-emerald-900 dark:text-emerald-300 text-base mb-1">
                  How to Safely Buy Land & Plantations in Matale District
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Land in Matale, Rattota, and Ukuwela is highly prized for fertile soil and breathtaking scenery. Follow these steps to ensure a 100% undisputed title.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. Title Deed Verification (Bim Saviya)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Check if the deed is <strong>Bim Saviya First Class (A-Grade)</strong> or a traditional <strong>Sinnakkara Clear Deed</strong>. An independent lawyer should conduct a 30-year search (Paththuwa) at the <strong>Matale Land Registry</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2. Licensed Surveyor Plan</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ensure there is an approved survey plan certified by a Registered Licensed Surveyor and approved by the local authority (Matale Municipal Council or Pradeshiya Sabha).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. Physical Boundary & Road Access</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Confirm that the access road (minimum 10 to 20 feet) is legally deeded or a gazetted Pradeshiya Sabha road. Inspect boundary stones in person.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>4. Street Line & Non-Vesting Certificate</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Obtain street line and non-vesting certificates from the Matale Municipal Council to confirm the land is not affected by future road widening or government reservations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gems' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40">
                <h3 className="font-black text-blue-900 dark:text-blue-300 text-base mb-1">
                  Authenticating Ceylon Blue Sapphires & Gemstones
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Sri Lanka produces the finest Blue Sapphires and Padparadscha in the world. Always insist on official laboratory reports.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>NGJA Official Certification</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    The <strong>National Gem and Jewellery Authority of Sri Lanka (NGJA)</strong> is the state authority that tests and issues tamper-proof gemstone memos and certificates verifying mineral identity, carat weight, and natural origin.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Unheated vs. Heated Sapphires</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Natural Unheated Sapphires</strong> command a substantial premium over traditionally heated stones. Always check the certificate’s "Thermal Treatment" section.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicle' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                <h3 className="font-black text-amber-900 dark:text-amber-300 text-base mb-1">
                  Vehicle Ownership Transfer in Sri Lanka (RMV / DMT)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Transferring cars, vans, or three-wheelers registered in Central Province (CP).
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>MTA 6 & MTA 8 Forms:</strong> Ensure both seller and buyer sign original Department of Motor Traffic transfer forms.</li>
                <li><strong>Revenue License & Vic Inspection:</strong> Check that the revenue license is valid and vehicle emission test (DriveGreen/Laugfs) is up to date.</li>
                <li><strong>One-Day Service:</strong> Ownership transfer can be finalized in one day at the RMV Werahera / Colombo or District Secretariats.</li>
              </ul>
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
                <h3 className="font-black text-purple-900 dark:text-purple-300 text-base mb-1">
                  ebuymatale.lk Secure Escrow & Inspection Guarantee
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Our platform protects high-value land, gem, and vehicle transactions in Matale.
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For verified ads on ebuymatale.lk, buyers can deposit funds into an escrow account held until land deed inspection or NGJA gem verification is completed to the buyer's full satisfaction.
              </p>
            </div>
          )}

          {/* Hotline Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Matale Helpline: <strong>{PLATFORM_PHONE_DISPLAY}</strong>
              </span>
            </div>
            <a
              href={PLATFORM_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Verification Support</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

// Backward compatibility export alias
export const MetrashGuideModal = LandGemsGuideModal;
