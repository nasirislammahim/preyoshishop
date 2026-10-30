export type ProductStatus = 'active' | 'draft' | 'out_of_stock';

export interface ProductVariant {
  size?: string;
  color?: string;
  sku?: string;
  additionalPrice?: number;
  stock?: number;
}

export interface Product {
  id: string;
  nameEn: string;
  nameBn: string;
  sku: string;
  categoryId: string;
  description: string;
  regularPrice: number;
  discountPrice?: number;
  stock: number;
  status: ProductStatus;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFlashSale?: boolean;
  flashSaleEnds?: string;
  isDemo?: boolean;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  fabric?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  icon?: string;
  image: string;
  itemCount?: number;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  productId: string;
  nameEn: string;
  nameBn: string;
  image: string;
  price: number;
  regularPrice: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  maxStock: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'rocket';
export type DeliveryType = 'courier' | 'own';

export interface OrderItem {
  productId: string;
  nameEn: string;
  nameBn: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  upazila: string;
  areaVillage: string;
  deliveryAddress: string;
  orderNotes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified' | 'failed';
  transactionId?: string;
  deliveryType: DeliveryType;
  courierName?: string;
  trackingNumber?: string;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  couponCode?: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  userId?: string;
  isDemo?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  location?: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10%) or fixed amount (e.g. 150 BDT)
  minOrder?: number;
  description: string;
  isActive: boolean;
}

export interface Banner {
  id: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  image: string;
  link?: string;
  badgeText?: string;
  isActive: boolean;
}

export interface DeliverySettings {
  insideDhakaCharge: number;
  outsideDhakaCharge: number;
  ownDeliveryCharge: number;
  courierDeliveryCharge: number;
  freeDeliveryThreshold: number;
}

export interface PaymentSettings {
  codEnabled: boolean;
  bkashEnabled: boolean;
  bkashNumber: string;
  bkashAccountType: 'Merchant' | 'Personal';
  nagadEnabled: boolean;
  nagadNumber: string;
  nagadAccountType: 'Merchant' | 'Personal';
  rocketEnabled: boolean;
  rocketNumber: string;
  rocketAccountType: 'Merchant' | 'Personal';
}

export interface StoreSettings {
  storeNameEn: string;
  storeNameBn: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  supportAddress: string;
  facebookUrl: string;
  whatsappNumber: string;
  designerCredit: string;
  delivery: DeliverySettings;
  payment: PaymentSettings;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: 'customer' | 'admin';
  address?: string;
  division?: string;
  district?: string;
  savedAddresses?: {
    label: string;
    address: string;
    division: string;
    district: string;
    phone: string;
  }[];
  createdAt: string;
}
