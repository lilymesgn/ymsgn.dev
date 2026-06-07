import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";
export const metadata: Metadata = { title:"Work", description:"Six projects across web, mobile, design, and 3D." };
export default function Page() { return <ProjectsPage/>; }
