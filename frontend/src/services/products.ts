import { categories as fallbackCategories, products as fallbackProducts } from '../lib/catalogData';
import type { Category, Product } from '../types';
import { apiClient } from './apiClient';

export interface CatalogSnapshot {
  categories: Category[];
  products: Product[];
}

const fallbackCatalog: CatalogSnapshot = {
  categories: fallbackCategories,
  products: fallbackProducts,
};

export const productService = {
  async loadCatalog(): Promise<CatalogSnapshot> {
    const [productsResponse, categoriesResponse] = await Promise.all([
      apiClient.get<Product[]>('/products'),
      apiClient.get<Category[]>('/products/categories'),
    ]);

    if (
      productsResponse.success &&
      categoriesResponse.success &&
      productsResponse.data &&
      categoriesResponse.data
    ) {
      return {
        products: productsResponse.data,
        categories: categoriesResponse.data,
      };
    }

    return fallbackCatalog;
  },

  fallback: fallbackCatalog,
};
