import { ApiResponse } from '../types/index';

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL?: string) {
    this.baseURL =
      baseURL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.headers,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // POST request
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // PUT request
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.headers,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: unknown;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}`,
        message: typeof data === 'object' && data !== null && 'message' in data
          ? (data as Record<string, unknown>).message as string
          : 'An error occurred',
      };
    }

    return {
      success: true,
      data: data as T,
    };
  }

  // Handle error
  private handleError<T>(error: unknown): ApiResponse<T> {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message,
    };
  }

  // Set auth token
  setAuthToken(token: string): void {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  // Remove auth token
  removeAuthToken(): void {
    delete this.headers['Authorization'];
  }
}

export const apiClient = new ApiClient();
