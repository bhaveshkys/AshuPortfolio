import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { fallbackHomePage } from "./fallback";
import type {
  CollageImage,
  HeroScrollImage,
  HomePageData,
  MediaWidget,
  SanityHomePage,
} from "./types";

function mergeMedia(cmsMedia?: SanityHomePage["mediaWidgets"]): MediaWidget[] {
  return fallbackHomePage.mediaWidgets.map((fallback, index) => {
    const incoming = cmsMedia?.[index];

    return {
      title: incoming?.title || fallback.title,
      alt: incoming?.alt || fallback.alt,
      url: incoming?.url || fallback.url,
    };
  });
}

function normalizeMenuItems(
  menuItems?: HomePageData["menuItems"]
): HomePageData["menuItems"] {
  const source = menuItems?.length ? menuItems : fallbackHomePage.menuItems;

  return source.map((item) => {
    const isAboutUs = item.label.toLowerCase() === "about us";

    return {
      label: isAboutUs ? "about me" : item.label,
      href: isAboutUs ? "/about-me" : item.href,
    };
  });
}

function mapHeroScrollImages(
  images?: SanityHomePage["heroScrollImages"]
): HeroScrollImage[] | undefined {
  if (!images?.length) {
    return fallbackHomePage.heroScrollImages;
  }

  return images
    .filter((image) => image?.url)
    .map((image) => ({
      title: image?.title || "Hero scroll image",
      alt: image?.alt || "Hero scroll image",
      url: image?.url || "",
    }))
    .filter((image) => image.url);
}

function mapCollageImages(
  images?: SanityHomePage["collageImages"]
): CollageImage[] {
  if (!images?.length) {
    return fallbackHomePage.collageImages;
  }

  return images
    .filter((image) => image?.url)
    .map((image) => ({
      title: image?.title || "Collage image",
      alt: image?.alt || "Collage image",
      url: image?.url || "",
      top: image?.top,
      left: image?.left,
      width: image?.width,
      rotate: image?.rotate,
      zIndex: image?.zIndex,
    }))
    .filter((image) => image.url);
}

export function normalizeHomePage(data?: SanityHomePage | null): HomePageData {
  const aboutMeVideoField = data?.aboutMeVideo as unknown;
  const aboutMeVideo =
    typeof aboutMeVideoField === "string"
      ? aboutMeVideoField
      : (aboutMeVideoField as { asset?: { url?: string } } | undefined)
          ?.asset?.url || undefined;

  return {
    ...fallbackHomePage,
    ...data,
    aboutMeVideo,
    menuItems: normalizeMenuItems(data?.menuItems),
    serviceCallouts: data?.serviceCallouts?.length
      ? data.serviceCallouts
      : fallbackHomePage.serviceCallouts,
    seo: {
      ...fallbackHomePage.seo,
      ...data?.seo,
      socialImage:
        data?.seo?.socialImage?.asset?.url ||
        data?.seo?.socialImage ||
        fallbackHomePage.seo.socialImage,
    },
    heroScrollImages: mapHeroScrollImages(data?.heroScrollImages),
    collageImages: mapCollageImages(data?.collageImages),
    mediaWidgets: mergeMedia(data?.mediaWidgets),
  };
}

export async function getHomePage(): Promise<HomePageData> {
  if (!client) {
    return fallbackHomePage;
  }

  try {
    const data = await client.fetch<SanityHomePage | null>(HOME_PAGE_QUERY, {});
    return normalizeHomePage(data);
  } catch {
    return fallbackHomePage;
  }
}
