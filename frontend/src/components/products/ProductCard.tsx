"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '../../lib/localePath';
import { QuickEmailButton } from '../contact/QuickEmailButton';
import { useLanguage } from '../../store/LanguageContext';
import { useCatalog } from '../../store/CatalogContext';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, language } = useLanguage();
  const { getCategory } = useCatalog();
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const categoryName = getCategory(product.categoryId)?.name[language] || product.categoryId;

  return (
    <article className="commerce-card commerce-card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#edf3f0]">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-lg bg-[#f2f7fb] px-2.5 py-1 text-xs font-bold text-[#336699]">
            {categoryName}
          </span>
          <span className="text-xs font-bold text-[#7a858a]">
            {product.unit[language]}
          </span>
        </div>
        <h3 className="mb-2 line-clamp-1 text-lg font-extrabold text-[#17242d]">
          {product.name[language]}
        </h3>
        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-relaxed text-[#5c6a72]">
          {product.description[language]}
        </p>
        <div className="mt-auto grid gap-2">
          <Link
            href={`/${locale}/products/${product.id}`}
            className="btn-primary w-full px-4 py-2.5 text-sm"
          >
            {t('view_details')}
          </Link>
          <QuickEmailButton
            products={[product]}
            className="btn-secondary w-full px-4 py-2.5 text-sm"
          >
            {t('quick_contact')}
          </QuickEmailButton>
        </div>
      </div>
    </article>
  );
};
