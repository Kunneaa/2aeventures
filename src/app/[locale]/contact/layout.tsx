import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: 'en' | 'vi' } }): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Contact & Partnership' : 'Liên Hệ & Hợp Tác',
    description: isEn
      ? "Looking for a reliable frozen food sourcing or trade partner? Contact 2AE VENTURES today for wholesale and distribution inquiries."
      : "Bạn cần nguồn hàng đông lạnh uy tín hoặc muốn hợp tác thương mại? Liên hệ 2AE VENTURES ngay hôm nay để nhận tư vấn và báo giá sỉ.",
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
