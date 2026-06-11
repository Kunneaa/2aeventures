const companyAddress =
  '5 Hoàng Trọng Mậu, Khu dân cư Him Lam, Phường Tân Hưng, Thành phố Hồ Chí Minh, Việt Nam';

const encodedCompanyAddress = encodeURIComponent(companyAddress);

export const siteConfig = {
  name: '2AE VENTURES',
  hotline: {
    label: '0901 234 567',
    href: 'tel:+84901234567',
  },
  zalo: {
    label: '0901 234 567',
    href: 'https://zalo.me/0901234567',
  },
  email: {
    label: 'contact@2aeventures.com',
    href: 'mailto:contact@2aeventures.com',
  },
  address: companyAddress,
  googleMaps: {
    searchUrl: `https://www.google.com/maps/search/?api=1&query=${encodedCompanyAddress}`,
    embedUrl: `https://www.google.com/maps?q=${encodedCompanyAddress}&output=embed`,
  },
} as const;
