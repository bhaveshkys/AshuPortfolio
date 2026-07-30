"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { CollageImage } from "./types";

type CollageSectionProps = {
  images?: CollageImage[];
  lineOne?: string;
  lineTwo?: string;
};

type CollageLayoutItem = {
  top: number;
  left: number;
  width: number;
  rotate: number;
  zIndex: number;
};

const collageLayout: CollageLayoutItem[] = [
  { top: 6, left: 4, width: 18, rotate: -6, zIndex: 4 },
  { top: 2, left: 34, width: 22, rotate: 4, zIndex: 6 },
  { top: 10, left: 62, width: 16, rotate: -3, zIndex: 5 },
  { top: 28, left: 12, width: 20, rotate: 7, zIndex: 7 },
  { top: 32, left: 45, width: 18, rotate: -8, zIndex: 8 },
  { top: 24, left: 72, width: 20, rotate: 5, zIndex: 6 },
  { top: 52, left: 4, width: 22, rotate: -4, zIndex: 6 },
  { top: 58, left: 34, width: 16, rotate: 6, zIndex: 5 },
  { top: 50, left: 60, width: 18, rotate: -2, zIndex: 7 },
  { top: 70, left: 18, width: 20, rotate: 3, zIndex: 5 },
  { top: 72, left: 50, width: 22, rotate: -5, zIndex: 6 },
  { top: 68, left: 74, width: 16, rotate: 4, zIndex: 4 },
];

export function CollageSection({
  images,
  lineOne = "Treatments",
  lineTwo = "In 3 days",
}: CollageSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const headingInView = useInView(headingRef, { amount: 0.6 });

  if (!images?.length) {
    return null;
  }

  const collageImages = images.slice(0, collageLayout.length);
  const headingLineOne = lineOne;
  const headingLineTwo = lineTwo;

  return (
    <section className="relative z-10 w-full bg-black px-6 pb-32 pt-28 text-white">
      <div ref={headingRef} className="mx-auto mb-14 w-full max-w-[1200px]">
        <motion.p
          className="text-center font-['Extenda_Hecto'] text-[clamp(28px,6vw,72px)] uppercase tracking-[0.04em] text-[#ffc3d9]"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={headingInView ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {headingLineOne}
        </motion.p>
        <motion.p
          className="text-center font-['Extenda_Hecto'] text-[clamp(26px,5.5vw,64px)] uppercase tracking-[0.04em] text-white"
          initial={{ x: "100vw", opacity: 0 }}
          animate={headingInView ? { x: 0, opacity: 1 } : { x: "100vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
        >
          {headingLineTwo}
        </motion.p>
      </div>
      <div
        ref={containerRef}
        className="relative mx-auto h-[88vh] w-full max-w-[1200px]"
      >
        {collageImages.map((image, index) => {
          const layout = collageLayout[index];
          const top = image.top ?? layout.top;
          const left = image.left ?? layout.left;
          const width = image.width ?? layout.width;
          const rotate = image.rotate ?? layout.rotate;
          const zIndex = image.zIndex ?? layout.zIndex;

          return (
            <motion.img
              key={`${image.title}-${index}`}
              src={image.url}
              alt={image.alt}
              className="absolute cursor-grab select-none touch-none active:cursor-grabbing"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${width}%`,
                rotate,
                zIndex,
              }}
              drag
              dragConstraints={containerRef}
              dragElastic={0.18}
              dragMomentum={false}
              whileDrag={{ scale: 1.03, zIndex: 20 }}
            />
          );
        })}
      </div>
    </section>
  );
}
