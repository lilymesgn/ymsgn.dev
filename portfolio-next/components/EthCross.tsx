"use client";
export default function EthCross({ size=80, color="#D4AF77", spin=false, opacity=1 }: { size?:number; color?:string; spin?:boolean; opacity?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.4" opacity={opacity} className={spin ? "spin" : undefined} aria-hidden="true">
      <line x1="50" y1="6" x2="50" y2="94"/><line x1="6" y1="50" x2="94" y2="50"/>
      <line x1="18" y1="18" x2="82" y2="82"/><line x1="82" y1="18" x2="18" y2="82"/>
      <polygon points="50,37 58,41 61,49 57,57 50,60 43,57 39,49 42,41"/>
      <rect x="44" y="10" width="12" height="10" rx="2"/><rect x="44" y="80" width="12" height="10" rx="2"/>
      <rect x="10" y="44" width="10" height="12" rx="2"/><rect x="80" y="44" width="10" height="12" rx="2"/>
      <polygon points="24,18 27,14 30,18 27,22"/><polygon points="76,18 73,14 70,18 73,22"/>
      <polygon points="24,82 27,78 30,82 27,86"/><polygon points="76,82 73,78 70,82 73,86"/>
      <circle cx="50" cy="50" r="42" strokeDasharray="3 4" opacity=".2"/>
    </svg>
  );
}
