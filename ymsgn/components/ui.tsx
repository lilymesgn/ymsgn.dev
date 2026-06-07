"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/* ────────────────────────────────────────────────────────
   HOOKS
──────────────────────────────────────────────────────── */

/** Always false on server → true only after mount if < 768px.
 *  Prevents hydration mismatch. */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return mobile;
}

/** Returns true after first client render — use to gate
 *  anything that would cause a hydration mismatch. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ────────────────────────────────────────────────────────
   ETHIOPIAN CROSS SVG
──────────────────────────────────────────────────────── */
export function EthCross({
  size = 80,
  color = "#D4AF77",
  spin = false,
  opacity = 1,
}: {
  size?: number;
  color?: string;
  spin?: boolean;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      opacity={opacity}
      className={spin ? "spin" : undefined}
      aria-hidden="true"
    >
      <line x1="50" y1="5" x2="50" y2="95" />
      <line x1="5" y1="50" x2="95" y2="50" />
      <line x1="17" y1="17" x2="83" y2="83" />
      <line x1="83" y1="17" x2="17" y2="83" />
      <polygon points="50,36 58,42 60,50 56,58 50,61 44,58 40,50 42,42" />
      <rect x="43" y="9"  width="14" height="11" rx="2" />
      <rect x="43" y="80" width="14" height="11" rx="2" />
      <rect x="9"  y="43" width="11" height="14" rx="2" />
      <rect x="80" y="43" width="11" height="14" rx="2" />
      <polygon points="23,17 27,13 31,17 27,21" />
      <polygon points="77,17 73,13 69,17 73,21" />
      <polygon points="23,83 27,79 31,83 27,87" />
      <polygon points="77,83 73,79 69,83 73,87" />
      <circle cx="50" cy="50" r="43" strokeDasharray="3 5" opacity=".18" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────
   SECTION LABEL + HEADING
──────────────────────────────────────────────────────── */
export function Label({
  children,
  color = "var(--gold)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <p
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: ".22em",
        color,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  style,
  as: Tag = "h2",
}: {
  children: ReactNode;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      style={{
        fontSize: "clamp(30px, 5vw, 56px)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.05,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────
   BUTTONS
──────────────────────────────────────────────────────── */
export function GoldBtn({
  children,
  onClick,
  href,
  outline = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  outline?: boolean;
}) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "inherit",
    fontVariantNumeric: "tabular-nums",
    fontSize: 11,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    padding: "12px 28px",
    borderRadius: 6,
    fontWeight: 600,
    minHeight: 44,
    cursor: "pointer",
    transition: "opacity .2s",
    background: outline ? "transparent" : "var(--gold)",
    color: outline ? "var(--gold)" : "#000",
    border: "1px solid var(--gold)",
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {children}
      </a>
    );
  }
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────
   NAV
──────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Work",     href: "/projects" },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export function Nav({ current }: { current: string }) {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close on route change (pathname changes on navigation)
  useEffect(() => { setOpen(false); }, [current]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const bg = scrolled || open;

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64,
          padding: isMobile ? "0 20px" : "0 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: bg ? "rgba(8,8,8,.92)" : "transparent",
          backdropFilter: bg ? "blur(14px)" : "none",
          borderBottom: bg ? "1px solid var(--border)" : "none",
          transition: "background .3s, border-color .3s",
        }}
      >
        {/* logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 44 }}>
          <EthCross size={22} color="#D4AF77" />
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--muted)" }}>
            YMSGN
          </span>
        </a>

        {/* desktop links */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 14,
                  color: current === l.href ? "var(--gold)" : "var(--muted)",
                  transition: "color .2s",
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              style={{
                background: "var(--gold)", color: "#000",
                padding: "10px 22px", borderRadius: 6,
                fontSize: 11, letterSpacing: ".12em", fontWeight: 600,
                textTransform: "uppercase", minHeight: 44,
                display: "inline-flex", alignItems: "center",
              }}
            >
              Hire me
            </a>
          </nav>
        )}

        {/* hamburger */}
        {isMobile && (
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((x) => !x)}
            style={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
              gap: 5, width: 44, height: 44, padding: 0,
            }}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
              style={{ display: "block", width: 22, height: 1.5, background: "var(--text)", transformOrigin: "center" }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              style={{ display: "block", width: 22, height: 1.5, background: "var(--text)" }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
              style={{ display: "block", width: 22, height: 1.5, background: "var(--text)", transformOrigin: "center" }}
            />
          </button>
        )}
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .22 }}
            style={{
              position: "fixed", inset: 0, zIndex: 190,
              background: "rgba(8,8,8,.97)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 4, paddingTop: 64,
            }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * .07 }}
                style={{
                  fontSize: 34, fontWeight: 700, letterSpacing: "-.02em",
                  color: current === l.href ? "var(--gold)" : "var(--text)",
                  padding: "12px 0", minHeight: 60,
                  width: "100%", textAlign: "center", display: "block",
                }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .28 }}
              style={{
                marginTop: 24, background: "var(--gold)", color: "#000",
                padding: "14px 44px", borderRadius: 8,
                fontSize: 12, letterSpacing: ".14em", fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              HIRE ME
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────────────── */
export function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: isMobile ? "28px 20px" : "32px 40px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <EthCross size={16} color="rgba(212,175,119,.35)" />
        <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>
          Yimesgen Azene · 2025
        </span>
      </div>
      {!isMobile && (
        <nav style={{ display: "flex", gap: 28 }}>
          {[...NAV_LINKS, { label: "Contact", href: "/contact" }].filter(
            (l, i, a) => a.findIndex((x) => x.href === l.href) === i
          ).map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: 11, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: ".1em" }}>{l.label}</a>
          ))}
        </nav>
      )}
      <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.12)" }}>
        Built with Next.js · Addis Ababa
      </span>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────
   PARTICLES
   Rendered only after mount (useMounted) to prevent
   hydration mismatch from Math.random().
