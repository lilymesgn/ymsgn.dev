import type { Metadata } from "next";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects across web, mobile, design, and 3D.",
};

export default function Page() {
  return <ProjectsClient />;
}
