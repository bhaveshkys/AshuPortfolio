export type NonTreatmentWork = {
  title: string;
  client?: string;
  href?: string;
  coverUrl: string;
  hoverUrl?: string;
  coverAlt?: string;
  hoverAlt?: string;
};

export type NonTreatmentsPageData = {
  title: string;
  heading: string;
  works: NonTreatmentWork[];
};

export type SanityNonTreatmentsPage = Partial<
  Omit<NonTreatmentsPageData, "works">
> & {
  works?: Array<{
    title?: string;
    client?: string;
    href?: string;
    coverAlt?: string;
    hoverAlt?: string;
    coverUrl?: string;
    hoverUrl?: string;
  }>;
};
