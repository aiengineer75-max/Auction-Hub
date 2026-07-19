import React, { useState, useEffect } from 'react';
import {
  Clock,
  Heart,
  Eye,
  Award,
  ChevronLeft,
  Calendar,
  ShieldCheck,
  User,
  History,
  AlertTriangle,
  Sparkles,
  PartyPopper,
  Zap,
  DollarSign
} from 'lucide-react';
import { Auction, BidItem } from '../types';

interface AuctionDetailViewProps {
  auction: Auction;
  onBack: () => void;
  onPlaceBid: (auctionId: string, amount: number) => void;
  onToggleWatchlist: (id: string) => void;
  triggerConfetti?: () => void;
}

export default function AuctionDetailView({
  auction,
  onBack,
  onPlaceBid,
  onToggleWatchlist,
  triggerConfetti
}: AuctionDetailViewProps) {
  const [activeImage, setActiveImage] = useState(auction.image);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 2, seconds: 15 }); // Fast countdown for live feel!
  const [isExpired, setIsExpired] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentHighestBid, setCurrentHighestBid] = useState(auction.currentBid);
  const [bidders, setBidders] = useState<number>(auction.biddersCount);
  const [bidsHistory, setBidsHistory] = useState<BidItem[]>(auction.bidsHistory);
  const [userIsHighBidder, setUserIsHighBidder] = useState(
    auction.currentBidderId === 'user_01'
  );

  // 1. Real-time fast countdown timer for excitement!
  useEffect(() => {
    let secondsTotal = 135; // 2 min 15s to see it countdown fast in the live simulation!
    
    const timer = setInterval(() => {
      if (secondsTotal <= 0) {
        clearInterval(timer);
        setIsExpired(true);
        // If user is high bidder on expiry, celebrate!
        if (userIsHighBidder) {
          setShowCelebration(true);
          if (triggerConfetti) {
            triggerConfetti();
          }
        }
        return;
      }
      secondsTotal--;
      const d = Math.floor(secondsTotal / (3600 * 24));
      const h = Math.floor((secondsTotal % (3600 * 24)) / 3600);
      const m = Math.floor((secondsTotal % 3600) / 60);
      const s = secondsTotal % 60;
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, [userIsHighBidder]);

  // 2. Simulated Live Rival Bidding Engine!
  // Every 8-15 seconds, a random fake bidder puts a counter-bid if active and the user is currently high bidder!
  useEffect(() => {
    if (isExpired) return;

    const interval = setInterval(() => {
      // Rival bids only if the auction is active and user is high bidder
      if (userIsHighBidder && Math.random() > 0.4) {
        const incrementAmount = auction.increment;
        const newBidVal = currentHighestBid + incrementAmount;
        
        setCurrentHighestBid(newBidVal);
        setBidders(prev => prev + 1);
        setUserIsHighBidder(false);

        const names = ['Sarah Jenkins', 'Alex Mercer', 'Ahmad Khan', 'Sultan Al-Thani', 'Michael Chen', 'Dianne V.'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const rivalBid: BidItem = {
          id: `f_${Date.now()}`,
          bidderName: randomName,
          amount: newBidVal,
          time: 'Just now',
          isUser: false
        };

        setBidsHistory(prev => [rivalBid, ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [userIsHighBidder, currentHighestBid, isExpired, auction]);

  const handlePlaceBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const enteredAmount = Number(bidAmount);
    const minAllowed = currentHighestBid + auction.increment;

    if (!bidAmount || isNaN(enteredAmount)) {
      setErrorMessage('Please enter a valid numeric bid amount.');
      return;
    }

    if (enteredAmount < minAllowed) {
      setErrorMessage(`Your bid is too low. Minimum allowed bid is $${minAllowed.toLocaleString()}`);
      return;
    }

    // Success user bid!
    setCurrentHighestBid(enteredAmount);
    setBidders(prev => prev + 1);
    setUserIsHighBidder(true);
    setBidAmount('');

    const userBid: BidItem = {
      id: `u_${Date.now()}`,
      bidderName: 'Rabia',
      amount: enteredAmount,
      time: 'Just now',
      isUser: true
    };

    setBidsHistory(prev => [userBid, ...prev]);
    onPlaceBid(auction.id, enteredAmount);
    if (triggerConfetti) {
      triggerConfetti();
    }
  };

  const handleQuickBid = (pct: number) => {
    const minAllowed = currentHighestBid + auction.increment;
    const recommended = Math.max(minAllowed, Math.round(currentHighestBid * (1 + pct / 100)));
    setBidAmount(recommended.toString());
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans relative">
      
      {/* Celebration Overlay for Winning! */}
      {showCelebration && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="relative flex flex-col items-center max-w-md bg-[#131a30] border border-blue-500/50 p-8 rounded-3xl text-center space-y-4">
            
            {/* Elegant Floating Celebration Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-blue-500 h-2 w-2 rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `scale(${Math.random() * 1.5})`,
                    opacity: Math.random()
                  }}
                />
              ))}
            </div>

            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 text-white flex items-center justify-center glow-blue animate-[bounce_1s_infinite]">
              <PartyPopper className="h-10 w-10" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Lot Won Successfully
              </span>
              <h2 className="text-2xl font-display font-bold text-white mt-3">Congratulations, Rabia!</h2>
              <p className="text-slate-400 text-xs leading-relaxed mt-1.5">
                You won the bidding competition for <span className="text-blue-400 font-semibold">{auction.title}</span>!
              </p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 w-full">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Your Winning Bid</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">${currentHighestBid.toLocaleString()}</span>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setShowCelebration(false);
                  onBack();
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-800 hover:bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => setShowCelebration(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-blue-600/20 cursor-pointer ripple-btn"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
        >
          <ChevronLeft className="h-4 w-4" /> Back to listings
        </button>
        <span className="text-xs text-slate-500 font-mono">Lot ID: {auction.id}</span>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery and item full specifications */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Showcase Image */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl overflow-hidden aspect-video relative group">
            <img
              src={activeImage}
              alt={auction.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            
            {/* Condition Banner */}
            <span className="absolute bottom-4 left-4 text-xs font-bold tracking-wider px-3 py-1 rounded bg-slate-950/80 backdrop-blur-md text-blue-400 border border-blue-500/20 shadow-md uppercase">
              Condition: {auction.condition}
            </span>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
            {auction.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`h-16 w-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  activeImage === imgUrl ? 'border-blue-500' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={imgUrl} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>

          {/* Item Description Card */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">Item Specification</h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {auction.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/60 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                <div>
                  <p className="font-semibold text-slate-200">100% Authenticity Verified</p>
                  <span className="text-[10px] text-slate-500">Dual physical expert inspection</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4.5 w-4.5 text-blue-400" />
                <div>
                  <p className="font-semibold text-slate-200">Insurance Included</p>
                  <span className="text-[10px] text-slate-500">Fully insured premium shipping cover</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={auction.seller.avatar}
                alt={auction.seller.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover border border-slate-800"
              />
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  {auction.seller.name}
                  {auction.seller.isVerified && (
                    <span className="text-[9px] font-bold bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
                      Verified Seller
                    </span>
                  )}
                </p>
                <span className="text-[10px] text-slate-400">Seller Rating: ★ {auction.seller.rating}</span>
              </div>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-bold border border-slate-800 hover:border-slate-700 bg-slate-900 rounded-xl px-4 py-2 transition-all cursor-pointer">
              Contact Seller
            </button>
          </div>

        </div>

        {/* Right Column: Live Countdown, placing bid form, and real-time bids history logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Title & stats counts */}
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
              {auction.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-slate-500" /> {auction.views} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-slate-500" /> {auction.likes} likes
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-slate-500" /> {bidders} active bidders
              </span>
            </div>
          </div>

          {/* Countdown & Progress Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-center space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Countdown Timer</span>
              
              {isExpired ? (
                <span className="text-xl md:text-2xl font-display font-bold text-rose-500 block mt-2 animate-pulse">
                  AUCTION CLOSED
                </span>
              ) : (
                <div className="flex justify-center items-center gap-3 mt-2.5">
                  {[
                    { label: 'd', val: timeLeft.days },
                    { label: 'h', val: timeLeft.hours },
                    { label: 'm', val: timeLeft.minutes },
                    { label: 's', val: timeLeft.seconds }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex items-baseline gap-0.5">
                      <span className="text-2xl md:text-3xl font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
                        {unit.val.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold font-sans">{unit.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simulated remaining progress bar */}
            {!isExpired && (
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(timeLeft.minutes * 60 + timeLeft.seconds) / 135 * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 text-left block font-mono">Simulating real-time auction expiry...</span>
              </div>
            )}
          </div>

          {/* Bidding Engine Panel */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-6 space-y-5">
            
            {/* Current Price overview */}
            <div className="flex justify-between items-center bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Current Highest Bid</span>
                <span className="text-2xl font-mono font-bold text-white">${currentHighestBid.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Current Standing</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  userIsHighBidder
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/20 animate-pulse'
                }`}>
                  {userIsHighBidder ? '★ Winning' : '⚠ Outbid'}
                </span>
              </div>
            </div>

            {/* Bid Input form */}
            {!isExpired ? (
              <form onSubmit={handlePlaceBidSubmit} className="space-y-4">
                
                {/* Outbid warning feedback matches PDF description */}
                {errorMessage && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3 text-xs text-rose-400">
                    <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-300">Outbid Bid Warning</p>
                      <p className="mt-0.5 leading-normal">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Main bidding input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 block">
                    Enter Your Bid Amount
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 font-mono text-base font-bold">$</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Min: ${(currentHighestBid + auction.increment).toLocaleString()}`}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-2xl pl-8 pr-4 py-3.5 font-mono text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                    />
                    <span className="absolute right-4 text-[10px] uppercase font-bold text-slate-500 font-mono">
                      USD
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block font-sans">
                    Increment rule: Every bid must increase the highest by at least{' '}
                    <span className="font-semibold text-blue-400 font-mono">${auction.increment}</span>
                  </span>
                </div>

                {/* Quick Recommended Increments buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '+5%', val: 5 },
                    { label: '+10%', val: 10 },
                    { label: '+20%', val: 20 }
                  ].map((inc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickBid(inc.val)}
                      className="py-2 px-3 bg-slate-900 border border-slate-800 hover:border-blue-900 text-slate-300 rounded-xl text-xs font-mono font-semibold hover:text-white transition-all cursor-pointer"
                    >
                      {inc.label}
                    </button>
                  ))}
                </div>

                {/* Bid Now Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.5)] cursor-pointer active:scale-98 flex items-center justify-center gap-2 ripple-btn"
                >
                  <Zap className="h-4.5 w-4.5" /> Place Active Bid Now
                </button>
              </form>
            ) : (
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl text-center space-y-2">
                <p className="text-xs font-semibold text-slate-400">Bidding has officially concluded for this lot.</p>
                <p className="text-xs text-blue-400 font-bold">Winner: {userIsHighBidder ? 'Rabia (You!)' : 'Sarah Jenkins'}</p>
              </div>
            )}
          </div>

          {/* Bids Timeline Log History matches screenshot */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-3.5">
            <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <History className="h-4 w-4 text-slate-500" /> Bidding Activity Log ({bidsHistory.length})
            </h4>

            <div className="divide-y divide-slate-800/40 max-h-52 overflow-y-auto pr-1">
              {bidsHistory.map((bid, idx) => (
                <div key={bid.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${bid.isUser ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                    <span className={`font-semibold ${bid.isUser ? 'text-white' : 'text-slate-300'}`}>
                      {bid.bidderName} {bid.isUser && '(You)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-slate-500 font-mono">{bid.time}</span>
                    <span className="font-mono font-bold text-slate-200">${bid.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
