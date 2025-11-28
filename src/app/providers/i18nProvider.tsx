'use client'
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { i18n as I18nType } from "i18next";
import { initPageI18n } from "@/libs/i18n";
import { getLanguageFromCookie } from "@/libs/language";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null);

  useEffect(() => {
    (async () => {
      const i18n = await initPageI18n();
      const lang = getLanguageFromCookie() || "en";

      await i18n.changeLanguage(lang);
      setI18nInstance(i18n);
    })();
  }, []);

  if (!i18nInstance) return null;
  
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
