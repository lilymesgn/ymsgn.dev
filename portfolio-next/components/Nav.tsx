"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EthCross from "./EthCross";
import { useIsMobile } from "@/lib/hooks";

const LINKS = [
  { label:"Work",     path:"/projects" },
  { label:"About",    path:"/about"    },
  { label:"Services", path:"/services" },
  { label:"Contact",  path:"/contact"  },
];

export default function Nav() {
  const router    = useRouter();
  const pathname  = usePathname();
  const isMobile  = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  const go = (p: string) => { router.push(p); setOpen(false); };
  const bg = scrolled || open;

  return (
    <>
      <motion.header initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.1, duration:.5 }}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, height:64,
          padding: isMobile ? "0 20px" : "0 32px", display:"flex", alignItems:"center", justifyContent:"space-between",
          background: bg ? "rgba(7,7,7,.95)" : "transparent",
          backdropFilter: bg ? "blur(14px)" : "none",
          borderBottom: bg ? "1px solid var(--border)" : "none",
          transition:"background .3s, backdrop-filter .3s, border-color .3s" }}>
        <button onClick={() => go("/")} style={{ display:"flex", alignItems:"center", gap:10, minHeight:44 }}>
          <EthCross size={22} color="#D4AF77"/>
          <span className="mono" style={{ fontSize:11, letterSpacing:".16em", color:"var(--muted)" }}>YMSGN</span>
        </button>
        {!isMobile && (
          <nav style={{ display:"flex", gap:28, alignItems:"center" }}>
            {LINKS.map(l => (
              <button key={l.path} onClick={() => go(l.path)} style={{ fontSize:14, color: pathname===l.path ? "var(--gold)" : "var(--muted)", transition:"color .2s", minHeight:44 }}>{l.label}</button>
            ))}
            <button onClick={() => go("/contact")} style={{ background:"var(--gold)", color:"#000", padding:"10px 20px", borderRadius:6, fontFamily:"var(--fm)", fontSize:10, letterSpacing:".12em", fontWeight:500, minHeight:44 }}>HIRE ME</button>
          </nav>
        )}
        {isMobile && (
          <button onClick={() => setOpen(x=>!x)} aria-label={open ? "Close menu" : "Open menu"} style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:5, width:44, height:44, padding:0 }}>
            <motion.span animate={{ rotate:open?45:0, y:open?7:0 }}  style={{ display:"block", width:22, height:1.5, background:"var(--text)", transformOrigin:"center" }}/>
            <motion.span animate={{ opacity:open?0:1, scaleX:open?0:1 }} style={{ display:"block", width:22, height:1.5, background:"var(--text)" }}/>
            <motion.span animate={{ rotate:open?-45:0, y:open?-7:0 }} style={{ display:"block", width:22, height:1.5, background:"var(--text)", transformOrigin:"center" }}/>
          </button>
        )}
      </motion.header>
      <AnimatePresence>
        {isMobile && open && (
          <motion.div key="drawer" initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:.25, ease:[.16,1,.3,1] }}
            style={{ position:"fixed", inset:0, zIndex:250, background:"rgba(7,7,7,.97)", backdropFilter:"blur(20px)",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, paddingTop:64 }}>
            {LINKS.map((l,i) => (
              <motion.button key={l.path} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*.07 }}
                onClick={() => go(l.path)} style={{ fontFamily:"var(--fd)", fontSize:36, fontWeight:800, letterSpacing:"-.02em", color: pathname===l.path?"var(--gold)":"var(--text)", padding:"10px 0", minHeight:60, width:"100%", textAlign:"center" }}>
                {l.label}
              </motion.button>
            ))}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.35 }} style={{ marginTop:24 }}>
              <button onClick={() => go("/contact")} style={{ background:"var(--gold)", color:"#000", padding:"14px 40px", borderRadius:8, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".14em", fontWeight:500 }}>HIRE ME</button>
            </motion.div>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.45 }} className="mono"
              style={{ position:"absolute", bottom:32, fontSize:9, color:"rgba(255,255,255,.15)", letterSpacing:".16em" }}>
              YMSGN · ADDIS ABABA · 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
