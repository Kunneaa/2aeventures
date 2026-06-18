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
import viMessages from '../../messages/vi.json';
import enMessages from '../../messages/en.json';
import { productService, type CatalogSnapshot } from '../services/api';
import type { Category, Product } from '../types';

// --- Language Context ---
export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: enMessages,
  vi: viMessages,
};

type TranslationKey = keyof typeof viMessages;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage ?? 'vi');

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
      return;
    }

    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'vi') {
      setLanguage(saved);
    }
  }, [initialLanguage]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


// --- Catalog Context ---
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

// --- App Providers Wrapper ---
export const AppProviders: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <CatalogProvider>
        {children}
      </CatalogProvider>
    </LanguageProvider>
  );
};
