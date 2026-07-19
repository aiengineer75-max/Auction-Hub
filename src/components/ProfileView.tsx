import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, User as UserIcon, Mail, Phone, MapPin, Award, Sparkles, CheckCircle, Save, Undo } from 'lucide-react';
import { User } from '../types';
import { presetAvatars } from './AuthView';

interface ProfileViewProps {
  user: User;
  onUpdateProfile: (updates: { username: string; avatar: string; bio: string; phone: string; address: string }) => void;
  onNavigateToView: (view: string) => void;
}

export default function ProfileView({ user, onUpdateProfile, onNavigateToView }: ProfileViewProps) {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);
  const [bio, setBio] = useState(user.bio);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Avatar image must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Username cannot be empty.');
      return;
    }
    
    onUpdateProfile({
      username,
      avatar,
      bio,
      phone,
      address
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setErrorMsg(null);
  };

  const handleReset = () => {
    setUsername(user.username);
    setAvatar(user.avatar);
    setBio(user.bio);
    setPhone(user.phone);
    setAddress(user.address);
    setCustomAvatarUrl('');
    setErrorMsg(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-800 dark:text-slate-200 font-sans relative z-10 transition-all duration-300">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <UserIcon className="h-7 w-7 text-[#8b5cf6]" /> My Profile Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">
            Customize how you appear to others, manage your coordinates, and view your bidder reputation.
          </p>
        </div>
        <button
          onClick={() => onNavigateToView('dashboard')}
          className="px-4 py-2 bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-xs font-bold rounded-xl transition-all cursor-pointer text-slate-700 dark:text-slate-300 self-start md:self-auto"
        >
          Back to Dashboard
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs font-semibold text-emerald-400 flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle className="h-5 w-5" />
          <span>Profile configuration has been updated successfully! Your details will sync across all views immediately.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-semibold text-rose-400 flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle className="h-5 w-5 text-rose-450" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Avatar & Reputation */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white/80 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
            <div className="relative group">
              <img
                src={avatar}
                alt={username}
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#8b5cf6]/40 shadow-xl"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-[#8b5cf6] text-white p-2 rounded-full hover:scale-110 transition-transform cursor-pointer shadow-lg border border-white/20"
                title="Upload Photo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <h3 className="text-base font-bold text-slate-800 dark:text-white mt-4 flex items-center gap-1.5">
              {username || 'Anonymous User'}
              {user.isVerified && (
                <CheckCircle className="h-4 w-4 fill-emerald-500/10 text-emerald-500" />
              )}
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 font-mono mt-0.5">{user.email}</p>
            
            {user.isPremium && (
              <span className="mt-2 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                👑 Premium VIP Member
              </span>
            )}

            <div className="grid grid-cols-2 gap-4 w-full border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-4 text-xs">
              <div className="text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Buyer Rating</p>
                <p className="text-sm font-bold text-[#8b5cf6] mt-0.5">★ {user.buyerRating}</p>
              </div>
              <div className="text-center border-l border-slate-100 dark:border-slate-800/60">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Seller Rating</p>
                <p className="text-sm font-bold text-emerald-500 mt-0.5">★ {user.sellerRating}</p>
              </div>
            </div>
          </div>

          {/* User Achievements / Badges */}
          <div className="bg-white/80 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#8b5cf6]" /> Verified Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.achievements.map((ach, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold bg-[#8b5cf6]/5 dark:bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] dark:text-[#a78bfa] px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <Sparkles className="h-2.5 w-2.5" />
                  {ach}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Fields & Custom Avatar list */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Avatar Selector Presets Block */}
          <div className="bg-white/80 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Choose Preset Avatar or URL</h4>
            
            <div className="flex flex-wrap gap-3 items-center">
              {presetAvatars.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    setAvatar(av.url);
                    setCustomAvatarUrl('');
                  }}
                  className={`relative rounded-full overflow-hidden w-11 h-11 border-2 transition-all cursor-pointer ${
                    avatar === av.url ? 'border-[#8b5cf6] scale-110 shadow-lg' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                  title={av.name}
                >
                  <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs text-slate-400 font-medium">Or paste any custom image URL:</span>
              <div className="relative flex items-center">
                <ImageIcon className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => {
                    setCustomAvatarUrl(e.target.value);
                    if (e.target.value.trim()) {
                      setAvatar(e.target.value);
                    }
                  }}
                  placeholder="https://example.com/my-photo.jpg"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#8b5cf6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Profile Form Details */}
          <div className="bg-white/80 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/60 pb-2">Reputation Details</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Username / Display Name *</label>
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#8b5cf6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Registered Email (Read Only)</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Contact Phone Number</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#8b5cf6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Shipping & Billing Address</label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Defense Phase 6, Lahore, Pakistan"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#8b5cf6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Bio & Collector Profile</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Write a brief intro about yourself..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#8b5cf6] rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-800/60 mt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Undo className="h-3.5 w-3.5" />
                Discard Changes
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-[#8b5cf6]/25 cursor-pointer flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                Save Profile Configuration
              </button>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
