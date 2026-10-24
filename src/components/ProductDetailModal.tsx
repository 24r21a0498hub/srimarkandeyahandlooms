import React, { useState } from 'react';
import { X, ShieldCheck, Heart, ShoppingBag, MessageSquare, Video, Calendar, Sparkles, Check, Truck, ArrowLeftRight, Edit3 } from 'lucide-react';
import { Saree } from '../types/saree';
import { STORE_DETAILS } from '../data/sarees';

interface ProductDetailModalProps {
  saree: Saree | null;
  isWishlisted: boolean;
  isCompared?: boolean;
  isOwner?: boolean;
  onClose: () => void;
  onToggleWishlist: (saree: Saree) => void;
  onToggleCompare?: (saree: Saree) => void;
  onOpenCompare?: () => void;
  onAddToCart: (saree: Saree, includeFallPico: boolean, includeTassels: boolean, notes: string) => void;
  onBookVideoCall: (sareeCode: string) => void;
  onBookAppointment: () => void;
  onEditSaree?: (saree: Saree) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  saree,
  isWishlisted,
  isCompared = false,
  isOwner = false,
  onClose,
  onToggleWishlist,
  onToggleCompare,
  onOpenCompare,
  onAddToCart,
  onBookVideoCall,
  onBookAppointment,
  onEditSaree,
}) => {
  if (!saree) return null;

  const [includeFallPico, setIncludeFallPico] = useState(true);
  const [includeTassels, setIncludeTassels] = useState(false);
  const [blouseInquiry, setBlouseInquiry] = useState(false);
  const [customerNotes, setCustomerNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(saree.image);
  const [addedNotice, setAddedNotice] = useState(false);

  const finalPrice = saree.price + (includeTassels ? 350 : 0);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(finalPrice);

  const formattedOriginalPrice = saree.originalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(saree.originalPrice)
    : null;

  const handleAdd = () => {
    let notes = customerNotes;
    if (blouseInquiry) {
      notes += (notes ? ' | ' : '') + 'Interested in Custom Blouse Tailoring Consultation';
    }
    onAddToCart(saree, includeFallPico, includeTassels, notes);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  // Pre-fill WhatsApp message
  const whatsappText = encodeURIComponent(
    `Namaste Sri Markandeya Handlooms! I would like to order:
- Saree: ${saree.name} (${saree.code})
- Weave: ${saree.weave}
- Price: ₹${finalPrice.toLocaleString('en-IN')}
- Fall & Pico: ${includeFallPico ? 'Yes (Complimentary)' : 'No'}
- Handcrafted Tassels: ${includeTassels ? 'Yes (+₹350)' : 'No'}
${blouseInquiry ? '- Inquiring for Custom Blouse Stitching\n' : ''}
Please confirm availability for Suryapet showroom pickup / express delivery.`
  );

  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-semibold text-[#831843]">{saree.weave}</span>
            <span aria-hidden="true">·</span>
            <span>Item Code: <strong className="text-stone-800">{saree.code}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Silk Mark: <strong className="text-stone-800">{saree.silkMarkCert}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {isOwner && onEditSaree && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditSaree(saree);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#831843] hover:bg-[#701A36] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                title="Edit this saree (Owner only)"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Saree</span>
              </button>
            )}

            {onToggleCompare && (
              <button
                type="button"
                onClick={() => onToggleCompare(saree)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  isCompared
                    ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:text-stone-900'
                }`}
                title={isCompared ? 'Remove from compare' : 'Compare this saree with others'}
              >
                <ArrowLeftRight className={`w-3.5 h-3.5 ${isCompared ? 'text-amber-700' : 'text-stone-500'}`} />
                <span>{isCompared ? 'In Comparison' : 'Compare'}</span>
              </button>
            )}
            <button
              onClick={() => onToggleWishlist(saree)}
              className="p-2 text-stone-600 hover:text-[#831843] rounded-lg hover:bg-stone-100 transition-colors"
              title="Add to Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#831843] text-[#831843]' : 'text-stone-600'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2-Column Contiguous Purchase Module */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Left (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                <img
                  src={selectedImage}
                  alt={saree.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedImage(saree.image)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === saree.image
                      ? 'border-[#831843] ring-1 ring-[#831843]'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={saree.image}
                    alt="Saree fold view"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 inset-x-1 bg-black/60 text-white text-[9px] py-0.5 text-center font-medium rounded">
                    Folded View
                  </span>
                </button>

                {saree.secondaryImage && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(saree.secondaryImage!)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === saree.secondaryImage
                        ? 'border-[#831843] ring-1 ring-[#831843]'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={saree.secondaryImage}
                      alt="Drape & Mannequin view"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 inset-x-1 bg-black/60 text-white text-[9px] py-0.5 text-center font-medium rounded">
                      Drape View
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedImage('/src/assets/images/boutique_store_interior_1792573628086.jpg')}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === '/src/assets/images/boutique_store_interior_1792573628086.jpg'
                      ? 'border-[#831843] ring-1 ring-[#831843]'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src="/src/assets/images/boutique_store_interior_1792573628086.jpg"
                    alt="Showroom view"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 inset-x-1 bg-black/60 text-white text-[9px] py-0.5 text-center font-medium rounded">
                    Showroom
                  </span>
                </button>
              </div>

              {/* Silk Mark Guarantee Callout */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="font-semibold block mb-0.5">
                    Silk Mark India Certified Pure Silk
                  </strong>
                  Authorized government tag #{saree.silkMarkCert} stitched with tamper-proof holographic seal. 100% natural pure silk tested.
                </div>
              </div>

              {/* Video Drape Button */}
              <button
                type="button"
                onClick={() => onBookVideoCall(saree.code)}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-stone-300"
              >
                <Video className="w-4 h-4 text-[#831843]" />
                <span>Inspect on WhatsApp Video Call</span>
              </button>
            </div>

            {/* Purchase Module Right (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>{saree.origin}</span>
                  <span aria-hidden="true">·</span>
                  <span>{saree.weavingDays} artisan days to weave</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  {saree.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {saree.subname}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-0.5">
                    Boutique Direct Price (Inc. All Taxes)
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                      {formattedPrice}
                    </span>
                    {formattedOriginalPrice && (
                      <span className="text-sm text-stone-400 line-through tabular-nums">
                        {formattedOriginalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    In Stock at Showroom
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Ready for pickup / dispatch
                  </p>
                </div>
              </div>

              {/* Saree Description */}
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                {saree.description}
              </p>

              {/* Handloom Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                <div>
                  <span className="text-stone-400 block font-medium">Weave & Technique</span>
                  <span className="font-semibold text-stone-800">{saree.weave}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Zari Composition</span>
                  <span className="font-semibold text-stone-800">{saree.zari}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Warp & Weft Silk</span>
                  <span className="font-semibold text-stone-800">{saree.warpWeft}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Motif & Design</span>
                  <span className="font-semibold text-stone-800">{saree.motif}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Length & Dimension</span>
                  <span className="font-semibold text-stone-800">{saree.length}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Blouse Fabric</span>
                  <span className="font-semibold text-stone-800">{saree.blousePiece}</span>
                </div>
              </div>

              {/* Finishing & Customization Options */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Showroom Finishing & Customization
                </span>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={includeFallPico}
                      onChange={(e) => setIncludeFallPico(e.target.checked)}
                      className="w-4 h-4 text-[#831843] rounded focus:ring-[#831843]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-stone-800">
                        Complimentary Saree Fall & Pico (Edging)
                      </span>
                      <span className="text-emerald-700 ml-1.5 font-medium">Free</span>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        High-quality cotton fall hand-stitched for elegant pleating. Adds 24 hrs.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={includeTassels}
                      onChange={(e) => setIncludeTassels(e.target.checked)}
                      className="w-4 h-4 text-[#831843] rounded focus:ring-[#831843]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-stone-800">
                        Handcrafted Pallu Tassels (Kuchu Work)
                      </span>
                      <span className="text-stone-700 ml-1.5 font-medium">+₹350</span>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Artisan silk thread knotting with gold beads on the pallu fringe.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={blouseInquiry}
                      onChange={(e) => setBlouseInquiry(e.target.checked)}
                      className="w-4 h-4 text-[#831843] rounded focus:ring-[#831843]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-stone-800">
                        In-House Blouse Stitching Consultation
                      </span>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Our master cutter will contact you via WhatsApp with design sketches & measurements.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Direct Purchase Actions */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                      addedNotice
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-900 hover:bg-[#831843] text-white'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag ({formattedPrice})</span>
                      </>
                    )}
                  </button>

                  {/* Order directly on WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>

                {/* Secondary In-Store Trial */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-600" />
                    <span>Free express delivery in Bangalore</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookAppointment();
                    }}
                    className="text-[#831843] hover:underline font-medium flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book In-Store Trial</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
