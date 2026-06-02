import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "2AEVENTURES",
  description: "Food distribution, retail, import, and export in Vietnam.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen app-shell">
        {children}
      </body>
    </html>
  );
}
