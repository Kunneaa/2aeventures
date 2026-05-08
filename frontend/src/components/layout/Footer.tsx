"use client";

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../../store/LanguageContext';

interface FooterProps {
  locale: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const { t, language } = useLanguage();

  const companyLinks = [
    { href: `/${locale}/about`, label: language === 'vi' ? 'Về chúng tôi' : 'About Us' },
    { href: `/${locale}/products`, label: language === 'vi' ? 'Danh mục sản phẩm' : 'Product Catalog' },
    { href: `/${locale}/contact`, label: language === 'vi' ? 'Liên hệ' : 'Contact' },
  ];

  const supportLinks = [
    { href: `/${locale}/contact`, label: language === 'vi' ? 'Hỗ trợ khách hàng' : 'Customer Support' },
    { href: `/${locale}/cart`, label: language === 'vi' ? 'Yêu cầu báo giá' : 'Request a Quote' },
    { href: `/${locale}/about`, label: language === 'vi' ? 'Câu hỏi thường gặp' : 'FAQ' },
  ];

  const legalLinks = [
    { href: `/${locale}/about`, label: language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy' },
    { href: `/${locale}/about`, label: language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service' },
    { href: `/${locale}/about`, label: language === 'vi' ? 'Chính sách vận chuyển' : 'Shipping Policy' },
  ];

  return (
    <footer className="bg-[#0f1f2f] text-gray-300 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#336699] text-white font-bold flex items-center justify-center rounded-lg">2A</div>
              <span className="font-bold text-xl tracking-tight text-white">2AEVENTURES</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {language === 'vi'
                ? '2AE Ventures là thành viên của D&T Foods Inc. (Mỹ) với hơn 35 năm kinh nghiệm phân phối thực phẩm đông lạnh. Chúng tôi đang xây dựng Trung tâm Chăm Sóc Khách Hàng tại TP.HCM để hỗ trợ hoạt động kinh doanh tại Mỹ thông qua hệ thống Call & Chat Center.'
                : '2AE Ventures is a member of D&T Foods Inc. (USA), with over 35 years of frozen food distribution experience. We are building a Customer Care Center in Ho Chi Minh City to support U.S. operations through our Call & Chat Center system.'}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[#7fb3e0]" /> 0901 234 567
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#7fb3e0]" /> contact@2aeventures.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#7fb3e0]" /> 123 ABC Street, District 1, Ho Chi Minh City
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
              {language === 'vi' ? 'Đăng ký nhận tin' : 'Newsletter'}
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              {language === 'vi'
                ? 'Nhận cập nhật giá sỉ và sản phẩm mới hàng tuần.'
                : 'Get weekly wholesale updates and new arrivals.'}
            </p>
            <div className="flex gap-2 mb-5">
              <input
                type="email"
                placeholder={language === 'vi' ? 'Email của bạn' : 'Your email'}
                className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7fb3e0]"
              />
              <button className="rounded-lg bg-[#336699] hover:bg-[#2b5986] text-white px-4 py-2 text-sm font-medium transition-colors">
                {language === 'vi' ? 'Gửi' : 'Join'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400 text-center md:text-left">{t('footer_text')}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
