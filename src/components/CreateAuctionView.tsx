import React, { useState } from 'react';
import { Gavel, Upload, DollarSign, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react';
import { Auction } from '../types';
import { mockCategories } from '../data/mockData';

interface CreateAuctionViewProps {
  onAddAuction: (newAuction: Auction) => void;
  onNavigateToView: (view: string) => void;
}

export default function CreateAuctionView({ onAddAuction, onNavigateToView }: CreateAuctionViewProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronics');
  const [startingPrice, setStartingPrice] = useState('');
  const [increment, setIncrement] = useState('');
  const [condition, setCondition] = useState<'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair'>('Excellent');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Standard Form validations
    if (!title.trim() || !description.trim() || !startingPrice || !increment) {
      setValidationError('Please populate all mandatory fields correctly.');
      return;
    }

    const priceVal = Number(startingPrice);
    const incVal = Number(increment);

    if (isNaN(priceVal) || priceVal <= 0) {
      setValidationError('Starting price must be a valid positive amount.');
      return;
    }

    if (isNaN(incVal) || incVal <= 0) {
      setValidationError('Minimum increment must be a valid positive amount.');
      return;
    }

    const defaultImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
    ];

    const finalImage = image.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const newAuction: Auction = {
      id: `auc_${Date.now()}`,
      title: title,
      description: description,
      category: category,
      startingPrice: priceVal,
      currentBid: priceVal,
      increment: incVal,
      biddersCount: 0,
      startTime: Date.now(),
      endTime: Date.now() + 3600000 * 48, // 48 hours countdown
      status: 'active',
      image: finalImage,
      gallery: [finalImage],
      condition: condition,
      seller: {
        name: 'Rabia',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        isVerified: true
      },
      views: 12,
      likes: 3,
      bidsHistory: []
    };

    onAddAuction(newAuction);
    setSuccess(true);
    
    setTimeout(() => {
      onNavigateToView('auctions');
    }, 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
          Create New Auction Lot <Gavel className="h-6 w-6 text-indigo-400" />
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Publish your assets. All submissions undergo swift automated validation before going live immediately.
        </p>
      </div>

      {success ? (
        <div className="p-12 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white">Auction Lot Created Successfully!</h3>
            <p className="text-slate-400 text-xs mt-1">Your item is now live and listed for active bidding. Redirecting you to platform...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#111625] border border-slate-800/80 rounded-3xl p-6 space-y-5 shadow-sm">
          
          {/* Validation Feedback */}
          {validationError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2.5 text-xs text-rose-400">
              <span>⚠</span>
              <p className="font-semibold">{validationError}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 block">Lot Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Vintage Rolex Chronometer 1968"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none transition-all cursor-pointer"
              >
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none transition-all cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Pricing parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Starting Price (USD) *</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-500 text-xs font-mono font-bold">$</span>
                <input
                  type="number"
                  required
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  placeholder="2500"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Minimum Bid Increment (USD) *</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-500 text-xs font-mono font-bold">$</span>
                <input
                  type="number"
                  required
                  value={increment}
                  onChange={(e) => setIncrement(e.target.value)}
                  placeholder="100"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 block">Item Description Specification *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive specification, size, material, box papers availability, unique marks, and historical provenance if applicable..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>

          {/* Image Upload Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 block">Item Image URL</label>
            <div className="relative flex items-center">
              <ImageIcon className="absolute left-4 h-4 w-4 text-slate-500" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
              />
            </div>
            <span className="text-[10px] text-slate-500 block">Leave blank to assign a random beautiful high-fidelity asset image placeholder.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)] cursor-pointer ripple-btn flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" /> Publish Auction Lot Live
          </button>
        </form>
      )}
    </div>
  );
}
