import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-9 w-9', text: 'text-2xl' },
    lg: { icon: 'h-16 w-16', text: 'text-4xl' },
    xl: { icon: 'h-24 w-24', text: 'text-5xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon recreated from user attachment */}
      <div className={`relative flex-shrink-0 ${currentSize.icon}`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full animate-float"
          style={{ filter: 'drop-shadow(0 0 10px var(--theme-accent-glow))' }}
        >
          {/* Outer circle glow */}
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="url(#circleGradient)"
            strokeWidth="3"
            strokeDasharray="180 60"
            className="animate-[spin_12s_linear_infinite]"
          />
          
          {/* Triangular A shape with gradients */}
          <path
            d="M60 16 L104 88 L16 88 Z"
            stroke="url(#triangleAccent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M60 20 L96 82 L24 82 Z"
            fill="url(#triangleGradient)"
            stroke="url(#metallicGradient)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Cutouts to form the "A" logo */}
          <path
            d="M60 42 L80 80 L68 80 L60 62 L52 80 L40 80 Z"
            fill="url(#innerA_Gradient)"
          />

          {/* Elegant Auction Gavel in center */}
          <g transform="translate(60, 68) rotate(-35) scale(0.48)">
            {/* Gavel head */}
            <rect x="-18" y="-14" width="36" height="12" rx="3" fill="url(#gavelGradient)" stroke="#ffffff" strokeWidth="1" />
            <rect x="-15" y="-17" width="30" height="3" rx="1" fill="var(--theme-accent-light, #c084fc)" />
            <rect x="-15" y="-2" width="30" height="3" rx="1" fill="var(--theme-accent-light, #c084fc)" />
            {/* Gavel handle */}
            <rect x="-3" y="-2" width="6" height="42" rx="2" fill="url(#gavelGradient)" stroke="#ffffff" strokeWidth="0.8" />
            {/* Gavel sound block */}
            <ellipse cx="0" cy="46" rx="16" ry="5" fill="#121826" stroke="url(#gavelGradient)" strokeWidth="1" />
            <ellipse cx="0" cy="44" rx="14" ry="4" fill="#1e293b" />
          </g>

          {/* Definitions for gorgeous gradients replicating the attached logo */}
          <defs>
            <linearGradient id="circleGradient" x1="12" y1="12" x2="108" y2="108" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="var(--theme-accent, #8b5cf6)" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="triangleGradient" x1="60" y1="16" x2="60" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="60%" stopColor="var(--theme-accent, #8b5cf6)" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient id="triangleAccent" x1="16" y1="88" x2="104" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="metallicGradient" x1="16" y1="16" x2="104" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="innerA_Gradient" x1="60" y1="42" x2="60" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="gavelGradient" x1="-18" y1="-17" x2="3" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5f3ff" />
              <stop offset="40%" stopColor="var(--theme-accent-light, #c084fc)" />
              <stop offset="100%" stopColor="var(--theme-accent-secondary, #6366f1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold tracking-wider leading-none ${currentSize.text} text-white`}>
            AUCTION<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">HUB</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-medium font-sans">
            Bid <span className="text-indigo-400">•</span> Win <span className="text-indigo-400">•</span> Own
          </span>
        </div>
      )}
    </div>
  );
}
