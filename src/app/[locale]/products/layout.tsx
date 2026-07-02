import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: 'en' | 'vi' } }): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Premium Frozen Foods' : 'Sản Phẩm & Nguồn Hàng',
    description: isEn
      ? "Explore our premium catalog of imported US beef and chicken cuts, featuring top packers and strict quality assurance."
      : "Khám phá danh mục thịt bò và thịt gà Mỹ nhập khẩu cao cấp từ các nhà máy hàng đầu, đảm bảo tiêu chuẩn chất lượng khắt khe nhất.",
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
