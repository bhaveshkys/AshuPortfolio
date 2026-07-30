import type { TreatmentWork, TreatmentsPageData } from "./types";

type TreatmentsPageProps = {
  data: TreatmentsPageData;
};

type WorkCardProps = {
  work: TreatmentWork;
  size: "large" | "small";
};

function WorkCard({ work, size }: WorkCardProps) {
  const coverAlt = work.coverAlt || work.title;
  const hoverAlt = work.hoverAlt || coverAlt;
  const isExternal = work.href?.startsWith("http");
  const sizeClass =
    size === "large"
      ? "aspect-[16/9] rounded-[28px]"
      : "aspect-[4/3] rounded-[24px]";

  const content = (
    <div
      className={`group relative w-full overflow-hidden bg-[#101010] ${sizeClass}`}
      aria-label={work.title}
    >
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

export function TreatmentsPage({ data }: TreatmentsPageProps) {
  const featuredWorks = data.works.slice(0, 2);
  const moreWorks = data.works.slice(2);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-6 pb-24 pt-50">
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="mb-14 text-center font-['DK_Crayon_Crumble'] text-[clamp(80px,10vw,230px)]  uppercase tracking-[0.08em] text-white">
            {data.heading}
          </h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {featuredWorks.map((work) => (
              <WorkCard key={work.title} work={work} size="large" />
            ))}
          </div>
          {moreWorks.length ? (
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
              {moreWorks.map((work) => (
                <WorkCard key={work.title} work={work} size="small" />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
