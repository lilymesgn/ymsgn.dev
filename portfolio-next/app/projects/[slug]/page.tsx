import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import ProjectDetailPage from "@/components/pages/ProjectDetailPage";

interface Props { params: { slug: string }; }

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = PROJECTS.find(x => x.slug === params.slug);
  if (!p) return { title:"Project Not Found" };
  return { title: p.title, description: p.tagline };
}

export default function Page({ params }: Props) {
  const p = PROJECTS.find(x => x.slug === params.slug);
  if (!p) notFound();
  return <ProjectDetailPage slug={params.slug}/>;
}
