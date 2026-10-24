import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  MapPin,
  ExternalLink,
  MessageSquare,
  Printer,
  Copy,
  Check,
  Search,
  Filter,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
} from 'lucide-react';
import { Order, OrderStatus, Saree } from '../types/saree';
import { STORE_DETAILS } from '../data/sarees';
import { resetSampleOrders } from '../utils/orderStorage';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectSaree?: (saree: Saree) => void;
  onStartShopping?: () => void;
  customerEmail?: string;
  onRefreshOrders?: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectSaree,
  onStartShopping,
  customerEmail,
  onRefreshOrders,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [filterByCustomerOnly, setFilterByCustomerOnly] = useState<boolean>(false);
  const [customFilterEmail, setCustomFilterEmail] = useState<string>(customerEmail || '');
  const [expandedTimelineOrderId, setExpandedTimelineOrderId] = useState<string | null>(null);
  const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);

  useEffect(() => {
    if (customerEmail) {
      setCustomFilterEmail(customerEmail);
    }
  }, [customerEmail]);

  // Status mapping helper
  const getStatusStageIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 0;
      case 'loom_qc':
        return 1;
      case 'finishing_tassels':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'shipped':
        return {
          label: 'Dispatched & In Transit',
          icon: Truck,
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
        };
      case 'finishing_tassels':
        return {
          label: 'Handloom Finishing & Tassels',
          icon: Sparkles,
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
        };
      case 'loom_qc':
        return {
          label: 'Artisan Loom QC Verified',
          icon: ShieldCheck,
          bg: 'bg-blue-50 border-blue-200 text-blue-700',
        };
      case 'delivered':
        return {
          label: 'Delivered Successfully',
          icon: CheckCircle2,
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        };
      case 'cancelled':
        return {
          label: 'Order Cancelled',
          icon: X,
          bg: 'bg-rose-50 border-rose-200 text-rose-700',
        };
      case 'placed':
      case 'confirmed':
      default:
        return {
          label: 'Order Confirmed',
          icon: Clock,
          bg: 'bg-stone-100 border-stone-200 text-stone-800',
        };
    }
  };

  const STEPS = [
    { key: 'placed', label: 'Order Placed', desc: 'Received at Showroom' },
    { key: 'loom_qc', label: 'Loom QC & Silk Mark', desc: 'Artisan Purity Check' },
    { key: 'finishing_tassels', label: 'Finishing & Kuchu', desc: 'Fall, Pico & Tassels' },
    { key: 'shipped', label: 'Dispatched', desc: 'Courier / Showroom Handover' },
    { key: 'delivered', label: 'Delivered', desc: 'Doorstep Handover' },
  ];

  // Filtering orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Customer email filter if enabled
      if (filterByCustomerOnly && customFilterEmail.trim()) {
        const orderEmail = order.customerEmail?.toLowerCase() || '';
        const searchCustomer = customFilterEmail.toLowerCase().trim();
        if (!orderEmail.includes(searchCustomer)) {
          return false;
        }
      }

      // Status filter
      if (statusFilter === 'active') {
        if (order.status === 'delivered' || order.status === 'cancelled') return false;
      } else if (statusFilter === 'delivered') {
        if (order.status !== 'delivered') return false;
      }

      // Search query (Order ID, customer name, saree name, phone, tracking number)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesCustomer = order.customerName.toLowerCase().includes(query);
        const matchesPhone = order.phone.includes(query);
        const matchesTracking = order.trackingNumber?.toLowerCase().includes(query);
        const matchesSaree = order.items.some((it) =>
          it.saree.name.toLowerCase().includes(query) || it.saree.code.toLowerCase().includes(query)
        );
        return matchesId || matchesCustomer || matchesPhone || matchesTracking || matchesSaree;
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery, filterByCustomerOnly, customFilterEmail]);

  const handleCopyTracking = (trackingId: string) => {
    navigator.clipboard?.writeText(trackingId);
    setCopiedTrackingId(trackingId);
    setTimeout(() => {
      setCopiedTrackingId(null);
    }, 2000);
  };

  const handlePrintReceipt = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id} | Sri Markandeya Handlooms</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #1c1917; }
          .header { border-bottom: 2px solid #831843; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; }
          .title { font-size: 24px; font-weight: bold; color: #831843; font-family: serif; }
          .meta { font-size: 13px; color: #78716c; line-height: 1.5; }
          .grid { display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px; }
          .box { background: #fafaf9; border: 1px solid #e7e5e4; padding: 12px 16px; border-radius: 8px; width: 48%; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          th { text-align: left; padding: 10px; background: #f5f5f4; border-bottom: 1px solid #d6d3d1; }
          td { padding: 12px 10px; border-bottom: 1px solid #e7e5e4; }
          .total-box { margin-left: auto; width: 280px; font-size: 13px; }
          .total-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .total-grand { font-size: 16px; font-weight: bold; border-top: 2px solid #831843; margin-top: 6px; padding-top: 8px; color: #831843; }
          .footer { font-size: 11px; text-align: center; color: #a8a29e; margin-top: 40px; border-top: 1px dashed #d6d3d1; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">SRI MARKANDEYA HANDLOOMS</div>
            <div class="meta">Authentic Master Handloom Sarees · Silk Mark Certified</div>
            <div class="meta">Ganesh Nagar, 60 Feet Road, Suryapet, Telangana 508213</div>
            <div class="meta">Tel: ${STORE_DETAILS.phone} · WhatsApp: ${STORE_DETAILS.whatsapp}</div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 18px; color: #44403c;">TAX INVOICE / RECEIPT</h2>
            <div class="meta"><strong>Order ID:</strong> ${order.id}</div>
            <div class="meta"><strong>Date:</strong> ${order.createdAt}</div>
            <div class="meta"><strong>Status:</strong> ${order.status.toUpperCase()}</div>
          </div>
        </div>

        <div class="grid">
          <div class="box">
            <strong>Billed & Delivered To:</strong><br/>
            ${order.customerName}<br/>
            ${order.phone} ${order.customerEmail ? `<br/>${order.customerEmail}` : ''}<br/>
            ${order.address}<br/>
            ${order.landmark ? `Landmark: ${order.landmark}<br/>` : ''}
            ${order.city} - ${order.pincode}
          </div>
          <div class="box">
            <strong>Fulfillment & Payment:</strong><br/>
            <strong>Delivery Mode:</strong> ${order.deliveryType === 'store_pickup' ? 'Boutique Pickup at Suryapet Showroom' : 'Direct Courier Delivery'}<br/>
            ${order.courierPartner ? `<strong>Carrier:</strong> ${order.courierPartner}<br/>` : ''}
            ${order.trackingNumber ? `<strong>Tracking ID:</strong> ${order.trackingNumber}<br/>` : ''}
            <strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}<br/>
            ${order.estimatedDelivery ? `<strong>Delivery Schedule:</strong> ${order.estimatedDelivery}` : ''}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item / Saree Description</th>
              <th>Weave / Origin</th>
              <th>Fall & Pico / Tassels</th>
              <th>Qty</th>
              <th style="text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (it) => `
              <tr>
                <td>
                  <strong>${it.saree.name}</strong> (${it.saree.code})<br/>
                  <small style="color: #78716c;">Color: ${it.saree.colorName} · Silk Mark: ${it.saree.silkMarkCert}</small>
                </td>
                <td>${it.saree.weave}</td>
                <td>
                  ${it.includeFallPico ? '✓ Fall & Pico Free' : 'No'}<br/>
                  ${it.includeTassels ? '✓ Handcrafted Tassels (+₹350)' : 'No Tassels'}
                </td>
                <td>${it.quantity}</td>
                <td style="text-align: right;">₹${(it.saree.price * it.quantity).toLocaleString('en-IN')}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="total-box">
          <div class="total-row"><span>Subtotal:</span> <span>₹${order.subtotal.toLocaleString('en-IN')}</span></div>
          ${order.tasselsFee > 0 ? `<div class="total-row"><span>Handcrafted Kuchu Tassels:</span> <span>₹${order.tasselsFee.toLocaleString('en-IN')}</span></div>` : ''}
          <div class="total-row"><span>Insured Shipping & Delivery:</span> <span style="color: #059669;">FREE</span></div>
          <div class="total-row total-grand"><span>Total Amount:</span> <span>₹${order.total.toLocaleString('en-IN')}</span></div>
        </div>

        <div class="footer">
          Dhanyavadagalu! Thank you for supporting the weaver artisans of Sri Markandeya Handlooms.<br/>
          Every saree comes with an authentic Silk Mark India guarantee card and 100% pure silk assurance.
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleWhatsAppInquiry = (order: Order) => {
    const text = encodeURIComponent(
      `Namaste Sri Markandeya Handlooms! 🥻\n\nI have an inquiry regarding my order:\n• Order ID: ${order.id}\n• Customer: ${order.customerName} (${order.phone})\n• Status: ${order.status.toUpperCase()}\n• Saree: ${order.items.map((i) => i.saree.name).join(', ')}\n• Delivery: ${order.deliveryType === 'store_pickup' ? 'Suryapet Showroom Pickup' : `${order.address}, ${order.city}`}\n\nPlease share the latest status / video inspection update. Thank you!`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-history-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4A1525] via-[#831843] to-[#4A1525] text-white px-6 py-5 shrink-0 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <Package className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="order-history-title" className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Order History & Loom Tracking
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-semibold border border-amber-300/30">
                    Live Status
                  </span>
                </div>
                <p className="text-xs text-amber-100/90 font-light mt-0.5">
                  Track your handcrafted pure silk sarees from master weaver looms to doorstep delivery.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Order History"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white border-b border-stone-200 px-6 py-3.5 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-[#831843] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Purchases ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                statusFilter === 'active'
                  ? 'bg-white text-[#831843] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>In Progress ({orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length})</span>
            </button>
            <button
              onClick={() => setStatusFilter('delivered')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'delivered'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Delivered ({orders.filter((o) => o.status === 'delivered').length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Order ID, Saree, Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-[#831843]/20 focus:border-[#831843] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Customer Identity Notification Banner */}
        <div className="px-6 py-2.5 bg-stone-100/80 border-b border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2 text-stone-600">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-stone-500" />
            <span>
              Viewing showroom purchases for: <strong className="text-stone-800 font-mono">{customFilterEmail || 'Showroom Guest / All Devices'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {filterByCustomerOnly ? (
              <button
                onClick={() => setFilterByCustomerOnly(false)}
                className="text-[11px] font-semibold text-[#831843] hover:underline"
              >
                Show All Saved Showroom Orders
              </button>
            ) : customFilterEmail ? (
              <button
                onClick={() => setFilterByCustomerOnly(true)}
                className="text-[11px] font-semibold text-[#831843] hover:underline"
              >
                Filter only for {customFilterEmail}
              </button>
            ) : null}

            <button
              onClick={() => {
                resetSampleOrders();
                onRefreshOrders?.();
              }}
              title="Reset orders to sample showroom state"
              className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Load Demo Orders</span>
            </button>
          </div>
        </div>

        {/* Orders Scrollable Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredOrders.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200">
                <ShoppingBag className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-800">
                No orders match your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 leading-relaxed">
                {searchQuery || filterByCustomerOnly
                  ? 'Try clearing the search box or disabling customer filters to view all showroom orders.'
                  : 'You have not placed any orders yet. Explore our genuine handwoven collection of Gadwal and Kanchipuram silk sarees.'}
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                {(searchQuery || filterByCustomerOnly) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterByCustomerOnly(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                <button
                  onClick={() => {
                    resetSampleOrders();
                    onRefreshOrders?.();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#831843] bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Sample Demo Orders</span>
                </button>
                {onStartShopping && (
                  <button
                    onClick={() => {
                      onClose();
                      onStartShopping();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#831843] hover:bg-[#701A36] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Browse Sarees</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* List of Orders */
            filteredOrders.map((order) => {
              const badge = getStatusBadge(order.status);
              const BadgeIcon = badge.icon;
              const currentStageIdx = getStatusStageIndex(order.status);
              const isTimelineExpanded = expandedTimelineOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:border-stone-300 transition-all"
                >
                  {/* Order Card Header */}
                  <div className="p-4 sm:p-5 border-b border-stone-100 bg-stone-50/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-stone-900 bg-stone-200/80 px-2.5 py-0.5 rounded-lg border border-stone-300/80">
                          #{order.id}
                        </span>
                        <span className="text-xs text-stone-500">
                          Placed on {order.createdAt}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                        <span>Recipient: <strong>{order.customerName}</strong></span>
                        <span className="text-stone-300">•</span>
                        <span>{order.phone}</span>
                        {order.customerEmail && (
                          <>
                            <span className="text-stone-300">•</span>
                            <span className="font-mono text-[11px] text-stone-500">{order.customerEmail}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                      >
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{badge.label}</span>
                      </div>

                      {/* Grand Total */}
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-semibold tracking-wider text-stone-500">
                          Total Amount
                        </div>
                        <div className="font-serif text-base sm:text-lg font-bold text-stone-900">
                          ₹{order.total.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual 5-Stage Stepper Progress Bar */}
                  <div className="px-4 sm:px-6 py-5 bg-gradient-to-b from-stone-50/50 to-white border-b border-stone-100">
                    <div className="relative">
                      {/* Connecting Line */}
                      <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-200 hidden sm:block" />
                      <div
                        className="absolute top-4 left-6 h-0.5 bg-[#831843] transition-all duration-500 hidden sm:block"
                        style={{
                          width: `${Math.max(0, Math.min(100, (currentStageIdx / (STEPS.length - 1)) * 100))}%`,
                        }}
                      />

                      {/* Stepper items */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 relative z-10">
                        {STEPS.map((step, idx) => {
                          const isCompleted = currentStageIdx >= idx;
                          const isCurrent = currentStageIdx === idx;

                          return (
                            <div
                              key={step.key}
                              className={`flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-2.5 sm:gap-1.5 p-2 rounded-xl transition-all ${
                                isCurrent
                                  ? 'bg-rose-50/70 sm:bg-transparent border border-rose-200/80 sm:border-none'
                                  : ''
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                  isCompleted
                                    ? isCurrent
                                      ? 'bg-[#831843] text-white ring-4 ring-[#831843]/20 shadow-md'
                                      : 'bg-emerald-600 text-white'
                                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                                }`}
                              >
                                {isCompleted && !isCurrent ? (
                                  <Check className="w-4 h-4" />
                                ) : isCurrent ? (
                                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>

                              <div>
                                <p
                                  className={`text-xs font-bold leading-tight ${
                                    isCurrent
                                      ? 'text-[#831843]'
                                      : isCompleted
                                      ? 'text-stone-800'
                                      : 'text-stone-400'
                                  }`}
                                >
                                  {step.label}
                                </p>
                                <p className="text-[10px] text-stone-500 leading-tight hidden sm:block mt-0.5">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Audit Log Toggle */}
                    {order.statusUpdates && order.statusUpdates.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedTimelineOrderId(isTimelineExpanded ? null : order.id)
                          }
                          className="text-xs font-semibold text-[#831843] hover:text-[#701A36] flex items-center gap-1 transition-colors"
                        >
                          <span>
                            {isTimelineExpanded
                              ? 'Hide Detailed Loom Audit Log'
                              : `View Live Loom & Transit Log (${order.statusUpdates.length} Events)`}
                          </span>
                          {isTimelineExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {order.estimatedDelivery && (
                          <div className="text-xs text-stone-600 flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Estimated: <strong className="text-stone-800">{order.estimatedDelivery}</strong></span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expanded Audit Log Details */}
                    {isTimelineExpanded && order.statusUpdates && (
                      <div className="mt-3 p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3 animate-in fade-in duration-200">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                          Chronological Loom & Dispatch Milestones
                        </div>
                        <div className="space-y-3 relative pl-3 border-l-2 border-[#831843]/40">
                          {order.statusUpdates.map((update, uIdx) => (
                            <div key={uIdx} className="relative group text-xs">
                              <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#831843] border-2 border-white ring-2 ring-stone-200" />
                              <div className="flex flex-wrap items-center justify-between gap-1">
                                <span className="font-bold text-stone-800">{update.title}</span>
                                <span className="text-[10px] text-stone-500 font-mono">
                                  {update.timestamp}
                                </span>
                              </div>
                              <p className="text-stone-600 text-xs mt-0.5 leading-relaxed font-light">
                                {update.description}
                              </p>
                              {update.location && (
                                <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-stone-400" />
                                  <span>{update.location}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Purchased Items List */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Purchased Sarees ({order.items.reduce((acc, it) => acc + it.quantity, 0)})
                    </div>

                    <div className="divide-y divide-stone-100">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Thumbnail */}
                            <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative">
                              <img
                                src={item.saree.image}
                                alt={item.saree.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-[#831843] border border-rose-200">
                                  {item.saree.weave}
                                </span>
                                <span className="font-mono text-[11px] text-stone-500 font-medium">
                                  {item.saree.code}
                                </span>
                              </div>

                              <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                                {item.saree.name}
                              </h4>

                              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-stone-300"
                                    style={{ backgroundColor: item.saree.colorHex }}
                                  />
                                  <span>{item.saree.colorName}</span>
                                </span>
                                <span className="text-stone-300">•</span>
                                <span>Qty: <strong>{item.quantity}</strong></span>
                                <span className="text-stone-300">•</span>
                                <span className="font-semibold text-stone-900">
                                  ₹{(item.saree.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>

                              {/* Customization tags */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                {item.includeFallPico && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                                    ✓ Free Fall & Pico Stitched
                                  </span>
                                )}
                                {item.includeTassels && (
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                                    ✓ Handcrafted Kuchu Tassels (₹350)
                                  </span>
                                )}
                                {item.notes && (
                                  <span className="text-[10px] text-stone-500 italic">
                                    &ldquo;{item.notes}&rdquo;
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Item Action */}
                          {onSelectSaree && (
                            <button
                              onClick={() => {
                                onClose();
                                onSelectSaree(item.saree);
                              }}
                              className="self-end sm:self-center px-3 py-1.5 text-xs text-[#831843] hover:text-[#701A36] hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors font-semibold flex items-center gap-1 shrink-0"
                            >
                              <span>View Saree</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Logistics Footer */}
                  <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs">
                    {/* Destination details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        {order.deliveryType === 'store_pickup' ? (
                          <Building className="w-4 h-4 text-amber-700" />
                        ) : (
                          <Truck className="w-4 h-4 text-indigo-700" />
                        )}
                        <span>
                          {order.deliveryType === 'store_pickup'
                            ? 'Boutique Collection: Suryapet Showroom (Ganesh Nagar, 60 Feet Road)'
                            : `Express Doorstep: ${order.address}, ${order.city} - ${order.pincode}`}
                        </span>
                      </div>

                      {order.trackingNumber && (
                        <div className="flex items-center gap-2 text-stone-600">
                          <span>
                            Carrier: <strong>{order.courierPartner || 'Courier'}</strong>
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="font-mono text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                            {order.trackingNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyTracking(order.trackingNumber!)}
                            className="text-[#831843] hover:text-[#701A36] p-1 rounded hover:bg-rose-50 flex items-center gap-1 text-[11px] font-semibold"
                            title="Copy Tracking ID"
                          >
                            {copiedTrackingId === order.trackingNumber ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 text-[10px]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[10px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppInquiry(order)}
                        className="flex-1 sm:flex-initial px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Query</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePrintReceipt(order)}
                        className="flex-1 sm:flex-initial px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-stone-500" />
                        <span>Print Receipt</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Strip */}
        <div className="px-6 py-3.5 bg-stone-100 border-t border-stone-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2 text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              All orders backed by 100% Pure Silk Mark Certification & Suryapet Showroom Exchange Guarantee
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold transition-colors text-xs"
          >
            Close Order History
          </button>
        </div>
      </div>
    </div>
  );
};
