import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss a project.",
};

export default function Page() {
  return <ContactClient />;
}
