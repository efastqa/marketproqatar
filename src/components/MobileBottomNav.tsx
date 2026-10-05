import React from 'react';
import { 
  Home, 
  MapPin, 
  PlusCircle, 
  MessageSquare, 
  User
} from 'lucide-react';
import { UserAccount } from '../types';

interface MobileBottomNavProps {
  currentView: 'home' | 'map' | 'saved' | 'admin' | 'contact';
  onNavigate: (view: 'home' | 'map' | 'saved' | 'admin' | 'contact') => void;
  onOpenPostAd: () => void;
  onOpenChat: () => void;
  unreadCount: number;
  savedCount: number;
  currentUser?: UserAccount | null;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenPostAd,
  onOpenChat,
  unreadCount,
  currentUser,
  onOpenProfile,
  onOpenAuth,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
            currentView === 'home'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Map Explorer */}
        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
            currentView === 'map'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">Matale Map</span>
        </button>

        {/* Floating Post Ad Center Action with Pulsing Aura */}
        <button
          onClick={onOpenPostAd}
          className="flex flex-col items-center -mt-5 group"
          title="Post Ad"
        >
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-700 to-emerald-500 text-white shadow-xl shadow-emerald-950/40 flex items-center justify-center border-2 border-white dark:border-slate-900 transform active:scale-90 group-hover:scale-105 transition-all animate-ripple">
            <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 mt-0.5 tracking-tight group-hover:scale-105 transition-transform">Sell (+)</span>
        </button>

        {/* Messages */}
        <button
          onClick={onOpenChat}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 active:scale-90 relative"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Chat</span>
        </button>

        {/* User Account / Sign In */}
        {currentUser ? (
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold active:scale-90 transition-all relative"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-5 h-5 rounded-full object-cover border border-amber-400 hover:scale-110 transition-transform"
            />
            <span className="text-[10px] truncate max-w-[48px]">Account</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 active:scale-90 transition-all"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
};
