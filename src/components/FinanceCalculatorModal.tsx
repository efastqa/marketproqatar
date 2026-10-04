import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Building2, 
  Car, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle,
  Trees,
  Coins
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface FinanceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  initialType?: 'vehicle' | 'property';
  listingTitle?: string;
}

interface BankOption {
  name: string;
  logo: string;
  carRate: number;
  mortgageRate: number;
  features: string[];
}

const SRI_LANKA_BANKS: BankOption[] = [
  {
    name: 'Bank of Ceylon (BOC)',
    logo: '🏛️ BOC',
    carRate: 11.5,
    mortgageRate: 12.0,
    features: ['State Bank Security', 'Up to 25 Years Housing / Land Loan', 'Matale Branch Direct Processing']
  },
  {
    name: 'Commercial Bank of Ceylon',
    logo: '🏦 ComBank',
    carRate: 12.0,
    mortgageRate: 12.5,
    features: ['Instant Pre-Approval', 'Vehicle Leasing & Land Mortgage', 'Competitive Interest Rates']
  },
  {
    name: 'Hatton National Bank (HNB)',
    logo: '🏢 HNB',
    carRate: 12.2,
    mortgageRate: 12.75,
    features: ['Flexible Repayment Options', 'Fast Digital Processing', 'Tea & Agro Estate Financing']
  },
  {
    name: 'Sampath Bank',
    logo: '🌟 Sampath',
    carRate: 12.0,
    mortgageRate: 12.5,
    features: ['Sannasa Land & Housing Loan', 'Zero Prepayment Penalties', 'Speedy Lease Approvals']
  }
];

export const FinanceCalculatorModal: React.FC<FinanceCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPrice = 7500000,
  initialType = 'property',
  listingTitle
}) => {
  const [loanType, setLoanType] = useState<'vehicle' | 'property'>(initialType);
  const [price, setPrice] = useState<number>(initialPrice || (loanType === 'vehicle' ? 5000000 : 15000000));
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(loanType === 'vehicle' ? 12.0 : 12.5);
  const [tenureYears, setTenureYears] = useState<number>(loanType === 'vehicle' ? 5 : 15);
  const [selectedBank, setSelectedBank] = useState<string>('Bank of Ceylon (BOC)');

  // Sync loanType change defaults
  const handleTypeChange = (type: 'vehicle' | 'property') => {
    setLoanType(type);
    if (type === 'vehicle') {
      if (price > 20000000) setPrice(6000000);
      setTenureYears(5);
      setInterestRate(12.0);
    } else {
      if (price < 3000000) setPrice(15000000);
      setTenureYears(15);
      setInterestRate(12.5);
    }
  };

  // Calculations
  const downPaymentAmount = useMemo(() => Math.round((price * downPaymentPercent) / 100), [price, downPaymentPercent]);
  const loanAmount = useMemo(() => Math.max(0, price - downPaymentAmount), [price, downPaymentAmount]);

  const calculation = useMemo(() => {
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = tenureYears * 12;

    if (totalMonths <= 0 || loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0
      };
    }

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / totalMonths;
      return {
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: 0,
        totalPayment: loanAmount
      };
    }

    // Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [loanAmount, interestRate, tenureYears]);

  const principalPercent = calculation.totalPayment > 0 
    ? Math.round((loanAmount / calculation.totalPayment) * 100) 
    : 100;
  const interestPercent = 100 - principalPercent;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Sri Lanka Land & Vehicle Finance Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Estimate monthly installments for Land, Houses & Vehicles in Matale (LKR)
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

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-8">
          
          {/* Loan Category Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
            <div className="grid grid-cols-2 gap-1 w-full sm:w-auto">
              <button
                onClick={() => handleTypeChange('property')}
                className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  loanType === 'property'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Trees className="w-4 h-4" />
                <span>Land & Housing Loan</span>
              </button>
              
              <button
                onClick={() => handleTypeChange('vehicle')}
                className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  loanType === 'vehicle'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Vehicle Leasing</span>
              </button>
            </div>

            {listingTitle && (
              <span className="text-xs text-slate-500 truncate max-w-xs px-2">
                Listing: <strong>{listingTitle}</strong>
              </span>
            )}
          </div>

          {/* Form & Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls (Spans 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Price Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label>Total Price (LKR)</label>
                  <span className="text-emerald-600 font-mono text-base font-black">
                    Rs. {price.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={loanType === 'vehicle' ? 1000000 : 2000000}
                  max={loanType === 'vehicle' ? 60000000 : 150000000}
                  step={loanType === 'vehicle' ? 500000 : 1000000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label>Down Payment ({downPaymentPercent}%)</label>
                  <span className="text-slate-900 dark:text-white font-mono">
                    Rs. {downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Tenure (Years) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label>Loan Duration (Tenure)</label>
                  <span className="text-slate-900 dark:text-white font-mono">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={loanType === 'vehicle' ? 7 : 25}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <label>Annual Interest Rate</label>
                  <span className="text-slate-900 dark:text-white font-mono">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={9.0}
                  max={18.0}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Sri Lanka Banks Comparison */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Sri Lanka Bank Benchmark:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SRI_LANKA_BANKS.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => {
                        setSelectedBank(b.name);
                        setInterestRate(loanType === 'vehicle' ? b.carRate : b.mortgageRate);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedBank === b.name
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-xs font-bold">{b.logo} {b.name}</div>
                      <div className="text-[11px] text-emerald-600 font-bold mt-1">
                        Rate: {loanType === 'vehicle' ? b.carRate : b.mortgageRate}% p.a.
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Card (Spans 5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div>
                <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider block">
                  Estimated Monthly Installment
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white mt-1">
                  Rs. {calculation.monthlyPayment.toLocaleString()}
                  <span className="text-sm font-normal text-emerald-200"> / mo</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-emerald-700/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Loan Principal:</span>
                  <span className="font-mono font-bold">Rs. {loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Interest Payable:</span>
                  <span className="font-mono font-bold text-amber-300">Rs. {calculation.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Loan Cost:</span>
                  <span className="font-mono font-black text-white">Rs. {calculation.totalPayment.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={PLATFORM_WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult Loan Officer via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
