"use client";

import type { ReactNode } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { FloatingContact } from "../../components/layout/FloatingContact";
import { Toaster } from "../../components/ui/sonner";
import { AppProviders } from "../../store";
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
