import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Heart,
  Grid,
  List,
  Flame,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { Auction } from '../types';
import { mockCategories } from '../data/mockData';

interface BrowseAuctionsViewProps {
  auctions: Auction[];
  onOpenAuctionDetail: (id: string) => void;
  onToggleWatchlist: (id: string) => void;
}

export default function BrowseAuctionsView({
  auctions,
  onOpenAuctionDetail,
  onToggleWatchlist
}: BrowseAuctionsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('ending_soon');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Search Logic
  const filteredAuctions = useMemo(() => {
    return auctions.filter(auc => {
      const matchCategory = selectedCategory === 'all' || auc.category === selectedCategory;
      const matchSearch = auc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          auc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = auc.currentBid <= priceRange;
      const matchCondition = selectedCondition === 'all' || auc.condition === selectedCondition;
      const isActive = auc.status === 'active'; // Only browse active ones

      return matchCategory && matchSearch && matchPrice && matchCondition && isActive;
    }).sort((a, b) => {
      if (sortBy === 'ending_soon') {
        return a.endTime - b.endTime;
      }
      if (sortBy === 'price_low_high') {
        return a.currentBid - b.currentBid;
      }
      if (sortBy === 'price_high_low') {
        return b.currentBid - a.currentBid;
      }
      if (sortBy === 'popular') {
        return b.views - a.views;
      }
      if (sortBy === 'bid_count') {
        return b.biddersCount - a.biddersCount;
      }
      return 0;
    });
  }, [auctions, selectedCategory, searchQuery, priceRange, selectedCondition, sortBy]);

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">Live Auctions Platform</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Browse, monitor, and place real-time bids on certified premium global assets.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within live items..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Category Tabs Scroll bar (Covers Electronics, Vehicles, Art, Fashion, Collectibles etc. pages 13-16) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 hide-scrollbar border-b border-slate-800/40">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-transparent shadow-lg shadow-blue-600/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          All Items ({auctions.filter(a => a.status === 'active').length})
        </button>
        {mockCategories.map((cat) => {
          const count = auctions.filter(a => a.category === cat.id && a.status === 'active').length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-transparent shadow-lg shadow-blue-600/10'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters & Sorting controls sidebar toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Filter Panel */}
        <div className="lg:col-span-3 bg-[#111625] border border-slate-800/80 rounded-2xl p-5 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-400" /> Filter Options
            </h4>
            <button
              onClick={() => {
                setPriceRange(100000);
                setSelectedCondition('all');
                setSortBy('ending_soon');
              }}
              className="text-[10px] text-slate-500 hover:text-blue-400 transition-colors font-semibold"
            >
              Reset Filters
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Max Bid Allowed</span>
              <span className="text-white font-bold font-mono">${priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="100000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$200</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>

          {/* Condition Filter */}
          <div className="space-y-2.5">
            <span className="text-xs text-slate-400 font-medium block">Asset Condition</span>
            <div className="space-y-2">
              {['all', 'New', 'Like New', 'Excellent', 'Good', 'Fair'].map((cond) => (
                <label key={cond} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === cond}
                    onChange={() => setSelectedCondition(cond)}
                    className="accent-blue-500 h-4 w-4 rounded-full border-slate-800 bg-slate-900"
                  />
                  <span>{cond === 'all' ? 'All Conditions' : cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Info Promo Box */}
          <div className="p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3">
            <Flame className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <div className="space-y-1">
              <h5 className="text-xs font-semibold text-white">Live Engine Active</h5>
              <p className="text-[10px] text-slate-400 leading-normal">
                Other simulated bidders are actively competing. Place bids early to secure item wins.
              </p>
            </div>
          </div>
        </div>

        {/* Products Listing Grid */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Sorting & layout toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#111625] border border-slate-800/80 rounded-2xl px-5 py-3.5">
            <span className="text-xs text-slate-400">
              Showing <span className="text-white font-bold font-mono">{filteredAuctions.length}</span> active auction lots
            </span>

            <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start">
              {/* Sorting */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="ending_soon">Ending Soon</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="bid_count">Bids Count</option>
                </select>
              </div>

              {/* View Grid vs List Layout */}
              <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 cursor-pointer ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Actual items list */}
          {filteredAuctions.length === 0 ? (
            <div className="bg-[#111625] border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <SlidersHorizontal className="h-12 w-12 text-slate-600" />
              <div>
                <h3 className="font-display font-semibold text-white">No active matches found</h3>
                <p className="text-slate-400 text-xs mt-1">Try resetting your price filter or browsing another category.</p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid layout
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onOpenAuctionDetail(auc.id)}
                  className="bg-[#111625] border border-slate-800/80 rounded-2xl overflow-hidden group hover:border-blue-500/50 hover:shadow-[0_4px_25px_rgba(37,99,235,0.12)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={auc.image}
                      alt={auc.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Info Tag */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white flex items-center gap-1 shadow-md">
                        <span className="h-1 w-1 rounded-full bg-white animate-pulse" /> LIVE
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
                        {auc.condition}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(auc.id);
                        }}
                        className={`p-1.5 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/5 hover:bg-slate-950 transition-colors ${auc.isWatched ? 'text-rose-500' : 'text-slate-300'}`}
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 font-mono">
                        {mockCategories.find(c => c.id === auc.category)?.name || auc.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-blue-400 transition-colors mt-0.5 line-clamp-2">
                        {auc.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-normal">
                        {auc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Current Bid</span>
                        <span className="text-sm font-mono font-bold text-white">${auc.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Time Left</span>
                        <span className="text-[10px] font-mono font-semibold text-rose-400 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" /> 01h 24m
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer ripple-btn mt-2">
                      Place Active Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List layout
            <div className="space-y-4">
              {filteredAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onOpenAuctionDetail(auc.id)}
                  className="bg-[#111625] border border-slate-800/80 rounded-2xl overflow-hidden group hover:border-blue-500/50 hover:shadow-[0_4px_25px_rgba(37,99,235,0.1)] transition-all duration-300 cursor-pointer p-4 flex flex-col sm:flex-row gap-4 items-stretch"
                >
                  <img
                    src={auc.image}
                    alt={auc.title}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-48 h-32 sm:h-auto object-cover rounded-xl bg-slate-950 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400 font-mono">
                          {mockCategories.find(c => c.id === auc.category)?.name || auc.category}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {auc.condition}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-white group-hover:text-blue-400 transition-colors mt-0.5">
                        {auc.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {auc.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex gap-6">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Current Bid</span>
                          <span className="text-sm font-mono font-bold text-white">${auc.currentBid.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Increment</span>
                          <span className="text-xs font-mono font-semibold text-emerald-400 mt-0.5 block">▲ ${auc.increment}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Bidders Count</span>
                          <span className="text-xs font-mono font-semibold text-slate-300 mt-0.5 block">{auc.biddersCount} competitors</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(auc.id);
                          }}
                          className={`p-2 rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors ${auc.isWatched ? 'text-rose-500' : 'text-slate-400'}`}
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer ripple-btn">
                          Place Active Bid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
