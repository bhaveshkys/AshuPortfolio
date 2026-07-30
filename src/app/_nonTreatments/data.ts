import { client } from "@/sanity/client";
import { NON_TREATMENTS_PAGE_QUERY } from "@/sanity/queries";
import { fallbackNonTreatmentsPage } from "./fallback";
import type {
  NonTreatmentWork,
  NonTreatmentsPageData,
  SanityNonTreatmentsPage,
} from "./types";

function mapWorks(
  works?: SanityNonTreatmentsPage["works"]
): NonTreatmentWork[] {
  if (!works?.length) {
    return fallbackNonTreatmentsPage.works;
  }

  return works
    .filter((work) => work?.coverUrl)
    .map((work) => ({
      title: work?.title || "Project",
      client: work?.client,
      href: work?.href,
      coverAlt: work?.coverAlt,
      hoverAlt: work?.hoverAlt,
      coverUrl: work?.coverUrl || "",
      hoverUrl: work?.hoverUrl || work?.coverUrl || "",
    }))
    .filter((work) => work.coverUrl);
}

export function normalizeNonTreatmentsPage(
  data?: SanityNonTreatmentsPage | null
): NonTreatmentsPageData {
  return {
    ...fallbackNonTreatmentsPage,
    ...data,
    heading: data?.heading || fallbackNonTreatmentsPage.heading,
    works: mapWorks(data?.works),
  };
}

export async function getNonTreatmentsPage(): Promise<NonTreatmentsPageData> {
  if (!client) {
    return fallbackNonTreatmentsPage;
  }

  try {
    const data = await client.fetch<SanityNonTreatmentsPage | null>(
      NON_TREATMENTS_PAGE_QUERY,
      {}
    );
    return normalizeNonTreatmentsPage(data);
  } catch {
    return fallbackNonTreatmentsPage;
  }
}
