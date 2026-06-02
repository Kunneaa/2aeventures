"use client";

import Link from 'next/link';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useLanguage } from '../../store/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  locale: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { t, language } = useLanguage();

  const companyLinks = [
    { href: `/${locale}/about`, label: t('about_us') },
    { href: `/${locale}/products`, label: t('our_catalog') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const supportLinks = [
    { href: `/${locale}/cart`, label: t('quote_request') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/contact`, label: language === 'vi' ? 'Tư vấn nguồn hàng' : 'Sourcing support' },
  ];

  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0b151c] text-white/75">
      <div className="section-shell py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo
                size="md"
                labelClassName="font-bold text-xl text-white"
              />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/75">
              {language === 'vi'
                ? '2AE Ventures hoạt động trong lĩnh vực phân phối, bán lẻ, nhập khẩu và xuất khẩu thực phẩm, hướng đến các sản phẩm an toàn, chất lượng và có nguồn gốc rõ ràng.'
                : '2AE Ventures operates in food distribution, retail, import, and export, focusing on safe, quality products with clear origin.'}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[#d9a85c]" /> {siteConfig.hotline.label}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#d9a85c]" /> {siteConfig.email.label}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#d9a85c]" /> {siteConfig.address}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'vi' ? 'Công ty' : 'Company'}
            </h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'vi' ? 'Hỗ trợ' : 'Support'}
            </h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'vi' ? 'Nhận tư vấn' : 'Get Support'}
            </h4>
            <p className="text-sm text-gray-300 mb-4">
              {language === 'vi'
                ? 'Gửi yêu cầu báo giá hoặc để lại thông tin để đội 2AEVENTURES phản hồi.'
                : 'Submit a quote request or leave your details so 2AEVENTURES can follow up.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary mb-5 px-4 py-2 text-sm"
            >
              {language === 'vi' ? 'Liên hệ ngay' : 'Contact us'}
              <ArrowRight size={16} />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Instagram size={16} />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-white/60 md:text-left">{t('footer_text')}</p>
        </div>
      </div>
    </footer>
  );
};
