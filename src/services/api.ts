import { categories as fallbackCategories, products as fallbackProducts } from '../lib/catalogData';
import type { ApiResponse, Category, ContactRequestPayload, ContactResponse, Product } from '../types';

type HttpMethod = 'GET' | 'POST';

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL?: string) {
    this.baseURL =
      (baseURL || process.env.NEXT_PUBLIC_API_URL || '/api').replace(/\/$/, '');
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET');
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data);
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    data?: unknown,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.toURL(endpoint), {
        method,
        headers: this.headers,
        ...(data === undefined ? {} : { body: JSON.stringify(data) }),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private toURL(endpoint: string): string {
    return `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: unknown;

    if (response.status === 204) {
      data = undefined;
    } else if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}`,
        message: this.resolveErrorMessage(data),
      };
    }

    return {
      success: true,
      data: data as T,
    };
  }

  private resolveErrorMessage(data: unknown): string {
    if (typeof data === 'string' && data) return data;
    if (typeof data !== 'object' || data === null) return 'An error occurred';

    const record = data as Record<string, unknown>;
    if (typeof record.message === 'string') return record.message;
    if (typeof record.detail === 'string') return record.detail;
    return 'An error occurred';
  }

  private handleError<T>(error: unknown): ApiResponse<T> {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message,
    };
  }
}

export const apiClient = new ApiClient();

// --- Contact Service ---
export const contactService = {
  sendMessage(payload: ContactRequestPayload) {
    return apiClient.post<ContactResponse>('/contact', payload);
  },
};

// --- Products Service ---
export interface CatalogSnapshot {
  categories: Category[];
  products: Product[];
}

export const productService = {
  fallback: { categories: fallbackCategories, products: fallbackProducts },
  async loadCatalog(): Promise<CatalogSnapshot> {
    return this.fallback;
  },
};


