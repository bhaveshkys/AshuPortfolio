"use client";

import { useEffect, useRef, useState } from "react";
import type { TreatmentWork } from "@/app/_treatments/types";

type WorksCarouselProps = {
  works: TreatmentWork[];
};

function getWorkImage(work: TreatmentWork) {
  return work.hoverUrl || work.coverUrl;
}

export default function WorksCarousel({ works }: WorksCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInList, setIsInList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Reset interactive states when selected work changes
  useEffect(() => {
    setIsInList(false);
    setIsLiked(false);
  }, [activeIndex]);

  if (!works || works.length === 0) {
    return (
      <div className="flex min-h-80 items-center justify-center text-white/60">
        No works available
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % works.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    const len = works.length;

    // Circular distance calculation
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;

    const isActive = diff === 0;
    const isLeft = diff === -1 || (len === 2 && index !== activeIndex && index === 0);
    const isRight = diff === 1 || (len === 2 && index !== activeIndex && index === 1);
    
    const isVisible = isActive || isLeft || isRight;

    if (!isVisible) {
      return {
        transform: "translateX(0) translateZ(-400px) rotateY(0deg) scale(0.5)",
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none" as const,
        transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
      };
    }

    let translateX = "0%";
    let translateZ = "0px";
    let rotateY = "0deg";
    let scale = 1;
    let zIndex = 30;
    let opacity = 1;

    if (isLeft) {
      translateX = "-52%";
      translateZ = "-220px";
      rotateY = "26deg";
      scale = 0.84;
      zIndex = 10;
      opacity = 0.55;
    } else if (isRight) {
      translateX = "52%";
      translateZ = "-220px";
      rotateY = "-26deg";
      scale = 0.84;
      zIndex = 10;
      opacity = 0.55;
    }

    return {
      transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
    };
  };

  return (
    <section className="relative w-full overflow-visible py-8 flex flex-col items-center">
      {/* 3D Stack Container */}
      <div 
        className="relative w-full max-w-[680px] h-[550px] md:h-[620px] flex items-center justify-center overflow-visible"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-[-16px] md:left-[-72px] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          aria-label="Previous work"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-[-16px] md:right-[-72px] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          aria-label="Next work"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Cards */}
        {works.map((work, index) => {
          const isActive = index === activeIndex;
          const cardStyle = getCardStyle(index);
          const genres = work.genres?.filter(Boolean) ?? [];
          const cast = work.cast?.filter(Boolean) ?? [];
          const description = work.description || work.summary || work.tagline;

          return (
            <div
              key={`${work.title}-${index}`}
              className="absolute w-[88vw] sm:w-[80vw] md:w-full h-full rounded-[16px] border border-white/10 bg-[#181818] shadow-2xl overflow-hidden flex flex-col"
              style={{
                ...cardStyle,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Frosted/Blur Overlay for Inactive Cards */}
              {!isActive && (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="absolute inset-0 z-35 bg-black/45 backdrop-blur-[8px] transition-all duration-300 hover:bg-black/30 cursor-pointer outline-none border-none w-full h-full"
                  aria-label={`Select ${work.title}`}
                />
              )}

              {/* Card Contents */}
              {/* Hero Image Section */}
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden md:h-[320px]">
                <img
                  src={getWorkImage(work)}
                  alt={work.coverAlt || work.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Ambient Shadows / Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />

                {/* Title & Category Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 md:p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ffc3d9] bg-[#ffc3d9]/10 border border-[#ffc3d9]/35 px-1.5 py-0.5 rounded select-none">
                      Selected work
                    </span>
                    {work.client ? (
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 select-none">
                        {work.client}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="max-w-[15ch] font-['DK_Crayon_Crumble'] text-[clamp(28px,4.5vw,56px)] uppercase leading-[0.95] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    {work.title}
                  </h2>

                  {/* Actions Row */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {work.href ? (
                      <a
                        href={isActive ? work.href : undefined}
                        className="inline-flex items-center gap-1.5 rounded bg-white px-5 py-2 text-xs font-bold text-black transition-all duration-200 hover:bg-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-white active:scale-95 shadow-md"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Play</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded bg-white px-5 py-2 text-xs font-bold text-black transition-all duration-200 hover:bg-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-white active:scale-95 shadow-md"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Play</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        if (!isActive) return;
                        e.stopPropagation();
                        setIsInList(!isInList);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-black/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
                      title={isInList ? "Remove from List" : "Add to List"}
                    >
                      {isActive && isInList ? (
                        <svg className="h-4 w-4 text-[#ffc3d9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        if (!isActive) return;
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-black/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
                      title="Like"
                    >
                      <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${isActive && isLiked ? 'fill-[#ffc3d9] stroke-[#ffc3d9] scale-110' : ''}`} fill={isActive && isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.708C20.972 10 22 11.028 22 12.292c0 .927-.58 1.737-1.396 2.054.498.41.776.993.776 1.637 0 .867-.5 1.577-1.282 1.838.272.338.41.748.41 1.18 0 1.054-.863 1.905-1.956 1.905H9c-1.3 0-2.5-.5-3.3-1.4l-3-3.3c-.4-.4-.5-1-.2-1.5.3-.5.9-.7 1.4-.4L7 16V6c0-1.7 1.3-3 3-3h.5C12 3 13 4 13 5.5V10h1z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        if (!isActive) return;
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="ml-auto mr-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-black/40 text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isActive && isMuted ? (
                        <svg className="h-4.5 w-4.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg className="h-4.5 w-4.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Movie Details Bottom Section */}
              <div className="grid grid-cols-1 gap-5 px-5 pb-6 pt-4 md:grid-cols-3 md:px-6 md:pb-6 md:pt-4 bg-[#181818] overflow-y-auto no-scrollbar flex-1">
                {/* Left Column: Metadata & Description */}
                <div className="flex flex-col gap-2.5 md:col-span-2">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#a3a3a3]">
                    <span className="font-semibold text-green-500">98% Match</span>
                    <span className="font-semibold">{work.year || "2026"}</span>
                    <span className="font-semibold">{work.season || work.type || "Special Release"}</span>
                    <span className="rounded border border-white/30 bg-transparent px-1 py-0.5 text-[8px] font-bold tracking-wider text-white uppercase leading-none select-none">
                      HD
                    </span>
                    <span className="rounded border border-white/30 bg-transparent px-1 py-0.5 text-[8px] font-bold tracking-wider text-white uppercase leading-none select-none">
                      CC
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded border border-[#ffc3d9]/35 bg-[#ffc3d9]/10 px-1 py-0.5 text-[9px] font-semibold text-[#ffdce8] uppercase leading-none select-none">
                      PG-13
                    </span>
                    <span className="text-[11px] text-white/65 tracking-wide">
                      {genres.length ? genres.slice(0, 2).join(" • ") : "Visual Art • Direction"}
                    </span>
                  </div>

                  {description ? (
                    <p className="text-xs md:text-sm font-normal leading-relaxed text-white/80 max-w-[60ch]">
                      {description}
                    </p>
                  ) : (
                    <p className="text-xs md:text-sm font-normal leading-relaxed text-white/80 max-w-[60ch]">
                      An exclusive look into this creative production, showcasing innovative design, visual storytelling, and high-fidelity execution tailored to client vision.
                    </p>
                  )}
                </div>

                {/* Right Column: Cast & Genres */}
                <div className="flex flex-col gap-2 text-[11px] md:text-xs text-white/60">
                  <div>
                    <span className="text-white/40 font-medium">Cast: </span>
                    <span className="text-white/80 hover:text-white transition duration-200 cursor-default">
                      {cast.length ? cast.join(", ") : "Creative Team, Director, Producers"}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 font-medium">Genres: </span>
                    <span className="text-white/80 hover:text-white transition duration-200 cursor-default">
                      {genres.length ? genres.join(", ") : "Creative Direction, Visual Effects, Branding"}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 font-medium">Project: </span>
                    <span className="text-white/80 hover:text-white transition duration-200 cursor-default">
                      {work.client || "Independent Production"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
