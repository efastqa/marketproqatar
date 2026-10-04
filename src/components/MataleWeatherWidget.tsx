import React from 'react';
import { CloudSun, Sun, CloudRain, Wind, Droplets, MapPin, ChevronRight } from 'lucide-react';
import { MataleWeatherData } from '../types';
import { FALLBACK_MATALE_WEATHER } from '../services/weatherService';

interface MataleWeatherWidgetProps {
  weather?: MataleWeatherData;
  onOpenModal: () => void;
  variant?: 'pill' | 'compact' | 'card';
}

export const MataleWeatherWidget: React.FC<MataleWeatherWidgetProps> = ({
  weather = FALLBACK_MATALE_WEATHER,
  onOpenModal,
  variant = 'pill'
}) => {
  if (variant === 'pill') {
    return (
      <button
        onClick={onOpenModal}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 transition-all text-xs font-semibold group cursor-pointer"
        title="View Matale Weather & Forecast"
      >
        <CloudSun className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="font-bold font-mono">{weather.temperatureC}°C</span>
        <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Matale</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onOpenModal}
        className="flex items-center gap-2 p-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all text-left group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-400 text-white flex items-center justify-center shrink-0">
          <CloudSun className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </div>
        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <MapPin className="w-3 h-3 text-emerald-500" />
            <span>Matale, Sri Lanka</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
              {weather.temperatureC}°C
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 truncate">
              {weather.condition}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div 
      onClick={onOpenModal}
      className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-sky-800 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Matale Weather
        </span>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
          Highland Foothills
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-black font-mono">{weather.temperatureC}°C</div>
          <div className="text-xs font-semibold text-emerald-100">{weather.condition}</div>
        </div>
        <CloudSun className="w-10 h-10 text-amber-300" />
      </div>
      <div className="flex items-center justify-between text-[11px] text-emerald-100 mt-3 pt-2 border-t border-white/20">
        <span>Humidity: {weather.humidity}%</span>
        <span>Wind: {weather.windSpeedKmh} km/h</span>
      </div>
    </div>
  );
};
