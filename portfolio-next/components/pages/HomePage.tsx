"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import EthCross from "@/components/EthCross";
import ProjectCard from "@/components/ProjectCard";
import { TechGrid, Ticker } from "@/components/TechGrid";
import { PROJECTS, SERVICES_DATA } from "@/lib/data";
import { useIsMobile } from "@/lib/hooks";

export default function HomePage() {
  const router   = useRouter();
  const isMobile = useIsMobile();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx,{stiffness:30,damping:15});
  const smy = useSpring(my,{stiffness:30,damping:15});

  useEffect(() => {
    if (isMobile) return;
    const fn = (e: MouseEvent) => { mx.set((e.clientX/window.innerWidth-.5)*14); my.set((e.clientY/window.innerHeight-.5)*14); };
    window.addEventListener("mousemove",fn);
    return () => window.removeEventListener("mousemove",fn);
  },[mx,my,isMobile]);

  const name = "YIMESGEN".split("");
  const sp = isMobile ? "20px" : "40px";

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:isMobile?"0 20px 60px":"0 40px 80px", position:"relative", overflow:"hidden" }}>
        {!isMobile && <motion.div style={{ position:"absolute", top:"15%", left:"5%", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,175,119,.05) 0%,transparent 70%)", pointerEvents:"none", x:smx, y:smy }}/>}
        <motion.div style={{ position:"absolute", top:isMobile?"6%":"8%", right:isMobile?"-8%":"4%", x:isMobile?0:useTransform(smx,v=>-v*.6), y:isMobile?0:useTransform(smy,v=>-v*.6), pointerEvents:"none" }}>
          <EthCross size={isMobile?130:220} color="rgba(212,175,119,.07)"/>
        </motion.div>
        {!isMobile && (
          <motion.div style={{ position:"absolute", top:"55%", right:"26%", x:useTransform(smx,v=>v*.4), y:useTransform(smy,v=>v*.4), pointerEvents:"none" }} animate={{ rotate:360 }} transition={{ duration:35, repeat:Infinity, ease:"linear" }}>
            <EthCross size={72} color="rgba(212,175,119,.06)"/>
          </motion.div>
        )}
        <div style={{ position:"relative", zIndex:2 }}>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.2 }} style={{ marginBottom:isMobile?16:24 }}>
            <span className="mono" style={{ fontSize:isMobile?9:10, letterSpacing:".2em", color:"var(--gold)", textTransform:"uppercase" }}>Developer & Designer · Addis Ababa, Ethiopia</span>
          </motion.div>
          <h1 className="disp" style={{ fontSize:"clamp(42px,11vw,168px)", fontWeight:800, lineHeight:.9, letterSpacing:"-.035em", marginBottom:isMobile?24:40 }}>
            {name.map((c,i)=>(
              <motion.span key={i} initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.3+i*.04, duration:.65, ease:[.16,1,.3,1] }} style={{ display:"inline-block" }}>{c}</motion.span>
            ))}
            <br/>
            <motion.span initial={{ y:100, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.75, duration:.65, ease:[.16,1,.3,1] }} style={{ display:"inline-block", color:"var(--gold)" }}>AZENE</motion.span>
          </h1>
          <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"flex-end", justifyContent:"space-between", gap:isMobile?20:24 }}>
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1 }} style={{ maxWidth:440, color:"var(--muted)", fontSize:isMobile?15:17, lineHeight:1.75 }}>
              I&apos;m 19. I build websites, apps, and 3D interfaces. Started from YouTube tutorials — still learning, still shipping. Based in Ethiopia, working with anyone.
            </motion.p>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }} style={{ display:"flex", flexDirection:isMobile?"row":"column", alignItems:isMobile?"center":"flex-end", gap:isMobile?16:10 }}>
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:"var(--green)",boxShadow:"0 0 8px var(--green)" }} className="pulse"/>
                <span className="mono" style={{ fontSize:10, letterSpacing:".12em", color:"var(--green)", textTransform:"uppercase" }}>Open to work</span>
              </div>
              <button onClick={()=>router.push("/projects")} style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", color:"var(--muted)", borderBottom:"1px solid var(--border)", paddingBottom:2, minHeight:44 }}>SEE MY WORK</button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1.5, duration:.8, ease:[.16,1,.3,1] }}
          style={{ position:"absolute", bottom:0, left:isMobile?20:40, right:isMobile?20:40, height:1, background:"var(--border)", transformOrigin:"left" }}/>
      </section>

      <Ticker/>

      {/* ── FEATURED WORK ────────────────────────── */}
      <section style={{ padding:isMobile?"64px 20px":"100px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:isMobile?32:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Selected Work</motion.p>
            <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em" }}>Things I&apos;ve built</motion.h2>
          </div>
          <button onClick={()=>router.push("/projects")} style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", color:"var(--muted)", borderBottom:"1px solid var(--border)", paddingBottom:2, minHeight:44 }}>VIEW ALL</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(320px,1fr))", gap:isMobile?14:16, alignItems:"start" }}>
          {PROJECTS.slice(0,3).map((p,i)=><ProjectCard key={p.slug} p={p} featured={i===0}/>)}
        </div>
      </section>

      {/* ── ABOUT SNAP ───────────────────────────── */}
      <section style={{ padding:isMobile?"56px 20px":"80px 40px", background:"var(--s1)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?40:80, alignItems:"center", maxWidth:960, margin:"0 auto" }}>
          <div>
            <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>A bit about me</motion.p>
            <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:24 }}>19. Self-taught.<br/>Serious about the work.</motion.h2>
            <p style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:28, fontSize:isMobile?15:16 }}>I started building things on the internet at 15. Mostly copying tutorials, wondering why nothing looked like the original. Now I build things for real clients.</p>
            <button onClick={()=>router.push("/about")} style={{ background:"transparent", color:"var(--gold)", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, border:"1px solid var(--gold)", minHeight:44 }}>MY STORY</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {[{n:"Web Projects",v:"6+"},{n:"Mobile Apps",v:"2"},{n:"Design Systems",v:"3"},{n:"Years building",v:"4"}].map(row=>(
              <div key={row.n} style={{ display:"flex", justifyContent:"space-between", padding:"16px 0", borderBottom:"1px solid var(--border)" }}>
                <span style={{ color:"var(--muted)", fontSize:15 }}>{row.n}</span>
                <span className="disp" style={{ fontSize:22, fontWeight:700, color:"var(--gold)" }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────── */}
      <section style={{ padding:isMobile?"56px 20px":"100px 40px", borderTop:"1px solid var(--border)" }}>
        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", justifyContent:"space-between", alignItems:isMobile?"flex-start":"flex-end", marginBottom:isMobile?36:52, gap:16 }}>
          <div>
            <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Tech stack</motion.p>
            <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em" }}>Tools I work with</motion.h2>
          </div>
          {!isMobile && <p style={{ color:"var(--muted)", fontSize:14, maxWidth:280, lineHeight:1.7 }}>Hover any icon to see it light up. These are tools I reach for on real projects.</p>}
        </div>
        <TechGrid/>
      </section>

      {/* ── SERVICES SNAP ────────────────────────── */}
      <section style={{ padding:isMobile?"56px 20px":"100px 40px", borderTop:"1px solid var(--border)" }}>
        <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>What I do</motion.p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:isMobile?32:48, flexWrap:"wrap", gap:16 }}>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em" }}>Services</motion.h2>
          <button onClick={()=>router.push("/services")} style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", color:"var(--muted)", borderBottom:"1px solid var(--border)", paddingBottom:2, minHeight:44 }}>SEE PRICING</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(240px,1fr))", gap:isMobile?12:2 }}>
          {SERVICES_DATA.map((s,i)=>(
            <motion.div key={s.id} initial={{ opacity:0, y:24, scale:.97 }} whileInView={{ opacity:1, y:0, scale:1 }} viewport={{ once:true, margin:"-50px" }} transition={{ delay:isMobile?0:i*.07, duration:.6, ease:[.16,1,.3,1] }}
              whileHover={isMobile?{}:{ y:-3, boxShadow:"0 12px 40px -8px rgba(212,175,119,.1)" }}
              style={{ background:"var(--s2)", border:"1px solid var(--border)", borderRadius:10, padding:isMobile?"22px 20px":"28px 24px" }}>
              <span className="mono" style={{ fontSize:10, letterSpacing:".14em", color:"var(--gold)", textTransform:"uppercase" }}>{s.num}</span>
              <h3 className="disp" style={{ fontSize:isMobile?18:20, fontWeight:700, margin:"14px 0 8px", letterSpacing:"-.01em" }}>{s.title}</h3>
              <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.65 }}>{s.short}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{ padding:isMobile?"80px 20px":"120px 40px", borderTop:"1px solid var(--border)", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {!isMobile && <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", opacity:.04 }}><EthCross size={400} color="var(--gold)"/></div>}
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.7, ease:[.16,1,.3,1] }} style={{ position:"relative", zIndex:1 }}>
          <span className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase" }}>Let&apos;s talk</span>
          <h2 className="disp" style={{ fontSize:isMobile?"clamp(36px,10vw,88px)":"clamp(40px,7vw,88px)", fontWeight:800, letterSpacing:"-.04em", margin:"20px 0 24px", lineHeight:1 }}>Got something<br/>to build?</h2>
          <p style={{ color:"var(--muted)", fontSize:isMobile?15:17, maxWidth:400, margin:"0 auto 36px" }}>I&apos;m open to freelance projects, long-term collaborations, and interesting problems.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>router.push("/contact")} style={{ background:"var(--gold)", color:"#000", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, minHeight:44 }}>GET IN TOUCH</button>
            <button onClick={()=>router.push("/projects")} style={{ background:"transparent", color:"var(--gold)", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, border:"1px solid var(--gold)", minHeight:44 }}>SEE MY WORK</button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
