import React, { useState, useEffect, useRef } from 'react';
import { 
  UserPlus, 
  UserCheck, 
  MessageSquare, 
  Send, 
  Users, 
  CheckCircle, 
  Sparkles, 
  Compass, 
  Check,
  TrendingUp,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { User, Notification } from '../types';

interface SocialViewProps {
  user: User;
  onAddNotification: (notif: Notification) => void;
  onNavigateToView: (view: string) => void;
}

interface Companion {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  rating: number;
  followed: boolean;
  followingBack: boolean;
  status: 'idle' | 'following' | 'mutual';
  badges: string[];
}

interface Message {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  time: string;
}

export default function SocialView({ user, onAddNotification, onNavigateToView }: SocialViewProps) {
  // Preset AI Friends
  const [companions, setCompanions] = useState<Companion[]>(() => {
    try {
      const saved = localStorage.getItem('bidbattle_social_companions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'ahmad',
        name: 'Ahmad Khan',
        role: 'Exotic Car & Watch Dealer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        bio: 'Horology restorer & supercar specialist. Based in Lahore. Always hunting vintage Rolexes or high-frequency listings. Let’s collaborate!',
        rating: 4.8,
        followed: false,
        followingBack: false,
        status: 'idle',
        badges: ['Elite Dealer', 'PK Top Seller']
      },
      {
        id: 'sophia',
        name: 'Sophia Loren',
        role: 'Modern Art Curator',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        bio: 'Art historian and independent sculpture broker. Based in Milan. Passionate about post-modernist abstract lots. Talk art with me!',
        rating: 4.9,
        followed: false,
        followingBack: false,
        status: 'idle',
        badges: ['Fine Art Expert', 'Verified VIP']
      },
      {
        id: 'sarah',
        name: 'Sarah Jenkins',
        role: 'Vintage Rolex Expert',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
        bio: 'Complete mechanical movement geek. Based in London. Here to gossip about auction rivals and track pristine collectible timepieces.',
        rating: 4.95,
        followed: false,
        followingBack: false,
        status: 'idle',
        badges: ['Super Bidder', 'Watch Nerd']
      },
      {
        id: 'marcus',
        name: 'Marcus Aurelius',
        role: 'Rare Coins Historian',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        bio: 'Philosophical antiquities collector. Hunting ancient Byzantine coins and rare manuscripts. Let’s discuss wisdom and heritage.',
        rating: 4.75,
        followed: false,
        followingBack: false,
        status: 'idle',
        badges: ['Ancient History', 'Stoic Member']
      }
    ];
  });

  // Selected chat companion
  const [activeCompanionId, setActiveCompanionId] = useState<string>('ahmad');

  // Chats structure mapped by companion id
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>(() => {
    try {
      const saved = localStorage.getItem('bidbattle_social_chats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      ahmad: [
        { id: '1', sender: 'companion', text: 'Salam bhai! Ahmad here. Seen the active Rolex listings today? Absolute gold! How is the bidding going on your side?', time: '10:30 AM' }
      ],
      sophia: [
        { id: '1', sender: 'companion', text: 'Ciao! Delighted to connect with another premium collector on BidBattle. Are you admiring the abstract modern art lot today? It is truly spectacular!', time: '11:15 AM' }
      ],
      sarah: [
        { id: '1', sender: 'companion', text: 'Hi! So glad to have a fellow watch enthusiast here. Honestly, the competition on BidBattle is getting intense! Have you locked in any wins yet?', time: 'Yesterday' }
      ],
      marcus: [
        { id: '1', sender: 'companion', text: 'Greetings, my friend. In a world of fleeting digital items, physical masterpieces carry the serene echoes of history. What collections are you contemplating today?', time: 'Yesterday' }
      ]
    };
  });

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Persist companions and chats
  useEffect(() => {
    try {
      localStorage.setItem('bidbattle_social_companions', JSON.stringify(companions));
    } catch (e) {}
  }, [companions]);

  useEffect(() => {
    try {
      localStorage.setItem('bidbattle_social_chats', JSON.stringify(chatHistory));
    } catch (e) {}
  }, [chatHistory]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, activeCompanionId, isTyping]);

  // Handle Follow Flow
  const handleFollow = (id: string) => {
    setCompanions(prev => prev.map(comp => {
      if (comp.id === id) {
        if (comp.status === 'idle') {
          // Trigger automatic "follow back" after 1.5 seconds
          setTimeout(() => {
            setCompanions(latest => latest.map(c => {
              if (c.id === id) {
                // Add mutual state
                const mutualComp = { ...c, status: 'mutual' as const, followed: true, followingBack: true };
                
                // Add top level notifications
                onAddNotification({
                  id: `social_follow_${Date.now()}`,
                  title: '✨ New Mutual Follower!',
                  message: `${c.name} (${c.role}) appreciated your follow and followed you back! You can now send them messages in the Lounge.`,
                  type: 'general',
                  time: 'Just now',
                  read: false
                });

                return mutualComp;
              }
              return c;
            }));
          }, 1500);

          return { ...comp, status: 'following' as const, followed: true };
        } else {
          // Unfollow
          return { ...comp, status: 'idle' as const, followed: false, followingBack: false };
        }
      }
      return comp;
    }));
  };

  // Send Message Flow
  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMsg;
    if (!textToSend.trim()) return;

    setErrorMsg(null);
    setInputMsg('');

    const companionId = activeCompanionId;
    const companionObj = companions.find(c => c.id === companionId);

    // Build user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append to local state
    setChatHistory(prev => ({
      ...prev,
      [companionId]: [...(prev[companionId] || []), userMsg]
    }));

    // Trigger Typing Indicator
    setIsTyping(true);

    try {
      const historyToSend = (chatHistory[companionId] || []).slice(-10); // last 10 messages for context

      const response = await fetch('/api/social/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyToSend,
          username: user.username,
          characterId: companionId
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to communicate with AI Friend.');
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'companion',
        text: data.text || 'My apologies, I am distracted with an auction right now. Let us chat in a second!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => ({
        ...prev,
        [companionId]: [...(prev[companionId] || []), aiMsg]
      }));

    } catch (err: any) {
      console.error('Chat AI Friend Error:', err);
      setErrorMsg(err.message || 'Connecting with AI Friend timed out. Please check if your Gemini Key is active.');
    } finally {
      setIsTyping(false);
    }
  };

  const activeCompanion = companions.find(c => c.id === activeCompanionId) || companions[0];
  const activeChat = chatHistory[activeCompanionId] || [];

  // Suggestion chips
  const suggestedQueries: Record<string, string[]> = {
    ahmad: [
      'Seen any hot Rolex lots live?',
      'How to handle aggressive bidders?',
      'Which car model are you restoring?',
      'Recommend me some bidding tactics!'
    ],
    sophia: [
      'What makes abstract art valuable?',
      'Are sculpture lots a good investment?',
      'What is your favorite art movement?',
      'How do I authenticate canvas lots?'
    ],
    sarah: [
      'Tell me about Rolex caliber movements.',
      'How to spot a fake vintage dial?',
      'What watch are you currently bidding on?',
      'Who is our biggest bidding competitor?'
    ],
    marcus: [
      'Why collect ancient historical coins?',
      'Give me a bit of stoic bidding advice.',
      'What coin has the richest history?',
      'How should we react if we get outbid?'
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 font-sans min-h-[calc(100vh-120px)] flex flex-col">
      
      {/* Title block */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2.5">
              <Users className="h-7 w-7 text-indigo-400" /> Collector Social Lounge
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Connect with elite BidBattle connoisseurs. Follow professional collectors, build mutual relationships, and chat about auction strategies with responsive AI friends.
            </p>
          </div>
          <button
            onClick={() => onNavigateToView('auctions')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer self-start md:self-auto"
          >
            Explore Active Auctions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Grid: Suggestions & Friends List */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          
          {/* Elite Connoisseur Recommendations */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Compass className="h-4 w-4 text-indigo-400" /> Suggested for You
            </h3>

            <div className="divide-y divide-slate-800/40 space-y-4">
              {companions.map((comp) => (
                <div key={comp.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={comp.avatar}
                      alt={comp.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-slate-800 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {comp.name}
                        {comp.status === 'mutual' && (
                          <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5">
                            <Check className="h-2.5 w-2.5" /> Mutual
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-indigo-400 font-mono mt-0.5">{comp.role}</p>
                      <p className="text-xs text-slate-400 mt-1.5 leading-normal max-w-xs">{comp.bio}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {comp.badges.map((b, bIdx) => (
                          <span key={bIdx} className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleFollow(comp.id)}
                    className={`sm:self-center px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      comp.status === 'mutual'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400'
                        : comp.status === 'following'
                        ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/5'
                    }`}
                  >
                    {comp.status === 'mutual' ? (
                      <>
                        <UserCheck className="h-3.5 w-3.5" /> Mutual Friend
                      </>
                    ) : comp.status === 'following' ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" /> Following...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5" /> Follow
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chats List */}
          <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-3.5 flex-1 flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-400" /> Direct Messages
            </h3>

            <div className="space-y-2 flex-1 overflow-y-auto">
              {companions.map((comp) => {
                const isSelected = activeCompanionId === comp.id;
                const lastMessage = chatHistory[comp.id]?.slice(-1)[0];

                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveCompanionId(comp.id)}
                    className={`w-full text-left p-3 rounded-2xl flex items-center justify-between gap-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500/40 shadow-md'
                        : 'bg-slate-950/20 border-slate-800 hover:bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <img
                          src={comp.avatar}
                          alt={comp.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0"
                        />
                        {comp.status === 'mutual' && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111625] rounded-full" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white flex items-center gap-1">
                          {comp.name}
                          {comp.status === 'mutual' && (
                            <span className="text-[8px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded font-extrabold font-mono">Friend</span>
                          )}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 max-w-[200px]">
                          {lastMessage ? lastMessage.text : comp.role}
                        </p>
                      </div>
                    </div>
                    {lastMessage && (
                      <span className="text-[9px] text-slate-500 shrink-0 font-mono self-start mt-0.5">
                        {lastMessage.time}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Grid: Active Conversation Box */}
        <div className="lg:col-span-7 bg-[#111625] border border-slate-800/80 rounded-3xl flex flex-col h-[600px] overflow-hidden shadow-xl">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activeCompanion.avatar}
                alt={activeCompanion.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border border-slate-800"
              />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {activeCompanion.name}
                  {activeCompanion.status === 'mutual' && (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      ★ Mutual Friend
                    </span>
                  )}
                </h3>
                <span className="text-[10px] text-slate-400 block font-mono">{activeCompanion.role}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Connoisseur Rating</span>
              <span className="text-xs font-bold text-indigo-400">★ {activeCompanion.rating}</span>
            </div>
          </div>

          {/* Conversation Bubbles */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/20">
            {activeChat.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  <div className={`flex gap-2.5 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!isUser && (
                      <img
                        src={activeCompanion.avatar}
                        alt={activeCompanion.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-slate-800 mt-1 self-start shrink-0"
                      />
                    )}
                    <div>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                          isUser
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/5'
                            : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[9px] text-slate-500 block font-mono mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start items-center gap-2.5 animate-pulse">
                <img
                  src={activeCompanion.avatar}
                  alt={activeCompanion.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-slate-800"
                />
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400">
                  <div className="flex gap-1 items-center">
                    <span className="font-semibold text-slate-300">{activeCompanion.name}</span>
                    <span>is typing</span>
                    <span className="flex gap-0.5 items-center justify-center mt-1">
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-200" />
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-300" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-2 text-xs text-rose-400">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Prompt suggestions area */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/50 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">Ask:</span>
            {(suggestedQueries[activeCompanionId] || []).map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(undefined, q)}
                className="text-[10px] font-semibold bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500/30 text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat input form */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800/80">
            {activeCompanion.status !== 'mutual' && (
              <div className="mb-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] font-semibold text-amber-400 text-center">
                ⚠ You can chat with {activeCompanion.name} immediately, but click "Follow" above to unlock mutual buddy status!
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder={`Text ${activeCompanion.name}...`}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="h-10 w-10 shrink-0 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
