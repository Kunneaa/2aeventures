import type { Category, Product } from '../types';

const productImages = {
  beef: '/images/products/beef-ribeye.jpg',
  quail: '/images/products/whole-quail.jpg',
  chicken: '/images/products/chicken-breast-fillet.jpg',
  duck: '/images/products/duck-leg-quarter.jpg',
  fish: '/images/products/whole-seabass.jpg',
  seafood: '/images/products/half-shell-scallops.jpg',
  pork: '/images/products/pork-belly.jpg',
  shrimp: '/images/products/black-tiger-shrimp.jpg',
  misc: '/images/products/mixed-frozen-items.jpg',
} as const;

export const categories: Category[] = [
  {
    id: 'beef',
    name: { en: 'Beef', vi: 'Thịt bò' },
    image: productImages.beef,
  },
  {
    id: 'quail',
    name: { en: 'Quail', vi: 'Cút' },
    image: productImages.quail,
  },
  {
    id: 'chicken',
    name: { en: 'Chicken', vi: 'Gà' },
    image: productImages.chicken,
  },
  {
    id: 'duck',
    name: { en: 'Duck', vi: 'Vịt' },
    image: productImages.duck,
  },
  {
    id: 'fish',
    name: { en: 'Fish', vi: 'Cá' },
    image: productImages.fish,
  },
  {
    id: 'seafood',
    name: { en: 'Seafood', vi: 'Hải sản' },
    image: productImages.seafood,
  },
  {
    id: 'pork',
    name: { en: 'Pork', vi: 'Thịt heo' },
    image: productImages.pork,
  },
  {
    id: 'shrimp',
    name: { en: 'Shrimp', vi: 'Tôm' },
    image: productImages.shrimp,
  },
  {
    id: 'misc',
    name: { en: 'Misc', vi: 'Khác' },
    image: productImages.misc,
  },
];

export const products: Product[] = [
  {
    id: 'p-beef-1',
    name: { en: 'US Beef Ribeye', vi: 'Thăn vai bò Mỹ' },
    categoryId: 'beef',
    image: productImages.beef,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Premium marbled beef for wholesale distribution.',
      vi: 'Bò vân mỡ cao cấp cho phân phối sỉ.'
    }
  },
  {
    id: 'p-quail-1',
    name: { en: 'Whole Quail', vi: 'Cút nguyên con' },
    categoryId: 'quail',
    image: productImages.quail,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Cleaned and frozen quail for restaurants and catering.',
      vi: 'Cút làm sạch cấp đông cho nhà hàng và suất ăn.'
    }
  },
  {
    id: 'p-chicken-1',
    name: { en: 'Chicken Breast Fillet', vi: 'Phi lê ức gà' },
    categoryId: 'chicken',
    image: productImages.chicken,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Boneless chicken breast for high-volume kitchens.',
      vi: 'Ức gà không xương cho bếp công suất lớn.'
    }
  },
  {
    id: 'p-duck-1',
    name: { en: 'Duck Leg Quarter', vi: 'Đùi vịt góc tư' },
    categoryId: 'duck',
    image: productImages.duck,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Imported duck cuts for roasting and premium menus.',
      vi: 'Phần vịt nhập khẩu cho món quay và menu cao cấp.'
    }
  },
  {
    id: 'p-fish-1',
    name: { en: 'Whole Seabass', vi: 'Cá chẽm nguyên con' },
    categoryId: 'fish',
    image: productImages.fish,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Selected fish for restaurants and wholesale counters.',
      vi: 'Cá chọn lọc cho nhà hàng và kênh bán sỉ.'
    }
  },
  {
    id: 'p-pork-1',
    name: { en: 'Pork Belly', vi: 'Ba chỉ heo' },
    categoryId: 'pork',
    image: productImages.pork,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Balanced pork cuts for grill and hotpot businesses.',
      vi: 'Thịt heo cân đối cho quán nướng và lẩu.'
    }
  },
  {
    id: 'p-shrimp-1',
    name: { en: 'Black Tiger Shrimp', vi: 'Tôm sú' },
    categoryId: 'shrimp',
    image: productImages.shrimp,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Large shrimp for grill, hotpot, and banquet menus.',
      vi: 'Tôm size lớn cho nướng, lẩu và tiệc.'
    }
  },
  {
    id: 'p-seafood-1',
    name: { en: 'Half-Shell Scallops', vi: 'Sò điệp nửa mảnh' },
    categoryId: 'seafood',
    image: productImages.seafood,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Frozen seafood products for premium kitchen operations.',
      vi: 'Hải sản cấp đông cho bếp chuyên nghiệp.'
    }
  },
  {
    id: 'p-misc-1',
    name: { en: 'Mixed Frozen Items', vi: 'Hàng đông lạnh tổng hợp' },
    categoryId: 'misc',
    image: productImages.misc,
    unit: { en: 'pound', vi: 'pound' },
    description: {
      en: 'Flexible assorted products for seasonal demand.',
      vi: 'Nhóm sản phẩm linh hoạt theo nhu cầu mùa vụ.'
    }
  }
];
