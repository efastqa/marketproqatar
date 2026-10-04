import React, { useState } from 'react';
import { Listing, PaymentTransaction } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Building2, 
  Smartphone, 
  Banknote,
  Sparkles,
  ArrowRight,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLATFORM_PHONE_DISPLAY } from '../data/mockData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: Listing | null;
  onTransactionComplete: (transaction: PaymentTransaction) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  listing,
  onTransactionComplete,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'QNB' | 'QPay' | 'NAPS_Debit' | 'ApplePay' | 'Card' | 'Cash_COD'>('QNB');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState('Abdullah Al-Kindi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  if (!isOpen || !listing) return null;

  const escrowFee = Math.round(listing.price * 0.01); // 1% escrow inspection & guarantee fee
  const totalPayable = listing.price + escrowFee;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const ref = `TXN-LK-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionRef(ref);
      setIsProcessing(false);
      setIsSuccess(true);

      const txn: PaymentTransaction = {
        id: ref,
        type: 'escrow_purchase',
        amount: totalPayable,
        currency: 'LKR',
        listingId: listing.id,
        listingTitle: listing.title,
        buyerName: cardHolder,
        sellerName: listing.seller.name,
        method: paymentMethod,
        status: 'escrow_held',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };

      onTransactionComplete(txn);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Sri Lanka Secure Payment Gateway
              </span>
              <h3 className="text-base font-black text-white">
                ebuymatale.lk Escrow Buyer Protection
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Receipt Screen */
          <div className="p-6 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Funds Held in Safe Escrow!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Your payment of <strong className="text-slate-900 dark:text-white">Rs. {totalPayable.toLocaleString()}</strong> has been securely locked in ebuymatale.lk Escrow account.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Transaction Ref:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{transactionRef}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Item:</span>
                <strong className="text-slate-900 dark:text-white truncate max-w-[200px]">{listing.title}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Seller:</span>
                <strong className="text-slate-900 dark:text-white">{listing.seller.name}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Method:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{paymentMethod} Gateway (Sri Lanka)</strong>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm">
                <span>Total Amount Escrowed:</span>
                <span className="text-emerald-600 dark:text-emerald-400">Rs. {totalPayable.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-[11px] text-amber-900 dark:text-amber-200 text-left">
              <p className="font-bold">Next Steps for Matale Handover:</p>
              <p className="mt-0.5">1. Meet seller to inspect item/deed at preferred Matale location.</p>
              <p>2. Once verified, release payment via SMS OTP or ebuymatale.lk dashboard.</p>
              <p>3. If item or deed is not as represented, receive 100% immediate refund.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg"
            >
              Done & Return to ebuymatale.lk
            </button>
          </div>
        ) : (
          /* Payment Form Screen */
          <form onSubmit={handlePay} className="p-5 sm:p-6 space-y-5">
            {/* Listing Summary */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-14 h-14 object-cover rounded-xl shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {listing.title}
                </h4>
                <p className="text-xs text-slate-500">{listing.seller.name} • {listing.location}</p>
                <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Item Price: Rs. {listing.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Gateway Options (Sri Lanka Standards) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                Select Sri Lanka Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* Bank Gateway */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('QNB')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'QNB'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-bold">Bank Transfer</span>
                  <span className="text-[9px] text-slate-400">BOC / Commercial</span>
                </button>

                {/* Card Gateway */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('QPay')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'QPay'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-bold">Card Pay</span>
                  <span className="text-[9px] text-slate-400">Visa / Master</span>
                </button>

                {/* LankaPay Debit */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NAPS_Debit')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'NAPS_Debit'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-600/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-bold">LankaPay</span>
                  <span className="text-[9px] text-slate-400">CBSL Compliant</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ApplePay')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 ${
                    paymentMethod === 'ApplePay'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span> Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 ${
                    paymentMethod === 'Card'
                      ? 'border-[#8A1538] bg-[#8A1538] text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>Visa / MC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash_COD')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 ${
                    paymentMethod === 'Cash_COD'
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5" />
                  <span>Cash Handover</span>
                </button>
              </div>
            </div>

            {/* Card Inputs Simulation */}
            {paymentMethod !== 'Cash_COD' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Cardholder Name (as on NIC / Card)
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full text-xs font-mono p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Listing Price:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs. {listing.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Escrow Inspection & Guarantee (1%):</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs. {escrowFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Escrow Authorization:</span>
                <span className="text-emerald-700 dark:text-emerald-400">Rs. {totalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Security Guarantee Note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>256-Bit SSL Encrypted under Central Bank of Sri Lanka (CBSL) Compliance.</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-600 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-transform active:scale-[0.98]"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Processing with Sri Lanka Secure Gateway...
                </>
              ) : (
                <>
                  <span>Authorize Escrow Payment (Rs. {totalPayable.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
