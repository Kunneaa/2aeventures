import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { brandCopy } from "../config/brand";
import "../styles/index.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["vietnamese", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://2aeventures.com"),
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
      <body className={`${beVietnamPro.variable} ${playfairDisplay.variable} font-sans min-h-screen app-shell`}>
        {children}
      </body>
    </html>
  );
}