──────────────────────────────────────────────────────── */

// Pre-computed — same values on every render, no hydration mismatch
const DOTS = [
  {x:8,y:12,s:1.2,dur:9,del:-2,op:.08,g:false},{x:23,y:67,s:.7,dur:13,del:-5,op:.05,g:true},
  {x:41,y:34,s:1.5,dur:11,del:-8,op:.07,g:false},{x:67,y:8,s:.9,dur:14,del:-1,op:.06,g:true},
  {x:82,y:45,s:1.1,dur:10,del:-4,op:.09,g:false},{x:55,y:88,s:.6,dur:15,del:-7,op:.05,g:false},
  {x:12,y:78,s:1.3,dur:8,del:-3,op:.07,g:true},{x:94,y:23,s:.8,dur:12,del:-6,op:.06,g:false},
  {x:33,y:55,s:1.0,dur:11,del:-9,op:.08,g:false},{x:72,y:72,s:.7,dur:13,del:-2,op:.05,g:true},
  {x:18,y:91,s:1.4,dur:9,del:-5,op:.07,g:false},{x:46,y:19,s:.9,dur:14,del:-8,op:.06,g:true},
  {x:88,y:62,s:1.2,dur:10,del:-3,op:.08,g:false},{x:60,y:40,s:.6,dur:15,del:-6,op:.05,g:false},
  {x:27,y:30,s:1.1,dur:12,del:-1,op:.07,g:true},{x:76,y:85,s:.8,dur:11,del:-4,op:.06,g:false},
  {x:5,y:50,s:1.3,dur:9,del:-7,op:.08,g:false},{x:50,y:5,s:.7,dur:13,del:-2,op:.05,g:true},
  {x:38,y:75,s:1.0,dur:10,del:-5,op:.07,g:false},{x:91,y:38,s:.9,dur:14,del:-8,op:.06,g:false},
  {x:15,y:15,s:1.2,dur:11,del:-3,op:.08,g:true},{x:63,y:60,s:.6,dur:15,del:-6,op:.05,g:false},
  {x:45,y:92,s:1.4,dur:9,del:-9,op:.07,g:false},{x:80,y:18,s:.8,dur:12,del:-2,op:.06,g:true},
];

