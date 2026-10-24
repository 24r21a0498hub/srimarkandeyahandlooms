import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Car, Shield, CheckCircle2, MessageSquare, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { STORE_DETAILS } from '../data/sarees';

interface StoreLocatorSectionProps {
  onBookAppointment: () => void;
}

export const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({ onBookAppointment }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'map' | 'interior'>('map');
  const googleMapsUrl = 'https://www.google.com/maps/place/Sri+markendeya+handlooms/@17.1463419,79.6234269,17z';

  return (
    <section id="boutique-visit" className="py-16 sm:py-24 bg-[#F7F3EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Showroom Media Stage (Interactive Google Map or Interior) */}
          <div className="lg:col-span-6 relative flex flex-col gap-3">
            {/* View Selector Tabs */}
            <div className="flex items-center justify-between bg-stone-200/80 p-1 rounded-xl w-full sm:w-auto self-start border border-stone-300">
              <button
                type="button"
                onClick={() => setActiveMediaTab('map')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMediaTab === 'map'
                    ? 'bg-white text-[#831843] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#831843]" />
                <span>Google Maps Location</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('interior')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMediaTab === 'interior'
                    ? 'bg-white text-[#831843] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Showroom Interior</span>
              </button>
            </div>

            {/* Container for Map / Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-300 bg-stone-900 min-h-[440px] sm:min-h-[500px]">
              {activeMediaTab === 'map' ? (
                <div className="w-full h-full min-h-[440px] sm:min-h-[500px] flex flex-col">
                  {/* Top Bar on Map */}
                  <div className="bg-stone-900 text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-stone-100 font-serif">Sri markendeya handlooms</span>
                      <span className="hidden sm:inline text-stone-400">· 60 Feet Road, Suryapet</span>
                    </div>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 text-[11px] font-medium flex items-center gap-1"
                    >
                      <span>Direct View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Exact Embedded Google Map iframe from user */}
                  <div className="flex-1 w-full relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.4903536134198!2d79.62342687462184!3d17.146341909705505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34db0035db4ab5%3A0x3ca0ddf1484378cd!2sSri%20markendeya%20handlooms!5e0!3m2!1sen!2sin!4v1792836053142!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '450px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Sri markendeya handlooms location"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full min-h-[440px] sm:min-h-[500px]">
                  <img
                    src="/src/assets/images/boutique_store_interior_1792573628086.jpg"
                    alt="Sri Markandeya Handlooms Suryapet showroom interior"
                    referrerPolicy="no-referrer"
                    className="w-full h-full min-h-[440px] sm:min-h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 inset-x-5 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block mb-1">
                      Ganesh Nagar, 60 Feet Road · Suryapet
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Teakwood Shelves & Pure Weave Stacks
                    </h3>
                    <p className="text-xs text-stone-200 mt-1">
                      Over 1,500 curated handloom drapes direct from Gadwal, Mangalagiri, and Kanchi looms.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Visiting Hours & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#831843] mb-2">
                Visit Our Suryapet Flagship
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">
                Experience Direct Loom Purity in Person
              </h2>
              <p className="text-sm text-stone-600 mt-2 font-light">
                Feel the crisp pitloom texture of Mangalagiri, the featherlight drape of authentic Gadwal kuttu borders, and the royal weight of 24K gold zari Kanchi pattu in our air-conditioned showroom at Ganesh Nagar, 60 Feet Road, Suryapet.
              </p>
            </div>

            {/* Address & Landmark Card */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#831843] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{STORE_DETAILS.name}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{STORE_DETAILS.address}</p>
                  <p className="text-xs text-stone-600">{STORE_DETAILS.city}</p>
                  <p className="text-xs text-amber-900 font-medium mt-1">
                    Landmark: {STORE_DETAILS.landmark}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-start gap-3">
                <Clock className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700">
                  <div className="flex justify-between gap-6">
                    <span className="font-medium text-stone-900">Monday – Saturday:</span>
                    <span className="tabular-nums font-semibold">{STORE_DETAILS.hoursWeekday}</span>
                  </div>
                  <div className="flex justify-between gap-6 mt-1">
                    <span className="font-medium text-stone-900">Sundays & Festivals:</span>
                    <span className="tabular-nums font-semibold">{STORE_DETAILS.hoursSunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutique Perks */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-stone-800 shrink-0" />
                <span>Free Valet Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#831843] shrink-0" />
                <span>Silk Mark Verified In-Store</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>On-Site Fall & Pico Unit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Trial Drapes & Private Suite</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${STORE_DETAILS.phone}`}
                className="px-5 py-3 bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#831843]" />
                <span>Call Store ({STORE_DETAILS.phone})</span>
              </a>

              <button
                onClick={onBookAppointment}
                className="px-5 py-3 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule In-Store Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
