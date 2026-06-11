"use client";

import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import { buildQuickEmailHref } from '../../lib/quickEmail';
import { useLanguage } from '../../store/LanguageContext';
import type { Product } from '../../types';

interface QuickEmailButtonProps {
  products?: Product[];
  className?: string;
  children?: ReactNode;
}

export function QuickEmailButton({
  products,
  className,
  children,
}: QuickEmailButtonProps) {
  const { t } = useLanguage();
  const href = buildQuickEmailHref({ products });

  return (
    <a
      href={href}
      className={
        className ||
        'btn-dark px-4 py-2 text-sm'
      }
    >
      <Mail className="h-5 w-5" />
      {children || t('quick_contact')}
    </a>
  );
}
