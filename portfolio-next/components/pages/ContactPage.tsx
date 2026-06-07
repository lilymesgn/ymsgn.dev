"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

function LiveClock() {
  const [t, setT] = useState({ str:"--:--:--", online:false });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const eat = new Date(now.getTime() + 3*3_600_000 + now.getTimezoneOffset()*60_000);
      const h = eat.getHours(), m = eat.getMinutes(), s = eat.getSeconds();
      setT({ str:`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`, online:h>=9&&h<22 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:t.online?"var(--green)":"#444", boxShadow:t.online?"0 0 8px var(--green)":"none" }} className={t.online?"pulse":undefined}/>
        <span className="mono" style={{ fontSize:10, letterSpacing:".18em", textTransform:"uppercase", color:t.online?"var(--green)":"var(--muted)" }}>{t.online?"Online now":"Back tomorrow morning"}</span>
      </div>
      <p className="mono" style={{ fontSize:28, letterSpacing:".06em", color:"var(--text)" }}>{t.str} <span style={{ fontSize:12, color:"var(--muted)" }}>EAT</span></p>
      <p className="mono" style={{ fontSize:10, color:"var(--muted)", marginTop:6 }}>East Africa Time · UTC+3 · Reachable 9am–10pm</p>
    </div>
  );
}

export default function ContactPage() {
  const isMobile = useIsMobile();
  const [form,   setForm]   = useState({ name:"", email:"", service:"", message:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please write at least 20 characters";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setStatus("sending");
    // TODO: replace with real Resend/Formspree call
    // await fetch("/api/contact", { method:"POST", body:JSON.stringify(form) });
    await new Promise(r=>setTimeout(r,1400));
    setStatus("sent");
  };

  const Field = ({ k, label, multiline=false }: { k:keyof typeof form; label:string; multiline?:boolean }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label className="mono" style={{ fontSize:9, letterSpacing:".18em", color:errors[k]?"var(--terra)":"var(--muted)", textTransform:"uppercase" }}>{errors[k]||label}</label>
      {multiline
        ? <textarea rows={5} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{ background:"var(--s2)", border:`1px solid ${errors[k]?"var(--terra)":"var(--border)"}`, borderRadius:8, padding:"14px 16px", fontSize:15, resize:"vertical", color:"var(--text)", fontFamily:"var(--fb)", outline:"none" }}/>
        : <input type={k==="email"?"email":"text"} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{ background:"var(--s2)", border:`1px solid ${errors[k]?"var(--terra)":"var(--border)"}`, borderRadius:8, padding:"14px 16px", fontSize:15, color:"var(--text)", fontFamily:"var(--fb)", outline:"none" }}/>
      }
    </div>
  );

  const socials = [
    {label:"GitHub",   url:"https://github.com"},
    {label:"Instagram",url:"#"},
    {label:"Twitter / X",url:"#"},
    {label:"Telegram", url:"#"},
    {label:"LinkedIn", url:"#"},
  ];

  return (
    <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:.5, ease:[.16,1,.3,1] }} style={{ minHeight:"100vh", paddingTop:72 }}>
      <div style={{ maxWidth:1040, margin:"0 auto", padding:isMobile?"48px 20px 72px":"60px 40px 100px" }}>
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="mono" style={{ fontSize:10, letterSpacing:".22em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>Let&apos;s work together</motion.p>
        <motion.h1 className="disp" initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65, ease:[.16,1,.3,1] }} style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:16 }}>Get in touch</motion.h1>
        <p style={{ color:"var(--muted)", maxWidth:440, marginBottom:isMobile?48:72, lineHeight:1.75, fontSize:isMobile?15:16 }}>I&apos;m open to freelance work, collaborations, and interesting problems. Fill out the form or email me directly.</p>

        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1.4fr", gap:isMobile?48:80, alignItems:"start" }}>
          {/* info */}
          <div>
            <LiveClock/>
            <div style={{ height:1, background:"var(--border)", margin:"28px 0" }}/>
            <div style={{ marginBottom:32 }}>
              <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>Email</span>
              <p style={{ marginTop:8 }}><a href="mailto:hello@yimesgen.studio" style={{ color:"var(--gold)", fontFamily:"var(--fm)", fontSize:13, letterSpacing:".06em" }}>hello@yimesgen.studio</a></p>
            </div>
            <div style={{ marginBottom:32 }}>
              <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>Based in</span>
              <p className="mono" style={{ fontSize:12, color:"var(--text)", marginTop:8, letterSpacing:".06em", lineHeight:1.8 }}>Addis Ababa, Ethiopia<br/><span style={{ color:"var(--muted)" }}>Remote-friendly worldwide</span></p>
            </div>
            <div>
              <span className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>Elsewhere</span>
              <div style={{ marginTop:14, display:"flex", flexDirection:isMobile?"row":"column", flexWrap:isMobile?"wrap":"nowrap", gap:isMobile?"10px 24px":10 }}>
                {socials.map(s=>(
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"var(--fm)", fontSize:11, letterSpacing:".1em", color:"var(--muted)", transition:"color .2s", minHeight:44, display:"flex", alignItems:"center" }}
                    onMouseEnter={e=>(e.currentTarget.style.color="#D4AF77")}
                    onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* form */}
          {status==="sent" ? (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              style={{ background:"var(--s2)", border:"1px solid rgba(74,155,111,.2)", borderRadius:12, padding:isMobile?"36px 24px":"48px 40px", textAlign:"center" }}>
              <div style={{ width:40,height:40,borderRadius:"50%",background:"rgba(74,155,111,.15)",border:"1px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
                <span style={{ color:"var(--green)", fontSize:18 }}>✓</span>
              </div>
              <span className="mono" style={{ fontSize:11, letterSpacing:".18em", color:"var(--green)", textTransform:"uppercase" }}>Message sent</span>
              <p style={{ color:"var(--muted)", fontSize:15, marginTop:12 }}>I&apos;ll get back to you within a day or two.</p>
            </motion.div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16 }}>
                <Field k="name"  label="Name"/>
                <Field k="email" label="Email"/>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"var(--muted)", textTransform:"uppercase" }}>What do you need</label>
                <select value={form.service} onChange={e=>setForm(f=>({...f,service:e.target.value}))}
                  style={{ background:"var(--s2)", border:"1px solid var(--border)", borderRadius:8, padding:"14px 16px", fontSize:15, color:form.service?"var(--text)":"var(--muted)", fontFamily:"var(--fb)", cursor:"pointer", appearance:"none", minHeight:48, outline:"none" }}>
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="app">App Development</option>
                  <option value="3d">3D &amp; Motion</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <Field k="message" label="Message (min. 20 characters)" multiline/>
              <div style={{ display:"flex", flexDirection:isMobile?"column":"row", justifyContent:"space-between", alignItems:isMobile?"stretch":"center", gap:12 }}>
                <p className="mono" style={{ fontSize:9, color:"var(--muted)", letterSpacing:".1em" }}>SENT VIA RESEND · ENCRYPTED IN TRANSIT</p>
                <button onClick={submit} disabled={status==="sending"}
                  style={{ background:"var(--gold)", color:"#000", padding:"16px 32px", borderRadius:8, fontFamily:"var(--fm)", fontSize:11, letterSpacing:".12em", fontWeight:500, opacity:status==="sending"?.7:1, transition:"opacity .2s", minHeight:52 }}>
                  {status==="sending"?"SENDING...":"SEND MESSAGE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
