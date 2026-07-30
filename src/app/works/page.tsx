import React from "react";
import { getTreatmentsPage } from "@/app/_treatments/data";
import WorksCarousel from "../_works/WorksCarousel";

export default async function WorksPage() {
  const data = await getTreatmentsPage();
  const works = data?.works ?? [];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-16 pt-28 md:px-6 md:pb-20 md:pt-34">
        <WorksCarousel works={works} />
      </section>
    </main>
  );
}
