export type LocaleCode = 'vi' | 'en';

export interface LocalizedText {
  en: string;
  vi: string;
}

export interface CategoryBrand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Category {
  id: string;
  name: LocalizedText;
  image: string;
  brands?: CategoryBrand[];
}

export interface ProductSpecs {
  packing: string;
  brand: string;
}

export interface Product {
  id: string;
  name: LocalizedText;
  categoryId: string;
  cutId?: string;
  image: string;
  unit: LocalizedText;
  description: LocalizedText;
  specs?: ProductSpecs;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface QuoteCustomerInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export interface QuoteItemPayload {
  productId: string;
}

export interface QuoteRequestPayload {
  items: QuoteItemPayload[];
  customerInfo: QuoteCustomerInfo;
  notes?: string;
  locale?: LocaleCode;
}

export interface QuoteResponse {
  id: string;
  status: 'pending';
  items: QuoteItemPayload[];
  customerInfo: QuoteCustomerInfo;
  notes?: string;
  locale?: LocaleCode;
  createdAt: string;
}

export interface ContactRequestPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale?: LocaleCode;
}

export interface ContactResponse {
  id: string;
  status: 'received';
  name: string;
  email: string;
  phone: string;
  message: string;
  locale?: LocaleCode;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
