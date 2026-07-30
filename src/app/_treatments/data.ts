import { client } from "@/sanity/client";
import { TREATMENTS_PAGE_QUERY } from "@/sanity/queries";
import { fallbackTreatmentsPage } from "./fallback";
import type {
  SanityTreatmentsPage,
  TreatmentWork,
  TreatmentsPageData,
} from "./types";

function mapWorks(works?: SanityTreatmentsPage["works"]): TreatmentWork[] {
  if (!works?.length) {
    return fallbackTreatmentsPage.works;
  }

  return works
    .filter((work) => work?.coverUrl)
    .map((work) => ({
      title: work?.title || "Work",
      client: work?.client,
      href: work?.href,
      description: work?.description,
      summary: work?.summary,
      tagline: work?.tagline,
      genres: work?.genres,
      cast: work?.cast,
      season: work?.season,
      year: work?.year,
      type: work?.type,
      coverAlt: work?.coverAlt,
      hoverAlt: work?.hoverAlt,
      coverUrl: work?.coverUrl || "",
      hoverUrl: work?.hoverUrl || work?.coverUrl || "",
    }))
    .filter((work) => work.coverUrl);
}

export function normalizeTreatmentsPage(
  data?: SanityTreatmentsPage | null
): TreatmentsPageData {
  return {
    ...fallbackTreatmentsPage,
    ...data,
    heading: data?.heading || fallbackTreatmentsPage.heading,
    works: mapWorks(data?.works),
  };
}

export async function getTreatmentsPage(): Promise<TreatmentsPageData> {
  if (!client) {
    return fallbackTreatmentsPage;
  }

  try {
    const data = await client.fetch<SanityTreatmentsPage | null>(
      TREATMENTS_PAGE_QUERY,
      {}
    );
    return normalizeTreatmentsPage(data);
  } catch {
    return fallbackTreatmentsPage;
  }
}
