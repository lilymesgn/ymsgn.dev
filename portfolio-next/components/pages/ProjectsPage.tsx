"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/data";
import { useIsMobile } from "@/lib/hooks";

const TAGS = ["All","Web","App","UI/UX","3D","Full Stack"];

export default function ProjectsPage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("All");
  const filtered = active==="All" ? PROJECTS : PROJECTS.filter(p=>p.tags.includes(active));

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>
      <div style={{ padding:isMobile?"48px 20px 32px":"60px 40px 40px" }}>
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Portfolio</motion.p>
        <motion.h1 className="disp" initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:16 }}>All work</motion.h1>
        <p style={{ color:"var(--muted)", maxWidth:480, marginBottom:isMobile?32:48, lineHeight:1.75, fontSize:isMobile?15:16 }}>Six projects across web, mobile, design, and 3D. Every one has a write-up.</p>
        <div style={{ display:"flex", gap:8, flexWrap:isMobile?"nowrap":"wrap", overflowX:isMobile?"auto":"visible", paddingBottom:isMobile?4:0, marginBottom:isMobile?32:48, msOverflowStyle:"none", scrollbarWidth:"none" }}>
          {TAGS.map(t=>(
            <button key={t} onClick={()=>setActive(t)} style={{ fontFamily:"var(--fm)", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", flexShrink:0, padding:"10px 16px", borderRadius:6, minHeight:40, border:active===t?"1px solid var(--gold)":"1px solid var(--border)", color:active===t?"var(--gold)":"var(--muted)", background:active===t?"rgba(212,175,119,.07)":"transparent", transition:"all .2s" }}>{t}</button>
          ))}
        </div>
        <div style={{ height:1, background:"var(--border)", marginBottom:isMobile?32:48 }}/>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.25 }}
            style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(320px,1fr))", gap:isMobile?14:16, alignItems:"start" }}>
            {filtered.map(p=><ProjectCard key={p.slug} p={p}/>)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
