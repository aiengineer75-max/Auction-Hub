import React, { useState } from 'react';
import { Award, Clock, Heart, ArrowUpRight, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { Auction } from '../types';

interface MyBidsViewProps {
  auctions: Auction[];
  onOpenAuctionDetail: (id: string) => void;
  onNavigateToView: (view: string) => void;
}

export default function MyBidsView({
  auctions,
  onOpenAuctionDetail,
  onNavigateToView
}: MyBidsViewProps) {
  const [activeTab, setActiveTab] = useState<'bids' | 'won' | 'watchlist'>('bids');

  // Filter items specifically for user Rabia (user_01)
  const userBids = auctions.filter(a => 
    a.status === 'active' && 
    a.bidsHistory.some(b => b.isUser)
  );

  const wonAuctions = auctions.filter(a => 
    a.status === 'won' || 
    a.status === 'pending_payment' || 
    a.status === 'paid' || 
    a.status === 'shipped' || 
    a.status === 'delivered'
  );

  const watchedAuctions = auctions.filter(a => a.isWatched || a.isFavorited);

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
          My Bidding Activity <Award className="h-6 w-6 text-indigo-400" />
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Monitor your bidding competitions, won asset lots, and track your pending checkouts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {[
          { id: 'bids', label: `Active Bids (${userBids.length})` },
          { id: 'won', label: `Won Lots (${wonAuctions.length})` },
          { id: 'watchlist', label: `Watchlist (${watchedAuctions.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'bids' && (
        <div className="space-y-4">
          {userBids.length === 0 ? (
            <div className="p-12 bg-[#111625] border border-slate-800/80 rounded-2xl text-center space-y-3">
              <Clock className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="font-display font-semibold text-white">No active bids yet</h3>
              <p className="text-slate-400 text-xs">Browse our live catalogue to place your first competition bid!</p>
              <button
                onClick={() => onNavigateToView('auctions')}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userBids.map((auc) => {
                const userHighest = auc.bidsHistory.find(b => b.isUser)?.amount || 0;
                const isWinning = auc.currentBid === userHighest;
                
                return (
                  <div
                    key={auc.id}
                    onClick={() => onOpenAuctionDetail(auc.id)}
                    className="bg-[#111625] border border-slate-800/80 rounded-2xl p-5 flex gap-4 hover:border-slate-700 cursor-pointer transition-all duration-200"
                  >
                    <img src={auc.image} alt={auc.title} referrerPolicy="no-referrer" className="h-20 w-20 rounded-xl object-cover bg-slate-950 flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-sm text-white truncate">{auc.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{auc.category}</p>
                      </div>

                      <div className="flex justify-between items-end pt-2">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Your Bid</span>
                          <span className="text-sm font-mono font-bold text-white">${userHighest.toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border uppercase ${
                            isWinning 
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                              : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                          }`}>
                            {isWinning ? '★ Winning' : '⚠ Outbid'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'won' && (
        <div className="space-y-4">
          {wonAuctions.length === 0 ? (
            <div className="p-12 bg-[#111625] border border-slate-800/80 rounded-2xl text-center space-y-3">
              <Award className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="font-display font-semibold text-white">No won auctions yet</h3>
              <p className="text-slate-400 text-xs">Winning lots will appear here with secure payment options.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wonAuctions.map((auc) => {
                const isPendingPayment = auc.status === 'pending_payment' || auc.status === 'won';
                
                return (
                  <div
                    key={auc.id}
                    className="bg-[#111625] border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img src={auc.image} alt={auc.title} referrerPolicy="no-referrer" className="h-16 w-16 rounded-xl object-cover bg-slate-950 flex-shrink-0" />
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">{auc.title}</h4>
                        <div className="flex flex-wrap gap-2 mt-1.5 text-[10px]">
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                            Won Lot
                          </span>
                          <span className="text-slate-400 font-mono font-semibold">
                            Final Bid: ${auc.currentBid.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {isPendingPayment ? (
                        <button
                          onClick={() => onNavigateToView('payments')}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md ripple-btn"
                        >
                          <CreditCard className="h-4 w-4" /> Pay Now <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
                          <ShieldCheck className="h-4 w-4 text-emerald-400" /> Fully Paid & Secure
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          {watchedAuctions.length === 0 ? (
            <div className="p-12 bg-[#111625] border border-slate-800/80 rounded-2xl text-center space-y-3">
              <Heart className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="font-display font-semibold text-white">Your watchlist is empty</h3>
              <p className="text-slate-400 text-xs">Tap the heart icons on any lot to save them for quick monitoring.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {watchedAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onOpenAuctionDetail(auc.id)}
                  className="bg-[#111625] border border-slate-800/80 rounded-2xl p-5 flex gap-4 hover:border-slate-700 cursor-pointer transition-all duration-200"
                >
                  <img src={auc.image} alt={auc.title} referrerPolicy="no-referrer" className="h-20 w-20 rounded-xl object-cover bg-slate-950 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white truncate">{auc.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{auc.category}</p>
                    </div>

                    <div className="flex justify-between items-end pt-2">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Current Bid</span>
                        <span className="text-sm font-mono font-bold text-white">${auc.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-rose-400 font-mono font-semibold flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> Live Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
