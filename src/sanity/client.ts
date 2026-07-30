import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId, studioUrl } from "./env";

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      stega: {
        studioUrl,
      },
    })
  : null;
