import i18n, { Resources } from "i18next";
import { initReactI18next } from "react-i18next";

declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => {
    keys: () => string[];
    <T = unknown>(id: string): T;
  };
};
type TranslationJSON = Record<string, unknown>;
type TranslationResources = Record<string, Record<string, TranslationJSON>>;

function importAll(r: ReturnType<typeof require.context>): TranslationResources {
  const translations: TranslationResources = {};

  r.keys().forEach((key: string) => {
    const match = key.match(/\/([^/]+)\/([^/]+)\.json$/);
    if (!match) return;

    const [, lang, ns] = match;
    const json = r<TranslationJSON>(key);

    if (!translations[lang]) translations[lang] = {};
    translations[lang][ns] = json;
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
