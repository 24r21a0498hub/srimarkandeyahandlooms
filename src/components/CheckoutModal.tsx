import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Truck, Building, ShieldCheck, Printer, Package } from 'lucide-react';
import { CartItem, Order } from '../types/saree';
import { STORE_DETAILS } from '../data/sarees';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onOpenOrders?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onOpenOrders,
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'local_express' | 'store_pickup' | 'all_india'>('local_express');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState(() => {
    try {
      return sessionStorage.getItem('markandeya_customer_email') || '';
    } catch {
      return '';
    }
  });
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Suryapet');
  const [pincode, setPincode] = useState('508213');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'whatsapp'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((acc, item) => {
    return acc + item.saree.price * item.quantity;
  }, 0);

  const tasselsFee = items.reduce((acc, item) => {
    return acc + (item.includeTassels ? 350 : 0) * item.quantity;
  }, 0);

  const total = subtotal + tasselsFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `SMH-${Math.floor(10000 + Math.random() * 90000)}`;
      const nowFormatted = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const nowTimeFormatted = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const carrier =
        deliveryType === 'store_pickup'
          ? 'Boutique Collection Desk'
          : deliveryType === 'local_express'
          ? 'Suryapet Showroom Courier'
          : 'DTDC Air Express';

      const tracking =
        deliveryType === 'store_pickup'
          ? undefined
          : `SMH-TRK-${Math.floor(100000 + Math.random() * 900000)}`;

      const estimated =
        deliveryType === 'store_pickup'
          ? 'Ready for showroom pickup in 2-3 hours'
          : deliveryType === 'local_express'
          ? 'Same/Next Day delivery to your address'
          : '3-4 business days via Insured Air Express';

      const newOrder: Order = {
        id: orderId,
        items,
        subtotal,
        tasselsFee,
        deliveryFee: 0,
        total,
        deliveryType,
        customerName,
        customerEmail: customerEmail.trim() || undefined,
        phone,
        address:
          deliveryType === 'store_pickup'
            ? 'In-Store Pickup (Suryapet Showroom - Ganesh Nagar, 60 Feet Road)'
            : address,
        landmark,
        city,
        pincode,
        paymentMethod,
        status: 'placed',
        trackingNumber: tracking,
        courierPartner: carrier,
        estimatedDelivery: estimated,
        createdAt: nowFormatted,
        statusUpdates: [
          {
            status: 'placed',
            title: 'Order Placed & Confirmed',
            description: `Order received at Sri Markandeya Handlooms Showroom. Reserved sarees from inventory.`,
            timestamp: `${nowFormatted}, ${nowTimeFormatted}`,
            location: 'Suryapet Showroom',
          },
        ],
      };

      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 800);
  };

  // WhatsApp order text
  const whatsappOrderText = completedOrder
    ? encodeURIComponent(
        `Namaste Sri Markandeya Handlooms! I would like to confirm my order:
Order ID: ${completedOrder.id}
Customer: ${completedOrder.customerName} (${completedOrder.phone})
Mode: ${
          completedOrder.deliveryType === 'store_pickup'
            ? 'Boutique Pickup at Suryapet Showroom (Ganesh Nagar, 60 Feet Road)'
            : `Delivery to: ${completedOrder.address}, ${completedOrder.city} - ${completedOrder.pincode}`
        }
Total Amount: ₹${completedOrder.total.toLocaleString('en-IN')}
Payment Method: ${
          completedOrder.paymentMethod === 'whatsapp'
            ? 'WhatsApp Pay (Please send UPI payment QR / Link)'
            : completedOrder.paymentMethod.toUpperCase()
        }
Items:
${completedOrder.items
  .map(
    (it) =>
      `• ${it.quantity}x ${it.saree.name} (${it.saree.code}) - Fall/Pico: ${
        it.includeFallPico ? 'Yes' : 'No'
      }, Tassels: ${it.includeTassels ? 'Yes' : 'No'}`
  )
  .join('\n')}

${completedOrder.paymentMethod === 'whatsapp' ? 'Please share your showroom WhatsApp payment UPI ID / QR code to complete the payment.' : 'Please confirm order receipt and handover/dispatch details.'}`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {completedOrder ? 'Order Confirmed' : 'Checkout & Delivery Preference'}
            </h3>
            <p className="text-xs text-stone-500">
              {completedOrder
                ? 'Your order has been recorded with our showroom master.'
                : 'Free Bangalore same-day delivery or Basavanagudi showroom collection.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {completedOrder ? (
            /* Order Success State */
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Dhanyavadagalu, {completedOrder.customerName}!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Order Reference: <strong className="text-stone-800 text-sm font-mono">{completedOrder.id}</strong>
                </p>
              </div>

              {/* Order summary box */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Fulfillment Mode:</span>
                  <span className="font-semibold text-stone-800">
                    {completedOrder.deliveryType === 'store_pickup'
                      ? 'In-Store Pickup (Suryapet Showroom - 60 Feet Road)'
                      : 'Express Doorstep Delivery'}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-semibold text-stone-800">
                    {completedOrder.paymentMethod === 'whatsapp'
                      ? 'WhatsApp Pay (Instant Showroom Chat & UPI)'
                      : completedOrder.paymentMethod === 'cod'
                      ? 'Cash / UPI on Delivery / Pickup'
                      : completedOrder.paymentMethod === 'upi'
                      ? 'UPI Transfer (Verified)'
                      : 'Card Payment (Authorized)'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-stone-500 block font-medium">Items:</span>
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-stone-700">
                      <span>
                        {item.quantity}x {item.saree.name}
                      </span>
                      <span className="font-medium tabular-nums">
                        ₹{((item.saree.price + (item.includeTassels ? 350 : 0)) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-stone-900 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-[#831843] tabular-nums">
                    ₹{completedOrder.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {onOpenOrders && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenOrders();
                    }}
                    className="w-full py-3.5 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span>View & Track in Order History</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}?text=${whatsappOrderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order Confirmation to Showroom WhatsApp</span>
                </a>

                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Questions? Call manager at {STORE_DETAILS.phone}</span>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 text-stone-700 hover:text-stone-900"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Delivery Mode Tabs */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2">
                  Choose Fulfillment Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('local_express')}
                    className={`p-3 rounded-lg border text-left transition-all text-xs ${
                      deliveryType === 'local_express'
                        ? 'border-[#831843] bg-rose-50/50 text-[#831843] ring-1 ring-[#831843]'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Truck className="w-4 h-4 text-[#831843]" />
                      <span>Bangalore Express</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">Same/Next Day · Free</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('store_pickup')}
                    className={`p-3 rounded-lg border text-left transition-all text-xs ${
                      deliveryType === 'store_pickup'
                        ? 'border-[#831843] bg-rose-50/50 text-[#831843] ring-1 ring-[#831843]'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Building className="w-4 h-4 text-[#831843]" />
                      <span>Boutique Pickup</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">Suryapet (60 Ft Rd) · Ready 2 hrs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('all_india')}
                    className={`p-3 rounded-lg border text-left transition-all text-xs ${
                      deliveryType === 'all_india'
                        ? 'border-[#831843] bg-rose-50/50 text-[#831843] ring-1 ring-[#831843]'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <ShieldCheck className="w-4 h-4 text-[#831843]" />
                      <span>All India Insured</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">Air Express (3-4 Days)</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sundaram"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Email Address (For Order Tracking & Status Updates)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. radhika@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                  />
                </div>
              </div>

              {/* Address (if delivery) */}
              {deliveryType !== 'store_pickup' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Street Address & Apartment *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Flat No., Apartment Name, Street Name, Cross"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Landmark
                      </label>
                      <input
                        type="text"
                        placeholder="Near Temple / Metro"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831843]/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-2 flex items-center justify-between">
                  <span>Payment Method</span>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Pay Available</span>
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* WhatsApp Pay Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all relative overflow-hidden ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500/30 font-semibold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </span>
                        <span className="font-bold">WhatsApp Pay</span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-semibold">
                        Instant UPI
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-normal pl-8">
                      Pay directly via WhatsApp UPI or request QR code from store manager
                    </p>
                  </button>

                  {/* Cash on Delivery / Pay at store */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#831843] bg-rose-50 text-[#831843] font-bold ring-2 ring-[#831843]/20'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">
                        {deliveryType === 'store_pickup' ? 'Pay at Showroom' : 'Cash / UPI on Delivery'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-normal">
                      Pay upon inspection at your doorstep or showroom
                    </p>
                  </button>

                  {/* Instant UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#831843] bg-rose-50 text-[#831843] font-bold ring-2 ring-[#831843]/20'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">Instant Online UPI</span>
                      <span className="text-[10px] text-stone-400">GPay / PhonePe</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-normal">
                      Fast UPI scan & pay with any UPI app
                    </p>
                  </button>

                  {/* Credit / Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#831843] bg-rose-50 text-[#831843] font-bold ring-2 ring-[#831843]/20'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">Credit / Debit Card</span>
                      <span className="text-[10px] text-stone-400">Visa / Master</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-normal">
                      128-bit encrypted card gateway
                    </p>
                  </button>
                </div>

                {paymentMethod === 'whatsapp' && (
                  <div className="mt-2.5 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Seamless WhatsApp Payment:</span> You will receive the official order invoice, saree authenticity details, and instant payment link directly in WhatsApp chat from Sri Markandeya Handlooms.
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                    Amount Payable
                  </span>
                  <span className="text-xl font-bold text-stone-900 tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#831843] hover:bg-[#701A36] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Order...</span>
                  ) : (
                    <span>Confirm Order (₹{total.toLocaleString('en-IN')})</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
