"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import EthCross from "@/components/EthCross";
import { PROJECTS } from "@/lib/data";
import { useIsMobile } from "@/lib/hooks";

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const router   = useRouter();
  const isMobile = useIsMobile();
  const p = PROJECTS.find(x=>x.slug===slug);
  if (!p) return null;
  const idx  = PROJECTS.findIndex(x=>x.slug===slug);
  const next = PROJECTS[(idx+1)%PROJECTS.length];

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:isMobile?"48px 20px 72px":"60px 40px 100px" }}>
        <button onClick={()=>router.push("/projects")} style={{ fontFamily:"var(--fm)", fontSize:10, letterSpacing:".14em", color:"var(--muted)", marginBottom:isMobile?32:48, display:"flex", alignItems:"center", gap:8, minHeight:44 }}>← BACK TO ALL WORK</button>
        <span className="mono" style={{ fontSize:10, letterSpacing:".18em", color:"var(--gold)", textTransform:"uppercase" }}>{p.tags.join(" · ")} · {p.year}</span>
        <motion.h1 className="disp" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1, duration:.6 }} style={{ fontSize:"clamp(28px,6vw,72px)", fontWeight:800, letterSpacing:"-.03em", margin:"16px 0 12px", lineHeight:1.05 }}>{p.title}</motion.h1>
        <p style={{ fontSize:isMobile?16:18, color:"var(--muted)", marginBottom:28, lineHeight:1.7 }}>{p.tagline}</p>
        {(p.demoUrl||p.githubUrl) && (
          <div style={{ display:"flex", gap:12, marginBottom:isMobile?32:48, flexWrap:"wrap" }}>
            {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ background:"var(--gold)", color:"#000", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, minHeight:44, display:"inline-flex", alignItems:"center" }}>VIEW LIVE</a>}
            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ background:"transparent", color:"var(--gold)", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, border:"1px solid var(--gold)", minHeight:44, display:"inline-flex", alignItems:"center" }}>VIEW CODE</a>}
          </div>
        )}
        <div style={{ marginBottom:isMobile?32:48 }}>
          <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>Stack</span>
          <p className="mono" style={{ fontSize:12, color:"var(--text)", marginTop:8, letterSpacing:".06em", lineHeight:1.8 }}>{p.tech.join(", ")}</p>
        </div>
        <div style={{ height:1, background:"var(--border)", marginBottom:isMobile?36:56 }}/>
        {/* cover mockup */}
        <div style={{ height:isMobile?220:380, borderRadius:12, background:p.grad, position:"relative", overflow:"hidden", marginBottom:isMobile?40:64, border:"1px solid var(--border)" }}>
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 30% 40%,${p.accent}22 0%,transparent 65%)` }}/>
          <div style={{ position:"absolute", top:isMobile?12:20, left:isMobile?12:20, right:isMobile?12:20, background:"rgba(0,0,0,.4)", backdropFilter:"blur(8px)", borderRadius:8, padding:isMobile?"8px 12px":"10px 16px", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ display:"flex", gap:4 }}>{["#ff5f57","#ffbd2e","#28c840"].map(c=><div key={c} style={{ width:isMobile?8:10, height:isMobile?8:10, borderRadius:"50%", background:c, opacity:.7 }}/>)}</div>
            {!isMobile && <div style={{ flex:1, background:"rgba(255,255,255,.06)", borderRadius:4, padding:"4px 12px" }}><span className="mono" style={{ fontSize:10, letterSpacing:".1em", color:"rgba(255,255,255,.3)" }}>{p.demoUrl||`${p.slug}.vercel.app`}</span></div>}
          </div>
          <div style={{ position:"absolute", bottom:isMobile?16:24, right:isMobile?16:24, opacity:.12 }}><EthCross size={isMobile?48:80} color={p.accent}/></div>
          <div style={{ position:"absolute", bottom:isMobile?14:20, left:isMobile?14:20 }}><span className="mono" style={{ fontSize:9, color:"rgba(255,255,255,.25)" }}>Screenshot coming soon</span></div>
        </div>
        {/* case study */}
        {[{label:"The Problem",body:p.problem},{label:"My Thinking",body:p.thinking},{label:"What Was Built",body:p.built},{label:"What Didn't Work",body:p.failed}].map((sec,i)=>(
          <motion.div key={sec.label} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ delay:i*.06, duration:.6 }} style={{ marginBottom:isMobile?40:56 }}>
            <span className="mono" style={{ fontSize:10, letterSpacing:".18em", color:"var(--gold)", textTransform:"uppercase" }}>{sec.label}</span>
            <p style={{ fontSize:isMobile?15:16, lineHeight:1.85, color:"var(--muted)", marginTop:14, maxWidth:680 }}>{sec.body}</p>
          </motion.div>
        ))}
        {/* learned */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }} style={{ marginBottom:isMobile?48:64 }}>
          <span className="mono" style={{ fontSize:10, letterSpacing:".18em", color:"var(--gold)", textTransform:"uppercase" }}>What I Learned</span>
          <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:12 }}>
            {p.learned.map((item,i)=>(
              <div key={i} style={{ background:"var(--s2)", border:"1px solid var(--border)", borderLeft:"2px solid var(--gold)", borderRadius:"0 8px 8px 0", padding:isMobile?"14px 18px":"18px 24px" }}>
                <p style={{ fontSize:isMobile?14:15, lineHeight:1.75, color:"var(--muted)" }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{ height:1, background:"var(--border)", marginBottom:isMobile?32:48 }}/>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <button onClick={()=>router.push("/projects")} style={{ fontFamily:"var(--fm)", fontSize:10, letterSpacing:".14em", color:"var(--muted)", minHeight:44, display:"flex", alignItems:"center" }}>← ALL PROJECTS</button>
          <button onClick={()=>router.push(`/projects/${next.slug}`)} style={{ fontFamily:"var(--fm)", fontSize:10, letterSpacing:".14em", color:"var(--muted)", minHeight:44, display:"flex", alignItems:"center" }}>NEXT: {next.title.toUpperCase()} →</button>
        </div>
      </div>
    </motion.div>
  );
}
