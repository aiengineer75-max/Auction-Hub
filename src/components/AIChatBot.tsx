import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, X, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { SupportMessage } from '../types';
import { mockFAQ } from '../data/mockData';

interface AIChatBotProps {
  onNavigateToView: (view: string) => void;
}

export default function AIChatBot({ onNavigateToView }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'welcome',
      text: "Hi Rabia! How can I help you today? I can help you place bids, track shipments, handle payments, or answer frequently asked questions.",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { text: 'How do I place a bid?', action: 'bid_guide' },
    { text: 'Payment issues', action: 'payments' },
    { text: 'Track my order', action: 'shipments' },
    { text: 'Auction ending time?', action: 'ending_time' }
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // User message
    const userMsg: SupportMessage = {
      id: `u_${Date.now()}`,
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      let responseText = "I'm not quite sure about that request. Could you please rephrase or pick one of our support topics?";
      const cleaned = text.toLowerCase();

      if (cleaned.includes('place a bid') || cleaned.includes('how to bid') || cleaned.includes('bid guide')) {
        responseText = "To place a bid: \n1. Browse our Live Auctions or search for a specific item.\n2. Click on the item to open its details.\n3. Enter an amount higher than the Current Bid + Minimum Increment.\n4. Click 'Bid Now'. If successful, you will be the highest bidder! We will notify you if you are outbid.";
      } else if (cleaned.includes('payment') || cleaned.includes('pay') || cleaned.includes('wallet') || cleaned.includes('jazzcash') || cleaned.includes('easypaisa')) {
        responseText = "We support multiple checkout options including Credit/Debit Cards, Stripe, PayPal, and regional mobile wallets like JazzCash and EasyPaisa.\n\nTo view your pending payments, you can click on 'Payments' in the sidebar or let me take you there directly! Would you like to go to Payments?";
      } else if (cleaned.includes('track') || cleaned.includes('order') || cleaned.includes('shipment') || cleaned.includes('deliver')) {
        responseText = "You can track your won items from the 'Shipments' tab. All shipments are shipped via DHL Express Premium with fully-insured coverage. \n\nCurrently, your order for the 'Vintage Rolex Oyster Perpetual 1972' is In Transit with tracking number AH-88392-LHE. Expected delivery is May 15, 2024.";
      } else if (cleaned.includes('ending') || cleaned.includes('time') || cleaned.includes('countdown') || cleaned.includes('expire')) {
        responseText = "Each auction features a live real-time countdown timer down to the second. When the countdown reaches 00d 00h 00m 00s, bidding is disabled, and the highest bidder is announced as the winner! You will see a confetti celebration and receive a Winning Alert.";
      } else if (cleaned.includes('premium') || cleaned.includes('membership') || cleaned.includes('upgrade')) {
        responseText = "Upgrading to a Premium Member unlocks lower commission fees (2% instead of 10%), exclusive early access to ultra-luxury VIP lots (like the Patek Philippe 5711 or Tesla Model S Plaid), and 24/7 dedicated support. Click 'Upgrade Now' in the bottom-left of the sidebar to join!";
      } else if (cleaned.includes('hello') || cleaned.includes('hi ') || cleaned.includes('hey')) {
        responseText = "Hello Rabia! How can I assist you with your auctions today? 😊";
      } else {
        // Try to match with FAQ questions
        const matchedFAQ = mockFAQ.find(f => cleaned.includes(f.q.toLowerCase()) || f.q.toLowerCase().includes(cleaned));
        if (matchedFAQ) {
          responseText = matchedFAQ.a;
        }
      }

      const botMsg: SupportMessage = {
        id: `b_${Date.now()}`,
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (s: { text: string; action: string }) => {
    handleSendMessage(s.text);
    if (s.action === 'payments') {
      setTimeout(() => onNavigateToView('payments'), 1500);
    } else if (s.action === 'shipments') {
      setTimeout(() => onNavigateToView('shipments'), 1500);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="btn_chat_trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{ marginTop: '34px', width: '53.9954px', height: '35.9954px' }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-300 z-50 cursor-pointer active:scale-95 ripple-btn"
        aria-label="Open AI Assistant Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window Container */}
      {isOpen && (
        <div
          id="chat_window_container"
          className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] rounded-2xl border border-slate-800 bg-[#0c101d] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white glow-purple">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                  Auction Assistant AI
                  <Sparkles className="h-3 w-3 text-violet-400" />
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-400">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs ${
                    msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  {msg.sender === 'user' ? <UserIcon className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div className="flex flex-col gap-1">
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className={`text-[10px] text-slate-500 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="h-7 w-7 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-white">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-slate-900 text-slate-400 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-500 animate-[bounce_1.4s_infinite_0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-slate-500 animate-[bounce_1.4s_infinite_0.4s]" />
                    <span className="h-2 w-2 rounded-full bg-slate-500 animate-[bounce_1.4s_infinite_0.6s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800/60 flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(s)}
                className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg py-1.5 px-3 transition-colors cursor-pointer text-left"
              >
                {s.text}
              </button>
            ))}
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="h-10 w-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
