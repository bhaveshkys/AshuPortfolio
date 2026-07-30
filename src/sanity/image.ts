import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder =
  projectId &&
  imageUrlBuilder({
    projectId,
    dataset,
  });

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    return null;
  }

  return builder.image(source).auto("format").fit("max");
}
