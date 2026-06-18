"use client";

import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../store";

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
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1821]/80 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-[#8d9ba8] transition-all duration-300 hover:border-[#c9a86a]/30 hover:bg-[#c9a86a]/5 hover:text-[#c9a86a]"
    >
      <Globe size={14} className="text-[#c9a86a]" />
      <span>{t("language_toggle")}</span>
    </button>
  );
}
