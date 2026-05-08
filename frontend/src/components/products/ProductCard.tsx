"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../store/LanguageContext';
import { Product } from '../../lib/mockData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const locale = useMemo(() => {
    const match = pathname?.match(/^\/(vi|en)(?=\/|$)/);
    return match?.[1] ?? 'vi';
  }, [pathname]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image} 
          alt={product.name[language]} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{product.name[language]}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description[language]}</p>
        <Link
          href={`/${locale}/products/${product.id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {t('view_details')}
        </Link>
      </div>
    </div>
  );
};
