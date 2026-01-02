import type { ServiceType } from "./service";
export type SearchMode = "search" | "suggest";

export interface BaseSearchParams {
  service: ServiceType;
  location?: string;
}

export interface SearchParams extends BaseSearchParams {
  mode: "search";
  checkIn?: Date | null;
  checkOut?: Date | null;
  checkDate?: Date | null;
}

export interface SuggestParams extends BaseSearchParams {
  mode: "suggest";
  keyword: string;
}
