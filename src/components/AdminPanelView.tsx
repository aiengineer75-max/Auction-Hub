import React, { useState } from 'react';
import { Settings, Users, Gavel, BarChart3, TrendingUp, ShieldAlert, Check, X, FileText } from 'lucide-react';
import { Auction } from '../types';

interface AdminPanelViewProps {
  auctions: Auction[];
  onApproveAuctionLot: (id: string) => void;
  onRejectAuctionLot: (id: string) => void;
}

export default function AdminPanelView({
  auctions,
  onApproveAuctionLot,
  onRejectAuctionLot
}: AdminPanelViewProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'approvals' | 'users'>('metrics');

  const pendingApprovals = auctions.filter(a => a.views === 12 && a.likes === 3); // Simulated newly created user lots!

  const mockUsersList = [
    { name: 'Rabia', email: 'quee007ina@gmail.com', status: 'Premium Member', rating: '4.8 ★', joined: 'May 11, 2024' },
    { name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', status: 'Standard User', rating: '4.9 ★', joined: 'Feb 15, 2024' },
    { name: 'Ahmad Khan', email: 'ahmadk@outlook.com', status: 'Premium Seller', rating: '4.7 ★', joined: 'Mar 22, 2024' }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
          Platform Governance Console <Settings className="h-6 w-6 text-indigo-400" />
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Monitor system metrics, review custom lot approval requests, and coordinate platform sellers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {[
          { id: 'metrics', label: 'Overview Metrics', icon: BarChart3 },
          { id: 'approvals', label: `Pending Approvals (${pendingApprovals.length})`, icon: ShieldAlert },
          { id: 'users', label: 'Seller Directory', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          
          {/* Top Metric Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#111625] border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Revenue Volume</span>
              <span className="text-2xl font-mono font-bold text-emerald-400 mt-1 block">$188,420.00</span>
              <span className="text-[10px] text-emerald-400 block mt-1">▲ +12% from last week</span>
            </div>
            <div className="bg-[#111625] border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Platform Bidders</span>
              <span className="text-2xl font-mono font-bold text-white mt-1 block">4,285 users</span>
              <span className="text-[10px] text-emerald-400 block mt-1">▲ +8.5% new registrations</span>
            </div>
            <div className="bg-[#111625] border border-slate-800 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Active Lots</span>
              <span className="text-2xl font-mono font-bold text-indigo-400 mt-1 block">{auctions.filter(a => a.status === 'active').length} listings</span>
              <span className="text-[10px] text-slate-400 block mt-1">Under 2% commission fee lock</span>
            </div>
          </div>

          {/* Revenue chart mockup */}
          <div className="bg-[#111625] border border-slate-800 rounded-3xl p-6">
            <h4 className="font-display font-semibold text-sm text-white mb-4 flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-indigo-400" /> Revenue Growth Index
            </h4>

            {/* Custom SVG line chart representing premium metrics */}
            <div className="h-40 relative">
              <svg viewBox="0 0 600 120" className="w-full h-full">
                <line x1="0" y1="20" x2="600" y2="20" stroke="#1d243d" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="600" y2="60" stroke="#1d243d" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#1c2135" />
                
                <path
                  d="M 10 90 L 120 70 L 250 85 L 380 40 L 500 55 L 590 15"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                
                <circle cx="590" cy="15" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                <text x="590" y="30" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="end">May Peak</text>
              </svg>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="space-y-4">
          {pendingApprovals.length === 0 ? (
            <div className="p-12 bg-[#111625] border border-slate-800/80 rounded-2xl text-center space-y-3">
              <ShieldAlert className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="font-display font-semibold text-white">No pending approvals</h3>
              <p className="text-slate-400 text-xs">All user-submitted auction lots have been fully verified and are live.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map((auc) => (
                <div
                  key={auc.id}
                  className="bg-[#111625] border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={auc.image} alt={auc.title} referrerPolicy="no-referrer" className="h-14 w-14 rounded-xl object-cover bg-slate-900 flex-shrink-0" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{auc.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        Category: <span className="text-indigo-400 font-semibold">{auc.category}</span> | Starting Price:{' '}
                        <span className="text-white font-semibold">${auc.startingPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 self-end sm:self-auto">
                    <button
                      onClick={() => onRejectAuctionLot(auc.id)}
                      className="p-2 border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 rounded-xl transition-all cursor-pointer"
                      title="Reject Lot"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={() => onApproveAuctionLot(auc.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-md ripple-btn"
                    >
                      <Check className="h-4 w-4" /> Approve & Go Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-[#111625] border border-slate-800 rounded-3xl overflow-hidden p-5">
          <h4 className="font-display font-semibold text-sm text-white mb-4">Platform Verified Sellers</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  <th className="pb-3">Seller Name</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Trust Score</th>
                  <th className="pb-3">Account Standing</th>
                  <th className="pb-3 text-right">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {mockUsersList.map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 font-semibold text-white">{user.name}</td>
                    <td className="py-3 font-mono">{user.email}</td>
                    <td className="py-3 font-semibold text-indigo-400">{user.rating}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase text-[9px]">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500 font-mono">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
