"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/app/_home/types";

type NavBarProps = {
  menuItems: MenuItem[];
  brandLabel?: string;
};

export function NavBar({ menuItems, brandLabel = "AWAARDS" }: NavBarProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const normalizedMenuItems = menuItems.map((item) => {
    if (item.label.toLowerCase() === "treatments") {
      return { ...item, href: "/treatments" };
    }

    if (item.label.toLowerCase() === "non-treatments") {
      return { ...item, href: "/non-treatments" };
    }

    if (item.label.toLowerCase() === "our team") {
      return { ...item, label: "works", href: "/works" };
    }

    return item;
  });
  const leftNavItems = normalizedMenuItems.slice(0, 3);
  const rightNavItems = normalizedMenuItems.slice(3);
  const { scrollY } = useScroll();
  const ringOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const headerClasses = isHome
    ? "fixed left-0 right-0 top-0 z-50 px-10 pt-6 max-[720px]:px-5 max-[720px]:pt-5"
    : "fixed left-0 right-0 top-0 z-50 bg-black/80 px-10 pb-4 pt-6 backdrop-blur-md max-[720px]:px-5 max-[720px]:pb-3 max-[720px]:pt-5";

  return (
    <header className={headerClasses}>
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-6 whitespace-nowrap text-[clamp(14px,1.7vw,20px)] lowercase tracking-[0.08em] max-[720px]:grid-cols-1 max-[720px]:gap-4"
      >
        <div className="flex items-center gap-6 max-[720px]:justify-center max-[720px]:gap-4">
          {leftNavItems.map((item, index) => (
            <a
              href={item.href}
              key={`${item.label}-${item.href}`}
              data-nav-sample={index === 0 ? "true" : undefined}
              className="whitespace-nowrap text-white transition-colors duration-150 hover:text-[#ffc3d9]"
            >
              {item.label}
            </a>
          ))}
        </div>
        {isHome ? (
          <motion.div
            id="nav-slot"
            className="h-[38px] w-[150px] rounded-full border-2 border-white max-[720px]:hidden"
            style={{ opacity: ringOpacity }}
          />
        ) : (
          <Link
            href="/"
            className="flex h-[38px] w-[150px] items-center justify-center rounded-full border-2 border-white text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ffc3d9] transition-colors duration-150 hover:text-white max-[720px]:hidden"
          >
            {brandLabel}
          </Link>
        )}
        <div className="flex items-center justify-end gap-6 max-[720px]:justify-center max-[720px]:gap-4">
          {rightNavItems.map((item) => (
            <a
              href={item.href}
              key={`${item.label}-${item.href}`}
              className="whitespace-nowrap text-white transition-colors duration-150 hover:text-[#ffc3d9]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
