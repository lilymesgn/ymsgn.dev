import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yimesgen Azene — Developer & Designer",
    template: "%s · Yimesgen Azene",
  },
  description:
    "Self-taught developer and designer based in Addis Ababa, Ethiopia. Websites, mobile apps, and 3D interfaces.",
  authors: [{ name: "Yimesgen Azene" }],
  openGraph: {
    type: "website",
    url: "https://ymsgn.dev",
    title: "Yimesgen Azene — Developer & Designer",
    description: "Self-taught developer and designer from Addis Ababa, Ethiopia.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
