import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, X, Globe, Crown } from 'lucide-react';
import { authenticateOwner } from '../utils/auth';

interface EntryLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOwnerLoginSuccess: () => void;
  onCustomerContinue: (email?: string) => void;
  currentDomain?: string;
}

export const EntryLoginModal: React.FC<EntryLoginModalProps> = ({
  isOpen,
  onClose,
  onOwnerLoginSuccess,
  onCustomerContinue,
  currentDomain = 'srimarkandeyahandlooms.com',
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'owner' | 'customer'>('owner');
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const result = authenticateOwner(emailInput, pinInput);
    if (!result.success) {
      setErrorMsg(result.message);
    } else {
      onOwnerLoginSuccess();
      onClose();
    }
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomerContinue(customerEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Decorative Top Accent Banner */}
        <div className="bg-gradient-to-r from-[#4A1525] via-[#831843] to-[#4A1525] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-inner">
              <Crown className="w-6 h-6 text-amber-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-semibold uppercase tracking-widest border border-amber-300/30 mb-2">
              <Globe className="w-3 h-3 text-amber-300" />
              <span>Domain: {currentDomain}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sri Markandeya Handlooms
            </h2>
            <p className="text-xs text-amber-100/90 font-light mt-1 max-w-sm">
              Sign in with your administrator account, or explore the showroom as a guest shopper.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Close and continue browsing"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab('owner');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'owner'
                ? 'border-[#831843] text-[#831843] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Domain Administrator Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
              activeTab === 'customer'
                ? 'border-[#831843] text-[#831843] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4 text-stone-500" />
            <span>Customer / Guest</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'owner' ? (
            /* Owner Login Form */
            <form onSubmit={handleOwnerSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Domain Administrator & Editor Portal</span>
                  <p className="text-stone-600 font-light mt-0.5">
                    Sign in with your domain owner credentials to edit showroom content, update collections, and manage store settings.
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 animate-in fade-in">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Domain Login Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono text-stone-900"
                    placeholder="Enter domain owner email"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#831843]/30 outline-none font-mono"
                    placeholder="Enter domain password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Domain Editor</span>
                </button>
              </div>

              <div className="pt-2 text-center border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => onCustomerContinue()}
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Continue browsing website without logging in →
                </button>
              </div>
            </form>
          ) : (
            /* Customer / Guest Mode */
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="text-center py-2">
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Browse our master loom collection of authentic Gadwal, Kanchi Pattu, and Mangalagiri sarees with zero middlemen pricing.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Email Address (Optional for Order Updates)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. shanti@example.com"
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#831843]/30 outline-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Enter Storefront as Guest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 flex items-center gap-2 border border-stone-200/80">
                <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Viewing Sri Markandeya Handlooms official storefront</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
