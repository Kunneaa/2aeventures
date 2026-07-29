const companyAddress =
  '5 Hoàng Trọng Mậu, Khu dân cư Him Lam, Phường Tân Hưng, Thành phố Hồ Chí Minh, Việt Nam';

const encodedCompanyAddress = encodeURIComponent(companyAddress);

export const siteConfig = {
  name: '2AE VENTURES',
  hotline: {
    label: '0396 731 268',
    href: 'tel:+84396731268',
  },
  zalo: {
    label: '0396 731 268',
    href: 'https://zalo.me/0396731268',
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
