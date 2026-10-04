import { GoldRateData } from '../types';

export const CURRENT_SRILANKA_GOLD_RATES: GoldRateData = {
  poun24k: 238500, // 24K 8-gram sovereign in LKR
  gram24k: 29812,  // 24K per gram in LKR
  poun22k: 218600, // 22K 8-gram sovereign in LKR (Standard Sri Lankan Jewelry Sovereign)
  gram22k: 27325,  // 22K per gram in LKR
  gram18k: 22350,  // 18K per gram in LKR
  silverGram: 385, // 925 Sterling Silver per gram in LKR
  currency: 'LKR',
  change24h: 850,
  changePercent: 0.39,
  lastUpdated: 'Live Sri Lanka Bullion Market',
  marketStatus: 'Open'
};

export interface GoldCalculationResult {
  karat: '24K' | '22K' | '18K';
  weightGrams: number;
  weightPoun: number;
  pureGoldGrams: number;
  marketValueLKR: number;
  pawningEstimateLKR: number; // typical 75-80% bank advance value (BOC, People's, Commercial)
  makingChargeEstimateLKR: number;
}

export function calculateGoldValue(
  karat: '24K' | '22K' | '18K',
  weightValue: number,
  unit: 'grams' | 'poun' = 'grams',
  rates: GoldRateData = CURRENT_SRILANKA_GOLD_RATES
): GoldCalculationResult {
  const weightGrams = unit === 'poun' ? weightValue * 8 : weightValue;
  const weightPoun = unit === 'poun' ? weightValue : weightValue / 8;
  
  let ratePerGram = rates.gram22k;
  let purity = 0.916; // 22K
  if (karat === '24K') {
    ratePerGram = rates.gram24k;
    purity = 0.999;
  } else if (karat === '18K') {
    ratePerGram = rates.gram18k;
    purity = 0.750;
  }

  const marketValueLKR = Math.round(weightGrams * ratePerGram);
  const pureGoldGrams = Number((weightGrams * purity).toFixed(2));
  // Standard Sri Lankan bank pawning rate is approx 75% of market value
  const pawningEstimateLKR = Math.round(marketValueLKR * 0.78);
  // Typical making charge estimation 8%
  const makingChargeEstimateLKR = Math.round(marketValueLKR * 0.08);

  return {
    karat,
    weightGrams: Number(weightGrams.toFixed(2)),
    weightPoun: Number(weightPoun.toFixed(3)),
    pureGoldGrams,
    marketValueLKR,
    pawningEstimateLKR,
    makingChargeEstimateLKR
  };
}
