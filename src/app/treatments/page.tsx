import type { Metadata } from "next";
import { TreatmentsPage } from "../_treatments/TreatmentsPage";
import { getTreatmentsPage } from "../_treatments/data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTreatmentsPage();

  return {
    title: page.title,
  };
}

export default async function Treatments() {
  const data = await getTreatmentsPage();

  return <TreatmentsPage data={data} />;
}
