import type { Metadata } from "next";
import { HomeExperience } from "./_home/HomeExperience";
import { getHomePage } from "./_home/data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      images: page.seo.socialImage ? [page.seo.socialImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: page.seo.socialImage ? [page.seo.socialImage] : undefined,
    },
  };
}

export default async function Home() {
  const data = await getHomePage();

  return <HomeExperience data={data} />;
}
