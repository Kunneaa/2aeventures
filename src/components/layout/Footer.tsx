"use client";

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { brandCopy } from '../../config/brand';
import { siteConfig } from '../../config/site';
import { useLanguage } from '../../store';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  locale: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { language, t } = useLanguage();
  const copy = brandCopy[language];
  const basePath = `/${locale}`;

  const companyLinks = [
    { href: basePath, label: t("home") },
    { href: `${basePath}/about`, label: t("about") },
    { href: `${basePath}#import`, label: t("import_label") },
    { href: `${basePath}#export`, label: t("export_label") },
    { href: `${basePath}/contact`, label: t("contact") },
  ];

  const supportLinks = [
    {
      href: `${basePath}/contact`,
      label: t("footer_business_consultation"),
    },
  ];

  const contactLinks = [
    {
      href: siteConfig.email.href,
      label: 'Email',
      value: siteConfig.email.label,
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-[#071018] text-[#f5f5f5] font-sans">
      <div className="border-t border-white/5">
        <div className="section-shell py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1.35fr] lg:gap-12">
            <div className="rounded-2xl border border-white/5 bg-[#0d1821] p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a86a]/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div className="relative z-10">
                <BrandLogo size="md" labelClassName="font-serif font-bold text-xl text-[#f5f5f5] tracking-wide" />
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8d9ba8]">
                  {copy.footerDescription}
                </p>
                <div className="mt-6 h-px w-full bg-white/5" />
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a86a]">
                  {t("footer_slogan")}
                </p>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d9ba8]">
                  Company
                </h4>
                <ul className="space-y-2 text-sm font-medium">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-[#8d9ba8] transition-all duration-300 hover:bg-[#122330] hover:text-[#f5f5f5]"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d9ba8]">
                  Support
                </h4>
                <ul className="space-y-2 text-sm font-medium">
                  {supportLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-xl border border-[#c9a86a]/20 bg-[#c9a86a]/5 px-4 py-3.5 text-[#c9a86a] transition-all duration-300 hover:border-[#c9a86a]/40 hover:bg-[#c9a86a]/10"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8d9ba8]">
                    Contact
                  </h4>
                  <ul className="space-y-4">
                    {contactLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="group flex items-center gap-4 text-[#8d9ba8] transition-colors hover:text-[#f5f5f5]"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#122330] text-[#8d9ba8] transition-colors group-hover:bg-[#c9a86a]/10 group-hover:text-[#c9a86a]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d9ba8]/70">
                                {link.label}
                              </p>
                              <p className="mt-0.5 font-medium">{link.value}</p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-[#04080c]">
        <div className="section-shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-xs text-[#8d9ba8] font-medium tracking-wide">
            {copy.footerText}
          </p>
          <div className="flex gap-8 text-[#8d9ba8]">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition hover:text-[#f5f5f5]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
