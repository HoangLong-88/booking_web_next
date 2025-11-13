"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { initPageI18n } from "@/libs/i18n";
import { getLanguageFromCookie } from "@/libs/language";

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [i18nInstance, setI18nInstance] = useState<any>(null);
  
  useEffect(() => {
    (async () => {
      const i18n = await initPageI18n();
      const lang = getLanguageFromCookie() || "en";
      await i18n.changeLanguage(lang);
      setI18nInstance(i18n);
    })();
  }, []);

  if (!i18nInstance) return null; // Wait until i18n is ready

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
