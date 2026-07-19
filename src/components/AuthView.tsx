import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, CheckCircle, Smartphone, Chrome, Github, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

interface AuthViewProps {
  onLoginSuccess: (email: string) => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthView({ onLoginSuccess, initialMode = 'login' }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>((initialMode as any) || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Simple reactive password strength score
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-slate-800', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak (min 6 chars)', color: 'bg-rose-500', width: 'w-1/3' };
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (hasLetters && hasNumbers && hasSpecial) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
    return { label: 'Moderate', color: 'bg-amber-500', width: 'w-2/3' };
  };

  const strength = getPasswordStrength();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMsg(null);

    // Form validations
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      if (!username.trim()) {
        setValidationError('Please enter a username.');
        return;
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters.');
        return;
      }
    }

    if (mode === 'forgot') {
      setSuccessMsg('A password reset link has been dispatched to your email.');
      setTimeout(() => setMode('login'), 2500);
      return;
    }

    // Success Authentication login redirect!
    // We log in the user Rabia by default so they see all dashboard mocks filled out!
    onLoginSuccess(email || 'quee007ina@gmail.com');
  };

  const handleSocialLogin = () => {
    // Simulated instant Google / GitHub sign-on
    onLoginSuccess('quee007ina@gmail.com');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative select-none">
      
      {/* Glow Dots ambient backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-[#111625] border border-slate-800 rounded-3xl p-8 space-y-6 relative z-10 shadow-2xl">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2 pb-4 border-b border-slate-800/60">
          <Logo size="md" showText={true} />
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' && 'Verify credentials to access live countdown auctions.'}
            {mode === 'signup' && 'Register your verified profile lot credentials.'}
            {mode === 'forgot' && 'Disentangle your credentials.'}
          </p>
        </div>

        {/* Form Alerts feedbacks */}
        {validationError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 flex items-center gap-2.5">
            <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0" />
            <p className="font-semibold">{validationError}</p>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 flex items-center gap-2.5">
            <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <p className="font-semibold">{successMsg}</p>
          </div>
        )}

        {/* Input fields */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Username *</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Rabia"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Email Address *</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Rabia@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Password *</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password strength meter matches page 3 signup */}
                {mode === 'signup' && password && (
                  <div className="space-y-1.5 pt-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Security Index:</span>
                      <span className="font-semibold text-slate-300">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                    </div>
                  </div>
                )}
              </div>

              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Confirm Password *</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-slate-600"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Remember me toggle matches page 3 */}
          {mode === 'login' && (
            <label className="flex items-center gap-2.5 text-xs text-slate-400 cursor-pointer pt-1 hover:text-white select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-blue-500 h-4 w-4 rounded border-slate-800 bg-slate-950"
              />
              <span>Remember me on this secure device</span>
            </label>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer ripple-btn flex items-center justify-center gap-1.5 mt-2"
          >
            <Sparkles className="h-4 w-4" />
            {mode === 'login' && 'Verify & Login'}
            {mode === 'signup' && 'Confirm & Create Account'}
            {mode === 'forgot' && 'Dispatch Reset Link'}
          </button>
        </form>

        {/* Social logins */}
        {mode !== 'forgot' && (
          <div className="space-y-4 pt-4 border-t border-slate-800/60">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800/60" />
              <span className="flex-shrink mx-3 text-[10px] uppercase tracking-wider text-slate-500 font-bold">Or login with</span>
              <div className="flex-grow border-t border-slate-800/60" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSocialLogin}
                className="py-2.5 border border-slate-850 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Chrome className="h-4 w-4" /> Google
              </button>
              <button
                onClick={handleSocialLogin}
                className="py-2.5 border border-slate-850 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Github className="h-4 w-4" /> GitHub
              </button>
            </div>
          </div>
        )}

        {/* Toggle options footer */}
        <div className="text-center text-xs pt-2">
          {mode === 'login' && (
            <p className="text-slate-500">
              New to AuctionHub?{' '}
              <button onClick={() => setMode('signup')} className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                Create account
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p className="text-slate-500">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                Sign In
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <button onClick={() => setMode('login')} className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
              Back to Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
