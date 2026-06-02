import { siteConfig } from '../config/site';
import type { LocaleCode, Product } from '../types';

interface QuickEmailOptions {
  locale: LocaleCode;
  products?: Product[];
}

const buildSubject = ({ products = [] }: QuickEmailOptions): string => {
  if (products.length === 1) {
    return `Quotation Request: ${products[0].name.en}`;
  }

  if (products.length > 1) {
    return 'Quotation Request: Product List';
  }

  return 'Quotation Request';
};

const buildProductIntro = (products: Product[]): string => {
  if (products.length > 1) {
    return 'I am interested in the following products and would like to request a quotation:';
  }

  if (products.length === 1) {
    return 'I am interested in the following product and would like to request a quotation:';
  }

  return 'I would like to request a quotation and more information from 2AE Ventures.';
};

const buildProductLines = (products: Product[]): string[] => {
  if (products.length === 0) return [];

  return products.map((product) => `* Product: ${product.name.en}`);
};

const buildBody = ({ products = [] }: QuickEmailOptions): string => {
  const productLines = buildProductLines(products);

  return [
    'Dear 2AE Ventures Team,',
    '',
    buildProductIntro(products),
    '',
    ...productLines,
    '',
    '**Customer Information**',
    '',
    '* Full Name:',
    '* Company:',
    '* Phone:',
    '* Email:',
    '',
    'Please provide pricing, MOQ, lead time, and delivery terms.',
    '',
    'Thank you. I look forward to hearing from you.',
    '',
    'Best regards,',
    '',
    '[Full Name]',
  ].join('\r\n');
};

export const buildQuickEmailHref = (options: QuickEmailOptions): string => {
  const subject = encodeURIComponent(buildSubject(options));
  const body = encodeURIComponent(buildBody(options));

  return `${siteConfig.email.href}?subject=${subject}&body=${body}`;
};
