import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  Mic,
  History,
  TrendingUp,
  Menu,
  CheckCircle,
  X,
  CreditCard,
  Truck,
  Award,
  CircleAlert,
  Palette,
  Check
} from 'lucide-react';
import { Notification, User } from '../types';
import { THEME_PRESETS } from '../constants/themes';

interface TopbarProps {
  user: User;
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClearNotification: (id: string) => void;
  onNavigateToView: (view: string) => void;
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export default function Topbar({
  user,
  notifications,
  onMarkAllRead,
  onClearNotification,
  onNavigateToView,
  onSearch,
  onToggleSidebar,
  darkMode,
  onToggleTheme,
  currentTheme,
  onSelectTheme
}: TopbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const recentSearches = ['Rolex Watch', 'MacBook Pro M3', 'Nike Air Jordan', 'Tesla S Plaid'];
  const trendingSearches = ['iPhone 15 Pro', 'Abstract Canvas', 'Gaming Chair', 'Julius Caesar Aureus'];

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global_search_input');
        if (searchInput) {
          searchInput.focus();
          setSearchFocused(true);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchFocused(false);
    }
  };

  const handleSearchSuggestionClick = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    setSearchFocused(false);
  };

  const startVoiceSearch = () => {
    setVoiceSearchActive(true);
    // Simulate voice search speech recognition
    setTimeout(() => {
      setSearchQuery('MacBook Pro M3 Max');
      onSearch('MacBook Pro M3 Max');
      setVoiceSearchActive(false);
      setSearchFocused(false);
    }, 2500);
  };

  return (
    <header className="sticky top-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md z-30 flex items-center justify-between px-6">
      
      {/* Mobile Sidebar Hamburger & Page Header Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 cursor-pointer flex items-center justify-center transition-colors duration-150"
          title="Toggle Navigation Sidebar"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative w-full max-w-md hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              id="global_search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search auctions, products, categories..."
              className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] rounded-xl pl-10 pr-16 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/10 transition-all duration-200"
            />
            <div className="absolute right-3 flex items-center gap-1">
              <button
                type="button"
                onClick={startVoiceSearch}
                className="p-1 hover:text-[#8b5cf6] dark:hover:text-[#a78bfa] text-slate-400 dark:text-slate-500 transition-colors cursor-pointer"
                title="Voice Search"
              >
                <Mic className={`h-4 w-4 ${voiceSearchActive ? 'text-rose-500 animate-pulse' : ''}`} />
              </button>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </div>
          </form>

          {/* Autocomplete / Suggestions Overlay */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 overflow-hidden animate-in fade-in duration-150 z-50">
              {/* Voice Search active overlay */}
              {voiceSearchActive && (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30 animate-ping">
                    <Mic className="h-6 w-6 text-rose-500" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">Listening to your voice...</p>
                  <p className="text-xs text-slate-500">Say what you are looking for (e.g. "Rolex Submariner")</p>
                </div>
              )}

              {!voiceSearchActive && (
                <div className="space-y-4">
                  {/* Recent Searches */}
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                      <History className="h-3 w-3" /> Recent Searches
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSearchSuggestionClick(s)}
                          className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-900/50 text-slate-300 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trending Searches */}
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                      <TrendingUp className="h-3 w-3" /> Trending Auctions
                    </h5>
                    <ul className="space-y-1.5">
                      {trendingSearches.map((s, idx) => (
                        <li key={idx}>
                          <button
                            type="button"
                            onClick={() => handleSearchSuggestionClick(s)}
                            className="w-full text-left text-xs text-slate-400 hover:text-white flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-950 transition-colors cursor-pointer"
                          >
                            <span className="text-indigo-400 text-[10px] font-mono">0{idx+1}</span>
                            <span>{s}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Topbar Utility Icons (Notification, Message, Theme, Profile) */}
      <div className="flex items-center gap-3">
        {/* Create Auction Shortcut Button */}
        <button
          onClick={() => onNavigateToView('create')}
          className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9c73f8] hover:to-[#8b5cf6] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_2px_10px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_15px_rgba(139,92,246,0.45)] cursor-pointer hover:scale-102 active:scale-98 hidden sm:block ripple-btn"
        >
          + Create Auction
        </button>

        {/* Theme & Palette Customize Toggle */}
        <div ref={themeRef} className="relative">
          <button
            onClick={() => {
              setShowThemeMenu(!showThemeMenu);
              setShowNotifications(false);
              setShowMessages(false);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer relative"
            title="Custom Theme & Colors"
          >
            <Palette className="h-4.5 w-4.5 text-primary-accent" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary-accent animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary-accent" />
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-4 z-50">
              <div className="pb-2.5 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
                <span className="font-semibold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Palette className="h-4 w-4 text-primary-accent" /> App Customizer
                </span>
              </div>
              
              {/* Theme Mode Toggle (Light/Dark) */}
              <div className="py-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Appearance</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (darkMode) onToggleTheme();
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      !darkMode
                        ? 'bg-primary-accent/10 border-primary-accent text-primary-accent font-bold'
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Sun className="h-3.5 w-3.5 text-amber-500" /> Light
                  </button>
                  <button
                    onClick={() => {
                      if (!darkMode) onToggleTheme();
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      darkMode
                        ? 'bg-primary-accent/10 border-primary-accent text-primary-accent font-bold'
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Moon className="h-3.5 w-3.5 text-blue-400" /> Dark
                  </button>
                </div>
              </div>

              {/* Accent Color Presets */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Accent Theme Color</span>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(THEME_PRESETS).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                        currentTheme === theme.id
                          ? 'border-primary-accent bg-primary-accent/5 text-primary-accent font-bold scale-102 shadow-sm'
                          : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${theme.previewBg} flex items-center justify-center text-white shadow-sm`}>
                        {currentTheme === theme.id && <Check className="h-3 w-3" />}
                      </div>
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Center Toggle */}
        <div ref={messageRef} className="relative">
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer relative"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-3 overflow-hidden z-50">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
                <span className="font-semibold text-sm text-slate-800 dark:text-white">Direct Messages</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded">1 Active</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-80 overflow-y-auto">
                <div
                  onClick={() => {
                    onNavigateToView('support');
                    setShowMessages(false);
                  }}
                  className="p-3 hover:bg-slate-50 dark:hover:bg-white/5 flex gap-3 cursor-pointer transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    AI
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">Auction Assistant AI</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Hi Rabia! Need help with your live bids?</p>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell Center */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 max-w-[calc(100vw-32px)] bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-3 overflow-hidden z-50">
              <div className="px-4 pb-2 border-b border-slate-100 dark:border-white/10 flex justify-between items-center">
                <span className="font-semibold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  Notification Center
                  {unreadCount > 0 && <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />}
                </span>
                <button
                  onClick={() => {
                    onMarkAllRead();
                    setShowNotifications(false);
                  }}
                  className="text-[11px] text-[#8b5cf6] hover:text-[#9c73f8] dark:text-[#a78bfa] dark:hover:text-[#8b5cf6] font-semibold cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => {
                    let Icon = Bell;
                    let color = 'text-blue-600 bg-blue-500/10 border-blue-500/20';
                    if (n.type === 'outbid') {
                      Icon = CircleAlert;
                      color = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
                    } else if (n.type === 'won') {
                      Icon = Award;
                      color = 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20';
                    } else if (n.type === 'payment_reminder') {
                      Icon = CreditCard;
                      color = 'text-amber-600 bg-amber-500/10 border-amber-500/20';
                    } else if (n.type === 'shipment') {
                      Icon = Truck;
                      color = 'text-sky-600 bg-sky-500/10 border-sky-500/20';
                    }

                    return (
                      <div
                        key={n.id}
                        className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 flex gap-3 transition-colors relative ${!n.read ? 'bg-blue-600/5 dark:bg-blue-600/10' : ''}`}
                      >
                        <div className={`h-8 w-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <p className={`text-xs font-semibold truncate ${!n.read ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">
                            {n.message}
                          </p>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 block mt-1">{n.time}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClearNotification(n.id);
                          }}
                          className="absolute right-3 top-3 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                          title="Dismiss"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <button
                  onClick={() => {
                    onNavigateToView('notifications');
                    setShowNotifications(false);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold cursor-pointer py-1 block w-full"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge matching screenshot ("Rabia - Verified") */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowMessages(false);
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer animate-none"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.username}
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white dark:border-slate-950" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-white">{user.username}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 animate-none">
                Verified <CheckCircle className="h-2.5 w-2.5 fill-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0d1220] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] py-2 overflow-hidden z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 font-semibold">Logged in as</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.email}</p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-1 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded inline-block">
                  Premium Member
                </p>
              </div>

              <div className="p-1">
                <button
                  onClick={() => {
                    onNavigateToView('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    onNavigateToView('mybids');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  My Bidding History
                </button>
                <button
                  onClick={() => {
                    onNavigateToView('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Account Settings
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
