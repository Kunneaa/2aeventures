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
    id: 'pork',
    name: { en: 'Pork', vi: 'Thịt heo' },
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'poultry',
    name: { en: 'Poultry', vi: 'Gia cầm' },
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80'
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
    id: 'shrimp',
    name: { en: 'Shrimp', vi: 'Tôm' },
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'fruits_veg',
    name: { en: 'Fruits & Vegetables', vi: 'Rau củ & trái cây' },
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: { en: 'US Beef Ribeye Steak', vi: 'Thăn vai bò Mỹ' },
    categoryId: 'beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1080&q=80',
    minOrder: 50,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Marbled ribeye cut, ideal for steakhouse and premium retail.',
      vi: 'Thịt bò vân mỡ đẹp, phù hợp nhà hàng steak và bán lẻ cao cấp.'
    }
  },
  {
    id: 'p2',
    name: { en: 'Australian Beef Short Plate', vi: 'Ba chỉ bò Úc' },
    categoryId: 'beef',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1080&q=80',
    minOrder: 80,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Rich flavor beef short plate for hotpot, BBQ, and slicing.',
      vi: 'Ba chỉ bò đậm vị, thích hợp lẩu, nướng và thái lát.'
    }
  },
  {
    id: 'p3',
    name: { en: 'Premium Pork Belly', vi: 'Ba chỉ heo cao cấp' },
    categoryId: 'pork',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Balanced lean-fat ratio pork belly for grilling and hotpot chains.',
      vi: 'Ba chỉ heo tỷ lệ nạc mỡ cân đối cho lẩu nướng và chuỗi F&B.'
    }
  },
  {
    id: 'p4',
    name: { en: 'Pork Back Ribs', vi: 'Sườn lưng heo' },
    categoryId: 'pork',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1080&q=80',
    minOrder: 120,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Meaty pork ribs, trimmed and frozen for stable kitchen operations.',
      vi: 'Sườn heo dày thịt, cắt chỉnh sẵn và cấp đông ổn định.'
    }
  },
  {
    id: 'p5',
    name: { en: 'Chicken Breast Fillet', vi: 'Phi lê ức gà' },
    categoryId: 'poultry',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1080&q=80',
    minOrder: 150,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Boneless skinless poultry cut for healthy menu concepts.',
      vi: 'Ức gà không xương không da, phù hợp thực đơn healthy.'
    }
  },
  {
    id: 'p6',
    name: { en: 'Chicken Drumstick', vi: 'Đùi tỏi gà' },
    categoryId: 'poultry',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Tender drumsticks, cleaned and frozen for high-volume kitchens.',
      vi: 'Đùi gà mềm, sơ chế sạch và cấp đông cho bếp công suất lớn.'
    }
  },
  {
    id: 'p7',
    name: { en: 'Whole Seabass', vi: 'Cá chẽm nguyên con' },
    categoryId: 'fish',
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?auto=format&fit=crop&w=1080&q=80',
    minOrder: 200,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Fresh whole seabass selected for steaming and grilling menus.',
      vi: 'Cá chẽm tươi nguyên con, phù hợp món hấp và nướng.'
    }
  },
  {
    id: 'p8',
    name: { en: 'Salmon Fillet', vi: 'Phi lê cá hồi' },
    categoryId: 'fish',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1080&q=80',
    minOrder: 80,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Premium trimmed salmon fillet with consistent color and texture.',
      vi: 'Phi lê cá hồi cắt chuẩn, màu sắc và thớ thịt đồng đều.'
    }
  },
  {
    id: 'p9',
    name: { en: 'Black Tiger Shrimp', vi: 'Tôm sú' },
    categoryId: 'shrimp',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1080&q=80',
    minOrder: 100,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Large-size black tiger shrimp for grill and banquet service.',
      vi: 'Tôm sú size lớn cho món nướng và tiệc nhà hàng.'
    }
  },
  {
    id: 'p10',
    name: { en: 'Half-Shell Scallops', vi: 'Sò điệp nửa mảnh' },
    categoryId: 'seafood',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1080&q=80',
    minOrder: 60,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Cleaned scallops in shell for premium baked seafood menus.',
      vi: 'Sò điệp làm sạch còn vỏ, phù hợp menu nướng cao cấp.'
    }
  },
  {
    id: 'p11',
    name: { en: 'Broccoli Florets', vi: 'Bông cải xanh cắt bông' },
    categoryId: 'fruits_veg',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1080&q=80',
    minOrder: 70,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'IQF broccoli florets for salads, stir-fry, and healthy meals.',
      vi: 'Bông cải IQF tiện lợi cho salad, xào và suất ăn dinh dưỡng.'
    }
  },
  {
    id: 'p12',
    name: { en: 'Mixed Tropical Fruits', vi: 'Trái cây nhiệt đới hỗn hợp' },
    categoryId: 'fruits_veg',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1080&q=80',
    minOrder: 60,
    unit: { en: 'kg', vi: 'kg' },
    description: {
      en: 'Cut and frozen tropical fruit mix for juice bars and desserts.',
      vi: 'Trái cây nhiệt đới cắt sẵn cấp đông cho đồ uống và tráng miệng.'
    }
  }
];
