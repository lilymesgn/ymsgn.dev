"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EthCross from "./EthCross";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [holding,  setHolding]  = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>|null>(null);
  const start = useRef<number|null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setExiting(true); setTimeout(onDone, 700); }, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  const startHold = useCallback(() => {
    setHolding(true); start.current = Date.now();
    timer.current = setInterval(() => {
      const p = Math.min((Date.now() - (start.current ?? Date.now())) / 2200, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timer.current!);
        if (navigator.vibrate) navigator.vibrate([80,40,160]);
        setExiting(true); setTimeout(onDone, 700);
      }
    }, 16);
  }, [onDone]);

  const stopHold = useCallback(() => {
    setHolding(false);
    if (timer.current) clearInterval(timer.current);
    start.current = null; setProgress(0);
  }, []);

  const C = 2 * Math.PI * 58;
  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div key="pl" exit={{ opacity:0, scale:1.06 }} transition={{ duration:.7, ease:[.76,0,.24,1] }}
          onPointerDown={startHold} onPointerUp={stopHold} onPointerLeave={stopHold}
          style={{ position:"fixed", inset:0, zIndex:10000, background:"#040404", display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", userSelect:"none" }}>
          <div style={{ position:"relative", width:136, height:136 }}>
            <svg width={136} height={136} style={{ position:"absolute", inset:0, transform:"rotate(-90deg)" }}>
              <circle cx={68} cy={68} r={58} fill="none" stroke="rgba(212,175,119,.1)" strokeWidth={1}/>
              <circle cx={68} cy={68} r={58} fill="none" stroke="var(--gold)" strokeWidth={1.5}
                strokeDasharray={C} strokeDashoffset={C - progress * C} strokeLinecap="round"
                style={{ transition: progress===0 ? "stroke-dashoffset .5s ease" : "none" }}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <motion.div animate={{ rotate:360 }} transition={{ duration:18, repeat:Infinity, ease:"linear" }}>
                <EthCross size={84} color="#D4AF77"/>
              </motion.div>
            </div>
          </div>
          <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:.7 }}
            className="mono" style={{ marginTop:28, fontSize:11, letterSpacing:".2em", color:"rgba(237,232,223,.3)" }}>
            {holding ? `${Math.round(progress*100)}%` : "hold to open"}
          </motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
            className="mono" style={{ position:"absolute", bottom:28, fontSize:9, color:"rgba(255,255,255,.12)", letterSpacing:".14em" }}>
            YMSGN · ADDIS ABABA · 2025
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
