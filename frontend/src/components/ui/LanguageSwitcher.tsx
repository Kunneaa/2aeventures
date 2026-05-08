"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../store/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    const nextLocale = language === "en" ? "vi" : "en";
    const currentPath = pathname?.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
    const targetPath = currentPath === "/" ? "" : currentPath;
    setLanguage(nextLocale);
    router.push(`/${nextLocale}${targetPath}`);
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <Globe size={16} className="text-gray-500" />
      <span>{language === "en" ? "Tiếng Việt" : "English"}</span>
    </button>
  );
}

