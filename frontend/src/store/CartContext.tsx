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
import type { Product } from '../types';

const CART_STORAGE_KEY = '2aeventures_cart';

export interface CartItem {
  product: Product;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) {
      setHasLoadedCart(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as CartItem[];
      const savedItems = Array.isArray(parsed)
        ? parsed
            .filter((item) => item?.product?.id)
            .map((item) => ({ product: item.product }))
        : [];
      setItems(savedItems);
    } catch {
      setItems([]);
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedCart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hasLoadedCart, items]);

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = items.length;
  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, cartCount }),
    [addToCart, cartCount, clearCart, items, removeFromCart],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
