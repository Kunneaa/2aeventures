"use client";

import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { brandCopy } from '../../config/brand';
import { siteConfig } from '../../config/site';
import { useLanguage } from '../../store/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  locale: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { language } = useLanguage();
  const copy = brandCopy[language];
  const basePath = `/${locale}`;

  const companyLinks = [
    { href: basePath, label: language === 'vi' ? 'Trang chủ' : 'Home' },
    { href: `${basePath}/about`, label: language === 'vi' ? 'Giới thiệu' : 'About' },
    { href: `${basePath}#import`, label: language === 'vi' ? 'Nhập khẩu' : 'Import' },
    { href: `${basePath}#export`, label: language === 'vi' ? 'Xuất khẩu' : 'Export' },
    { href: `${basePath}/contact`, label: language === 'vi' ? 'Liên hệ' : 'Contact' },
  ];

  const supportLinks = [
    {
      href: `${basePath}/contact`,
      label: language === 'vi'
        ? 'Nhận tư vấn kinh doanh sản phẩm'
        : 'Product business consultation',
    },
  ];

  const contactLinks = [
    {
      href: siteConfig.email.href,
      label: 'Email',
      value: siteConfig.email.label,
      icon: Mail,
    },
    {
      href: siteConfig.hotline.href,
      label: 'Hotline',
      value: siteConfig.hotline.label,
      icon: Phone,
    },
  ];

  return (
    <footer className="mt-16 bg-[#09141b] text-white">
      <div className="border-t border-white/10">
        <div className="section-shell py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1.35fr] lg:gap-12">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-7">
              <BrandLogo size="md" labelClassName="font-bold text-xl text-white" />
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/68">
                {copy.footerDescription}
              </p>
              <div className="mt-7 h-px w-full bg-white/10" />
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#d9a85c]">
                {language === 'vi' ? 'Nhập khẩu | Xuất khẩu | Phân phối' : 'Import | Export | Distribution'}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#d9a85c]">
                  Company
                </h4>
                <ul className="space-y-1.5 text-sm font-semibold">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-white/72 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#d9a85c]">
                  Support
                </h4>
                <ul className="space-y-1.5 text-sm font-semibold">
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-[#d9a85c]/35 bg-[#d9a85c]/12 px-3 py-3 text-white transition hover:border-[#d9a85c]/60 hover:bg-[#d9a85c]/18"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-3">
                  {contactLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 transition hover:border-white/18 hover:bg-white/[0.08]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#d9a85c] transition group-hover:bg-white/[0.12]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-extrabold uppercase tracking-[0.08em] text-white/44">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block truncate text-sm font-bold text-white/82">
                            {link.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/48 md:mt-12 md:flex-row md:items-center md:justify-between">
            <p>{copy.footerText}</p>
            <p className="font-bold uppercase tracking-[0.08em] text-white/[0.34]">
              2AE VENTURES
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
