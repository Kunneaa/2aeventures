// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  category: string;
  image: string;
  stock: number;
  unit: string;
  moq?: number; // Minimum Order Quantity
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

// Quote Types
export interface Quote {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
}

// Chat Message Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
  attachments?: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter Types
export interface ProductFilter {
  search?: string;
  category?: string;
  priceRange?: [number, number];
  sortBy?: 'name' | 'price' | 'newest';
  page?: number;
  limit?: number;
}
