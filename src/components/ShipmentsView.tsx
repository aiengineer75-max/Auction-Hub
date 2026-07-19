import React from 'react';
import { Truck, MapPin, Calendar, Compass, ShieldCheck, Box, Milestone, Globe } from 'lucide-react';
import { Shipment } from '../types';

interface ShipmentsViewProps {
  shipments: Shipment[];
}

export default function ShipmentsView({ shipments }: ShipmentsViewProps) {
  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
          Shipment Tracking Desk <Truck className="h-6 w-6 text-indigo-400" />
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Monitor transit states, export custom clearings, and estimate physical delivery of won luxury items.
        </p>
      </div>

      {shipments.length === 0 ? (
        <div className="p-12 bg-[#111625] border border-slate-800/80 rounded-2xl text-center space-y-3">
          <Truck className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="font-display font-semibold text-white">No active shipments</h3>
          <p className="text-slate-400 text-xs">When you win an auction and complete payment, your premium shipment will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline and Details block (Left) */}
          <div className="lg:col-span-8 space-y-6">
            {shipments.map((ship) => (
              <div key={ship.id} className="bg-[#111625] border border-slate-800/80 rounded-3xl p-6 space-y-6">
                
                {/* Header summary info */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-800/60 pb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={ship.auctionImage}
                      alt={ship.auctionTitle}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-display font-bold text-base text-white">{ship.auctionTitle}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400 font-mono">
                        <span>Carrier: <span className="text-indigo-400 font-semibold">{ship.carrier}</span></span>
                        <span>•</span>
                        <span>Tracking: <span className="text-slate-200 font-semibold">{ship.trackingNumber}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Estimated Delivery</span>
                    <span className="text-base font-display font-bold text-emerald-400 flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <Calendar className="h-4.5 w-4.5" /> {ship.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Timeline */}
                <div className="space-y-6">
                  <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                    <Milestone className="h-4.5 w-4.5 text-indigo-400" /> Live Transit Timeline Logs
                  </h4>

                  <div className="relative pl-8 space-y-6">
                    {/* Vertical line connector */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800" />

                    {ship.timeline.map((event, idx) => {
                      const isLatest = idx === ship.timeline.length - 1;
                      
                      return (
                        <div key={idx} className="relative flex flex-col md:flex-row md:justify-between gap-2">
                          
                          {/* Circular Marker icon */}
                          <div className={`absolute -left-[29px] h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 ${
                            isLatest
                              ? 'bg-sky-500/15 border-sky-400 text-sky-400 animate-pulse'
                              : 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                          }`}>
                            {idx + 1}
                          </div>

                          <div className="space-y-1">
                            <p className={`text-xs font-bold ${isLatest ? 'text-sky-400' : 'text-slate-200'}`}>
                              {event.description}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-slate-500" /> {event.location}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-500 font-mono font-semibold md:text-right md:w-40 flex-shrink-0">
                            {event.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Map Placeholder and custom actions (Right) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Vector Map Placeholder */}
            <div className="bg-[#111625] border border-slate-800/80 rounded-3xl overflow-hidden p-5 space-y-4">
              <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-indigo-400" /> Real-time Route Geolocation
              </h4>

              {/* Map Canvas Art Placeholder */}
              <div className="h-48 rounded-2xl bg-[#090c15] relative overflow-hidden flex items-center justify-center border border-slate-800">
                
                {/* Simulated Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Simulated Geolocation route path */}
                <svg viewBox="0 0 200 100" className="w-full h-full p-4 relative z-10">
                  <path
                    d="M 30 70 Q 100 20, 170 40"
                    fill="none"
                    stroke="#1d284f"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30 70 Q 100 20, 120 30"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  
                  {/* Origin */}
                  <circle cx="30" cy="70" r="5" fill="#10b981" />
                  <text x="30" y="85" fill="#10b981" fontSize="6" textAnchor="middle" fontWeight="bold">Geneva</text>

                  {/* Current Position */}
                  <g className="animate-bounce">
                    <circle cx="120" cy="30" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="120" cy="30" r="9" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="animate-ping" />
                  </g>
                  <text x="120" y="18" fill="#3b82f6" fontSize="6" textAnchor="middle" fontWeight="bold">Dubai Transit</text>

                  {/* Destination */}
                  <circle cx="170" cy="40" r="5" fill="#64748b" />
                  <text x="170" y="55" fill="#64748b" fontSize="6" textAnchor="middle" fontWeight="bold">Lahore</text>
                </svg>

                <span className="absolute bottom-3 right-3 text-[9px] text-slate-500 font-mono">LIVE GPS FEED</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Current Speed</span>
                  <span className="font-semibold text-slate-200">540 knots (Flight Cargo)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Current Altitude</span>
                  <span className="font-semibold text-slate-200">36,000 feet</span>
                </div>
              </div>
            </div>

            {/* Insurance details */}
            <div className="bg-[#111625] border border-slate-800/80 rounded-3xl p-5 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h5 className="text-xs font-bold text-white">Fully Covered Transit</h5>
              <p className="text-[11px] text-slate-400 leading-normal">
                This lot is secured under global premium insurance. If any damage or loss occurs during international transit, a full refund of your winning bid is guaranteed.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
