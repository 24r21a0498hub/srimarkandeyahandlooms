import { Order, OrderStatus } from '../types/saree';
import { SAREES_DATA } from '../data/sarees';

const ORDERS_STORAGE_KEY = 'markandeya_orders';

export const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'SMH-82419',
    customerName: 'Shanti Lakshmi',
    customerEmail: 'shanti.lakshmi@example.com',
    phone: '+91 98480 23456',
    deliveryType: 'local_express',
    address: 'Plot 42, Sri Rama Colony, Near Hanuman Temple',
    landmark: 'Behind Gandhi Park',
    city: 'Suryapet',
    pincode: '508213',
    paymentMethod: 'upi',
    status: 'shipped',
    trackingNumber: 'DTDC-TEL-8921829',
    courierPartner: 'DTDC Express Courier',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    createdAt: '22 Oct 2026',
    subtotal: 18500,
    tasselsFee: 350,
    deliveryFee: 0,
    total: 18850,
    items: [
      {
        saree: SAREES_DATA[0], // Teal Kuttu Border Gadwal Pure Pattu
        quantity: 1,
        includeFallPico: true,
        includeTassels: true,
        notes: 'Please ensure traditional hand-knotted tassels matching the contrast pallu.',
      },
    ],
    statusUpdates: [
      {
        status: 'placed',
        title: 'Order Placed & Confirmed',
        description: 'Order received at Sri Markandeya Handlooms Showroom (Suryapet).',
        timestamp: '22 Oct 2026, 10:15 AM',
        location: 'Suryapet Showroom',
      },
      {
        status: 'loom_qc',
        title: 'Artisan Loom QC & Silk Mark Inspection',
        description: 'Verified pure mulberry silk warp, zari density, and flawless Kuttu border interlocking.',
        timestamp: '22 Oct 2026, 02:30 PM',
        location: 'Gadwal Master Loom Cluster',
      },
      {
        status: 'finishing_tassels',
        title: 'Complimentary Fall, Pico & Hand-Knotted Tassels',
        description: 'Handcrafted zari tassels and cotton fall stitched by master artisan tailors.',
        timestamp: '23 Oct 2026, 11:45 AM',
        location: 'Suryapet Showroom Workshop',
      },
      {
        status: 'shipped',
        title: 'Dispatched via DTDC Express',
        description: 'Securely packed in silk preservation pouch and handed over to courier partner. Tracking ID: DTDC-TEL-8921829.',
        timestamp: '24 Oct 2026, 09:20 AM',
        location: 'DTDC Hub, Suryapet Highway',
      },
    ],
  },
  {
    id: 'SMH-79105',
    customerName: 'Koutarapu Ananya',
    customerEmail: 'nanikoutarapu@gmail.com',
    phone: '+91 94402 74805',
    deliveryType: 'store_pickup',
    address: 'In-Store Pickup (Suryapet Showroom - Ganesh Nagar, 60 Feet Road)',
    landmark: 'Opposite Srinivasa Kalyana Mandapam',
    city: 'Suryapet',
    pincode: '508213',
    paymentMethod: 'whatsapp',
    status: 'finishing_tassels',
    courierPartner: 'Boutique Collection Desk',
    estimatedDelivery: 'Ready for pickup today after 5:00 PM',
    createdAt: '23 Oct 2026',
    subtotal: 34500,
    tasselsFee: 350,
    deliveryFee: 0,
    total: 34850,
    items: [
      {
        saree: SAREES_DATA[2] || SAREES_DATA[0], // Mayil Peethambaram Kanchi Pattu
        quantity: 1,
        includeFallPico: true,
        includeTassels: true,
        notes: 'Boutique bridal handover requested. Keep Silk Mark certificate inside presentation box.',
      },
    ],
    statusUpdates: [
      {
        status: 'placed',
        title: 'Order Placed & Reserved',
        description: 'Showroom master reserved genuine Kanchipuram Korvai bridal pattu.',
        timestamp: '23 Oct 2026, 01:10 PM',
        location: 'Suryapet Showroom',
      },
      {
        status: 'loom_qc',
        title: 'Master Weaver Inspection',
        description: 'Passed 8-point zari luster, weight, and silk purity verification.',
        timestamp: '23 Oct 2026, 04:00 PM',
        location: 'Showroom Vault',
      },
      {
        status: 'finishing_tassels',
        title: 'Fall, Pico & Custom Kuchu Tassels Underway',
        description: 'Senior artisan crafting matching royal magenta & gold bead tassels.',
        timestamp: '24 Oct 2026, 10:00 AM',
        location: 'Suryapet Showroom Workshop',
      },
    ],
  },
  {
    id: 'SMH-64210',
    customerName: 'Radhika Rao',
    customerEmail: 'radhika.rao@example.com',
    phone: '+91 97011 88992',
    deliveryType: 'all_india',
    address: 'Flat 302, Sai Vihar Apartments, Road No. 12, Banjara Hills',
    landmark: 'Near Care Hospital',
    city: 'Hyderabad',
    pincode: '500034',
    paymentMethod: 'card',
    status: 'delivered',
    trackingNumber: 'BLUEDART-HYD-401928',
    courierPartner: 'BlueDart Air Express',
    estimatedDelivery: 'Delivered on 19 Oct 2026',
    createdAt: '16 Oct 2026',
    subtotal: 9800,
    tasselsFee: 0,
    deliveryFee: 0,
    total: 9800,
    items: [
      {
        saree: SAREES_DATA[1] || SAREES_DATA[0], // Haldi Mustard Mangalagiri Pattu
        quantity: 1,
        includeFallPico: true,
        includeTassels: false,
        notes: 'Include dry cleaning & muslin cloth preservation card.',
      },
    ],
    statusUpdates: [
      {
        status: 'placed',
        title: 'Order Placed & Payment Verified',
        description: 'Online card payment verified. Mangalagiri pitloom saree allocated.',
        timestamp: '16 Oct 2026, 11:00 AM',
        location: 'Online Desk',
      },
      {
        status: 'loom_qc',
        title: 'Mangalagiri Pitloom QC Approved',
        description: 'Nizam border zari and cotton-silk blend certified.',
        timestamp: '16 Oct 2026, 03:20 PM',
        location: 'Mangalagiri Weaver Co-op',
      },
      {
        status: 'finishing_tassels',
        title: 'Fall & Pico Completed',
        description: 'Fall stitched and saree ironed with temperature-controlled steam.',
        timestamp: '17 Oct 2026, 01:15 PM',
        location: 'Finishing Unit',
      },
      {
        status: 'shipped',
        title: 'Dispatched via BlueDart Air',
        description: 'Departed from Suryapet Transit Facility to Hyderabad Airport Gateway.',
        timestamp: '18 Oct 2026, 08:30 AM',
        location: 'Transit Facility, NH-65',
      },
      {
        status: 'delivered',
        title: 'Delivered & Handed Over',
        description: 'Delivered to recipient with authentic Silk Mark hologram packaging.',
        timestamp: '19 Oct 2026, 02:45 PM',
        location: 'Banjara Hills, Hyderabad',
      },
    ],
  },
];

/**
 * Retrieves all stored orders from localStorage.
 * If none exist, seeds the initial sample orders so customers can immediately explore.
 */
export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      // Seed initial sample orders
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
    return INITIAL_SAMPLE_ORDERS;
  } catch (e) {
    console.error('Error reading orders from localStorage', e);
    return INITIAL_SAMPLE_ORDERS;
  }
}

/**
 * Persists an order into localStorage.
 */
export function saveOrderToStorage(order: Order): Order[] {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current.filter((o) => o.id !== order.id)];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving order to localStorage', e);
    return [];
  }
}

/**
 * Resets sample orders to the demo set for testing
 */
export function resetSampleOrders(): Order[] {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
    return INITIAL_SAMPLE_ORDERS;
  } catch (e) {
    return INITIAL_SAMPLE_ORDERS;
  }
}
