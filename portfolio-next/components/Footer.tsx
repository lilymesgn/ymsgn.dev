"use client";
import Link from "next/link";
import EthCross from "./EthCross";
import { useIsMobile } from "@/lib/hooks";

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding: isMobile?"28px 20px":"32px 40px",
      display:"flex", flexDirection: isMobile?"column":"row", justifyContent:"space-between",
      alignItems:"center", gap: isMobile?20:16, textAlign: isMobile?"center":"left" }}>
      <Link href="/" style={{ display:"flex", alignItems:"center", gap:10 }}>
        <EthCross size={18} color="rgba(212,175,119,.4)"/>
        <span className="mono" style={{ fontSize:9, letterSpacing:".14em", color:"var(--muted)" }}>Yimesgen Azene · 2025</span>
      </Link>
      {!isMobile && (
        <nav style={{ display:"flex", gap:24 }}>
          {[["Work","/projects"],["About","/about"],["Services","/services"],["Contact","/contact"]].map(([l,p]) => (
            <Link key={p} href={p} style={{ fontFamily:"var(--fm)", fontSize:9, letterSpacing:".14em", color:"rgba(255,255,255,.2)", textTransform:"uppercase" }}>{l}</Link>
          ))}
        </nav>
      )}
      <span className="mono" style={{ fontSize:9, color:"rgba(255,255,255,.12)" }}>Built with Next.js · Addis Ababa</span>
    </footer>
  );
}
