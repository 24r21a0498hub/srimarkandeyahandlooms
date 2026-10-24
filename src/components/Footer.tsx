import React from 'react';
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Heart, Sparkles, Instagram, Facebook, Share2, Package } from 'lucide-react';
import { STORE_DETAILS } from '../data/sarees';
import { NewsletterSignup } from './NewsletterSignup';

const PinterestIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55l1.04-4.4s-.26-.53-.26-1.3c0-1.22.7-2.13 1.58-2.13.75 0 1.11.56 1.11 1.23 0 .75-.48 1.88-.73 2.92-.2.87.43 1.58 1.29 1.58 1.54 0 2.73-1.63 2.73-3.97 0-2.08-1.5-3.53-3.63-3.53-2.48 0-3.93 1.86-3.93 3.78 0 .75.29 1.55.65 1.99.07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.12-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.17-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.78 1.87-1.17 2.5A12 12 0 1 0 12 0z" />
  </svg>
);

interface FooterProps {
  onOpenAppointment: () => void;
  onOpenVideoCall: () => void;
  onOpenCareTips: () => void;
  onOpenOwnerPortal?: () => void;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAppointment,
  onOpenVideoCall,
  onOpenCareTips,
  onOpenOwnerPortal,
  onOpenOrders,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup for Saree Collection Updates */}
        <NewsletterSignup />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Ethos */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Sri Markandeya Handlooms
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Carrying forward the sacred handloom legacy of Sage Markandeya. Bringing authentic handwoven Gadwal, Kanchi Pattu, Mangalagiri, and Banarasi sarees direct from artisan looms to your wardrobe, in the trusted customer tradition of Missamma.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Silk Mark Certified Purity Guaranteed</span>
            </div>

            {/* Quick social follow strip in Brand column */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Join Our Community
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/sri_markandeya_handlooms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#E1306C] text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 hover:border-transparent hover:scale-110 shadow-xs"
                  title="Instagram: @sri_markandeya_handlooms"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/sri_markandeya_handlooms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 hover:border-transparent hover:scale-110 shadow-xs"
                  title="Facebook: @sri_markandeya_handlooms"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://pinterest.com/sri_markandeya_handlooms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#E60023] text-stone-300 hover:text-white flex items-center justify-center transition-all border border-stone-700/80 hover:border-transparent hover:scale-110 shadow-xs"
                  title="Pinterest: @sri_markandeya_handlooms"
                  aria-label="Pinterest"
                >
                  <PinterestIcon className="w-4 h-4" />
                </a>
                <span className="text-xs text-stone-400 font-mono pl-1">@sri_markandeya_handlooms</span>
              </div>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Handloom Weaves
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  Pure Kanjivaram Bridal Silks
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  Varanasi Kadwa Katan Brocades
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  Chanderi & Soft Tissue Silks
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  Pure Wild Handloom Tussar
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  Sirumugai / Coimbatore Soft Silks
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique Visit & Booking */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Boutique Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Reserve Private Bridal Suite
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVideoCall}
                  className="hover:text-amber-200 transition-colors text-left"
                >
                  Live WhatsApp Video Shopping
                </button>
              </li>
              <li>
                <a href="#heritage-guide" className="hover:text-amber-200 transition-colors">
                  Complimentary Fall & Pico Service
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCareTips}
                  className="hover:text-amber-200 transition-colors text-left flex items-center gap-1.5 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform shrink-0" />
                  <span>Saree Care Tips & Preservation</span>
                </button>
              </li>
              {onOpenOrders && (
                <li>
                  <button
                    onClick={onOpenOrders}
                    className="hover:text-amber-200 transition-colors text-left flex items-center gap-1.5 group text-amber-300"
                  >
                    <Package className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Track My Order & Past Purchases</span>
                  </button>
                </li>
              )}
              <li>
                <a href="#boutique-visit" className="hover:text-amber-200 transition-colors">
                  Free Showroom Valet Parking
                </a>
              </li>
              {onOpenOwnerPortal && (
                <li>
                  <button
                    onClick={onOpenOwnerPortal}
                    className="hover:text-amber-300 text-stone-400 transition-colors text-left text-[11px] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Shop Owner Portal (nanikoutarapu@gmail.com)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Suryapet Showroom
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_DETAILS.address}, {STORE_DETAILS.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{STORE_DETAILS.hoursWeekday}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <a href={`tel:${STORE_DETAILS.phone}`} className="hover:text-white">
                  {STORE_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp: {STORE_DETAILS.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Community Engagement Section */}
        <div className="py-8 border-b border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-[#831843] to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h4 className="text-sm font-serif font-bold text-white tracking-wide">
                  Join Our Handloom Community
                </h4>
                <span className="text-[11px] bg-rose-950 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-800/60 font-mono font-medium">
                  @sri_markandeya_handlooms
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light max-w-xl">
                Follow our daily loom stories, live artisan weaving reels, customer bridal drapes, and early saree drop previews across your favorite platforms.
              </p>
            </div>
          </div>

          {/* Social Action Cards */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Instagram */}
            <a
              href="https://instagram.com/sri_markandeya_handlooms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Sri Markandeya Handlooms on Instagram"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-amber-500 text-stone-200 hover:text-white border border-stone-700/80 hover:border-transparent text-xs font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
              <span>Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/sri_markandeya_handlooms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Sri Markandeya Handlooms on Facebook"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-[#1877F2] text-stone-200 hover:text-white border border-stone-700/80 hover:border-transparent text-xs font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <Facebook className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
              <span>Facebook</span>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com/sri_markandeya_handlooms"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Sri Markandeya Handlooms on Pinterest"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-[#E60023] text-stone-200 hover:text-white border border-stone-700/80 hover:border-transparent text-xs font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <PinterestIcon className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
              <span>Pinterest</span>
            </a>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} {STORE_DETAILS.name}. Handcrafted with respect for Indian weaving traditions.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-stone-400">
            <button
              onClick={onOpenCareTips}
              className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2 font-medium"
            >
              Saree Care Guide
            </button>
            <span aria-hidden="true">·</span>
            <span>All Silk Mark certified</span>
            <span aria-hidden="true">·</span>
            <span>Free Bangalore Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Made for Lifelong Memories</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
