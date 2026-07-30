"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import type { HomePageData } from "./types";
import { CollageSection } from "./CollageSection";

type HomeExperienceProps = {
  data: HomePageData;
};

export function HomeExperience({ data }: HomeExperienceProps) {
  const [landingOffset, setLandingOffset] = useState(-260);
  const [finalScale, setFinalScale] = useState(0.98);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, { stiffness: 160, damping: 26 });
  const glowYSpring = useSpring(glowY, { stiffness: 160, damping: 26 });
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, {
    stiffness: 250,
    damping: 30,
    mass: 0.9,
  });
  const titleY = useTransform(smoothScroll, [0, 360], [0, landingOffset]);
  const titleScale = useTransform(smoothScroll, [0, 360], [1, finalScale]);
  const titleOpacity = useTransform(smoothScroll, [0, 280], [1, 0.92]);
  const taglineY = useTransform(smoothScroll, [0, 360], [0, 220]);
  const taglineScale = useTransform(smoothScroll, [0, 300, 360], [1, 1.55, 2.55]);
  const heroGroupY = useTransform(smoothScroll, [980, 1900], [0, -420]);
  const imagesOpacity = useTransform(smoothScroll, [320, 780], [0, 1]);
  const imagesY = useTransform(smoothScroll, [520, 980], [160, 0]);
  const heroImagePrimary = data.heroScrollImages?.[0];
  const heroImageSecondary = data.heroScrollImages?.[1];

  useEffect(() => {
    const updateLandingOffset = () => {
      const navSlot = document.getElementById("nav-slot");
      if (navSlot) {
        const rect = navSlot.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const ringTextOffset = 2;
        setLandingOffset(centerY - window.innerHeight / 2 + ringTextOffset);
      }

      const navSample = document.querySelector<HTMLElement>(
        "[data-nav-sample='true']"
      );

      if (titleRef.current && navSample) {
        const titleSize = parseFloat(
          window.getComputedStyle(titleRef.current).fontSize
        );
        const navSize = parseFloat(
          window.getComputedStyle(navSample).fontSize
        );
        if (titleSize > 0 && navSize > 0) {
          setFinalScale((navSize / titleSize)*1.7);
        }
      }
    };

    updateLandingOffset();
    window.addEventListener("resize", updateLandingOffset);
    return () => window.removeEventListener("resize", updateLandingOffset);
  }, []);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (clientX - centerX) / (rect.width / 2);
    const normY = (clientY - centerY) / (rect.height / 2);
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    const maxShift = 10;

    glowX.set(-clamp(normX) * maxShift);
    glowY.set(-clamp(normY) * maxShift);
  };

  const handlePointerLeave = () => {
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <main className="flex min-h-[260vh] flex-col bg-black text-white">
      <motion.h1
        ref={titleRef}
        className="pointer-events-none fixed left-1/2 top-1/2 z-[45] m-0 -translate-x-1/2 -translate-y-1/2 font-['Extenda_Hecto'] text-[clamp(120px,22vw,300px)] leading-[0.76] tracking-[0.02em] text-[#ffc3d9] uppercase"
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
      >
        {data.introLabel}
      </motion.h1>

      <section
        className="relative z-30 flex flex-1 flex-col items-center px-6 pb-[18vh] pt-[64vh] text-center"
        aria-label={data.introLabel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          className="flex flex-col items-center"
          style={{ y: heroGroupY }}
        >
          <motion.p
            className="mt-6 inline-flex flex-wrap items-baseline justify-center gap-2 pb-0 text-[40px] tracking-[-0.3px] lowercase"
            style={{ y: taglineY, scale: taglineScale }}
          >
          <span className="opacity-75">we make</span>
          <span className="text-[50px] font-bold">you</span>
          <span className="inline-flex items-baseline gap-4 font-['Extenda_Hecto']  uppercase text-[#ffc3d9]">
            <span className="pr-1 text-[60px] tracking-[2px]">stand</span>
            <span className="relative z-0 pl-1 text-[70px]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[220%] -translate-x-1/2 -translate-y-1/2 z-[-1]"
              >
                <motion.span
                  className="block h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,195,217,0.95),rgba(255,195,217,0.35)_60%,transparent_80%)] blur-[45px] opacity-90 mix-blend-screen"
                  style={{ x: glowXSpring, y: glowYSpring }}
                />
              </span>
              out
            </span>
          </span>
          </motion.p>

          {(heroImagePrimary || heroImageSecondary) ? (
            <motion.div
              className="relative mt-32 w-[min(980px,92vw)] overflow-visible"
              style={{ opacity: imagesOpacity, y: imagesY }}
            >
              {heroImagePrimary ? (
                <img
                  src={heroImagePrimary.url}
                  alt={heroImagePrimary.alt}
                  className="mx-auto block w-[80%]"
                />
              ) : null}
              {heroImageSecondary ? (
                <img
                  src={heroImageSecondary.url}
                  alt={heroImageSecondary.alt}
                  className="absolute -right-[14%] top-[6%] w-[36%]"
                />
              ) : null}
            </motion.div>
          ) : null}
        </motion.div>
      </section>
      <CollageSection images={data.collageImages} />
    </main>
  );
}
