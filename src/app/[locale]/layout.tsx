
import type { ReactNode } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { FloatingContact } from "../../components/layout/FloatingContact";
import { Toaster } from "../../components/ui/sonner";
import { AppProviders } from "../../store";
import { PageMemory } from "../../components/session/PageMemory";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: "vi" | "en" } }): Promise<Metadata> {
  const isEn = params.locale === "en";
  return {
    title: {
      template: "%s | 2AE VENTURES",
      default: isEn 
        ? "Global Frozen Food Supply & Trade | 2AE VENTURES" 
        : "Nguồn Thực Phẩm Đông Lạnh Chất Lượng | 2AE VENTURES",
    },
    description: isEn
      ? "2AE VENTURES specializes in US beef and chicken imports, alongside seafood and agricultural exports. Connecting quality food sources with the Vietnamese market."
      : "2AE VENTURES chuyên nhập khẩu bò và gà Mỹ, kết nối xuất khẩu thủy hải sản và nông sản. Đưa nguồn hàng chất lượng chuẩn quốc tế đến thị trường Việt Nam.",
  };
}
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "vi" | "en" };
}) {
  const locale = params.locale === "en" ? "en" : "vi";

  return (
    <AppProviders initialLanguage={locale}>
          <div className="flex min-h-screen flex-col bg-[#f8fafa] font-sans text-[#17324d] antialiased">
            <PageMemory locale={locale} />
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <FloatingContact />
            <Toaster />
          </div>
    </AppProviders>
  );
}
