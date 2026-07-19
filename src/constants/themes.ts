export interface ThemePreset {
  id: string;
  name: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentSecondary: string;
  accentGlow: string;
  accentGlowStrong: string;
  previewBg: string; // Tailwind class for visual circles in color picker
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  violet: {
    id: 'violet',
    name: 'Amethyst',
    accent: '#8b5cf6',
    accentHover: '#9c73f8',
    accentLight: '#a78bfa',
    accentSecondary: '#7c3aed',
    accentGlow: 'rgba(139, 92, 246, 0.2)',
    accentGlowStrong: 'rgba(139, 92, 246, 0.4)',
    previewBg: 'bg-violet-500'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    accent: '#10b981',
    accentHover: '#34d399',
    accentLight: '#6ee7b7',
    accentSecondary: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.2)',
    accentGlowStrong: 'rgba(16, 185, 129, 0.4)',
    previewBg: 'bg-emerald-500'
  },
  rose: {
    id: 'rose',
    name: 'Ruby',
    accent: '#f43f5e',
    accentHover: '#fb7185',
    accentLight: '#fda4af',
    accentSecondary: '#e11d48',
    accentGlow: 'rgba(244, 63, 94, 0.2)',
    accentGlowStrong: 'rgba(244, 63, 94, 0.4)',
    previewBg: 'bg-rose-500'
  },
  amber: {
    id: 'amber',
    name: 'Amber',
    accent: '#f59e0b',
    accentHover: '#fbbf24',
    accentLight: '#fde047',
    accentSecondary: '#d97706',
    accentGlow: 'rgba(245, 158, 11, 0.2)',
    accentGlowStrong: 'rgba(245, 158, 11, 0.4)',
    previewBg: 'bg-amber-500'
  },
  sky: {
    id: 'sky',
    name: 'Ocean',
    accent: '#0ea5e9',
    accentHover: '#38bdf8',
    accentLight: '#7dd3fc',
    accentSecondary: '#0284c7',
    accentGlow: 'rgba(14, 165, 233, 0.2)',
    accentGlowStrong: 'rgba(14, 165, 233, 0.4)',
    previewBg: 'bg-sky-500'
  },
  mono: {
    id: 'mono',
    name: 'Monochrome',
    accent: '#64748b',
    accentHover: '#94a3b8',
    accentLight: '#cbd5e1',
    accentSecondary: '#475569',
    accentGlow: 'rgba(100, 116, 139, 0.2)',
    accentGlowStrong: 'rgba(100, 116, 139, 0.4)',
    previewBg: 'bg-slate-500'
  },
};
