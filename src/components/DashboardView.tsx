import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Clock,
  ExternalLink,
  ChevronRight,
  Heart,
  Plus,
  Compass,
  ArrowUpRight,
  CheckCircle,
  Truck,
  CreditCard,
  AlertCircle,
  Award,
  Wallet,
  Activity
} from 'lucide-react';
import { Auction, Notification, Shipment, User } from '../types';

interface DashboardViewProps {
  user: User;
  auctions: Auction[];
  notifications: Notification[];
  shipments: Shipment[];
  onNavigateToView: (view: string) => void;
  onOpenAuctionDetail: (id: string) => void;
  onToggleWatchlist: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenAddFundsModal: () => void;
}

export default function DashboardView({
  user,
  auctions,
  notifications,
  shipments,
  onNavigateToView,
  onOpenAuctionDetail,
  onToggleWatchlist,
  onToggleFavorite,
  onOpenAddFundsModal
}: DashboardViewProps) {
  const [liveTime, setLiveTime] = useState('');

  // Clock in top-right of dashboard matching the image ("10:24:35 AM Saturday, May 11, 2024")
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      setLiveTime(`${timeStr} - ${dateStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter current active user bids & won items
  const liveAuctions = auctions.filter(a => a.status === 'active').slice(0, 4);
  const featuredAuctions = auctions.filter(a => a.status === 'active').slice(4, 8);
  const recentNotifications = notifications.slice(0, 4);
  const activeShipment = shipments[0];

  // Calculated state values matching the exact numbers in the screenshot
  const stats = [
    { title: 'Active Auctions', value: '12', trend: '+18% from last week', trendUp: true, icon: Compass, color: 'text-blue-600 bg-blue-500/10 border-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20' },
    { title: 'Won Auctions', value: '7', trend: '+12% from last week', trendUp: true, icon: Award, color: 'text-emerald-600 bg-emerald-500/10 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20' },
    { title: 'Pending Payments', value: '3', trend: '$2,340.00 due', trendUp: false, icon: CreditCard, color: 'text-rose-600 bg-rose-500/10 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20' },
    { title: 'Shipment Status', value: '4', trend: 'In Transit', trendUp: true, icon: Truck, color: 'text-sky-600 bg-sky-500/10 border-sky-100 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-500/20' },
    { title: 'Wallet Balance', value: `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, trend: 'Available Balance', trendUp: true, icon: Wallet, color: 'text-indigo-600 bg-indigo-500/10 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20' },
    { title: 'Total Bids', value: '156', trend: '+24% from last month', trendUp: true, icon: Activity, color: 'text-fuchsia-600 bg-fuchsia-500/10 border-fuchsia-100 dark:text-fuchsia-400 dark:bg-fuchsia-500/10 dark:border-fuchsia-500/20' }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 dark:bg-transparent min-h-screen text-slate-800 dark:text-slate-200 font-sans transition-all duration-300 relative z-10">
      
      {/* Welcome Title Block & Real-time clock */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">
            Here's what's happening with your auctions today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-xl px-4 py-2 self-start md:self-auto shadow-sm">
          <Clock className="h-4 w-4 text-[#8b5cf6]" />
          <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">{liveTime || "10:24:35 AM - Saturday, May 11, 2024"}</span>
        </div>
      </div>

      {/* Grid of Stats Cards matching screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((st, idx) => (
          <div
            key={idx}
            className="p-4 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider font-mono text-[#8b5cf6]">{st.title}</span>
              <div className={`h-8 w-8 rounded-xl border flex items-center justify-center flex-shrink-0 bg-white/10 border-white/10 text-white`}>
                <st.icon className="h-4 w-4 text-[#8b5cf6]" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-lg md:text-xl font-display font-bold text-slate-800 dark:text-white tracking-tight">{st.value}</h3>
              <p className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${st.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {st.trendUp && st.trend.startsWith('+') && <span className="text-xs">↗</span>}
                {st.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid - Bidding Activity (Line Chart) and Auction Overview (Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bidding Activity Line Chart (Custom responsive vector chart matching image) */}
        <div className="lg:col-span-8 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Bidding Activity</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Your custom bidding volume over the last 7 days</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#8b5cf6] cursor-pointer">
              <option>This Week</option>
              <option>Last Month</option>
            </select>
          </div>

          {/* SVG Line Chart representing the image */}
          <div className="relative h-48 w-full mt-2">
            <svg viewBox="0 0 700 180" className="w-full h-full">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="700" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800/50" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="700" y2="75" stroke="currentColor" className="text-slate-100 dark:text-slate-800/50" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="currentColor" className="text-slate-100 dark:text-slate-800/50" strokeDasharray="3 3" />
              <line x1="0" y1="165" x2="700" y2="165" stroke="currentColor" className="text-slate-200 dark:text-slate-850" />

              {/* Gradient definition for fill */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              {/* Fill area */}
              <path
                d="M 20 120 C 100 135, 140 85, 210 110 C 280 135, 330 60, 420 100 C 510 140, 560 30, 610 35 L 610 165 L 20 165 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth curve line */}
              <path
                d="M 20 120 C 100 135, 140 85, 210 110 C 280 135, 330 60, 420 100 C 510 140, 560 30, 610 35"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Points & Peak Indicator */}
              <circle cx="20" cy="120" r="5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="210" cy="110" r="5" fill="#a78bfa" stroke="#ffffff" strokeWidth="2" />
              <circle cx="420" cy="100" r="5" fill="#c084fc" stroke="#ffffff" strokeWidth="2" />
              
              {/* Highlight May 10 peak matching image */}
              <g className="cursor-pointer">
                <line x1="610" y1="35" x2="610" y2="165" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="610" cy="35" r="7" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2.5" />
                {/* Popover Badge "180 Bids" */}
                <rect x="575" y="-1" width="70" height="25" rx="6" className="fill-slate-800 dark:fill-[#111625] stroke-[#8b5cf6]" strokeWidth="1.5" />
                <text x="610" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">180 Bids</text>
              </g>

              {/* Days labels */}
              <text x="20" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 5</text>
              <text x="120" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 6</text>
              <text x="210" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 7</text>
              <text x="310" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 8</text>
              <text x="420" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 9</text>
              <text x="510" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 10</text>
              <text x="610" y="180" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">May 11</text>
            </svg>
          </div>
        </div>

        {/* Auction Overview Donut Chart */}
        <div className="lg:col-span-4 bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
          <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white mb-2">Auction Overview</h4>

          <div className="flex items-center justify-center gap-6 mt-2 flex-1">
            {/* SVG Donut Chart */}
            <div className="relative h-32 w-32 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Total ring placeholder */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" className="text-slate-100 dark:text-[#1d243d]" strokeWidth="3" />
                {/* Segment 1: Live (40%) -> Violet */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.2"
                  strokeDasharray="40 60"
                  strokeDashoffset="0"
                />
                {/* Segment 2: Ending Soon (20%) -> Pink/Rose */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.2"
                  strokeDasharray="20 80"
                  strokeDashoffset="-40"
                />
                {/* Segment 3: Sold (33%) -> Emerald */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.2"
                  strokeDasharray="33 67"
                  strokeDashoffset="-60"
                />
                {/* Segment 4: Cancelled (7%) -> Amber */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.2"
                  strokeDasharray="7 93"
                  strokeDashoffset="-93"
                />
              </svg>
              {/* Central text badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-display font-bold text-slate-800 dark:text-white leading-none">30</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mt-1">Total</span>
              </div>
            </div>

            {/* Custom chart legend matches the screenshot */}
            <div className="space-y-1.5 flex-1 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" /> Live
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">12 <span className="text-slate-400 font-normal">(40%)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#f43f5e]" /> Ending Soon
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">6 <span className="text-slate-400 font-normal">(20%)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]" /> Sold
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">10 <span className="text-slate-400 font-normal">(33%)</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-[#f59e0b]" /> Cancelled
                </span>
                <span className="text-slate-700 dark:text-slate-200 font-bold">2 <span className="text-slate-400 font-normal">(7%)</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Bottom Section: Live Auctions Grid/Table (Left) vs Right Panels (Notifications, Track Ship, Wallet) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Live Auctions Table & Featured horizontal cards */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Live Auctions Table */}
          <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Live Auctions</h4>
              <button
                onClick={() => onNavigateToView('auctions')}
                className="text-xs text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    <th className="pb-3 font-semibold">Item</th>
                    <th className="pb-3 font-semibold text-right">Current Bid</th>
                    <th className="pb-3 font-semibold text-center">Bidders</th>
                    <th className="pb-3 font-semibold text-center">Time Left</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {liveAuctions.map((auc) => {
                    // Estimate percentage of time left
                    const progressVal = 85; // fixed beautiful progress
                    return (
                      <tr key={auc.id} className="text-xs hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all group">
                        <td className="py-3.5 pr-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={auc.image}
                              alt={auc.title}
                              referrerPolicy="no-referrer"
                              className="h-11 w-11 rounded-lg object-cover border border-slate-100 dark:border-white/10"
                            />
                            <div>
                              <p className="font-semibold text-slate-800 dark:text-white group-hover:text-[#8b5cf6] dark:group-hover:text-[#a78bfa] transition-colors">{auc.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]">{auc.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-right font-mono font-bold text-slate-800 dark:text-white">
                          ${auc.currentBid.toLocaleString()}
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-sans font-medium mt-0.5">
                            ▲ ${auc.increment}
                          </span>
                        </td>
                        <td className="py-3.5 text-center text-slate-600 dark:text-slate-300 font-semibold font-mono">{auc.biddersCount}</td>
                        <td className="py-3.5 text-center font-mono font-semibold text-rose-500">
                          01h 24m 35s
                        </td>
                        <td className="py-3.5 w-24">
                          <div className="h-1.5 w-20 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#c084fc] rounded-full" style={{ width: `${progressVal}%` }} />
                          </div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">{progressVal}% complete</span>
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onOpenAuctionDetail(auc.id)}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9c73f8] hover:to-[#8b5cf6] text-white font-semibold text-[11px] transition-all cursor-pointer ripple-btn shadow-[0_2px_8px_rgba(139,92,246,0.25)]"
                            >
                              Bid Now
                            </button>
                            <button
                              onClick={() => onToggleWatchlist(auc.id)}
                              className={`p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer ${auc.isWatched ? 'text-rose-500 bg-rose-500/5' : 'text-slate-400'}`}
                            >
                              <Heart className="h-3.5 w-3.5 fill-current" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Featured Auctions Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Featured Auctions</h4>
              <button
                onClick={() => onNavigateToView('auctions')}
                className="text-xs text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
              >
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredAuctions.map((auc) => (
                <div
                  key={auc.id}
                  onClick={() => onOpenAuctionDetail(auc.id)}
                  className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-[#8b5cf6]/50 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={auc.image}
                      alt={auc.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Live
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(auc.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Heart className={`h-3.5 w-3.5 ${auc.isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-semibold text-xs text-slate-800 dark:text-white group-hover:text-[#8b5cf6] dark:group-hover:text-[#a78bfa] transition-colors line-clamp-1">{auc.title}</h5>
                      <div className="flex items-center gap-2 mt-1.5">
                        <img
                          src={auc.seller.avatar}
                          alt={auc.seller.name}
                          referrerPolicy="no-referrer"
                          className="h-5 w-5 rounded-full object-cover border border-slate-100 dark:border-white/10"
                        />
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{auc.seller.name}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-1">
                      <div>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Current Bid</span>
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">${auc.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Ends In</span>
                        <span className="text-[10px] font-mono font-semibold text-rose-500 flex items-center gap-0.5 justify-end">
                          <Clock className="h-3 w-3" /> 02h 10m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column Panels */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Notifications Widget matching the screenshot */}
          <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Recent Notifications</h4>
              <button
                onClick={() => onNavigateToView('notifications')}
                className="text-xs text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-white font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => notif.auctionId && onOpenAuctionDetail(notif.auctionId)}
                  className="p-3 bg-slate-50 dark:bg-white/[0.01] hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex gap-3 cursor-pointer transition-all"
                >
                  <div className="h-8 w-8 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">{notif.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5 truncate">{notif.message}</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Tracking Status Widget matching screenshot timeline */}
          {activeShipment && (
            <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Shipment Tracking</h4>
                <button
                  onClick={() => onNavigateToView('shipments')}
                  className="text-xs text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-white font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              {/* Progress visual timeline matching screenshot */}
              <div className="flex items-center justify-between relative px-2 py-1">
                {/* Horizontal progress bar behind circles */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 dark:bg-white/5 z-0">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-[#8b5cf6] to-slate-200 dark:to-white/10" style={{ width: '60%' }} />
                </div>

                {/* Steps */}
                {[
                  { label: 'Order Confirmed', active: true, done: true },
                  { label: 'Packed', active: true, done: true },
                  { label: 'In Transit', active: true, done: false, isCurrent: true },
                  { label: 'Out for Delivery', active: false, done: false },
                  { label: 'Delivered', active: false, done: false }
                ].map((step, idx) => {
                  let circleColor = 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500';
                  if (step.done) {
                    circleColor = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400';
                  } else if (step.isCurrent) {
                    circleColor = 'bg-[#8b5cf6]/10 border-[#8b5cf6] text-[#8b5cf6] animate-pulse';
                  }

                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-1">
                      <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${circleColor}`}>
                        {idx + 1}
                      </div>
                      <span className="text-[8px] font-medium text-slate-400 text-center max-w-[50px] hidden md:block">{step.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Estimated Delivery</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{activeShipment.estimatedDelivery}</span>
                </div>
                <button
                  onClick={() => onNavigateToView('shipments')}
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9c73f8] hover:to-[#8b5cf6] text-white font-semibold text-[10px] py-1.5 px-3 rounded-lg transition-all cursor-pointer shadow-[0_2px_8px_rgba(139,92,246,0.25)]"
                >
                  Track Order
                </button>
              </div>
            </div>
          )}

          {/* Wallet Overview Widget matching the screenshot */}
          <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-white">Wallet Overview</h4>
              <button
                onClick={() => onNavigateToView('payments')}
                className="text-xs text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-white font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-purple-950/40 dark:to-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase tracking-wider">Total Balance</span>
                <span className="text-xl font-mono font-bold text-slate-800 dark:text-white">
                  ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <button
                onClick={onOpenAddFundsModal}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9c73f8] hover:to-[#8b5cf6] text-white text-xs font-bold py-2 px-3 rounded-lg transition-all cursor-pointer shadow-[0_2px_8px_rgba(139,92,246,0.25)]"
              >
                + Add Funds
              </button>
            </div>

            {/* Quick transaction history */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Recent Transactions</span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <div className="truncate pr-2">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Auction Payment - Rolex Watch</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">May 11, 2024</span>
                  </div>
                  <span className="font-mono font-semibold text-rose-500">-$8,450.00</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <div className="truncate pr-2">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Wallet Top Up</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">May 9, 2024</span>
                  </div>
                  <span className="font-mono font-semibold text-emerald-500">+$5,000.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
