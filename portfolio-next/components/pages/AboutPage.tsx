"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EthCross from "@/components/EthCross";
import { TechGrid, Ticker } from "@/components/TechGrid";
import { SeeMe, PhotoLightbox } from "@/components/PhotoLightbox";
import { TIMELINE, VALUES, CURRENTLY_LEARNING } from "@/lib/data";
import { useIsMobile } from "@/lib/hooks";

function Reveal({ children, delay=0, style={} }: { children:React.ReactNode; delay?:number; style?:React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-70px" }} transition={{ delay, duration:.65, ease:[.16,1,.3,1] }} style={style}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const router     = useRouter();
  const isMobile   = useIsMobile();
  const [showPhoto, setShowPhoto] = useState(false);
  const openPhoto  = useCallback(() => setShowPhoto(true),  []);
  const closePhoto = useCallback(() => setShowPhoto(false), []);

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>

      {/* ── OPENING ───────────────────────────── */}
      <section style={{ minHeight:isMobile?"70vh":"85vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:isMobile?"0 20px 56px":"0 40px 80px", position:"relative", overflow:"hidden" }}>
        {!isMobile && <div style={{ position:"absolute", top:"10%", right:"6%", opacity:.05 }}><EthCross size={260} color="var(--gold)" spin/></div>}
        <Reveal><span className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase" }}>About</span></Reveal>
        <motion.h1 className="disp" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:.15, duration:.75, ease:[.16,1,.3,1] }}
          style={{ fontSize:"clamp(36px,8vw,130px)", fontWeight:800, letterSpacing:"-.04em", lineHeight:.95, margin:"16px 0 24px" }}>
          I build things.<br/>I&apos;m 19.<br/><span style={{ color:"var(--gold)" }}>I&apos;m from Ethiopia.</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5, duration:.6 }} style={{ color:"var(--muted)", maxWidth:480, fontSize:isMobile?15:17, lineHeight:1.8 }}>
          Self-taught developer and designer based in Addis Ababa. Serious about the work. Open to the world.
        </motion.p>
        <div style={{ position:"absolute", bottom:0, left:isMobile?20:40, right:isMobile?20:40, height:1, background:"var(--border)" }}/>
      </section>

      {/* ── STORY ─────────────────────────────── */}
      <section style={{ padding:isMobile?"56px 20px":"100px 40px", maxWidth:760, margin:"0 auto" }}>
        <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>The story</motion.p>
        <Reveal style={{ marginBottom:28 }}>
          <p style={{ fontSize:isMobile?16:17, lineHeight:1.85, color:"var(--text)" }}>
            I&apos;m Yimesgen —{" "}<SeeMe onClick={openPhoto}/>{" "}— and I started with YouTube tutorials at 15. Built my first HTML page by copying exactly what the video showed. When I changed something and it broke, I had no idea why. That confusion lasted about a year.
          </p>
        </Reveal>
        {[
          "JavaScript clicked differently than HTML. It had logic in it — you could reason about what it was doing. I spent a long time building small things that almost worked. Closures confused me until the fifth time someone explained them.",
          "I got serious about design around 2022. I noticed that most developer side projects look developer-built — technically fine but visually careless. I didn't want that. I started learning Figma, studying typography, paying attention to spacing.",
          "My first client was a family friend who needed a simple business site. It went fine. My second client was Go Fresh Meals — a real restaurant that needed a real ordering system. That project taught me more than six months of tutorial-watching.",
          "I'm still learning. Three.js is what I'm in the middle of right now — specifically custom geometry and shaders. I read about system design for the first time a few months ago and it's changing how I think about everything I've built before.",
        ].map((para,i)=>(
          <Reveal key={i} delay={(i+1)*.07} style={{ marginBottom:28 }}>
            <p style={{ fontSize:isMobile?15:17, lineHeight:1.85, color:"var(--muted)" }}>{para}</p>
          </Reveal>
        ))}
      </section>

      {/* ── TIMELINE ──────────────────────────── */}
      <section style={{ padding:isMobile?"48px 20px":"80px 40px", background:"var(--s1)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Timeline</motion.p>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:isMobile?36:56 }}>How I got here</motion.h2>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:isMobile?36:52, top:0, bottom:0, width:1, background:"var(--border)" }}/>
            {TIMELINE.map((t,i)=>(
              <Reveal key={t.year} delay={i*.06}>
                <div style={{ display:"flex", gap:isMobile?16:28, marginBottom:isMobile?28:40, position:"relative" }}>
                  <div style={{ minWidth:isMobile?32:44, fontFamily:"var(--fm)", fontSize:isMobile?10:11, letterSpacing:".08em", color:"var(--gold)", paddingTop:3, textAlign:"right", flexShrink:0 }}>{t.year}</div>
                  <div style={{ position:"relative", zIndex:1, width:9, height:9, borderRadius:"50%", marginTop:6, background:i===TIMELINE.length-1?"var(--gold)":"var(--dim)", border:i===TIMELINE.length-1?"none":"1px solid var(--border)", flexShrink:0 }}/>
                  <p style={{ fontSize:isMobile?14:15, lineHeight:1.75, color:"var(--muted)", paddingTop:1 }}>{t.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────── */}
      <section style={{ padding:isMobile?"56px 20px":"100px 40px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>What I care about</motion.p>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:isMobile?32:56 }}>Values</motion.h2>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?12:20 }}>
            {VALUES.map((v,i)=>(
              <Reveal key={v.title} delay={isMobile?0:i*.07}>
                <div style={{ background:"var(--s2)", border:"1px solid var(--border)", borderRadius:10, padding:isMobile?"22px 20px":"28px 26px" }}>
                  <h3 className="disp" style={{ fontSize:18, fontWeight:700, marginBottom:10, letterSpacing:"-.01em" }}>{v.title}</h3>
                  <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.75 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ─────────────────────────────── */}
      <section style={{ padding:isMobile?"48px 20px":"80px 40px", background:"var(--s1)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Daily tools</motion.p>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:isMobile?32:48 }}>What I use</motion.h2>
          <TechGrid/>
        </div>
      </section>

      {/* ── CURRENTLY LEARNING ────────────────── */}
      <section style={{ padding:isMobile?"48px 20px":"80px 40px" }}>
        <div style={{ maxWidth:620, margin:"0 auto" }}>
          <Reveal>
            <div style={{ borderLeft:"2px solid var(--gold)", padding:"28px 32px", background:"var(--s2)", borderRadius:"0 10px 10px 0" }}>
              <span className="mono" style={{ fontSize:9, letterSpacing:".2em", color:"var(--gold)", textTransform:"uppercase" }}>Currently Learning</span>
              <div style={{ marginTop:18, display:"flex", flexDirection:"column", gap:14 }}>
                {CURRENTLY_LEARNING.map((item,i)=>(
                  <p key={i} style={{ color:"var(--muted)", fontSize:15, lineHeight:1.7 }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Ticker/>

      {/* ── CLOSING CTA ───────────────────────── */}
      <section style={{ minHeight:"50vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 40px", textAlign:"center" }}>
        <Reveal>
          <h2 className="disp" style={{ fontSize:"clamp(44px,8vw,100px)", fontWeight:800, letterSpacing:"-.04em", marginBottom:20, lineHeight:1 }}>Got something<br/>to build?</h2>
          <p className="mono" style={{ fontSize:13, color:"var(--gold)", letterSpacing:".08em" }}>hello@yimesgen.studio</p>
          <br/>
          <button onClick={()=>router.push("/contact")} style={{ background:"var(--gold)", color:"#000", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, marginTop:8, minHeight:44 }}>GET IN TOUCH</button>
        </Reveal>
      </section>

      <AnimatePresence>
        {showPhoto && <PhotoLightbox key="photo" onClose={closePhoto}/>}
      </AnimatePresence>
    </motion.div>
  );
}
