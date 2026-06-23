const companyAddress =
  '5 Hoàng Trọng Mậu, Khu dân cư Him Lam, Phường Tân Hưng, Thành phố Hồ Chí Minh, Việt Nam';

const encodedCompanyAddress = encodeURIComponent(companyAddress);

export const siteConfig = {
  name: '2AE VENTURES',
  hotline: {
    label: '0908 415 068',
    href: 'tel:+84908415068',
  },
  zalo: {
    label: '0908 415 068',
    href: 'https://zalo.me/0908415068',
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
