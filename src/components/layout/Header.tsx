"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../../config/site';
import { normalizeLocalePath } from '../../lib/localePath';
import { useLanguage } from '../../store';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  locale: 'vi' | 'en';
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  const { t, language } = useLanguage();
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
    <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#071018]/60 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="section-shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="2AE VENTURES">
            <BrandLogo
              priority
              labelClassName="hidden font-serif font-bold text-xl text-[#f5f5f5] tracking-wide sm:block"
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
                    className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a86a] rounded-md px-1 py-0.5 ${isActive ? 'text-[#c9a86a]' : 'text-[#8d9ba8] hover:text-[#f5f5f5]'}`}
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
            className="hidden items-center rounded-full border border-[#c9a86a]/20 bg-[#c9a86a]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#c9a86a] transition-colors hover:border-[#c9a86a]/40 hover:bg-[#c9a86a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a86a] lg:inline-flex"
          >
            Hotline: {siteConfig.hotline.label}
          </a>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button 
            className="rounded-lg p-2 text-[#8d9ba8] hover:bg-[#122330] hover:text-[#f5f5f5] focus-visible:outline-none md:hidden"
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
