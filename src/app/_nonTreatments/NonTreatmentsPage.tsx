"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { NonTreatmentWork, NonTreatmentsPageData } from "./types";

type NonTreatmentsPageProps = {
  data: NonTreatmentsPageData;
};

type WorkCardProps = {
  work: NonTreatmentWork;
};

function WorkCard({ work }: WorkCardProps) {
  const coverAlt = work.coverAlt || work.title;
  const hoverAlt = work.hoverAlt || coverAlt;
  const isExternal = work.href?.startsWith("http");

  const content = (
    <div
      className="group relative w-full overflow-hidden rounded-[20px] bg-[#0d0d0d]"
      aria-label={work.title}
    >
      <div className="aspect-[16/9]">
        <img
          src={work.coverUrl}
          alt={coverAlt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          loading="lazy"
        />
        {work.hoverUrl ? (
          <img
            src={work.hoverUrl}
            alt={hoverAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-4  py-3 text-xs uppercase tracking-[0.18em] text-white/80">
        <span>{work.title}</span>
        {work.client ? <span>{work.client}</span> : null}
      </div>
    </div>
  );

  if (!work.href) {
    return content;
  }

  return (
    <a
      href={work.href}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc3d9]"
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {content}
    </a>
  );
}

export function NonTreatmentsPage({ data }: NonTreatmentsPageProps) {
  const { scrollY } = useScroll();
  const animationStart = 160;
  const animationEnd = 520;
  const cardScaleX = useTransform(
    scrollY,
    [animationStart, animationEnd],
    [0.7, 1.06]
  );
  const gridGap = useTransform(
    scrollY,
    [animationStart, animationEnd],
    [46, 24]
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className=" pb-24 pt-[160px]">
        <div className="mx-auto w-full max-w-[calc(1450px+4rem)] px-8">
          <h1 className="mb-40 text-center font-['DK_Crayon_Crumble'] text-[clamp(70px,9vw,240px)] uppercase tracking-[0.08em] leading-[1] text-white">
            {data.heading}
          </h1>
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            style={{ columnGap: gridGap, rowGap: gridGap }}
          >
            {data.works.map((work) => (
              <motion.div key={work.title} style={{ scaleX: cardScaleX }}>
                <WorkCard work={work} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
