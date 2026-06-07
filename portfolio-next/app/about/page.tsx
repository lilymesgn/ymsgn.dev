import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
export const metadata: Metadata = { title:"About", description:"Self-taught developer and designer from Addis Ababa, Ethiopia." };
export default function Page() { return <AboutPage/>; }
