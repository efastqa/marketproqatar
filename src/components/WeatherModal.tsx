import React from 'react';
import { 
  X, 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Compass, 
  Eye, 
  MapPin, 
  Mountain, 
  Sparkles, 
  Calendar,
  AlertCircle,
  Thermometer
} from 'lucide-react';
import { MataleWeatherData } from '../types';
import { FALLBACK_MATALE_WEATHER } from '../services/weatherService';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather?: MataleWeatherData;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({
  isOpen,
  onClose,
  weather = FALLBACK_MATALE_WEATHER
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Matale Live Weather & Climate Station
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Matale District, Central Province, Sri Lanka (7.4675° N, 80.6234° E)
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Main Weather Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-sky-800 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Matale Town & Surrounding Foothills</span>
                </div>
                <div className="text-4xl sm:text-6xl font-black tracking-tight flex items-baseline gap-1">
                  <span>{weather.temperatureC}°</span>
                  <span className="text-2xl font-light text-emerald-200">C</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {weather.condition}
                </div>
                {weather.conditionSinhala && (
                  <div className="text-xs text-emerald-200 font-medium">
                    {weather.conditionSinhala}
                  </div>
                )}
                <div className="text-xs text-emerald-100 mt-2">
                  Feels like {weather.feelsLikeC}°C • Elevation: ~{weather.elevationMeters}m MSL
                </div>
              </div>

              {/* Climate Metric Pills */}
              <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center sm:text-left min-w-[110px]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100 mb-0.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Humidity</span>
                  </div>
                  <div className="text-xl font-black font-mono">{weather.humidity}%</div>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center sm:text-left min-w-[110px]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100 mb-0.5">
                    <Wind className="w-3.5 h-3.5 text-sky-200" />
                    <span>Wind Speed</span>
                  </div>
                  <div className="text-xl font-black font-mono">{weather.windSpeedKmh} km/h</div>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center sm:text-left min-w-[110px]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100 mb-0.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-200" />
                    <span>Rainfall</span>
                  </div>
                  <div className="text-xl font-black font-mono">{weather.precipitationMm} mm</div>
                </div>

                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 text-center sm:text-left min-w-[110px]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100 mb-0.5">
                    <Sun className="w-3.5 h-3.5 text-amber-200" />
                    <span>UV Index</span>
                  </div>
                  <div className="text-xl font-black font-mono">{weather.uvIndex} (Moderate)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Knuckles & Tea Land Climate Advisory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <Mountain className="w-4 h-4 text-emerald-600" />
                <span>Knuckles Ridge Foothills Breeze</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {weather.knucklesNote}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Tea, Spices & Land Inspection</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                {weather.farmingNote}
              </p>
            </div>
          </div>

          {/* 5-Day Matale Forecast */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>5-Day Weather Forecast for Matale</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {weather.forecast.map((day, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    idx === 0 
                      ? 'bg-emerald-500/10 border-emerald-500/30 font-bold' 
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {day.day}
                  </span>
                  <div className="my-1 flex justify-center">
                    {day.condition.toLowerCase().includes('rain') ? (
                      <CloudRain className="w-6 h-6 text-sky-500" />
                    ) : day.condition.toLowerCase().includes('cloud') ? (
                      <CloudSun className="w-6 h-6 text-amber-500" />
                    ) : (
                      <Sun className="w-6 h-6 text-amber-500" />
                    )}
                  </div>
                  <div className="text-xs font-black text-slate-900 dark:text-white font-mono">
                    {day.tempMax}° / <span className="text-slate-400 font-normal">{day.tempMin}°</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate mt-1">
                    {day.condition}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Matale Microclimates */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Microclimate Conditions across Matale District:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">Riverston & Knuckles:</strong>
                <span>~20°C - Misty & Cool Highland winds</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">Matale Town & Aluvihare:</strong>
                <span>~27°C - Pleasant tropical valley</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white block">Dambulla & Sigiriya:</strong>
                <span>~31°C - Warm, sunny dry zone</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
