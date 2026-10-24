import React, { useState } from 'react';
import { X, ArrowLeftRight, Check, ShoppingBag, Video, MessageSquare, ShieldCheck, Sparkles, Plus, Clock, Award } from 'lucide-react';
import { Saree } from '../types/saree';
import { STORE_DETAILS } from '../data/sarees';

interface SareeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  sarees: Saree[]; // all available sarees for the add-to-compare dropdown
  comparedSarees: Saree[];
  onRemoveSaree: (sareeId: string) => void;
  onAddSaree: (saree: Saree) => void;
  onClearAll: () => void;
  onAddToCart: (saree: Saree) => void;
  onSelectSaree: (saree: Saree) => void;
  onBookVideoCall: (sareeCode: string) => void;
}

export const SareeComparisonModal: React.FC<SareeComparisonModalProps> = ({
  isOpen,
  onClose,
  sarees,
  comparedSarees,
  onRemoveSaree,
  onAddSaree,
  onClearAll,
  onAddToCart,
  onSelectSaree,
  onBookVideoCall,
}) => {
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [selectedAddId, setSelectedAddId] = useState<string>('');

  if (!isOpen) return null;

  const handleQuickAdd = (saree: Saree) => {
    onAddToCart(saree);
    setAddedItemIds((prev) => [...prev, saree.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== saree.id));
    }, 1800);
  };

  const handleAddDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    const match = sarees.find((s) => s.id === id);
    if (match) {
      onAddSaree(match);
      setSelectedAddId('');
    }
  };

  // Remaining sarees that are not yet in compared list
  const availableToAdd = sarees.filter(
    (s) => !comparedSarees.some((cs) => cs.id === s.id)
  );

  const handleWhatsAppCompare = () => {
    const codes = comparedSarees.map((s) => `${s.code} (${s.name})`).join(' vs ');
    const text = encodeURIComponent(
      `Namaste Sri Markandeya Handlooms, I am comparing these sarees from your website:\n\n${codes}\n\nCan you guide me on which one suits best for my occasion or share video draping clips?`
    );
    window.open(`https://wa.me/91${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div
        className="bg-[#FAF8F5] w-full max-w-6xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#4A1525] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ArrowLeftRight className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 id="comparison-modal-title" className="font-serif text-lg sm:text-2xl font-semibold tracking-wide">
                Side-by-Side Saree Comparison
              </h2>
              <p className="text-xs text-amber-100/80">
                Compare artisan weaves, silk purity, zari grade, and loom craftsmanship
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedSarees.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-amber-200 hover:text-white px-2.5 py-1 rounded hover:bg-white/10 transition-colors hidden sm:inline-block"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {comparedSarees.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#831843]">
              <ArrowLeftRight className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              No sarees selected for comparison
            </h3>
            <p className="text-sm text-stone-600 max-w-md">
              Browse our collection and click the &ldquo;Compare&rdquo; button on any saree card to view side-by-side weave, zari, and pricing details.
            </p>
            <div className="pt-2">
              <select
                value={selectedAddId}
                onChange={handleAddDropdownChange}
                className="px-4 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 shadow-sm focus:ring-2 focus:ring-[#831843]/30"
              >
                <option value="">Select a saree to begin comparing...</option>
                {sarees.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.weave} · ₹{s.price.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto flex-1 p-4 sm:p-6">
            <div className="min-w-[620px]">
              {/* Top Controls & Direct Inquire Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                  <span className="bg-[#831843] text-white px-2 py-0.5 rounded-full font-bold text-[11px]">
                    {comparedSarees.length} / 4 Sarees
                  </span>
                  <span>Comparing master artisan specifications</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {availableToAdd.length > 0 && comparedSarees.length < 4 && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Plus className="w-3.5 h-3.5 text-[#831843]" />
                      <select
                        value={selectedAddId}
                        onChange={handleAddDropdownChange}
                        className="px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#831843]"
                      >
                        <option value="">+ Add saree to compare...</option>
                        {availableToAdd.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.weave} · ₹{s.price.toLocaleString('en-IN')})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleWhatsAppCompare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Suryapet Master on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Table / Grid Structure */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="w-40 sm:w-48 text-left text-xs uppercase font-semibold text-stone-500 pb-3 pr-4">
                      Feature
                    </th>
                    {comparedSarees.map((saree) => (
                      <th key={saree.id} className="w-64 sm:w-72 text-left pb-4 px-3 align-top">
                        <div className="relative bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex flex-col justify-between h-full group">
                          {/* Close / Remove button */}
                          <button
                            type="button"
                            onClick={() => onRemoveSaree(saree.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-stone-800 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                            title="Remove from comparison"
                            aria-label={`Remove ${saree.name}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {/* Image */}
                          <div
                            onClick={() => onSelectSaree(saree)}
                            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 cursor-pointer"
                          >
                            <img
                              src={saree.image}
                              alt={saree.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                              {saree.code}
                            </span>
                          </div>

                          {/* Name & Weave */}
                          <div className="mb-2">
                            <span className="text-[11px] font-semibold text-[#831843] uppercase tracking-wide block">
                              {saree.weave}
                            </span>
                            <h4
                              onClick={() => onSelectSaree(saree)}
                              className="font-serif font-semibold text-stone-900 text-sm hover:text-[#831843] cursor-pointer line-clamp-2"
                            >
                              {saree.name}
                            </h4>
                          </div>

                          {/* Price */}
                          <div className="mt-auto pt-2 border-t border-stone-100 flex items-baseline gap-2">
                            <span className="text-base font-bold text-stone-900">
                              {formatPrice(saree.price)}
                            </span>
                            {saree.originalPrice && (
                              <span className="text-xs text-stone-400 line-through">
                                {formatPrice(saree.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Quick Add Button */}
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(saree)}
                            className={`mt-2.5 w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                              addedItemIds.includes(saree.id)
                                ? 'bg-emerald-700 text-white'
                                : 'bg-stone-900 hover:bg-[#831843] text-white'
                            }`}
                          >
                            {addedItemIds.includes(saree.id) ? (
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
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-200/80 text-xs sm:text-sm text-stone-700">
                  {/* Row: Direct Loom Price & Savings */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Pricing & Value
                    </td>
                    {comparedSarees.map((saree) => {
                      const discount = saree.originalPrice
                        ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
                        : null;
                      return (
                        <td key={saree.id} className="py-3 px-3">
                          <div className="space-y-1">
                            <div className="font-bold text-stone-900 text-sm">
                              {formatPrice(saree.price)}
                            </div>
                            {discount ? (
                              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                                {discount}% Off Direct Loom Price
                              </span>
                            ) : (
                              <span className="text-[11px] text-stone-500">Artisan Direct Pricing</span>
                            )}
                            <div className="text-[11px] text-emerald-700 font-medium">
                              Free Fall & Pico Edge Included
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Regional Origin & Loom Type */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Origin & Heritage
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="font-medium text-stone-900">{saree.origin}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{saree.weave}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Silk Composition (Warp & Weft) */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Fabric & Warp/Weft
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="font-medium text-stone-800">{saree.warpWeft}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Zari Metal & Purity */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Zari Quality & Finish
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 font-medium text-stone-800">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{saree.zari}</span>
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Handloom Weaving Time */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Weaving Complexity
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-medium text-stone-800">
                          <Clock className="w-3.5 h-3.5 text-stone-500" />
                          <span>{saree.weavingDays} days on artisan pitloom</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="bg-[#831843] h-full rounded-full"
                            style={{
                              width: `${Math.min(100, (saree.weavingDays / 30) * 100)}%`,
                            }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Motif & Border Architecture */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Motif & Pallu Work
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="font-medium text-stone-800">{saree.motif}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{saree.subname}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Silk Mark Certification */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Silk Mark Authenticity
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded text-xs font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>{saree.silkMarkCert}</span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1">100% Pure Natural Silk Guarantee</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Blouse Piece Details */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Blouse Piece
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="text-xs text-stone-700">{saree.blousePiece}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Total Length */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Length & Draping
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <div className="font-medium text-stone-800">{saree.length}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Recommended Occasion */}
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Best Occasion
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-3 px-3">
                        <span className="inline-block bg-rose-50 text-[#831843] border border-rose-200/80 px-2.5 py-1 rounded-md text-xs font-medium">
                          {saree.occasion}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Action Row */}
                  <tr>
                    <td className="py-4 pr-4 font-semibold text-stone-900 bg-stone-100/60 rounded-l px-2">
                      Actions
                    </td>
                    {comparedSarees.map((saree) => (
                      <td key={saree.id} className="py-4 px-3">
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(saree)}
                            className="w-full py-2 px-3 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onBookVideoCall(saree.code);
                            }}
                            className="w-full py-1.5 px-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Video className="w-3.5 h-3.5 text-[#831843]" />
                            <span>Live Video Draping</span>
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-stone-100/90 border-t border-stone-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#831843]" />
            <span>
              All handlooms carry certified Silk Mark labels &middot; Sri Markandeya Handlooms, Ganesh Nagar, Suryapet
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors ml-auto"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
