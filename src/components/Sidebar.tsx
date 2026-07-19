import React from 'react';
import {
  LayoutDashboard,
  Gavel,
  Award,
  Heart,
  Bell,
  CreditCard,
  Truck,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronDown,
  X,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  unreadCount: number;
  onLogout: () => void;
  isPremium: boolean;
  onUpgrade: () => void;
  isOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  activeView,
  onNavigate,
  unreadCount,
  onLogout,
  isPremium,
  onUpgrade,
  isOpen = false,
  onCloseMobile
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'auctions',
      label: 'Live Auctions',
      icon: Gavel,
      badge: 'LIVE',
      hasDot: true
    },
    { id: 'mybids', label: 'My Bids & Wins', icon: Award },
    { id: 'watchlist', label: 'Saved Watchlist', icon: Heart },
    { id: 'social', label: 'Bidder Lounge', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadCount },
    { id: 'payments', label: 'Payments & Ledger', icon: CreditCard },
    { id: 'shipments', label: 'Shipment Tracking', icon: Truck },
    { id: 'support', label: 'AI Support Chat', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin Panel', icon: Settings, isAdmin: true }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 h-screen bg-black/40 backdrop-blur-3xl border-r border-white/10 flex flex-col py-6 gap-6 z-40 transition-all duration-300 ${
          isOpen
            ? 'translate-x-0 w-64 px-4 items-start md:sticky'
            : '-translate-x-full md:translate-x-0 md:sticky md:w-20 md:px-2 md:items-center'
        }`}
      >
        {/* Logo Box - Midnight Glass Purple Accent logo */}
        <div 
          className={`relative flex items-center gap-3 cursor-pointer mb-2 ${isOpen ? 'px-2 w-full' : 'justify-center w-full'}`} 
          onClick={() => handleItemClick('dashboard')}
        >
          <div
            className="w-11 h-11 bg-primary-accent text-white rounded-xl flex items-center justify-center font-extrabold text-xl shrink-0 hover:scale-105 transition-transform"
            style={{ boxShadow: '0 0 20px var(--theme-accent-glow-strong)' }}
          >
            B
          </div>
          {isOpen && (
            <div className="flex flex-col select-none">
              <span className="font-extrabold text-base tracking-tight text-white">
                Bid<span className="text-primary-accent">Battle</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest -mt-0.5">Premium Platform</span>
            </div>
          )}
          {/* Tooltip (only when narrow) */}
          {!isOpen && (
            <div className="absolute left-16 top-2 bg-slate-900 border border-slate-800 text-white px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all pointer-events-none z-50">
              BidBattle
            </div>
          )}
        </div>

        {/* Mobile close button inside the sidebar */}
        {isOpen && (
          <button
            onClick={onCloseMobile}
            className="absolute top-6 right-4 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 md:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Navigation Items */}
        <nav className={`flex-1 w-full flex flex-col gap-2 overflow-y-auto hide-scrollbar ${isOpen ? 'px-1' : 'items-center'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`group relative flex items-center transition-all duration-200 cursor-pointer ${
                  isOpen
                    ? `w-full h-11 px-3.5 rounded-xl gap-3 ${
                        isActive
                          ? 'bg-primary-accent/10 text-white border border-primary-accent/20 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`
                    : `w-12 h-12 rounded-xl justify-center ${
                        isActive
                          ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-primary-accent' : ''}`} />
                
                {isOpen ? (
                  // Expanded label
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className={`text-[13px] tracking-wide truncate ${isActive ? 'text-white font-medium' : 'text-slate-300 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span
                          className="text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider scale-90"
                          style={{ color: 'var(--theme-accent)', backgroundColor: 'var(--theme-accent-glow)' }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-[10px] font-bold bg-primary-accent text-white px-1.5 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  // Collapsed indicators
                  <>
                    {(item.hasDot || (item.count !== undefined && item.count > 0)) && (
                      <span
                        className="absolute top-2 right-2 w-2 h-2 bg-primary-accent rounded-full animate-pulse"
                        style={{ boxShadow: '0 0 8px var(--theme-accent)' }}
                      />
                    )}

                    {/* Floating Tooltip */}
                    <div className="absolute left-16 bg-slate-950/95 border border-white/10 text-white px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all pointer-events-none z-50 shadow-2xl">
                      <div className="flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            className="text-[9px] uppercase tracking-wider font-extrabold px-1 py-0.5 rounded"
                            style={{ color: 'var(--theme-accent)', backgroundColor: 'var(--theme-accent-glow)' }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout at bottom */}
        <div className="w-full pt-4 border-t border-white/5 flex flex-col items-center">
          <button
            onClick={onLogout}
            className={`group relative flex items-center transition-all duration-200 cursor-pointer ${
              isOpen
                ? 'w-full h-11 px-3.5 rounded-xl gap-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                : 'w-12 h-12 rounded-xl justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {isOpen ? (
              <span className="text-[13px] tracking-wide font-medium">Sign Out</span>
            ) : (
              /* Tooltip */
              <div className="absolute left-16 bg-rose-950 border border-rose-500/20 text-rose-200 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all pointer-events-none z-50 shadow-2xl">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
