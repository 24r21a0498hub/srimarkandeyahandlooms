import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Saree } from '../types/saree';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistSarees: Saree[];
  onRemoveFromWishlist: (saree: Saree) => void;
  onSelectSaree: (saree: Saree) => void;
  onQuickAdd: (saree: Saree) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistSarees,
  onRemoveFromWishlist,
  onSelectSaree,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#831843] text-[#831843]" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Saved Saree Shortlist ({wishlistSarees.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {wishlistSarees.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h4 className="font-serif text-lg font-semibold text-stone-800">
                No sarees saved yet
              </h4>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Click the heart icon on any saree to save it for your bridal consultation or family viewing.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#831843] text-white text-xs font-semibold rounded-lg"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            wishlistSarees.map((saree) => (
              <div
                key={saree.id}
                className="flex items-center justify-between gap-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer min-w-0"
                  onClick={() => {
                    onClose();
                    onSelectSaree(saree);
                  }}
                >
                  <img
                    src={saree.image}
                    alt={saree.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-[#831843] block">
                      {saree.weave}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate">{saree.name}</h4>
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      ₹{saree.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onQuickAdd(saree);
                    }}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-[#831843] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(saree)}
                    className="p-1.5 text-stone-400 hover:text-rose-700"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
