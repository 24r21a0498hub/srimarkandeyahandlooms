import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types/saree';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const itemBase = item.saree.price;
    const tasselsFee = item.includeTassels ? 350 : 0;
    return acc + (itemBase + tasselsFee) * item.quantity;
  }, 0);

  const formattedSubtotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#831843]" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h4 className="font-serif text-lg text-stone-800 font-semibold mb-1">
                  Your shopping bag is empty
                </h4>
                <p className="text-xs text-stone-500 mb-6">
                  Explore our authentic handwoven Kanjivaram and Banarasi silk sarees.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-[#831843] text-white text-xs font-semibold rounded-lg hover:bg-[#701A36]"
                >
                  Explore Saree Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemTotal =
                  (item.saree.price + (item.includeTassels ? 350 : 0)) * item.quantity;
                return (
                  <div
                    key={`${item.saree.id}-${idx}`}
                    className="flex gap-4 p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/80 relative"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.saree.image}
                      alt={item.saree.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-lg border border-stone-200 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {item.saree.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-stone-400 hover:text-rose-700 p-1"
                            title="Remove saree"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {item.saree.weave} · {item.saree.code}
                        </div>

                        {/* Customizations tags */}
                        <div className="text-[10px] text-stone-600 mt-1 space-y-0.5">
                          {item.includeFallPico && (
                            <span className="inline-block text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded mr-1">
                              Fall & Pico (Free)
                            </span>
                          )}
                          {item.includeTassels && (
                            <span className="inline-block text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                              Kuchu Tassels (+₹350)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center border border-stone-300 rounded bg-white">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          ₹{itemTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {formattedSubtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bangalore Express Delivery</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Complimentary Fall & Pico Edge</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#831843]">{formattedSubtotal}</span>
                </div>
              </div>

              {/* Silk Mark Assured */}
              <div className="flex items-center gap-2 text-[11px] text-stone-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Each saree includes Govt. Silk Mark tag & certified purity card.</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#831843] hover:bg-[#701A36] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout / Store Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
