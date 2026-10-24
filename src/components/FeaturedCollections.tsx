import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Crown } from 'lucide-react';

export interface FeaturedCollectionItem {
  id: string;
  title: string;
  category: string;
  weave: string;
  origin: string;
  badge: string;
  priceNote: string;
  highlight: string;
  image: string;
  count: string;
}

export const FEATURED_COLLECTIONS: FeaturedCollectionItem[] = [
  {
    id: 'bridal-pattu',
    title: 'Bridal Pattu',
    category: 'Muhurtham & Wedding',
    weave: 'Kanchi Pattu',
    origin: 'Kanchipuram, Tamil Nadu',
    badge: 'Royal Muhurtham',
    priceNote: 'Starting from ₹24,500',
    highlight: 'Pure 3-ply mulberry silk handwoven with interlocking Korvai pure gold zari temple borders.',
    image: '/src/assets/images/saree_kanjivaram_crimson_1792573625434.jpg',
    count: '18+ Handloom Silks',
  },
  {
    id: 'banarasi-brocades',
    title: 'Banarasi Brocades',
    category: 'Heritage Festive',
    weave: 'Banarasi Brocade',
    origin: 'Varanasi, Uttar Pradesh',
    badge: 'Imperial Kadwa Weft',
    priceNote: 'Starting from ₹26,000',
    highlight: 'Master Kadwa jaal embroidery with tested silver-gold zari woven over lustrous Katan silk.',
    image: '/src/assets/images/saree_banarasi_navy_1792573627193.jpg',
    count: '14+ Brocade Weaves',
  },
  {
    id: 'handwoven-silks',
    title: 'Handwoven Silks',
    category: 'Gadwal Pattu Heritage',
    weave: 'Gadwal Pattu',
    origin: 'Gadwal, Telangana',
    badge: 'Sage Markandeya Legacy',
    priceNote: 'Starting from ₹16,500',
    highlight: 'Celebrated Kuttu interlocking technique joining featherlight pure silk body with heavy contrast zari borders.',
    image: '/src/assets/images/saree_gadwal_pattu_1792575863811.jpg',
    count: '24+ Direct Looms',
  },
  {
    id: 'mangalagiri-handloom',
    title: 'Mangalagiri Handloom',
    category: 'Crisp Pitloom Weaves',
    weave: 'Mangalagiri Handloom',
    origin: 'Mangalagiri, Andhra Pradesh',
    badge: 'Sacred Hill Pitlooms',
    priceNote: 'Starting from ₹8,800',
    highlight: 'Flawless micro-texture that breathes effortlessly, adorned with authentic antique Nizam zari borders.',
    image: '/src/assets/images/saree_mangalagiri_nizam_1792575865511.jpg',
    count: '16+ Pure Weaves',
  },
  {
    id: 'wild-tussar',
    title: 'Wild Forest Tussar',
    category: 'Organic Raw Silk',
    weave: 'Pure Tussar',
    origin: 'Tribal Weaver Guilds',
    badge: 'Natural Golden Luster',
    priceNote: 'Starting from ₹11,500',
    highlight: 'Unprocessed forest cocoons handspun to create a rich earthen texture with antique zari borders.',
    image: '/src/assets/images/saree_tussar_mustard_1792573628149.jpg',
    count: '10+ Forest Weaves',
  },
  {
    id: 'chanderi-tissue',
    title: 'Chanderi Tissue Silks',
    category: 'Gossamer Evening Drapes',
    weave: 'Chanderi Tissue',
    origin: 'Chanderi, Madhya Pradesh',
    badge: 'Featherlight Sheen',
    priceNote: 'Starting from ₹12,800',
    highlight: 'Translucent zari-infused silk weave designed for royal soirées, sangeets, and evening grace.',
    image: '/src/assets/images/saree_chanderi_sage_1792573628048.jpg',
    count: '12+ Lightweight Silks',
  },
];

interface FeaturedCollectionsProps {
  onSelectCollection: (weave: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCollection }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active card index
    const cardWidth = 340;
    const idx = Math.min(
      FEATURED_COLLECTIONS.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(idx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 360;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section id="featured-collections" className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] border-b border-stone-200/90 relative overflow-hidden">
      {/* Subtle backdrop accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#831843]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#831843] mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Curated Master Weaver Series</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight">
              Featured Collections
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light mt-2 max-w-2xl">
              Explore authentic regional handloom traditions curated directly from master artisan looms—from grand wedding Kanchi bridal silks to featherlight Gadwal and regal Banarasi brocades.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Previous collection"
              className={`p-3 rounded-full border transition-all duration-200 ${
                canScrollLeft
                  ? 'border-stone-300 bg-white hover:bg-stone-50 hover:border-[#831843] text-stone-800 hover:text-[#831843] shadow-sm hover:scale-105 active:scale-95'
                  : 'border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Next collection"
              className={`p-3 rounded-full border transition-all duration-200 ${
                canScrollRight
                  ? 'border-stone-300 bg-white hover:bg-stone-50 hover:border-[#831843] text-stone-800 hover:text-[#831843] shadow-sm hover:scale-105 active:scale-95'
                  : 'border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURED_COLLECTIONS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectCollection(item.weave)}
              className="group relative w-[280px] sm:w-[330px] md:w-[360px] shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Image Showcase Stage */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.category}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Refined gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent group-hover:from-stone-950/95 transition-colors duration-500" />

                {/* Top Floating Badges */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                  <span className="bg-[#4A1525]/85 backdrop-blur-md text-amber-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-300/30 flex items-center gap-1.5 shadow-sm group-hover:border-amber-300/70 group-hover:bg-[#4A1525] transition-all">
                    <Crown className="w-3 h-3 text-amber-300" />
                    <span>{item.badge}</span>
                  </span>

                  <span className="bg-stone-950/70 backdrop-blur-md text-stone-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20">
                    {item.count}
                  </span>
                </div>

                {/* Bottom Overlay Info on Image */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[11px] text-amber-300 font-semibold tracking-wider uppercase mb-1">
                    {item.origin}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-100 transition-colors drop-shadow-sm">
                    {item.title}
                  </h3>
                  <div className="text-xs text-stone-300 font-light mt-0.5">
                    {item.category}
                  </div>

                  {/* Price Tag with Silk Mark */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/15 text-xs">
                    <span className="font-semibold text-amber-200 tabular-nums">
                      {item.priceNote}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-300 group-hover:text-emerald-300 transition-colors">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Silk Mark Pure</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Action Bar */}
              <div className="p-4 bg-white border-t border-stone-100 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-stone-600 line-clamp-2 font-light leading-relaxed">
                  {item.highlight}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#831843] group-hover:text-[#701A36]">
                    View {item.weave}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-rose-50 group-hover:bg-[#831843] text-[#831843] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {FEATURED_COLLECTIONS.map((col, i) => (
            <button
              key={col.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Jump to ${col.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-8 bg-[#831843]'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
