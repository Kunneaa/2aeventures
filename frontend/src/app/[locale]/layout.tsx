"use client";

import type { ReactNode } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { ChatWidget } from "../../components/chatbot/ChatWidget";
import { Toaster } from "../../components/ui/sonner";
import { LanguageProvider } from "../../store/LanguageContext";
import { CartProvider } from "../../store/CartContext";
import { CatalogProvider } from "../../store/CatalogContext";
import { PageMemory } from "../../components/session/PageMemory";

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "vi" | "en" };
}) {
  const locale = params.locale === "en" ? "en" : "vi";

  return (
    <LanguageProvider initialLanguage={locale}>
      <CatalogProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <PageMemory locale={locale} />
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <ChatWidget locale={locale} />
            <Toaster />
          </div>
        </CartProvider>
      </CatalogProvider>
    </LanguageProvider>
  );
}
