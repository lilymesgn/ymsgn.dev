import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Self-taught developer and designer from Addis Ababa, Ethiopia.",
};

export default function Page() {
  return <AboutClient />;
}
