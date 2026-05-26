"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu } from 'lucide-react';
import { useLanguage } from '../../store/LanguageContext';
import { useCart } from '../../store/CartContext';
import { categories } from '../../lib/mockData';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface HeaderProps {
  locale: 'vi' | 'en';
}

const normalizeLocalePath = (path: string | null): string =>
  path?.replace(/^\/(vi|en)(?=\/|$)/, '') || '/';

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const { t, language } = useLanguage();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      { href: '/', label: t('home') },
      { href: '/products', label: t('products') },
      { href: '/about', label: t('about') },
      { href: '/contact', label: t('contact') },
    ],
    [t]
  );

  const normalizedPath = normalizeLocalePath(pathname);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 text-white font-bold flex items-center justify-center rounded-lg">2A</div>
            <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">2AEVENTURES</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const href =
                link.href === '/products'
                  ? `/${locale}/products?view=all`
                  : `/${locale}${link.href === '/' ? '' : link.href}`;
              const isActive =
                link.href === '/products'
                  ? normalizedPath === '/products' || normalizedPath.startsWith('/products/')
                  : normalizedPath === link.href;
              const isProducts = link.href === '/products';

              return (
                <div key={link.href} className={isProducts ? 'relative group' : ''}>
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </Link>
                  {isProducts && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="w-[420px] rounded-2xl shadow-2xl p-4 bg-white border border-blue-100">
                        <div className="grid grid-cols-3 gap-2">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/${locale}/products?category=${category.id}`}
                              className="rounded-xl border border-blue-100 bg-white text-gray-800 px-3 py-2.5 text-sm font-semibold text-center transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md"
                            >
                              {category.name[language]}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+84000000000"
            className="hidden lg:inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
          >
            Hotline: +84 000 000 000
          </a>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link 
            href={`/${locale}/cart`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 space-y-1 shadow-lg absolute w-full left-0 top-16">
          <div className="px-3 py-2">
            <LanguageSwitcher />
          </div>
          {navLinks.map((link) => {
            const href =
              link.href === '/products'
                ? `/${locale}/products?view=all`
                : `/${locale}${link.href === '/' ? '' : link.href}`;
            const isActive =
              link.href === '/products'
                ? normalizedPath === '/products' || normalizedPath.startsWith('/products/')
                : normalizedPath === link.href;

            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
