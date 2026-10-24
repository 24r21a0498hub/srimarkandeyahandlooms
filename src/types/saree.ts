export interface Saree {
  id: string;
  code: string;
  name: string;
  subname: string;
  weave:
    | 'Gadwal Pattu'
    | 'Mangalagiri Handloom'
    | 'Kanchi Pattu'
    | 'Banarasi Brocade'
    | 'Uppada Jamdani'
    | 'Chanderi Tissue'
    | 'Pure Tussar'
    | 'Coimbatore Soft Silk';
  occasion: 'Bridal & Muhurtham' | 'Festive & Puja' | 'Reception & Evening' | 'Daily & Office Grace';
  price: number;
  originalPrice?: number;
  colorName: string;
  colorHex: string;
  zari: string;
  origin: string;
  weavingDays: number;
  silkMarkCert: string;
  image: string;
  secondaryImage?: string;
  description: string;
  warpWeft: string;
  blousePiece: string;
  length: string;
  motif: string;
  inStock: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  includeFallPico: boolean;
  includeTassels: boolean;
  notes?: string;
}

export interface Appointment {
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  occasion: string;
  guests: number;
  specialRequests: string;
}

export interface VideoCallRequest {
  customerName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  sareeCode?: string;
  notes: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'loom_qc'
  | 'finishing_tassels'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderStatusUpdate {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tasselsFee: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'local_express' | 'store_pickup' | 'all_india';
  customerName: string;
  customerEmail?: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi' | 'card' | 'whatsapp';
  status: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDelivery?: string;
  statusUpdates?: OrderStatusUpdate[];
  createdAt: string;
}

export interface StoreSettings {
  announcementText: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  heroHeadline: string;
  heroSubtitle: string;
  domain?: string;
  domainOwner?: string;
}
