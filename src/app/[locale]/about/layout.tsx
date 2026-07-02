import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: 'en' | 'vi' } }): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'About Us' : 'Về Chúng Tôi',
    description: isEn
      ? "Learn about 2AE VENTURES' mission to connect global supply chains with the Vietnamese market, backed by 36+ years of US business experience."
      : "Tìm hiểu sứ mệnh của 2AE VENTURES trong việc kết nối chuỗi cung ứng toàn cầu với thị trường Việt Nam, dựa trên nền tảng 36+ năm kinh nghiệm kinh doanh tại Mỹ.",
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
