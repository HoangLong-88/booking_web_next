// utils/searchParams.ts
import { toLocalDateString } from "@/utils/date";
import { SearchParams, SuggestParams } from "@/types/search";

export const buildSearchParams = (
  params: SearchParams | SuggestParams
) => {
  const query = new URLSearchParams();

  if (params.location) {
    query.append("location", params.location);
  }

  if (params.mode === "suggest") {
    query.append("q", params.keyword);
    return query;
  }

  if (params.service === "stays" || params.service === "cars") {
    if (params.checkIn)
      query.append("checkin", toLocalDateString(params.checkIn));
    if (params.checkOut)
      query.append("checkout", toLocalDateString(params.checkOut));
  }

  if (params.service === "attractions" && params.checkDate) {
    query.append("checkin", toLocalDateString(params.checkDate));
  }

  return query;
};

