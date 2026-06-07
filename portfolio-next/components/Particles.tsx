"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";

const ALL = Array.from({ length:50 }, (_,i) => ({
  id:i, x:Math.random()*100, y:Math.random()*100, s:Math.random()*1.8+.4,
  dur:8+Math.random()*14, del:-(Math.random()*12), op:.04+Math.random()*.12, gold:Math.random()>.75,
}));

export default function Particles() {
  const isMobile = useIsMobile();
  const reduced  = useReducedMotion();
  if (reduced) return null;
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }} aria-hidden="true">
      {ALL.slice(0, isMobile ? 18 : 50).map(p => (
        <motion.div key={p.id} style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`, width:p.s, height:p.s,
          borderRadius:"50%", background: p.gold?"var(--gold)":"var(--text)", opacity:p.op }}
          animate={{ y:[-8,8,-8], opacity:[p.op,p.op*.2,p.op] }}
          transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:"easeInOut" }}/>
      ))}
    </div>
  );
}
