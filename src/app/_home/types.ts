export type MenuItem = {
  label: string;
  href: string;
};

export type ServiceCallout = {
  leadingText: string;
  highlightText: string;
};

export type MediaWidget = {
  title: string;
  alt: string;
  url: string;
};

export type HeroScrollImage = {
  title: string;
  alt: string;
  url: string;
};

export type CollageImage = {
  title: string;
  alt: string;
  url: string;
  top?: number;
  left?: number;
  width?: number;
  rotate?: number;
  zIndex?: number;
};

export type HomePageData = {
  introLabel: string;
  menuItems: MenuItem[];
  serviceCallouts: ServiceCallout[];
  noteLabel: string;
  notice: string;
  foundedPrefix: string;
  foundedYear: string;
  foundedSuffix: string;
  contactLabel: string;
  contactHref: string;
  aboutMeVideo?: string;
  heroScrollImages?: HeroScrollImage[];
  collageImages: CollageImage[];
  seo: {
    title: string;
    description: string;
    socialImage?: string;
  };
  mediaWidgets: MediaWidget[];
};

export type SanityHomePage = Partial<
  Omit<HomePageData, "mediaWidgets" | "seo" | "heroScrollImages" | "collageImages">
> & {
  seo?: Partial<HomePageData["seo"]> & {
    socialImage?: {
      asset?: {
        url?: string;
      };
    };
  };
  heroScrollImages?: Array<{
    title?: string;
    alt?: string;
    url?: string;
  }>;
  collageImages?: Array<{
    title?: string;
    alt?: string;
    url?: string;
    top?: number;
    left?: number;
    width?: number;
    rotate?: number;
    zIndex?: number;
  }>;
  aboutMeVideo?: string | {
    asset?: {
      url?: string;
    };
  };
  mediaWidgets?: Array<{
    title?: string;
    alt?: string;
    url?: string;
  }>;
};
