import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const initPageI18n = async () => {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          vi: { translation: vi },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
      });
  }
  return i18n;
};