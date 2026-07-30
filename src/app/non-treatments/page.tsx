import type { Metadata } from "next";
import { NonTreatmentsPage } from "../_nonTreatments/NonTreatmentsPage";
import { getNonTreatmentsPage } from "../_nonTreatments/data";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNonTreatmentsPage();

  return {
    title: page.title,
  };
}

export default async function NonTreatments() {
  const data = await getNonTreatmentsPage();

  return <NonTreatmentsPage data={data} />;
}
