"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import EthCross from "./EthCross";
import { useIsMobile } from "@/lib/hooks";
import type { Project } from "@/lib/data";

export default function ProjectCard({ p, featured=false }: { p:Project; featured?:boolean }) {
  const router   = useRouter();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx,{stiffness:200,damping:22});
  const sry = useSpring(ry,{stiffness:200,damping:22});

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    rx.set(((e.clientY-r.top-r.height/2)/(r.height/2))*-6);
    ry.set(((e.clientX-r.left-r.width/2)/(r.width/2))*6);
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:32, scale:.97 }} whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:"-50px" }} transition={{ duration:.6, ease:[.16,1,.3,1] }}
      whileHover={isMobile ? {} : { boxShadow:`0 20px 60px -12px ${p.accent}28, 0 0 0 1px ${p.accent}18` }}
      onMouseMove={onMove} onMouseLeave={()=>{ rx.set(0); ry.set(0); }}
      style={{ rotateX:isMobile?0:srx, rotateY:isMobile?0:sry, background:"var(--s2)", border:"1px solid var(--border)",
        borderRadius:12, overflow:"hidden", cursor:"pointer", transformStyle:isMobile?"flat":"preserve-3d" }}
      onClick={() => router.push(`/projects/${p.slug}`)}>
      <div style={{ height:featured?(isMobile?200:280):(isMobile?180:220), background:p.grad, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 35% 45%,${p.accent}22 0%,transparent 65%)` }}/>
        <div style={{ position:"absolute", bottom:16, right:16, opacity:.1 }}><EthCross size={56} color={p.accent}/></div>
        {p.live && (
          <div style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,.65)", backdropFilter:"blur(8px)", borderRadius:20, padding:"4px 10px", display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:5,height:5,borderRadius:"50%",background:"var(--green)",boxShadow:"0 0 6px var(--green)" }} className="pulse"/>
            <span className="mono" style={{ fontSize:9, letterSpacing:".12em", color:"var(--green)", textTransform:"uppercase" }}>Live</span>
          </div>
        )}
        <div style={{ position:"absolute", bottom:14, left:14, background:"rgba(0,0,0,.55)", backdropFilter:"blur(8px)", borderRadius:20, padding:"3px 10px" }}>
          <span className="mono" style={{ fontSize:9, letterSpacing:".12em", color:"var(--muted)", textTransform:"uppercase" }}>{p.tags.join(" · ")}</span>
        </div>
      </div>
      <div style={{ padding:isMobile?"16px 18px 20px":"20px 22px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <h3 className="disp" style={{ fontSize:isMobile?17:20, fontWeight:700, letterSpacing:"-.02em" }}>{p.title}</h3>
          <span className="mono" style={{ fontSize:10, color:"var(--muted)" }}>{p.year}</span>
        </div>
        <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.65, marginBottom:16 }}>{p.tagline}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {p.tech.slice(0,isMobile?3:4).map(t=>(
            <span key={t} className="mono" style={{ fontSize:10, color:"var(--muted)", border:"1px solid var(--border)", borderRadius:4, padding:"3px 8px", textTransform:"uppercase" }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
