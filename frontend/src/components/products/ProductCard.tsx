"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '../../lib/localePath';
import { useLanguage } from '../../store/LanguageContext';
import { useCatalog } from '../../store/CatalogContext';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

/* Category colour tokens */
const CATEGORY_COLORS: Record<string, { badge: string; glow: string }> = {
  beef:    { badge: "bg-[#fef3e2] text-[#b45309] ring-[#f59e0b]/20",   glow: "group-hover:shadow-[0_8px_30px_rgba(180,83,9,0.12)]" },
  chicken: { badge: "bg-[#ecfdf5] text-[#065f46] ring-[#10b981]/20",   glow: "group-hover:shadow-[0_8px_30px_rgba(6,95,70,0.12)]" },
  seafood: { badge: "bg-[#eff6ff] text-[#1e40af] ring-[#3b82f6]/20",   glow: "group-hover:shadow-[0_8px_30px_rgba(30,64,175,0.12)]" },
  pork:    { badge: "bg-[#fdf2f8] text-[#9d174d] ring-[#ec4899]/20",   glow: "group-hover:shadow-[0_8px_30px_rgba(157,23,77,0.12)]" },
};

const DEFAULT_COLORS = {
  badge: "bg-[#f2f7fb] text-[#336699] ring-[#336699]/10",
  glow:  "group-hover:shadow-[0_8px_30px_rgba(51,102,153,0.12)]",
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, language } = useLanguage();
  const { getCategory } = useCatalog();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const category = getCategory(product.categoryId);
  const categoryName = category?.name[language] || product.categoryId;
  const colors = CATEGORY_COLORS[product.categoryId] ?? DEFAULT_COLORS;

  return (
    <Link
      href={`/${locale}/products/${product.id}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0e7ec] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8d8e8] ${colors.glow}`}
      title={product.name[language]}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4f7f9]">
        <Image
          src={product.image || "/images/products/beef-ribeye.jpg"}
          alt={product.name[language]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b151c]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Packing badge top-right */}
        {product.specs?.packing && (
          <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-bold text-[#42525b] shadow-sm backdrop-blur-sm ring-1 ring-inset ring-black/5">
            {product.specs.packing}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Category badge */}
        <div className="mb-2.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ring-1 ring-inset ${colors.badge}`}>
            {categoryName}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1.5 line-clamp-1 text-base font-extrabold leading-snug tracking-tight text-[#17324d] transition-colors duration-150 group-hover:text-[#336699]">
          {product.name[language]}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#5c6a72]">
          {product.description[language]}
        </p>

        {/* Footer CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-[#f0f4f3] pt-3.5">
          <span className="text-sm font-bold text-[#336699] transition-colors group-hover:text-[#17324d]">
            {t('view_details')}
          </span>
          <span className="text-sm font-bold text-[#336699] opacity-0 transition-all duration-300 transform translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};
