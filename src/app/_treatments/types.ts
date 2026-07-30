export type TreatmentWork = {
  title: string;
  client?: string;
  href?: string;
  description?: string;
  summary?: string;
  tagline?: string;
  genres?: string[];
  cast?: string[];
  season?: string;
  year?: string;
  type?: string;
  coverUrl: string;
  hoverUrl?: string;
  coverAlt?: string;
  hoverAlt?: string;
};

export type TreatmentsPageData = {
  title: string;
  heading: string;
  works: TreatmentWork[];
};

export type SanityTreatmentsPage = Partial<Omit<TreatmentsPageData, "works">> & {
  works?: Array<{
    title?: string;
    client?: string;
    href?: string;
    description?: string;
    summary?: string;
    tagline?: string;
    genres?: string[];
    cast?: string[];
    season?: string;
    year?: string;
    type?: string;
    coverAlt?: string;
    hoverAlt?: string;
    coverUrl?: string;
    hoverUrl?: string;
  }>;
};
