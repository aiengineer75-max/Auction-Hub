import React, { useState } from 'react';
import { CreditCard, CheckCircle, Smartphone, Award, DollarSign, RefreshCw, ChevronRight, FileText } from 'lucide-react';
import { Auction, Transaction } from '../types';

interface PaymentsViewProps {
  pendingAuctions: Auction[];
  walletBalance: number;
  onPaymentSuccess: (auctionId: string, amount: number) => void;
  transactions: Transaction[];
}

export default function PaymentsView({
  pendingAuctions,
  walletBalance,
  onPaymentSuccess,
  transactions
}: PaymentsViewProps) {
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(
    pendingAuctions.length > 0 ? pendingAuctions[0] : null
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Validation and submission simulation
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedAuction) {
      setErrorMessage('Please select a won auction lot to pay for.');
      return;
    }

    // Validation checks
    if (paymentMethod === 'card') {
      if (cardNumber.length < 16 || !cardExpiry || cardCVV.length < 3) {
        setErrorMessage('Please populate correct Card details (16-digit card number, CVV).');
        return;
      }
    } else if (paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') {
      if (mobileNumber.length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile account number.');
        return;
      }
    }

    // Process Animation simulation
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      if (selectedAuction) {
        onPaymentSuccess(selectedAuction.id, selectedAuction.currentBid);
      }
    }, 2500);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
          Secure Payments Center <CreditCard className="h-6 w-6 text-indigo-400" />
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Complete checkouts for won items, download official invoice receipts, and review wallet transactions.
        </p>
      </div>

      {paymentDone ? (
        // Success invoice matches page 10-11 of PDF
        <div className="max-w-2xl mx-auto bg-[#111625] border border-emerald-500/30 p-8 rounded-3xl space-y-6 text-center animate-in zoom-in-95 duration-300 shadow-2xl shadow-emerald-500/5">
          <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-white">Invoice Settlement Successful!</h3>
            <p className="text-slate-400 text-xs mt-1">Your payment receipt has been registered. Shipment tracking details are now active.</p>
          </div>

          {/* Receipt display details */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 text-left space-y-4">
            <div className="flex justify-between text-xs pb-3 border-b border-slate-800/60">
              <span className="text-slate-500 font-medium">Receipt Ref:</span>
              <span className="font-mono font-bold text-white">RC-88392-PK</span>
            </div>
            {selectedAuction && (
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Settled Lot Item</span>
                <div className="flex items-center gap-3">
                  <img src={selectedAuction.image} alt={selectedAuction.title} referrerPolicy="no-referrer" className="h-10 w-10 rounded-lg object-cover bg-slate-900" />
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-sm">{selectedAuction.title}</p>
                    <span className="text-[10px] text-slate-500">{selectedAuction.category}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/60 text-xs">
              <div>
                <span className="text-slate-500 block">Total Settled</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">${selectedAuction?.currentBid.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Payment Method</span>
                <span className="font-semibold text-slate-200 capitalize">{paymentMethod} Payment</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setPaymentDone(false);
                setSelectedAuction(pendingAuctions.length > 0 ? pendingAuctions[0] : null);
              }}
              className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Back to Checkout
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer ripple-btn"
            >
              <FileText className="h-4 w-4" /> Download Receipt Invoice
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout billing inputs */}
          <div className="lg:col-span-8 bg-[#111625] border border-slate-800/80 rounded-3xl p-6 space-y-6">
            <h3 className="font-display font-semibold text-sm text-white border-b border-slate-800/60 pb-3">
              Won Lot Settlement Invoice
            </h3>

            {pendingAuctions.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center gap-3">
                <CheckCircle className="h-10 w-10 text-emerald-500/20" />
                <p>No won items require immediate settlement invoice payment. Everything is clean!</p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 flex items-center gap-2">
                    <span>⚠</span> {errorMessage}
                  </div>
                )}

                {/* Selected Item selection */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold block">Select Won Item Lot</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pendingAuctions.map((auc) => (
                      <div
                        key={auc.id}
                        onClick={() => setSelectedAuction(auc)}
                        className={`p-3.5 border rounded-2xl flex gap-3 items-center cursor-pointer transition-all ${
                          selectedAuction?.id === auc.id
                            ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-600/5'
                            : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <img src={auc.image} alt={auc.title} referrerPolicy="no-referrer" className="h-10 w-10 rounded-lg object-cover bg-slate-900 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">{auc.title}</p>
                          <span className="text-[10px] text-indigo-400 font-mono font-bold block mt-0.5">${auc.currentBid.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Channel Methods */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold block">Choose Checkout Payment Channel</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'jazzcash', name: 'JazzCash Mobile Wallet', icon: Smartphone },
                      { id: 'easypaisa', name: 'EasyPaisa Wallet', icon: Smartphone },
                      { id: 'paypal', name: 'PayPal checkout', icon: CreditCard }
                    ].map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 border rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all gap-1.5 ${
                          paymentMethod === method.id
                            ? 'bg-indigo-600/10 border-indigo-500 text-white'
                            : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <method.icon className="h-5 w-5" />
                        <span className="text-[9px] font-bold leading-normal">{method.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Fields inputs */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 block">Cardholder Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Rabia"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 block">Card Number (16-Digit)</label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 block">Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-400 block">CVV (Security Code)</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Wallet inputs */}
                {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                  <div className="space-y-4 bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 block">Mobile Wallet Account Number (e.g. 03001234567)</label>
                      <input
                        type="text"
                        required
                        maxLength={11}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="03001234567"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      We will trigger a simulated push payment approval request dialog on your registered phone.
                    </p>
                  </div>
                )}

                {/* Processing/Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 text-white font-bold text-sm transition-all shadow-[0_4px_20px_rgba(99,102,241,0.3)] cursor-pointer active:scale-98 flex items-center justify-center gap-2 ripple-btn"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4.5 w-4.5 animate-spin" /> Processing Invoice Payment...
                    </>
                  ) : (
                    <>
                      Pay Secure Invoice (${selectedAuction?.currentBid.toLocaleString() || '0'}) <ChevronRight className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right column: Wallet overview & Ledger list */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Wallet Overview */}
            <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-4">
              <h4 className="font-display font-semibold text-sm text-white">Wallet Overview</h4>
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Verified Wallet Balance</span>
                <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">
                  ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Ledger Transactions Logs */}
            <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-3.5">
              <h4 className="font-display font-semibold text-sm text-white">Verified Transaction History</h4>
              
              <div className="divide-y divide-slate-800/40 space-y-2">
                {transactions.map((tx) => (
                  <div key={tx.id} className="pt-2.5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">{tx.auctionTitle || 'Wallet Topup'}</p>
                      <span className="text-[9px] text-slate-500 font-mono">{tx.date}</span>
                    </div>
                    <span className={`font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
