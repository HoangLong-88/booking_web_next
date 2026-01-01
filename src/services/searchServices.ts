import { buildSearchParams } from "@/utils/searchParams";
import { SearchParams, SuggestParams } from "@/types/search";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  return res.json();
};

export const searchService = {
  search: async (params: SearchParams) => {
    const query = buildSearchParams(params);
    return fetcher(`/api/${params.service}/search?${query.toString()}`);
  },

  suggest: async (params: SuggestParams) => {
    const query = buildSearchParams(params);
    return fetcher(`/api/${params.service}/suggest?${query.toString()}`);
  }
};
