import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Globe,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Auction } from '../types';
import { mockFAQ, mockCategories } from '../data/mockData';
import Logo from './Logo';

interface HomeViewProps {
  auctions: Auction[];
  onStartSignUp: () => void;
  onStartLogin: () => void;
}

export default function HomeView({ auctions, onStartSignUp, onStartLogin }: HomeViewProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const stats = [
    { label: 'Total Sales Volume', value: '$24.8M+' },
    { label: 'Verified Experts', value: '450+' },
    { label: 'Active Global Bidders', value: '180K+' },
    { label: 'Platform Trust Rating', value: '4.95 ★' }
  ];

  const benefits = [
    { title: 'Double physical authenticity check', desc: 'Every lot is physically examined by leading specialists before dispatch.', icon: ShieldCheck },
    { title: 'Dynamic real-time countdowns', desc: 'Sleek, down-to-the-second bid matches with automatic instant settlement.', icon: Zap },
    { title: 'Global VIP asset listings', desc: 'Direct secure access to limited art, luxury horology, and high-spec vehicles.', icon: Globe }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-600/30">
      
      {/* Premium Navigation Header Bar */}
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <button
              onClick={onStartLogin}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onStartSignUp}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-[0_2px_10px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] cursor-pointer hover:scale-102 active:scale-98 ripple-btn"
            >
              Create Account
            </button>
          </div>
        </div>
      </header>      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6 max-w-7xl mx-auto">
        
        {/* Animated ambient background glow dots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-emerald-600/10 blur-[80px] pointer-events-none z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full uppercase inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> The Billion-Dollar Auction Platform
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Bid, Win, and Own the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400">
                World's Finest Lots
              </span>
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              AuctionHub coordinates verified international experts, physical authenticity guarantees, and high-frequency live bidding systems to connect collectors with premium global assets securely.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onStartSignUp}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.5)] cursor-pointer flex items-center gap-2 group ripple-btn"
              >
                Join Bidding Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onStartLogin}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Explore Live Tickers
              </button>
            </div>
          </div>

          {/* Right Floating Card Illustration representing UI */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#111625] border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
              
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 relative">
                <img
                  src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600"
                  alt="Rolex Submariner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[9px] uppercase font-bold tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded shadow">
                  LIVE AUCTION
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-display font-bold text-base text-white">Rolex Submariner Date 2023</h4>
                  <span className="text-[10px] text-slate-500 font-mono">Verified lot by Horology Masters</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Current Bid</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">$8,450 USD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">Remaining</span>
                    <span className="text-xs font-mono font-bold text-rose-500">01h 24m 35s</span>
                  </div>
                </div>

                <button
                  onClick={onStartSignUp}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer ripple-btn"
                >
                  Place Live Bid Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Live Ticker Banner Bar */}
      <section className="bg-[#0b0e1a] border-y border-slate-900 py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center space-y-1">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{st.value}</h3>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-semibold">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Benefits / How it works */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Designed for Serious Collectors</h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Every layer of the AuctionHub platform is engineered to establish secure, frictionless trust and premium item control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((bef, idx) => (
            <div key={idx} className="bg-[#111625] border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center rounded-xl">
                <bef.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-semibold text-sm text-white">{bef.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{bef.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories Overview List */}
      <section className="bg-[#0b0e1a] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Diverse Premium Categories</h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1 leading-normal">Explore active bids across all specialty catalog folders.</p>
            </div>
            <button
              onClick={onStartSignUp}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 self-start md:self-auto cursor-pointer"
            >
              Browse Catalogue <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Categorized blocks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mockCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={onStartSignUp}
                className="bg-[#111625] border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 text-center space-y-3 cursor-pointer transition-all duration-200 hover:scale-102"
              >
                <div className="h-10 w-10 bg-blue-500/5 border border-blue-500/10 text-blue-400 flex items-center justify-center rounded-xl mx-auto">
                  <Compass className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-xs text-white truncate">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials sliding mock panel */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Trusted by Thousands</h2>
          <p className="text-slate-400 text-xs md:text-sm">Here is what verified bidders and institutional sellers say about our platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { quote: "Authenticating my vintage Rolex online felt risky until I completed my first purchase with AuctionHub. The dual-expert physical certificates and premium temperature-controlled DHL shipment was impeccable.", author: "Amir Rafiq", role: "Private Watch Collector, Lahore" },
            { quote: "As a gallery manager, listing high-value canvases requires robust, low-commission infrastructures. AuctionHub has the lowest seller commission rates (under 2%) and connects directly with verified high-frequency VIP buyers.", author: "Elena Rostova", role: "Elena Rostova Fine Art LLC" }
          ].map((test, idx) => (
            <div key={idx} className="bg-[#111625] border border-slate-800/80 p-6 rounded-3xl space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed italic">"{test.quote}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800/40">
                <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                  {test.author[0]}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{test.author}</h5>
                  <span className="text-[10px] text-slate-500">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collapsible FAQ list matches page 5 FAQ */}
      <section className="bg-[#0b0e1a] py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {mockFAQ.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div key={idx} className="bg-[#111625] border border-slate-800/80 rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center text-xs font-bold text-white cursor-pointer hover:bg-slate-900/40 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-blue-400" /> {faq.q}
                    </span>
                    <span className="text-slate-500 text-xs">{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-800/40 text-xs text-slate-400 leading-relaxed animate-in slide-in-from-top-2 duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-[#0d1220] border border-slate-800 p-8 md:p-12 rounded-3xl text-center space-y-6">
          <h3 className="text-2xl font-display font-bold text-white">Subscribe to VIP Auction Alerts</h3>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Receive early catalogs, direct notifications for rare lots, and monthly market reports curated by verified experts.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex items-center gap-2">
            <input
              type="email"
              required
              placeholder="Enter your personal email address"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              onClick={onStartSignUp}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer ripple-btn"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Block */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Premium physical-guaranteed international auction platform coordinating digital assets, watch horology, and high-spec vehicles.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-3.5">Specialties</h5>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Luxury Chronology</button></li>
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Abstract Canvas Paintings</button></li>
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Limited Edition Supercars</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-3.5">Trust Center</h5>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">专家认证专家</button></li>
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Refund Policies</button></li>
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Shipping Guarantees</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-3.5">Platform</h5>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">Join as Seller</button></li>
              <li><button onClick={onStartSignUp} className="hover:text-white transition-colors cursor-pointer">API Integration</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-900 text-center text-[10px] text-slate-600">
          <p>© 2026 AuctionHub Inc. Handcrafted to full investor specifications. All mock records simulated locally.</p>
        </div>
      </footer>

    </div>
  );
}
