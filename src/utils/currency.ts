export type CurrencyCode = 'LKR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'QAR';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nameSi?: string;
  nameAr?: string;
  rateFromLKR: number; // Multiply LKR by this rate to get target currency
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  LKR: {
    code: 'LKR',
    symbol: 'Rs.',
    name: 'Sri Lankan Rupee',
    nameSi: 'ශ්‍රී ලංකා රුපියල්',
    nameAr: '',
    rateFromLKR: 1,
    flag: '🇱🇰'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameSi: 'ඇමරිකානු ඩොලර්',
    nameAr: '',
    rateFromLKR: 0.0033, // ~300 LKR = 1 USD
    flag: '🇺🇸'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameSi: 'යුරෝ',
    nameAr: '',
    rateFromLKR: 0.0031,
    flag: '🇪🇺'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nameSi: 'බ්‍රිතාන්‍ය පවුම්',
    nameAr: '',
    rateFromLKR: 0.0026,
    flag: '🇬🇧'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    nameSi: 'ඩිරාම්',
    nameAr: '',
    rateFromLKR: 0.0121,
    flag: '🇦🇪'
  },
  QAR: {
    code: 'QAR',
    symbol: 'QAR',
    name: 'Qatari Riyal',
    nameSi: 'කටාර් රියාල්',
    nameAr: '',
    rateFromLKR: 0.012,
    flag: '🇶🇦'
  }
};

export function formatPriceWithCurrency(
  lkrPrice: number,
  currencyCode: CurrencyCode | string = 'LKR',
  unitSuffix: string = ''
): string {
  // Normalize legacy 'QAR' default to 'LKR' if not specified
  const targetCode: CurrencyCode = (currencyCode && currencyCode in CURRENCIES) 
    ? (currencyCode as CurrencyCode) 
    : 'LKR';

  const currency = CURRENCIES[targetCode] || CURRENCIES.LKR;
  const converted = Math.round(lkrPrice * currency.rateFromLKR);
  
  if (targetCode === 'USD' || targetCode === 'EUR' || targetCode === 'GBP') {
    return `${currency.symbol}${converted.toLocaleString()}${unitSuffix ? ` ${unitSuffix}` : ''}`;
  }
  
  return `${currency.symbol} ${converted.toLocaleString()}${unitSuffix ? ` ${unitSuffix}` : ''}`;
}
