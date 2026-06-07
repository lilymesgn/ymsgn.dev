import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
export const metadata: Metadata = { title:"Contact", description:"Get in touch to discuss a project." };
export default function Page() { return <ContactPage/>; }
