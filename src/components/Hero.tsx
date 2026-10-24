import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, MapPin, ArrowRight, Video, Quote, RefreshCw } from 'lucide-react';
import { StoreSettings } from '../types/saree';

interface HeroProps {
  onExploreClick: () => void;
  onBookAppointment: () => void;
  onVideoShopping: () => void;
  storeSettings?: StoreSettings;
}

const SAREE_QUOTES = [
  {
    quote: 'A saree is not just six yards of woven silk; it is an enduring tale of heritage, timeless grace, and the heartbeat of Indian artisan looms.',
    author: 'Handloom Weaver Heritage',
  },
  {
    quote: 'In a world full of temporary trends, a handwoven pure silk saree remains an everlasting masterpiece of elegance.',
    author: 'Sage Markandeya Legacy',
  },
  {
    quote: 'Six yards of pure elegance, woven with sacred tradition, golden zari, and quiet dignity that speaks without words.',
    author: 'Missamma Silk Connoisseurs',
  },
  {
    quote: 'A saree does not simply drape a woman; it drapes generations of celebrations, blessings, and muhurtham memories.',
    author: 'Bridal Pattu Lore',
  },
  {
    quote: 'When in doubt, wear a handloom saree—crafted with devotion on generational master pitlooms.',
    author: 'Telangana Artisan Guild',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBookAppointment,
  onVideoShopping,
  storeSettings,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Gentle auto-rotation of saree quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SAREE_QUOTES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-[#F7F3EE] to-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Brand Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center pr-0 lg:pr-6">
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#831843] mb-4 tracking-wider uppercase">
              <span>{storeSettings?.address ? `${storeSettings.address}, ${storeSettings.city}` : 'Ganesh Nagar, Suryapet'}</span>
              <span aria-hidden="true">·</span>
              <span>Direct Looms to Wardrobe</span>
              <span aria-hidden="true">·</span>
              <span>Sage Markandeya Legacy</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.12] font-semibold tracking-tight text-balance mb-6">
              {storeSettings?.heroHeadline || 'Celebrate Every Occasion With the Beauty of Handloom'}
            </h1>

            {/* Saree Quotation Callout */}
            <div className="mb-6 max-w-2xl w-full bg-amber-50/80 border-l-4 border-[#831843] rounded-r-xl p-4 sm:p-5 shadow-xs transition-all">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#831843] shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="font-serif italic text-base sm:text-lg text-[#4A1525] leading-relaxed">
                    “{SAREE_QUOTES[quoteIndex].quote}”
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span className="font-medium tracking-wide uppercase text-stone-600">
                      — {SAREE_QUOTES[quoteIndex].author}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuoteIndex((prev) => (prev + 1) % SAREE_QUOTES.length)}
                      className="inline-flex items-center gap-1 font-semibold text-[#831843] hover:text-[#701A36] transition-colors"
                      title="Next saree quote"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Next Saree Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Body lead */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mb-8 font-light">
              {storeSettings?.heroSubtitle ||
                'From intimate family celebrations to grand wedding muhurthams, discover pure Gadwal pattu, regal Kanchi bridal silks, and crisp Mangalagiri weaves crafted directly on generational master artisan looms with honest pricing and Silk Mark trust.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#831843] hover:bg-[#701A36] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                <span>Browse Sarees Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onVideoShopping}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-sm font-semibold rounded-lg border border-stone-300 transition-colors whitespace-nowrap"
              >
                <Video className="w-4 h-4 text-[#831843]" />
                <span>Schedule WhatsApp Video Drape</span>
              </button>
            </div>

            {/* Quick Local Boutique Highlights */}
            <div className="pt-6 border-t border-stone-200/90 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#831843] shrink-0" />
                <span>Silk Mark Certified Pure Silk</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Zero Middlemen Loom Price</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Suryapet Flagship (60 Ft Rd)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Saree Mannequin Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300/80 bg-stone-900 group">
              <img
                src="/src/assets/images/hero_kanjivaram_saree_1792573626510.jpg"
                alt="Bridal Kanjivaram pure silk saree in Aadya Silks showroom"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[540px] object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Bottom Card Overlay Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="text-xs tracking-wider uppercase text-amber-300 font-medium">
                    Featured Bridal Masterpiece
                  </div>
                  <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 text-white/90">
                    24 Weaving Days
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-1 text-white">
                  Mayil Korvai Kanjivaram Pure Silk
                </h3>
                <div className="flex items-center justify-between text-xs text-stone-300 mt-2">
                  <span>Pure 3-Ply Silk · Tested 24K Gold Zari</span>
                  <button
                    onClick={onVideoShopping}
                    className="inline-flex items-center gap-1.5 text-amber-200 hover:text-white underline font-medium"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>See Live Drape</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle background warm glow */}
            <div
              className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
