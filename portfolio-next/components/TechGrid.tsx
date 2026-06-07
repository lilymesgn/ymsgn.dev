"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TECH_ICONS, type TechIconData } from "@/lib/data";

function IconCell({ icon, size=40, ticker=false }: { icon:TechIconData; size?:number; ticker?:boolean }) {
  const [ok, setOk] = useState(true);
  const [hov, setHov] = useState(false);
  const hex = icon.color.replace("#","");
  const src = `https://cdn.simpleicons.org/${icon.slug}/${hex}`;
  const sc = useSpring(1,  { stiffness:320, damping:18 });
  const gl = useSpring(0,  { stiffness:280, damping:22 });
  const filter = useTransform(gl, v => v===0 ? "drop-shadow(0 0 0px transparent)" : `drop-shadow(0 0 ${8*v}px ${icon.color}bb) drop-shadow(0 0 ${20*v}px ${icon.color}55)`);

  if (ticker) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"0 26px", flexShrink:0 }}>
      {ok /* eslint-disable-next-line @next/next/no-img-element */
        ? <img src={src} alt={icon.name} width={28} height={28} style={{ width:28,height:28,objectFit:"contain" }} onError={()=>setOk(false)}/>
        : <span className="mono" style={{ fontSize:10, color:icon.color }}>{icon.name.slice(0,2).toUpperCase()}</span>}
      <span className="mono" style={{ fontSize:9, letterSpacing:".13em", color:"var(--muted)", textTransform:"uppercase", whiteSpace:"nowrap" }}>{icon.name}</span>
    </div>
  );

  return (
    <motion.div onMouseEnter={()=>{ sc.set(1.22); gl.set(1); setHov(true); }} onMouseLeave={()=>{ sc.set(1); gl.set(0); setHov(false); }}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
      <motion.div style={{ scale:sc, filter, background:hov?`${icon.color}12`:"var(--s2)", border:hov?`1px solid ${icon.color}30`:"1px solid var(--border)",
        borderRadius:14, padding:size*.35, display:"flex", alignItems:"center", justifyContent:"center", transition:"background .25s, border-color .25s" }}>
        {ok /* eslint-disable-next-line @next/next/no-img-element */
          ? <img src={src} alt={icon.name} width={size} height={size} style={{ width:size, height:size, objectFit:"contain" }} onError={()=>setOk(false)}/>
          : <span className="mono" style={{ fontSize:size*.28, color:icon.color, fontWeight:500 }}>{icon.name.slice(0,2).toUpperCase()}</span>}
      </motion.div>
      <motion.span className="mono" animate={{ color:hov?icon.color:"var(--muted)" }} transition={{ duration:.2 }}
        style={{ fontSize:9, letterSpacing:".14em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{icon.name}</motion.span>
    </motion.div>
  );
}

export function TechGrid() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:"28px 16px" }}>
      {TECH_ICONS.map((icon,i) => (
        <motion.div key={icon.name} initial={{ opacity:0, y:16, scale:.94 }} whileInView={{ opacity:1, y:0, scale:1 }}
          viewport={{ once:true, margin:"-40px" }} transition={{ delay:i*.035, duration:.5, ease:[.16,1,.3,1] }}
          style={{ display:"flex", justifyContent:"center" }}>
          <IconCell icon={icon} size={40}/>
        </motion.div>
      ))}
    </div>
  );
}

export function Ticker() {
  const row1 = TECH_ICONS.slice(0,10), row2 = TECH_ICONS.slice(10);
  const Row = ({ icons, dir }: { icons:TechIconData[]; dir:"left"|"right" }) => (
    <div style={{ overflow:"hidden", marginBottom:6 }}>
      <div className={dir==="left"?"tick-l":"tick-r"} style={{ display:"inline-flex", alignItems:"flex-end" }}>
        {[...icons,...icons,...icons].map((icon,i)=><IconCell key={`${icon.name}-${i}`} icon={icon} size={28} ticker/>)}
      </div>
    </div>
  );
  return (
    <div style={{ padding:"40px 0 44px", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", overflow:"hidden" }}>
      <Row icons={row1} dir="left"/><Row icons={row2} dir="right"/>
    </div>
  );
}