export function Particles() {
  const mounted   = useMounted();
  const isMobile  = useIsMobile();
  if (!mounted) return null;   // no SSR — prevents hydration mismatch
  const dots = isMobile ? DOTS.slice(0, 10) : DOTS;
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}
    >
      {dots.map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${d.x}%`, top: `${d.y}%`,
            width: d.s, height: d.s,
            borderRadius: "50%",
            background: d.g ? "var(--gold)" : "var(--text)",
            opacity: d.op,
          }}
          animate={{ y: [-6, 6, -6], opacity: [d.op, d.op * .25, d.op] }}
          transition={{ duration: d.dur, delay: d.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   TECH TICKER (two infinite-scroll rows with Simple Icons)
──────────────────────────────────────────────────────── */
function IconChip({ name, slug, color }: { name: string; slug: string; color: string }) {
  const [ok, setOk] = useState(true);
  const [hov, setHov] = useState(false);
  const hex = color.replace("#", "");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        padding: "0 24px", flexShrink: 0, cursor: "default",
      }}
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}/${hex}`}
          alt={name}
          width={28} height={28}
          style={{
            width: 28, height: 28, objectFit: "contain",
            filter: hov ? `drop-shadow(0 0 8px ${color}99)` : "none",
            transition: "filter .2s",
          }}
          onError={() => setOk(false)}
        />
      ) : (
        <span className="mono" style={{ fontSize: 9, color }}>{name.slice(0,2).toUpperCase()}</span>
      )}
      <span className="mono" style={{ fontSize: 9, letterSpacing: ".14em", color: hov ? color : "var(--muted)", textTransform: "uppercase", whiteSpace: "nowrap", transition: "color .2s" }}>
        {name}
      </span>
    </div>
  );
}

export function TechTicker({ items }: { items: { name: string; slug: string; color: string }[] }) {
  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));
  const triple = (arr: typeof items) => [...arr, ...arr, ...arr];

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "36px 0", overflow: "hidden" }}>
      <div style={{ overflow: "hidden", marginBottom: 8 }}>
        <div className="tick-l" style={{ alignItems: "flex-end" }}>
          {triple(row1).map((t, i) => <IconChip key={i} {...t} />)}
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="tick-r" style={{ alignItems: "flex-end" }}>
          {triple(row2).map((t, i) => <IconChip key={i} {...t} />)}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   PROJECT CARD (with 3D tilt — disabled on mobile)
