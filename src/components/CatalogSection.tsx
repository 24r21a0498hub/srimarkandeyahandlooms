import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, SlidersHorizontal, Sparkles, IndianRupee, ArrowLeftRight, Plus, ShieldCheck, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Saree } from '../types/saree';
import { WEAVE_FILTERS, OCCASION_FILTERS, COLOR_OPTIONS } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { OWNER_EMAIL } from '../utils/auth';

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const filterVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

interface CatalogSectionProps {
  sarees: Saree[];
  wishlistIds: string[];
  compareIds?: string[];
  searchQuery: string;
  isOwner?: boolean;
  onSearchChange: (query: string) => void;
  onToggleWishlist: (saree: Saree) => void;
  onToggleCompare?: (saree: Saree) => void;
  onOpenCompare?: () => void;
  onSelectSaree: (saree: Saree) => void;
  onQuickAdd: (saree: Saree) => void;
  onOpenAddSaree?: () => void;
  onOpenOwnerPortal?: () => void;
  onDeleteSaree?: (id: string) => void;
  onEditSaree?: (saree: Saree) => void;
  selectedWeave?: string;
  onSelectWeave?: (weave: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  sarees,
  wishlistIds,
  compareIds = [],
  searchQuery,
  isOwner = false,
  onSearchChange,
  onToggleWishlist,
  onToggleCompare,
  onOpenCompare,
  onSelectSaree,
  onQuickAdd,
  onOpenAddSaree,
  onOpenOwnerPortal,
  onDeleteSaree,
  onEditSaree,
  selectedWeave: controlledWeave,
  onSelectWeave,
}) => {
  const [internalWeave, setInternalWeave] = useState<string>('All Weaves');
  const selectedWeave = controlledWeave !== undefined ? controlledWeave : internalWeave;
  const setSelectedWeave = (w: string) => {
    setInternalWeave(w);
    if (onSelectWeave) onSelectWeave(w);
  };
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All Occasions');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'days'>('featured');
  const [mobileFilterExpanded, setMobileFilterExpanded] = useState(false);

  // Filter & Sort logic
  const filteredSarees = useMemo(() => {
    return sarees
      .filter((item) => {
        // Price Point Range Slider filter
        if (item.price > maxPrice) {
          return false;
        }
        // Search by name, material/weave, color, warp/weft, motif, or origin
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            item.name.toLowerCase().includes(q) ||
            item.weave.toLowerCase().includes(q) ||
            item.colorName.toLowerCase().includes(q) ||
            item.warpWeft.toLowerCase().includes(q) ||
            item.motif.toLowerCase().includes(q) ||
            item.origin.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Weave filter
        if (selectedWeave !== 'All Weaves' && item.weave !== selectedWeave) {
          return false;
        }

        // Occasion filter
        if (selectedOccasion !== 'All Occasions' && item.occasion !== selectedOccasion) {
          return false;
        }

        // Color filter
        if (selectedColor && !item.colorName.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'days') return b.weavingDays - a.weavingDays;
        // featured default
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [sarees, searchQuery, selectedWeave, selectedOccasion, selectedColor, maxPrice, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedWeave !== 'All Weaves' ||
    selectedOccasion !== 'All Occasions' ||
    selectedColor !== '' ||
    maxPrice < 40000;

  const handleResetFilters = () => {
    onSearchChange('');
    setSelectedWeave('All Weaves');
    setSelectedOccasion('All Occasions');
    setSelectedColor('');
    setMaxPrice(40000);
    setSortBy('featured');
  };

  return (
    <motion.section
      id="collection"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Shop Owner Exclusive Inventory Banner */}
      {isOwner && (
        <div className="mb-6 p-3.5 sm:p-4 bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-300/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#831843] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900">Store Owner Mode Active</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full font-mono">
                  {OWNER_EMAIL}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Only you have authorization to publish and manage handloom sarees for Sri Markandeya Handlooms.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenAddSaree && (
              <button
                type="button"
                onClick={onOpenAddSaree}
                className="px-3.5 py-2 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Saree</span>
              </button>
            )}
            {onOpenOwnerPortal && (
              <button
                type="button"
                onClick={onOpenOwnerPortal}
                className="px-3 py-2 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium rounded-lg border border-stone-300 transition-colors"
              >
                Manage
              </button>
            )}
          </div>
        </div>
      )}

      {/* Section Header with Scroll Reveal */}
      <motion.div
        variants={sectionHeaderVariants}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200"
      >
        <div>
          <div className="text-xs uppercase tracking-wider text-[#831843] font-semibold mb-2">
            Direct Loom Collection
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 text-balance">
            Handwoven Pattu & Festive Sarees
          </h2>
          <p className="text-sm text-stone-600 mt-1.5 max-w-xl">
            Sourced directly from generational weavers in Gadwal, Mangalagiri, and Kanchipuram with honest pricing, Silk Mark certification, and live WhatsApp video draping.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search weave, motif, color..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30 focus:border-[#831843]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs font-medium bg-white border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#831843]/30 shrink-0"
          >
            <option value="featured">Featured Weaves</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="days">Weaving Complexity</option>
          </select>

          {/* Style Quiz Quick Button */}
          <a
            href="#saree-quiz"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#831843] bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#831843]" />
            <span>Style Quiz</span>
          </a>

          {/* Comparison Quick Button */}
          {onOpenCompare && (
            <button
              type="button"
              onClick={onOpenCompare}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 border ${
                compareIds && compareIds.length > 0
                  ? 'bg-[#4A1525] text-amber-200 border-[#4A1525] hover:bg-[#701A36]'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
              <span>Compare {compareIds && compareIds.length > 0 ? `(${compareIds.length})` : ''}</span>
            </button>
          )}

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterExpanded(!mobileFilterExpanded)}
            className="md:hidden p-2 text-stone-700 bg-white border border-stone-300 rounded-lg flex items-center justify-center shrink-0"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs & Selectors with Motion Fade */}
      <motion.div
        variants={filterVariants}
        className={`space-y-4 mb-8 ${mobileFilterExpanded ? 'block' : 'hidden md:block'}`}
      >
        {/* Weave Fabric Type (Interactive Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-stone-500 whitespace-nowrap mr-2">
            Weave:
          </span>
          {WEAVE_FILTERS.map((weave) => {
            const isActive = selectedWeave === weave;
            return (
              <button
                key={weave}
                onClick={() => setSelectedWeave(weave)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#831843] text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {weave}
              </button>
            );
          })}
        </div>

        {/* Occasion & Color Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-200/60">
          {/* Occasion Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap mr-2">
              Occasion:
            </span>
            {OCCASION_FILTERS.map((occ) => {
              const isActive = selectedOccasion === occ;
              return (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>

          {/* Color filter dots & Reset */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-500">Color:</span>
            <div className="flex items-center gap-1.5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.hex ? c.name : '')}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                    (c.hex === '' && selectedColor === '') ||
                    (c.hex && selectedColor.toLowerCase().includes(c.name.toLowerCase()))
                      ? 'ring-2 ring-offset-2 ring-[#831843] border-white scale-110'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: c.hex || '#E5E7EB',
                  }}
                  aria-label={`Filter by ${c.name}`}
                >
                  {c.hex === '' && <span className="text-[9px] text-stone-700 font-bold">All</span>}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="ml-2 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-[#831843] font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Price Point Range Slider */}
        <div className="bg-stone-50/90 rounded-xl p-3.5 sm:p-4 border border-stone-200/80 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#831843]" />
                <span>Price Point Range:</span>
              </span>
              <span className="text-xs font-bold text-[#831843] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {maxPrice >= 40000 ? 'All Prices (Up to ₹40,000+)' : `Up to ₹${maxPrice.toLocaleString('en-IN')}`}
              </span>
            </div>

            {/* Quick Price Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px]">
              <span className="text-stone-400 text-[10px] hidden sm:inline mr-0.5">Quick:</span>
              <button
                type="button"
                onClick={() => setMaxPrice(40000)}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                  maxPrice >= 40000
                    ? 'bg-[#831843] text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setMaxPrice(15000)}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                  maxPrice === 15000
                    ? 'bg-[#831843] text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                Under ₹15K
              </button>
              <button
                type="button"
                onClick={() => setMaxPrice(20000)}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                  maxPrice === 20000
                    ? 'bg-[#831843] text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                Under ₹20K
              </button>
              <button
                type="button"
                onClick={() => setMaxPrice(30000)}
                className={`px-2 py-0.5 rounded transition-all whitespace-nowrap ${
                  maxPrice === 30000
                    ? 'bg-[#831843] text-white font-semibold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                Under ₹30K
              </button>
            </div>
          </div>

          {/* HTML5 Range Slider */}
          <div className="space-y-1 pt-1">
            <input
              type="range"
              min={9000}
              max={40000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Filter sarees by maximum price point"
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#831843] focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
            />
            <div className="flex justify-between items-center text-[10px] text-stone-500 font-medium px-0.5">
              <span>₹9,000 (Artisan Direct)</span>
              <span className="text-[#831843] font-semibold">
                Current Filter: Sarees ≤ ₹{maxPrice.toLocaleString('en-IN')}
              </span>
              <span>₹40,000+ (Bridal Muhurtham)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
        <span>
          Showing <strong className="text-stone-800">{filteredSarees.length}</strong> authenticated handloom sarees
        </span>
        {hasActiveFilters && (
          <span className="text-[#831843] font-medium">Filtered Results</span>
        )}
      </div>

      {/* Saree Grid with Staggered Scroll Reveal & Fluid Filtering */}
      {filteredSarees.length > 0 ? (
        <motion.div
          key={`${selectedWeave}-${selectedOccasion}-${selectedColor}-${sortBy}-${searchQuery}-${maxPrice}`}
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSarees.map((saree) => (
              <motion.div
                key={saree.id}
                variants={cardItemVariants}
                layout
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <ProductCard
                  saree={saree}
                  isWishlisted={wishlistIds.includes(saree.id)}
                  isCompared={compareIds.includes(saree.id)}
                  isOwner={isOwner}
                  onToggleWishlist={onToggleWishlist}
                  onToggleCompare={onToggleCompare}
                  onSelectSaree={onSelectSaree}
                  onQuickAdd={onQuickAdd}
                  onDeleteSaree={onDeleteSaree}
                  onEditSaree={onEditSaree}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4 bg-stone-50 rounded-xl border border-dashed border-stone-300 max-w-xl mx-auto"
        >
          <p className="font-serif text-xl text-stone-800 font-semibold mb-2">
            No sarees matching your current criteria
          </p>
          <p className="text-xs text-stone-500 mb-6">
            We regularly receive direct artisan shipments from Gadwal, Mangalagiri, and Kanchipuram. Try clearing your filters or speak with our showroom master.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#831843] text-white text-xs font-semibold rounded-lg hover:bg-[#701A36]"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};
