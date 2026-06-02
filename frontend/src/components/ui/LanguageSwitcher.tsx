"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../store/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleToggle = () => {
    const nextLocale = language === "en" ? "vi" : "en";
    const currentPath = pathname?.replace(/^\/(vi|en)(?=\/|$)/, "") || "/";
    const targetPath = currentPath === "/" ? "" : currentPath;
    const query = searchParams.toString();
    const queryString = query ? `?${query}` : "";

    setLanguage(nextLocale);
    router.push(`/${nextLocale}${targetPath}${queryString}`);
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8e3df] bg-white px-3 py-1.5 text-sm font-bold text-[#42525b] transition-colors hover:bg-[#f2f7fb] hover:text-[#17324d]"
    >
      <Globe size={16} className="text-[#336699]" />
      <span>{t("language_toggle")}</span>
    </button>
  );
}
