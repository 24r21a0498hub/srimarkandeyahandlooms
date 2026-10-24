import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send, BellRing } from 'lucide-react';

interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

const STORAGE_KEY = 'markandeya_subscribers';

export function getStoredSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSubscriber(email: string): { success: boolean; message: string; alreadySubscribed?: boolean } {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    const existing = getStoredSubscribers();
    const isDup = existing.some((sub) => sub.email.toLowerCase() === normalized);
    if (isDup) {
      return {
        success: true,
        alreadySubscribed: true,
        message: "You're already subscribed to our new collection updates!",
      };
    }

    const updated = [
      {
        email: normalized,
        subscribedAt: new Date().toISOString(),
      },
      ...existing,
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return {
      success: true,
      alreadySubscribed: false,
      message: 'Dhanyavadagalu! You are now subscribed to Sri Markandeya handloom updates.',
    };
  } catch {
    return { success: false, message: 'Could not save subscription. Please try again.' };
  }
}

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = saveSubscriber(email);
    if (result.success) {
      setStatus('success');
      setAlreadySubscribed(Boolean(result.alreadySubscribed));
      setFeedbackMsg(result.message);
      if (!result.alreadySubscribed) {
        setEmail('');
      }
    } else {
      setStatus('error');
      setFeedbackMsg(result.message);
    }
  };

  return (
    <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-6 sm:p-8 my-8 relative overflow-hidden shadow-lg">
      {/* Decorative subtle background sheen */}
      <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#831843]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left copy */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
            <BellRing className="w-4 h-4 text-amber-400" />
            <span>VIP Saree Arrivals & Loom Notes</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            Be the First to Unfurl New Handloom Arrivals
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            Receive direct notifications when fresh batches of pure Gadwal Kuttu, Kanchipuram bridal silks, and limited Mangalagiri weaves arrive from our artisan looms.
          </p>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-6">
          {status === 'success' ? (
            <div className="bg-stone-900/90 border border-emerald-500/50 rounded-xl p-4 text-left flex items-start gap-3 animate-in fade-in slide-in-from-bottom-1 duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white">
                  {alreadySubscribed ? 'Welcome Back!' : 'Subscription Confirmed!'}
                </p>
                <p className="text-xs text-emerald-300 font-light leading-relaxed">
                  {feedbackMsg}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFeedbackMsg('');
                    setEmail('');
                  }}
                  className="text-[11px] text-stone-400 hover:text-white underline pt-1 block"
                >
                  Subscribe another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-stone-900/90 border border-stone-600 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder:text-stone-500 rounded-xl text-xs outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#831843] hover:bg-[#9d174d] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
                >
                  <span>Notify Me</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'error' && (
                <p className="text-[11px] text-rose-400 font-medium pl-1 animate-in fade-in duration-150">
                  {feedbackMsg}
                </p>
              )}

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 px-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Curated missives only · No spam ever</span>
                </span>
                <span className="hidden sm:inline text-stone-500">Unsubscribe anytime</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
