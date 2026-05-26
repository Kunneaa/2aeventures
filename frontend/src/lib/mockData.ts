export interface Product {
  id: string;
  name: { en: string; vi: string };
  categoryId: string;
  image: string;
  minOrder: number;
  unit: { en: string; vi: string };
  description: { en: string; vi: string };
}

export interface Category {
  id: string;
  name: { en: string; vi: string };
  image: string;
}

export const categories: Category[] = [
  {
    id: 'beef',
    name: { en: 'Beef', vi: 'Thịt bò' },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'quail',
    name: { en: 'Quail', vi: 'Cút' },
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'chicken',
    name: { en: 'Chicken', vi: 'Gà' },
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'duck',
    name: { en: 'Duck', vi: 'Vịt' },
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fish',
    name: { en: 'Fish', vi: 'Cá' },
    image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'seafood',
    name: { en: 'Seafood', vi: 'Hải sản' },
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'pork',
    name: { en: 'Pork', vi: 'Thịt heo' },
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'shrimp',
    name: { en: 'Shrimp', vi: 'Tôm' },
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'misc',
    name: { en: 'Misc', vi: 'Khác' },
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80'
  }
];

export const products: Product[] = [
  {
    id: 'p-beef-1',
    name: { en: 'US Beef Ribeye', vi: 'Thăn vai bò Mỹ' },
    categoryId: 'beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1080&q=80',
    minOrder: 50,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Premium marbled beef for wholesale distribution.',
      vi: 'Bò vân mỡ cao cấp cho phân phối sỉ.'
    }
  },
  {
    id: 'p-quail-1',
    name: { en: 'Whole Quail', vi: 'Cút nguyên con' },
    categoryId: 'quail',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1080&q=80',
    minOrder: 60,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Cleaned and frozen quail for restaurants and catering.',
      vi: 'Cút làm sạch cấp đông cho nhà hàng và suất ăn.'
    }
  },
  {
    id: 'p-chicken-1',
    name: { en: 'Chicken Breast Fillet', vi: 'Phi lê ức gà' },
    categoryId: 'chicken',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1080&q=80',
    minOrder: 80,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Boneless chicken breast for high-volume kitchens.',
      vi: 'Ức gà không xương cho bếp công suất lớn.'
    }
  },
  {
    id: 'p-duck-1',
    name: { en: 'Duck Leg Quarter', vi: 'Đùi vịt góc tư' },
    categoryId: 'duck',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1080&q=80',
    minOrder: 90,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Imported duck cuts for roasting and premium menus.',
      vi: 'Phần vịt nhập khẩu cho món quay và menu cao cấp.'
    }
  },
  {
    id: 'p-fish-1',
    name: { en: 'Whole Seabass', vi: 'Cá chẽm nguyên con' },
    categoryId: 'fish',
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Selected fish for restaurants and wholesale counters.',
      vi: 'Cá chọn lọc cho nhà hàng và kênh bán sỉ.'
    }
  },
  {
    id: 'p-pork-1',
    name: { en: 'Pork Belly', vi: 'Ba chỉ heo' },
    categoryId: 'pork',
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Balanced pork cuts for grill and hotpot businesses.',
      vi: 'Thịt heo cân đối cho quán nướng và lẩu.'
    }
  },
  {
    id: 'p-shrimp-1',
    name: { en: 'Black Tiger Shrimp', vi: 'Tôm sú' },
    categoryId: 'shrimp',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Large shrimp for grill, hotpot, and banquet menus.',
      vi: 'Tôm size lớn cho nướng, lẩu và tiệc.'
    }
  },
  {
    id: 'p-seafood-1',
    name: { en: 'Half-Shell Scallops', vi: 'Sò điệp nửa mảnh' },
    categoryId: 'seafood',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1080&q=80',
    minOrder: 60,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Frozen seafood products for premium kitchen operations.',
      vi: 'Hải sản cấp đông cho bếp chuyên nghiệp.'
    }
  },
  {
    id: 'p-misc-1',
    name: { en: 'Mixed Frozen Items', vi: 'Hàng đông lạnh tổng hợp' },
    categoryId: 'misc',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1080&q=80',
    minOrder: 60,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Flexible assorted products for seasonal demand.',
      vi: 'Nhóm sản phẩm linh hoạt theo nhu cầu mùa vụ.'
    }
  }
];
