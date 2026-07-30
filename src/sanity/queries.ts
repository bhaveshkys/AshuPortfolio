import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]{
  title,
  introLabel,
  menuItems[]{label, href},
  serviceCallouts[]{leadingText, highlightText},
  noteLabel,
  notice,
  foundedPrefix,
  foundedYear,
  foundedSuffix,
  contactLabel,
  contactHref,
  aboutMeVideo{
    asset->{url}
  },
  heroScrollImages[]{
    title,
    alt,
    media,
    "url": media.asset->url,
    "dimensions": media.asset->metadata.dimensions
  },
  collageImages[]{
    title,
    alt,
    media,
    top,
    left,
    width,
    rotate,
    zIndex,
    "url": media.asset->url,
    "dimensions": media.asset->metadata.dimensions
  },
  seo{
    title,
    description,
    socialImage{
      asset->{
        url
      }
    }
  },
  mediaWidgets[]{
    title,
    alt,
    media,
    "url": media.asset->url,
    "dimensions": media.asset->metadata.dimensions
  }
}`);

export const TREATMENTS_PAGE_QUERY = defineQuery(`*[_type == "treatmentsPage"][0]{
  title,
  heading,
  works[]{
    title,
    client,
    href,
    coverAlt,
    hoverAlt,
    coverMedia,
    hoverMedia,
    "coverUrl": coverMedia.asset->url,
    "hoverUrl": hoverMedia.asset->url
  }
}`);

export const ABOUT_ME_PAGE_QUERY = defineQuery(`*[_type == "aboutMePage"][0]{
  title,
  heading,
  intro,
  description,
  video{
    asset->{url}
  }
}`);

export const AI_WORKS_PAGE_QUERY = defineQuery(`*[_type == "aiWorksPage"][0]{
  title,
  prompt,
  answer,
  caption,
  projects[]{
    title,
    description,
    coverMedia,
    video,
    "coverUrl": coverMedia.asset->url,
    "videoUrl": video.asset->url
  }
}`);

export const NON_TREATMENTS_PAGE_QUERY = defineQuery(`*[_type == "nonTreatmentsPage"][0]{
  title,
  heading,
  works[]{
    title,
    client,
    href,
    coverAlt,
    hoverAlt,
    coverMedia,
    hoverMedia,
    "coverUrl": coverMedia.asset->url,
    "hoverUrl": hoverMedia.asset->url
  }
}`);
