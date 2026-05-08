"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { ChatWidget } from "../../components/chatbot/ChatWidget";
import { Toaster } from "../../components/ui/sonner";
import { LanguageProvider } from "../../store/LanguageContext";
import { CartProvider } from "../../store/CartContext";

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: "vi" | "en" };
}) {
  const locale = params.locale === "en" ? "en" : "vi";

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider initialLanguage={locale}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
            <ChatWidget locale={locale} />
            <Toaster />
          </div>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
