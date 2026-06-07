import type { Metadata, Viewport } from "next";
import { Syne, Inter, DM_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import "./globals.css";

const syne   = Syne({ subsets:["latin"], weight:["400","500","600","700","800"], variable:"--font-display", display:"swap" });
const inter  = Inter({ subsets:["latin"], weight:["300","400","500"],            variable:"--font-body",    display:"swap" });
const dmMono = DM_Mono({ subsets:["latin"], weight:["400","500"],               variable:"--font-mono",   display:"swap" });

export const metadata: Metadata = {
  title: { default:"Yimesgen Azene — Developer & Designer", template:"%s | Yimesgen Azene" },
  description: "Self-taught developer and designer from Addis Ababa, Ethiopia. Websites, apps, and 3D interfaces.",
  authors: [{ name:"Yimesgen Azene" }],
  openGraph: { type:"website", url:"https://ymsgn.dev", siteName:"Yimesgen Azene",
    title:"Yimesgen Azene — Developer & Designer",
    description:"Self-taught developer and designer from Addis Ababa, Ethiopia." },
  robots: { index:true, follow:true },
};

export const viewport: Viewport = { themeColor:"#070707", width:"device-width", initialScale:1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${dmMono.variable}`}>
      <body>
        <Shell>{children}</Shell>
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
