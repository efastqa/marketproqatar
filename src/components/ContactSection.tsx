import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Trees
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface ContactSectionProps {
  onOpenChat: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Land & Gem Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Dedicated Matale Customer Care
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Get in Touch with <span className="text-emerald-600 dark:text-emerald-400">ebuymatale.lk</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Have questions about posting a classified ad, verifying land deeds in Matale, or Ceylon gem certification? We're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Call & WhatsApp & Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Phone Hotline Hero Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white shadow-xl border border-emerald-900/40 space-y-4 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-emerald-600/20 rounded-full blur-2xl"></div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide block">
                    Official Matale Helpline
                  </span>
                  <a
                    href="tel:0743383338"
                    className="text-2xl font-black text-white hover:text-amber-300 transition-colors font-mono tracking-tight"
                  >
                    {PLATFORM_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Direct phone and WhatsApp support for all Matale, Kandy, and Central Province buyers and sellers. Our local team assists in English, Sinhala, and Tamil.
              </p>

              {/* Instant Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:0743383338"
                  className="py-3 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs sm:text-sm text-center shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  Call Hotline
                </a>
                <a
                  href={PLATFORM_WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm text-center shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Matale Office</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  King Street / Mandandawela, Matale, Central Province, Sri Lanka
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Operating Hours</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Daily: 8:00 AM – 8:00 PM (Online 24/7)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you! Our Matale customer support team will contact you shortly via phone or email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sunil Perera"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (Sri Lanka)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 077 123 4567"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Land & Estate Buying">Land & Estate Buying / Deed Inspection</option>
                    <option value="Ceylon Gems Inquiries">Ceylon Blue Sapphires & Gem Certification</option>
                    <option value="Vehicle Purchase">Vehicle Purchase & Leasing</option>
                    <option value="Gold Rates & Bullion">Gold Rates & Jewelry Information</option>
                    <option value="Posting an Ad">Assistance with Posting Classified Ad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, property requirements, or gem specification..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message to ebuymatale.lk Team</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
