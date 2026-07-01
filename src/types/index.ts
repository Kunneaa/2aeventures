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
