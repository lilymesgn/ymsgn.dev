"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "@/lib/data";
import { useIsMobile } from "@/lib/hooks";

function FAQ({ q, a, last }: { q:string; a:string; last:boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:last?"none":"1px solid var(--border)" }}>
      <button onClick={()=>setOpen(x=>!x)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 0", textAlign:"left", gap:16, minHeight:44 }}>
        <span style={{ fontSize:16, fontWeight:500 }}>{q}</span>
        <span style={{ color:"var(--gold)", fontSize:18, flexShrink:0, transition:"transform .3s", display:"inline-block", transform:open?"rotate(45deg)":"none" }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.3 }} style={{ overflow:"hidden" }}>
            <p style={{ color:"var(--muted)", fontSize:15, lineHeight:1.75, paddingBottom:22 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Reveal({ children, delay=0, style={} }: { children:React.ReactNode; delay?:number; style?:React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }} transition={{ delay, duration:.6, ease:[.16,1,.3,1] }} style={style}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const router   = useRouter();
  const isMobile = useIsMobile();

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>
      <div style={{ padding:isMobile?"48px 20px 32px":"60px 40px 40px" }}>
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>What I offer</motion.p>
        <motion.h1 className="disp" initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em" }}>Services</motion.h1>
        <p style={{ color:"var(--muted)", maxWidth:520, marginTop:16, lineHeight:1.8, marginBottom:isMobile?40:64, fontSize:isMobile?15:16 }}>
          Freelance development and design. I take a small number of projects at a time so I can focus on each one. No templates. No copy-paste.
        </p>
      </div>

      {SERVICES_DATA.map((s,i)=>(
        <div key={s.id} style={{ borderTop:"1px solid var(--border)", background:i%2===1?"var(--s1)":"transparent" }}>
          <div style={{ maxWidth:1000, margin:"0 auto", padding:isMobile?"48px 20px":"80px 40px" }}>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1.4fr", gap:isMobile?32:80, alignItems:"start" }}>
              <Reveal>
                <span className="mono" style={{ fontSize:11, letterSpacing:".18em", color:"var(--gold)", textTransform:"uppercase" }}>{s.num}</span>
                <h2 className="disp" style={{ fontSize:isMobile?28:36, fontWeight:800, letterSpacing:"-.03em", margin:"16px 0", lineHeight:1.05 }}>{s.title}</h2>
                <div style={{ display:"flex", flexDirection:isMobile?"row":"column", gap:6, flexWrap:"wrap" }}>
                  <div style={{ padding:isMobile?"10px 16px":"14px 0", borderBottom:isMobile?"none":"1px solid var(--border)", border:isMobile?"1px solid var(--border)":"none", borderRadius:isMobile?8:0, flex:isMobile?"1 1 auto":"unset" }}>
                    <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase", display:"block", marginBottom:4 }}>Starting at</span>
                    <span className="disp" style={{ fontSize:isMobile?22:28, fontWeight:800, color:"var(--gold)" }}>{s.price.replace("Starting at ","")}</span>
                  </div>
                  <div style={{ padding:isMobile?"10px 16px":"14px 0", border:isMobile?"1px solid var(--border)":"none", borderRadius:isMobile?8:0, flex:isMobile?"1 1 auto":"unset" }}>
                    <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase", display:"block", marginBottom:4 }}>Timeline</span>
                    <span className="mono" style={{ fontSize:11, color:"var(--text)", letterSpacing:".06em" }}>{s.timeline}</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={isMobile?0:.1}>
                <p style={{ fontSize:isMobile?15:16, lineHeight:1.85, color:"var(--muted)", marginBottom:32 }}>{s.desc}</p>
                <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>What&apos;s included</span>
                <div style={{ marginTop:16, display:"flex", flexDirection:"column" }}>
                  {s.items.map((item,j)=>(
                    <div key={j} style={{ padding:"12px 0", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:4, height:4, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
                      <p style={{ fontSize:14, color:"var(--text)" }}>{item}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:28 }}>
                  <button onClick={()=>router.push("/contact")} style={{ background:"transparent", color:"var(--gold)", padding:"8px 16px", borderRadius:6, fontFamily:"var(--fm)", fontSize:10, letterSpacing:".12em", fontWeight:500, border:"1px solid var(--gold)", minHeight:40 }}>DISCUSS A PROJECT</button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      ))}

      {/* how I work */}
      <section style={{ padding:isMobile?"56px 20px":"100px 40px", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Process</motion.p>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:isMobile?32:56 }}>How I work</motion.h2>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(auto-fill,minmax(200px,1fr))", gap:isMobile?12:2 }}>
            {[{n:"01",t:"Brief",d:"You tell me what you're building and why. I ask questions until I understand the actual problem — not just the requirements."},
              {n:"02",t:"Scope",d:"I put together a specific list of what I'll deliver, the timeline, and the price. No vague estimates."},
              {n:"03",t:"Build",d:"I work in short checkpoints so you can see progress and course-correct early. No big reveals at the end."},
              {n:"04",t:"Ship",d:"I handle deployment, do a final check across devices, and hand over everything — code, assets, documentation."}
            ].map((step,i)=>(
              <motion.div key={step.n} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-50px" }} transition={{ delay:isMobile?0:i*.08, duration:.6 }}
                style={{ padding:isMobile?"18px 16px":"28px 24px", border:"1px solid var(--border)", borderRadius:10 }}>
                <span className="mono" style={{ fontSize:11, letterSpacing:".18em", color:"var(--gold)", textTransform:"uppercase" }}>{step.n}</span>
                <h3 className="disp" style={{ fontSize:isMobile?17:20, fontWeight:700, margin:"10px 0 8px" }}>{step.t}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.7 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section style={{ padding:isMobile?"48px 20px 72px":"60px 40px 100px", background:"var(--s1)", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>FAQ</motion.p>
          <motion.h2 className="disp" initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:isMobile?32:48 }}>Common questions</motion.h2>
          <FAQ q="Do you work with clients outside Ethiopia?" a="Yes. Most of my communication is async over email and Loom. I'm on East Africa Time but keep flexible hours for client calls." last={false}/>
          <FAQ q="Can you do just the design, no code?" a="Yes. I can deliver Figma files with components, documentation, and a handoff ready for your developers." last={false}/>
          <FAQ q="Do you take on long-term maintenance?" a="For some projects, yes. Depends on the scope. I'm upfront about it during the brief." last={false}/>
          <FAQ q="What if I'm not sure what I need?" a="Tell me what problem you're trying to solve and I'll help figure out the right approach. We can start with a short call." last={false}/>
          <FAQ q="Do you sign NDAs?" a="Yes." last={true}/>
          <div style={{ marginTop:40 }}>
            <button onClick={()=>router.push("/contact")} style={{ background:"var(--gold)", color:"#000", padding:"12px 28px", borderRadius:6, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, minHeight:44 }}>REACH OUT DIRECTLY</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