──────────────────────────────────────────────────────── */
export function ProjectCard({
  slug, title, tagline, year, tags, accent, grad, tech, live,
}: {
  slug: string; title: string; tagline: string; year: string;
  tags: string[]; accent: string; grad: string; tech: string[]; live: boolean;
}) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rx.set(((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -5);
    ry.set(((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.a
      ref={ref}
      href={`/projects/${slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: .55, ease: [.16, 1, .3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "block",
        rotateX: isMobile ? 0 : srx,
        rotateY: isMobile ? 0 : sry,
        transformStyle: isMobile ? "flat" : "preserve-3d",
        background: "var(--s2)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
      }}
      whileHover={isMobile ? {} : { boxShadow: `0 20px 60px -12px ${accent}33` }}
    >
      {/* cover */}
      <div style={{ height: 200, background: grad, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 35% 45%, ${accent}25 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", bottom: 16, right: 16, opacity: .1 }}>
          <EthCross size={52} color={accent} />
        </div>
        {live && (
          <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }} className="pulse" />
            <span className="mono" style={{ fontSize: 9, color: "var(--green)", textTransform: "uppercase" }}>Live</span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "3px 10px" }}>
          <span className="mono" style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase" }}>{tags.join(" · ")}</span>
        </div>
      </div>
      {/* body */}
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-.02em" }}>{title}</h3>
          <span className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{year}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tech.slice(0, 4).map((t) => (
            <span key={t} className="mono" style={{ fontSize: 9, color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 8px", textTransform: "uppercase" }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ────────────────────────────────────────────────────────
   LIVE CLOCK (EAT)
──────────────────────────────────────────────────────── */
export function LiveClock() {
  const mounted = useMounted();
  const [state, setState] = useState({ str: "--:--:--", online: false });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // Convert to EAT (UTC+3)
      const eat = new Date(now.getTime() + (3 * 3600 + now.getTimezoneOffset() * 60) * 1000);
      const h = eat.getHours();
      const m = String(eat.getMinutes()).padStart(2, "0");
      const s = String(eat.getSeconds()).padStart(2, "0");
      setState({ str: `${String(h).padStart(2, "0")}:${m}:${s}`, online: h >= 9 && h < 22 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div>
        <p className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>East Africa Time (UTC+3)</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div
          style={{ width: 7, height: 7, borderRadius: "50%", background: state.online ? "var(--green)" : "#444", boxShadow: state.online ? "0 0 8px var(--green)" : "none" }}
          className={state.online ? "pulse" : undefined}
        />
        <span className="mono" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: state.online ? "var(--green)" : "var(--muted)" }}>
          {state.online ? "Online now" : "Back tomorrow"}
        </span>
      </div>
      <p className="mono" style={{ fontSize: 26, color: "var(--text)", letterSpacing: ".05em" }}>
        {state.str} <span style={{ fontSize: 12, color: "var(--muted)" }}>EAT</span>
      </p>
      <p className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 6 }}>
        UTC+3 · Reachable 9 am – 10 pm
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   PRELOADER
──────────────────────────────────────────────────────── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [holding,  setHolding]  = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number | null>(null);

  // auto-exit after 3.5 s
  useEffect(() => {
    const t = setTimeout(() => { setExiting(true); setTimeout(onDone, 650); }, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  const startHold = useCallback(() => {
    setHolding(true);
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const p = Math.min((Date.now() - (startRef.current ?? Date.now())) / 2000, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timerRef.current!);
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([60, 40, 120]);
        setExiting(true);
        setTimeout(onDone, 650);
      }
    }, 16);
  }, [onDone]);

  const stopHold = useCallback(() => {
    setHolding(false);
    if (timerRef.current) clearInterval(timerRef.current);
    startRef.current = null;
    setProgress(0);
  }, []);

  const C = 2 * Math.PI * 58;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="pl"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: .65, ease: [.76, 0, .24, 1] }}
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#040404",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", userSelect: "none",
          }}
        >
          <div style={{ position: "relative", width: 136, height: 136 }}>
            <svg width={136} height={136} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
              <circle cx={68} cy={68} r={58} fill="none" stroke="rgba(212,175,119,.1)" strokeWidth={1} />
              <circle
                cx={68} cy={68} r={58} fill="none"
                stroke="var(--gold)" strokeWidth={1.5}
                strokeDasharray={C}
                strokeDashoffset={C - progress * C}
                strokeLinecap="round"
                style={{ transition: progress === 0 ? "stroke-dashoffset .4s ease" : "none" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                <EthCross size={82} color="#D4AF77" />
              </motion.div>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .7 }}
            className="mono"
            style={{ marginTop: 28, fontSize: 11, letterSpacing: ".2em", color: "rgba(237,232,223,.3)" }}
          >
            {holding ? `${Math.round(progress * 100)}%` : "hold to open"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mono"
            style={{ position: "absolute", bottom: 28, fontSize: 9, color: "rgba(255,255,255,.12)", letterSpacing: ".14em" }}
          >
            YMSGN · ADDIS ABABA · 2025
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────────────
   PAGE SHELL (preloader + nav + footer wrapper)
──────────────────────────────────────────────────────── */
export function Shell({
  children,
  current,
}: {
  children: ReactNode;
  current: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Skip preloader if already seen this session
    try {
      if (sessionStorage.getItem("pl")) setReady(true);
    } catch {
      setReady(true); // sessionStorage unavailable → skip preloader
    }
  }, []);

  const done = useCallback(() => {
    setReady(true);
    try { sessionStorage.setItem("pl", "1"); } catch { /* ignore */ }
  }, []);

  return (
    <>
      <AnimatePresence>{!ready && <Preloader key="pl" onDone={done} />}</AnimatePresence>
      {ready && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5, ease: [.16, 1, .3, 1] }}
        >
          <Particles />
          <Nav current={current} />
          <main style={{ paddingTop: 64 }}>{children}</main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
