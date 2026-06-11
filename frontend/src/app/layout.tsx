import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brandCopy } from "../config/brand";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "2AE VENTURES",
  description: brandCopy.en.metadataDescription,
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
