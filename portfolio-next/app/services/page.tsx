import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
export const metadata: Metadata = { title:"Services", description:"Web development, UI/UX design, mobile apps, and 3D." };
export default function Page() { return <ServicesPage/>; }
