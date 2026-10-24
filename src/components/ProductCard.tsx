import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check, ArrowLeftRight, Trash2, ShieldCheck, Edit3 } from 'lucide-react';
import { Saree } from '../types/saree';

interface ProductCardProps {
  saree: Saree;
  isWishlisted: boolean;
  isCompared?: boolean;
  isOwner?: boolean;
  onToggleWishlist: (saree: Saree) => void;
  onToggleCompare?: (saree: Saree) => void;
  onSelectSaree: (saree: Saree) => void;
  onQuickAdd: (saree: Saree) => void;
  onDeleteSaree?: (id: string) => void;
  onEditSaree?: (saree: Saree) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  saree,
  isWishlisted,
  isCompared = false,
  isOwner = false,
  onToggleWishlist,
  onToggleCompare,
  onSelectSaree,
  onQuickAdd,
  onDeleteSaree,
  onEditSaree,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const isCustomSaree = saree.id.startsWith('custom-');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(saree);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(saree.price);

  const formattedOriginalPrice = saree.originalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(saree.originalPrice)
    : null;

  return (
    <article
      onClick={() => onSelectSaree(saree)}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <img
          src={saree.image}
          alt={saree.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Fallback pattern if image is slow or missing */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center text-stone-400 text-xs">
          {saree.name}
        </div>

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Subtle unboxed status or Owner badge */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {isOwner && isCustomSaree && (
              <span className="bg-emerald-900/90 backdrop-blur-sm text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Added by You</span>
              </span>
            )}
            {saree.isBestseller && !isCustomSaree && (
              <span className="bg-[#4A1525]/90 backdrop-blur-sm text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase">
                Boutique Favorite
              </span>
            )}
          </div>

          {/* Action buttons (Compare & Wishlist) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(saree);
                }}
                className={`p-2 rounded-full shadow-sm transition-all ${
                  isCompared
                    ? 'bg-[#831843] text-white ring-2 ring-white scale-105'
                    : 'bg-white/90 hover:bg-white text-stone-700 hover:text-[#831843]'
                }`}
                title={isCompared ? 'Remove from comparison' : 'Compare saree'}
                aria-label={isCompared ? 'Remove from comparison' : 'Compare saree'}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(saree);
              }}
              className="p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#831843] rounded-full shadow-sm transition-all"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isWishlisted ? 'fill-[#831843] text-[#831843]' : 'text-stone-600'
                }`}
              />
            </button>

            {isOwner && onEditSaree && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditSaree(saree);
                }}
                className="p-2 bg-amber-50 hover:bg-[#831843] text-amber-900 hover:text-white rounded-full shadow-sm transition-all"
                title="Edit saree details"
                aria-label="Edit saree"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}

            {isOwner && isCustomSaree && onDeleteSaree && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Remove "${saree.name}" from your shop inventory?`)) {
                    onDeleteSaree(saree.id);
                  }
                }}
                className="p-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white rounded-full shadow-sm transition-all"
                title="Delete from shop catalog"
                aria-label="Delete saree"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {isOwner && onEditSaree && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditSaree(saree);
              }}
              className="px-3 py-1.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded shadow flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>Edit</span>
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectSaree(saree);
            }}
            className="px-3 py-1.5 bg-white text-stone-900 text-xs font-medium rounded shadow hover:bg-stone-50 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>View Details</span>
          </button>
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(saree);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded shadow flex items-center gap-1.5 transition-colors ${
                isCompared
                  ? 'bg-[#831843] text-white'
                  : 'bg-stone-900/90 hover:bg-stone-900 text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-300" />
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 tracking-wide">
            <span className="font-medium text-[#831843]">{saree.weave}</span>
            <span aria-hidden="true">·</span>
            <span>{saree.origin.split(',')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{saree.weavingDays}d handloom</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-[#831843] transition-colors leading-snug line-clamp-1">
            {saree.name}
          </h3>

          {/* Color & Motif detail */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {saree.colorName} · {saree.motif}
          </p>
        </div>

        {/* Price & Add to Bag Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-900 tabular-nums">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium">
              Free Fall & Pico Edge
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-[#831843] text-white shadow-sm'
            }`}
            aria-label={`Add ${saree.name} to shopping bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
