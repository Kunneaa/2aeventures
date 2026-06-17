"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';
import { normalizeLocalePath } from '../../lib/localePath';
import { useLanguage } from '../../store/LanguageContext';
import { useCart } from '../../store/CartContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  locale: 'vi' | 'en';
}

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
    <header className="sticky top-0 z-40 w-full border-b border-[#d8e3df] bg-white/95 shadow-sm backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="2AE VENTURES">
            <BrandLogo
              priority
              labelClassName="hidden font-bold text-xl text-[#17324d] sm:block"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href === '/' ? '' : link.href}`;
              const isActive =
                link.href === '/products'
                  ? normalizedPath === '/products' || normalizedPath.startsWith('/products/')
                  : normalizedPath === link.href;

              return (
                <div key={link.href}>
                  <Link
                    href={href}
                    className={`text-sm font-bold transition-colors hover:text-[#336699] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md px-1 py-0.5 ${isActive ? 'text-[#336699]' : 'text-[#42525b]'}`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={siteConfig.hotline.href}
            className="hidden items-center rounded-lg border border-[#d8e3df] bg-[#f2f7fb] px-3 py-1.5 text-sm font-bold text-[#17324d] transition-colors hover:border-[#b8cbc4] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent lg:inline-flex"
          >
            Hotline: {siteConfig.hotline.label}
          </a>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link 
            href={`/${locale}/cart`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-[#17324d] text-white transition-colors hover:bg-[#244f78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4183d] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            className="rounded-lg p-2 text-[#42525b] hover:bg-[#f2f7fb] hover:text-[#17324d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-16 w-full space-y-1 border-t border-[#d8e3df] bg-white px-4 py-2 shadow-lg md:hidden"
          >
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => {
              const href = `/${locale}${link.href === '/' ? '' : link.href}`;
              const isActive =
                link.href === '/products'
                  ? normalizedPath === '/products' || normalizedPath.startsWith('/products/')
                  : normalizedPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${isActive ? 'bg-[#f2f7fb] text-[#17324d]' : 'text-[#42525b] hover:bg-[#f6f8f6] hover:text-[#17324d]'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
