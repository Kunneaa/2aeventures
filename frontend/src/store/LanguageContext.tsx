"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import viMessages from '../../messages/vi.json';
import enMessages from '../../messages/en.json';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: enMessages,
  vi: viMessages,
};

type TranslationKey = keyof typeof viMessages;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage ?? 'vi');

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
      return;
    }

    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'vi') {
      setLanguage(saved);
    }
  }, [initialLanguage]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
