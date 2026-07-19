import React, { useState, useEffect } from 'react';
import {
  mockUser,
  initialAuctions,
  mockShipments as initialShipments,
  mockTransactions as initialTransactions,
  mockNotifications as initialNotifications
} from './data/mockData';
import { Auction, Shipment, Transaction, Notification } from './types';
import { THEME_PRESETS } from './constants/themes';

// Page Views
import HomeView from './components/HomeView';
import AuthView from './components/AuthView';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardView from './components/DashboardView';
import BrowseAuctionsView from './components/BrowseAuctionsView';
import AuctionDetailView from './components/AuctionDetailView';
import CreateAuctionView from './components/CreateAuctionView';
import MyBidsView from './components/MyBidsView';
import ShipmentsView from './components/ShipmentsView';
import PaymentsView from './components/PaymentsView';
import AdminPanelView from './components/AdminPanelView';
import AIChatBot from './components/AIChatBot';
import Confetti from './components/Confetti';

export default function App() {
  // Simulated Global Reactive State
  const [auctions, setAuctions] = useState<Auction[]>(initialAuctions);
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [walletBalance, setWalletBalance] = useState<number>(35000); // User starts with $35,000
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const triggerConfetti = () => {
    setConfettiTrigger(prev => prev + 1);
  };

  // Router State
  const [currentView, setCurrentView] = useState<string>('home'); // Starts at premium public Home landing page
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    try {
      return localStorage.getItem('auctionhub_theme') || 'violet';
    } catch (e) {
      return 'violet';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auctionhub_theme', currentTheme);
    } catch (e) {
      // Ignore SecurityError or other storage errors in sandboxed environments
    }
    const theme = THEME_PRESETS[currentTheme];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-accent-hover', theme.accentHover);
      root.style.setProperty('--theme-accent-light', theme.accentLight);
      root.style.setProperty('--theme-accent-secondary', theme.accentSecondary);
      root.style.setProperty('--theme-accent-glow', theme.accentGlow);
      root.style.setProperty('--theme-accent-glow-strong', theme.accentGlowStrong);
    }
  }, [currentTheme]);

  // Quick Action triggers
  const handleOpenAuctionDetail = (id: string) => {
    setSelectedAuctionId(id);
    setCurrentView('detail');
  };

  const handleToggleWatchlist = (id: string) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        const nextState = !auc.isWatched;
        // Trigger a temporary notification
        const newNotif: Notification = {
          id: `notif_${Date.now()}`,
          title: nextState ? 'Lot Saved' : 'Lot Removed',
          message: `${auc.title} has been ${nextState ? 'added to' : 'removed from'} your saved watchlist.`,
          type: 'general',
          time: 'Just now',
          read: false
        };
        setNotifications(n => [newNotif, ...n]);
        return { ...auc, isWatched: nextState, isFavorited: nextState };
      }
      return auc;
    }));
  };

  const handleAddAuction = (newAuction: Auction) => {
    setAuctions(prev => [newAuction, ...prev]);
    // Notify user of verification
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title: 'Lot Approval Pending',
      message: `"${newAuction.title}" submitted successfully. Awaiting Admin physical certification approval.`,
      type: 'general',
      time: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);
  };

  const handlePlaceBid = (auctionId: string, amount: number) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === auctionId) {
        return {
          ...auc,
          currentBid: amount,
          biddersCount: auc.biddersCount + 1,
          bidsHistory: [
            {
              id: `bid_${Date.now()}`,
              bidderName: 'Rabia',
              amount: amount,
              time: 'Just now',
              isUser: true
            },
            ...auc.bidsHistory
          ]
        };
      }
      return auc;
    }));

    // Trigger Notification log
    const target = auctions.find(a => a.id === auctionId);
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title: 'Winning Bid Placed',
      message: `Your bid of $${amount.toLocaleString()} on "${target?.title}" is registered as current high.`,
      type: 'outbid',
      time: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);
  };

  const handlePaymentSuccess = (auctionId: string, amount: number) => {
    // 1. Deduct from wallet balance
    setWalletBalance(prev => Math.max(0, prev - amount));

    // 2. Mark auction lot as paid
    setAuctions(prev => prev.map(auc => {
      if (auc.id === auctionId) {
        return { ...auc, status: 'paid' as any };
      }
      return auc;
    }));

    // 3. Create a transaction ledger record
    const target = auctions.find(a => a.id === auctionId);
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      amount: -amount,
      type: 'payment',
      status: 'success',
      date: 'Just now',
      auctionTitle: target?.title || 'Won Lot Payment'
    };
    setTransactions(prev => [newTx, ...prev]);

    // 4. Automatically provision a premium shipping card
    const newShip: Shipment = {
      id: `ship_${Date.now()}`,
      auctionId: auctionId,
      auctionTitle: target?.title || 'Premium Lot Cargo',
      auctionImage: target?.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      carrier: 'DHL Luxury Express Cargo',
      trackingNumber: `DHL-${Math.floor(100000 + Math.random() * 900000)}-PK`,
      status: 'in_transit',
      estimatedDelivery: 'Oct 24, 2026',
      timeline: [
        { status: 'confirmed', description: 'Payment verified and certified', location: 'London Depot', time: 'Just now' },
        { status: 'packed', description: 'Double physical expert inspection complete', location: 'London Depot', time: 'Just now' },
        { status: 'in_transit', description: 'Package handed over to air cargo flight', location: 'Heathrow Cargo', time: 'In progress' }
      ]
    };
    setShipments(prev => [newShip, ...prev]);

    // 5. Add notification
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title: 'Invoice Settlement Complete',
      message: `Fully settled invoice for $${amount.toLocaleString()}. DHL shipment tracking is now live.`,
      type: 'payment_reminder',
      time: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);
    triggerConfetti();
  };

  const handleApproveAuctionLot = (id: string) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        return { ...auc, status: 'active' };
      }
      return auc;
    }));

    const target = auctions.find(a => a.id === id);
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title: 'Lot Approved & Live',
      message: `"${target?.title}" passed expert validation and is now listing for active live bids.`,
      type: 'general',
      time: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);
  };

  const handleRejectAuctionLot = (id: string) => {
    setAuctions(prev => prev.filter(auc => auc.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddFunds = (amt: number) => {
    setWalletBalance(prev => prev + amt);
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      amount: amt,
      type: 'topup',
      status: 'success',
      date: 'Just now',
      auctionTitle: 'Wallet Deposit Funding'
    };
    setTransactions(prev => [newTx, ...prev]);

    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title: 'Funds Deposited',
      message: `Successfully funded $${amt.toLocaleString()} to your primary bidding account balance.`,
      type: 'general',
      time: 'Just now',
      read: false
    };
    setNotifications(n => [newNotif, ...n]);
  };

  // Auth Handling
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setCurrentView('dashboard'); // Takes them straight to dashboard after login!
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setCurrentView('home');
  };

  const handleSearch = (query: string) => {
    // Navigate to auctions view and let query be handled there if any, simple router redirect
    setCurrentView('auctions');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentLoggedInUser = {
    ...mockUser,
    balance: walletBalance
  };

  // Core Router View Switcher
  const renderMainViewContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            user={currentLoggedInUser}
            auctions={auctions}
            notifications={notifications}
            shipments={shipments}
            onNavigateToView={setCurrentView}
            onOpenAuctionDetail={handleOpenAuctionDetail}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleFavorite={handleToggleWatchlist}
            onOpenAddFundsModal={() => handleAddFunds(5000)} // Quick topup of $5,000 for convenience!
          />
        );
      case 'auctions':
        return (
          <BrowseAuctionsView
            auctions={auctions}
            onOpenAuctionDetail={handleOpenAuctionDetail}
            onToggleWatchlist={handleToggleWatchlist}
          />
        );
      case 'detail':
        const target = auctions.find(a => a.id === selectedAuctionId);
        if (!target) return <p className="p-6">Lot not found.</p>;
        return (
          <AuctionDetailView
            auction={target}
            onBack={() => setCurrentView('auctions')}
            onPlaceBid={handlePlaceBid}
            onToggleWatchlist={handleToggleWatchlist}
            triggerConfetti={triggerConfetti}
          />
        );
      case 'create':
        return (
          <CreateAuctionView
            onAddAuction={handleAddAuction}
            onNavigateToView={setCurrentView}
          />
        );
      case 'bids':
      case 'mybids':
        return (
          <MyBidsView
            auctions={auctions}
            onOpenAuctionDetail={handleOpenAuctionDetail}
            onNavigateToView={setCurrentView}
          />
        );
      case 'shipments':
        return <ShipmentsView shipments={shipments} />;
      case 'payments':
        const pending = auctions.filter(a => a.status === 'pending_payment' || a.status === 'won');
        return (
          <PaymentsView
            pendingAuctions={pending}
            walletBalance={walletBalance}
            onPaymentSuccess={handlePaymentSuccess}
            transactions={transactions}
          />
        );
      case 'admin':
        return (
          <AdminPanelView
            auctions={auctions}
            onApproveAuctionLot={handleApproveAuctionLot}
            onRejectAuctionLot={handleRejectAuctionLot}
          />
        );
      default:
        return (
          <DashboardView
            user={currentLoggedInUser}
            auctions={auctions}
            notifications={notifications}
            shipments={shipments}
            onNavigateToView={setCurrentView}
            onOpenAuctionDetail={handleOpenAuctionDetail}
            onToggleWatchlist={handleToggleWatchlist}
            onToggleFavorite={handleToggleWatchlist}
            onOpenAddFundsModal={() => handleAddFunds(5000)}
          />
        );
    }
  };

  // PUBLIC RENDERS: If user hasn't logged in, they only see public landing, sign up, or login
  if (!isLoggedIn) {
    if (currentView === 'auth_login') {
      return <AuthView onLoginSuccess={handleLoginSuccess} initialMode="login" />;
    }
    if (currentView === 'auth_signup') {
      return <AuthView onLoginSuccess={handleLoginSuccess} initialMode="signup" />;
    }
    return (
      <HomeView
        auctions={auctions}
        onStartLogin={() => setCurrentView('auth_login')}
        onStartSignUp={() => setCurrentView('auth_signup')}
      />
    );
  }

  // LOGGED-IN RENDER: Standard App layouts with Sidebar + Topbar + Chatbot!
  return (
    <div className={`flex min-h-screen font-sans selection:bg-[#8b5cf6]/30 relative overflow-hidden ${
      darkMode ? 'bg-[#0a0a0c] text-slate-100 dark' : 'bg-[#F8FAFC] text-slate-800'
    }`}>
      
      {/* Premium Ambient Glowing Orb (Midnight Glass) */}
      {darkMode && (
        <div className="fixed -top-[200px] -right-[200px] w-[600px] h-[600px] bg-gradient-to-br from-primary-accent/10 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
      )}
      
      {/* Dynamic Left Sidebar Drawer Navigation */}
      <Sidebar
        activeView={currentView}
        onNavigate={setCurrentView}
        unreadCount={unreadCount}
        onLogout={handleLogout}
        isPremium={true}
        onUpgrade={() => {}}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* Topbar with notification badges */}
        <Topbar
          user={currentLoggedInUser}
          notifications={notifications}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onClearNotification={handleClearNotification}
          onNavigateToView={setCurrentView}
          onSearch={handleSearch}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
        />

        {/* Scrollable View Frame */}
        <main className="flex-grow overflow-y-auto">
          {renderMainViewContent()}
        </main>

      </div>

      {/* Floating simulated AI Assistant */}
      <AIChatBot onNavigateToView={setCurrentView} />

      {/* Full-screen high-performance celebratory Confetti */}
      <Confetti trigger={confettiTrigger} />

    </div>
  );
}
