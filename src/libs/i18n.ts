import i18n from "i18next";
import { initReactI18next } from "react-i18next";


declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => {
    keys: () => string[];
    <T = any>(id: string): T;
  };
};

function importAll(r: any) {
  const translations: Record<string, any> = {};
  r.keys().forEach((key: string) => {
    const match = key.match(/\/([^/]+)\/([^/]+)\.json$/);
    if (!match) return;
    const [ _, lang, ns] = match;
    if (!translations[lang]) translations[lang] = {};
    translations[lang][ns] = r(key);
  });
  return translations;
}

// require.context: folder, recursive, regex
const resources = importAll(require.context("../locales", true, /\.json$/));
const langs = Object.keys(resources);
const ns = langs.length > 0 ? Object.keys(resources[langs[0]]) : ["header"];
let initialized = false;

export const initPageI18n = async () => {
  if (initialized) return i18n;

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      supportedLngs: langs,
      ns: ns,
      defaultNS: "header",
    });
  initialized = true;
  return i18n;
};

export default i18n;
