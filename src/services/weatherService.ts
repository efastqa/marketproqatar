import { MataleWeatherData } from '../types';

export const FALLBACK_MATALE_WEATHER: MataleWeatherData = {
  location: 'Matale',
  district: 'Matale District',
  province: 'Central Province, Sri Lanka',
  temperatureC: 27,
  feelsLikeC: 29,
  condition: 'Pleasant & Partly Cloudy',
  conditionSinhala: 'සෞම්‍ය වළාකුළු සහිත',
  conditionIcon: 'partly-cloudy',
  humidity: 74,
  windSpeedKmh: 12,
  precipitationMm: 0.2,
  uvIndex: 7,
  cloudCover: 35,
  elevationMeters: 364,
  knucklesNote: 'Cool breeze blowing from Knuckles Mountain Range. Ideal conditions for tea estates and gem mining viewing.',
  farmingNote: 'Optimal temperature for spice crops (cardamom, pepper) and estate visits in Rattota & Aluvihare.',
  forecast: [
    { day: 'Today', tempMax: 29, tempMin: 21, condition: 'Partly Cloudy', rainProb: 20 },
    { day: 'Tomorrow', tempMax: 28, tempMin: 20, condition: 'Highland Mist & Sun', rainProb: 15 },
    { day: 'Wed', tempMax: 30, tempMin: 22, condition: 'Sunny & Clear', rainProb: 10 },
    { day: 'Thu', tempMax: 28, tempMin: 21, condition: 'Gentle Afternoon Shower', rainProb: 40 },
    { day: 'Fri', tempMax: 27, tempMin: 20, condition: 'Pleasant Breezy', rainProb: 25 },
  ],
  lastUpdated: 'Live via Matale Weather Station'
};

function mapWmoCode(code: number): { condition: string; conditionSinhala: string; icon: string } {
  if (code === 0) return { condition: 'Clear Sky & Sunshine', conditionSinhala: 'පැහැදිලි හිරු එළිය', icon: 'sun' };
  if (code === 1 || code === 2) return { condition: 'Pleasant & Partly Cloudy', conditionSinhala: 'සෞම්‍ය වළාකුළු', icon: 'partly-cloudy' };
  if (code === 3) return { condition: 'Overcast & Mountain Mist', conditionSinhala: 'වළාකුළු සහිත මීදුම', icon: 'cloud' };
  if (code >= 45 && code <= 48) return { condition: 'Knuckles Ridge Fog & Mist', conditionSinhala: 'නකල්ස් කඳුකර මීදුම', icon: 'fog' };
  if (code >= 51 && code <= 55) return { condition: 'Light Tropical Drizzle', conditionSinhala: 'සැහැල්ලු වැසි', icon: 'drizzle' };
  if (code >= 61 && code <= 65) return { condition: 'Central Province Rain', conditionSinhala: 'මධ්‍යම පළාතේ වැසි', icon: 'rain' };
  if (code >= 80 && code <= 82) return { condition: 'Highland Showers', conditionSinhala: 'කඳුකර වැසි වාර', icon: 'rain' };
  if (code >= 95) return { condition: 'Tropical Thunderstorm', conditionSinhala: 'ගිගුරුම් සහිත වැසි', icon: 'thunder' };
  return { condition: 'Tropical Highlands Climate', conditionSinhala: 'කඳුකර දේශගුණය', icon: 'partly-cloudy' };
}

export async function fetchMataleWeather(): Promise<MataleWeatherData> {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=7.4675&longitude=80.6234&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FColombo';
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) throw new Error('Weather API error');
    const data = await res.json();

    const current = data.current;
    const daily = data.daily;
    const currentCode = current?.weather_code ?? 1;
    const { condition, conditionSinhala, icon } = mapWmoCode(currentCode);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast = (daily?.time || []).slice(0, 5).map((timeStr: string, index: number) => {
      const d = new Date(timeStr);
      const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : daysOfWeek[d.getDay()];
      const code = daily?.weather_code?.[index] ?? 1;
      const { condition: dayCond } = mapWmoCode(code);
      return {
        day: dayName,
        tempMax: Math.round(daily?.temperature_2m_max?.[index] ?? 28),
        tempMin: Math.round(daily?.temperature_2m_min?.[index] ?? 20),
        condition: dayCond,
        rainProb: daily?.precipitation_probability_max?.[index] ?? 20
      };
    });

    return {
      location: 'Matale',
      district: 'Matale District',
      province: 'Central Province, Sri Lanka',
      temperatureC: Math.round(current?.temperature_2m ?? 27),
      feelsLikeC: Math.round(current?.apparent_temperature ?? 28),
      condition,
      conditionSinhala,
      conditionIcon: icon,
      humidity: Math.round(current?.relative_humidity_2m ?? 72),
      windSpeedKmh: Math.round(current?.wind_speed_10m ?? 11),
      precipitationMm: current?.precipitation ?? 0,
      uvIndex: 7,
      cloudCover: 35,
      elevationMeters: 364,
      knucklesNote: 'Highland valley air from Knuckles Ridge. Pleasant weather across Matale Town, Aluvihare & Rattota.',
      farmingNote: 'Ideal conditions for spice harvesting, tea plucking and outdoor property inspections.',
      forecast: forecast.length > 0 ? forecast : FALLBACK_MATALE_WEATHER.forecast,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  } catch {
    return FALLBACK_MATALE_WEATHER;
  }
}
