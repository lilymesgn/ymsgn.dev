"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EthCross from "./EthCross";

export function SeeMe({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      animate={{ color: hov?"#D4AF77":"#555" }} transition={{ duration:.18 }}
      style={{ display:"inline", fontFamily:"inherit", fontSize:"inherit", lineHeight:"inherit",
        fontStyle:"italic", fontWeight:400, background:"none", border:"none", padding:0,
        cursor:"pointer", verticalAlign:"baseline", textDecoration:"underline",
        textDecorationStyle:"dotted", textDecorationColor:hov?"rgba(212,175,119,.5)":"rgba(255,255,255,.15)",
        textUnderlineOffset:"4px", transition:"text-decoration-color .18s" }}>
      see me
    </motion.button>
  );
}

export function PhotoLightbox({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [err,    setErr]    = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", fn);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.22 }}
      onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:6000, background:"rgba(4,4,4,.82)",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:24, cursor:"zoom-out" }}>
      <motion.div initial={{ scale:.86, opacity:0, y:16 }} animate={{ scale:1, opacity:1, y:0 }}
        exit={{ scale:.92, opacity:0, y:-10 }} transition={{ duration:.4, ease:[.16,1,.3,1] }}
        onClick={e=>e.stopPropagation()}
        style={{ position:"relative", width:"min(440px,88vw)", borderRadius:18, overflow:"hidden",
          boxShadow:"0 48px 120px rgba(0,0,0,.85), 0 0 0 1px rgba(212,175,119,.14)", cursor:"default", background:"#0c0c0c" }}>
        {!err && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/ymsgn.jpg" alt="Yimesgen Azene"
            onLoad={()=>setLoaded(true)} onError={()=>setErr(true)}
            style={{ width:"100%", display:"block", aspectRatio:"4/5", objectFit:"cover", opacity:loaded?1:0, transition:"opacity .3s" }}/>
        )}
        {(!loaded || err) && (
          <div style={{ width:"100%", aspectRatio:"4/5", background:"linear-gradient(160deg,#181818 0%,#0c0c0c 100%)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20,
            position:loaded?"absolute":"static", inset:0 }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:22, repeat:Infinity, ease:"linear" }} style={{ opacity:.22 }}>
              <EthCross size={90} color="#D4AF77"/>
            </motion.div>
            <p className="mono" style={{ fontSize:10, letterSpacing:".18em", color:"rgba(237,232,223,.25)", textTransform:"uppercase", textAlign:"center", padding:"0 24px" }}>
              Add your photo to<br/><span style={{ color:"rgba(212,175,119,.4)" }}>/public/images/ymsgn.jpg</span>
            </p>
          </div>
        )}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"40px 22px 18px",
          background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 100%)", pointerEvents:"none" }}>
          <p className="mono" style={{ fontSize:9, letterSpacing:".18em", color:"rgba(237,232,223,.45)" }}>YIMESGEN AZENE · ADDIS ABABA · 2025</p>
        </div>
        <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:.93 }} onClick={onClose}
          style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%",
            background:"rgba(0,0,0,.55)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.1)",
            color:"rgba(237,232,223,.6)", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", lineHeight:1 }}>×</motion.button>
      </motion.div>
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5 }} className="mono"
        style={{ position:"absolute", bottom:24, fontSize:9, letterSpacing:".16em", color:"rgba(255,255,255,.2)", pointerEvents:"none" }}>
        CLICK OUTSIDE OR ESC TO CLOSE
      </motion.p>
    </motion.div>
  );
}
