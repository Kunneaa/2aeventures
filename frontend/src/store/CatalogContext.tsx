"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { productService, type CatalogSnapshot } from '../services/products';
import type { Category, Product } from '../types';

interface CatalogContextType {
  categories: Category[];
  products: Product[];
  getProduct: (productId: string) => Product | undefined;
  getCategory: (categoryId: string) => Category | undefined;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(productService.fallback.categories);
  const [products, setProducts] = useState<Product[]>(productService.fallback.products);

  const applyCatalog = useCallback((catalog: CatalogSnapshot) => {
    setCategories(catalog.categories);
    setProducts(catalog.products);
  }, []);

  useEffect(() => {
    let isMounted = true;

    productService.loadCatalog().then((catalog) => {
      if (!isMounted) return;
      applyCatalog(catalog);
    });

    return () => {
      isMounted = false;
    };
  }, [applyCatalog]);

  const productsById = useMemo(
    () => new Map(products.map((product): [string, Product] => [product.id, product])),
    [products],
  );
  const categoriesById = useMemo(
    () => new Map(categories.map((category): [string, Category] => [category.id, category])),
    [categories],
  );

  const getProduct = useCallback(
    (productId: string) => productsById.get(productId),
    [productsById],
  );

  const getCategory = useCallback(
    (categoryId: string) => categoriesById.get(categoryId),
    [categoriesById],
  );

  const value = useMemo(
    () => ({
      categories,
      products,
      getProduct,
      getCategory,
    }),
    [categories, getCategory, getProduct, products],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
