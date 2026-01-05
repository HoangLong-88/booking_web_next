import type { Locale } from "date-fns";
import {
  enUS,
  vi,
  zhCN,
  zhHK,
  ko,
} from "date-fns/locale";

export const datePickerLocales: Record<string, Locale> = {
  en: enUS,
  vi: vi,
  "zh-CN": zhCN,
  "zh-HK": zhHK,
  ko: ko,
};
