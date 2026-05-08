import { apiClient } from './apiClient';
import { Product, ProductFilter, ApiResponse } from '../types/index';

export const productService = {
  // Get all products
  async getProducts(filters?: ProductFilter): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    return apiClient.get<Product[]>(endpoint);
  },

  // Get product by ID
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`);
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/category/${category}`);
  },

  // Search products
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  // Get featured products
  async getFeaturedProducts(limit = 4): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/featured?limit=${limit}`);
  },

  // Create product (admin only)
  async createProduct(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    return apiClient.post<Product>('/products', product);
  },

  // Update product (admin only)
  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    return apiClient.put<Product>(`/products/${id}`, product);
  },

  // Delete product (admin only)
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/products/${id}`);
  },
};
