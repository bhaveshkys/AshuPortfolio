import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ABOUT_ME_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About Me",
  description: "A simple about me page with a video area and profile text.",
};

export default async function AboutMePage() {
  const data = client ? await client.fetch(ABOUT_ME_PAGE_QUERY) : null;
  const videoUrl = data?.video?.asset?.url;

  return (
    <main className="h-screen w-full bg-black text-white">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex flex-1 items-center justify-center overflow-hidden border border-white/10 bg-[#111111]">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <p className="text-center text-white/70">Video area</p>
          )}
        </div>
        <div className="flex flex-1 items-center justify-center border border-white/10 bg-[#0b0b0b] px-8 text-center text-white/70">
          <div className="max-w-md text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-[#ffc3d9]">
              about me
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              {data?.heading || "About me"}
            </h1>
            {data?.intro ? (
              <p className="mt-4 text-white/80">{data.intro}</p>
            ) : null}
            {data?.description ? (
              <p className="mt-4 text-white/70">{data.description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
