"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, EthCross, Label, Heading, TechTicker, useIsMobile, useMounted } from "./ui";
import { TIMELINE, TECH } from "@/lib/data";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: .6, ease: [.16, 1, .3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PhotoLightbox({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [err,    setErr]    = useState(false);

  // Escape key
  useState(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 5000,
        background: "rgba(4,4,4,.85)", backdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, cursor: "zoom-out",
      }}
    >
      <motion.div
        initial={{ scale: .88, opacity: 0, y: 14 }}
        animate={{ scale: 1,   opacity: 1, y: 0  }}
        exit={{   scale: .93,  opacity: 0         }}
        transition={{ duration: .38, ease: [.16, 1, .3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "min(420px, 88vw)",
          borderRadius: 16, overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,.8), 0 0 0 1px rgba(212,175,119,.12)",
          background: "#0c0c0c", cursor: "default",
        }}
      >
        {/* real photo — place at /public/images/ymsgn.jpg */}
        {!err && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/ymsgn.jpg"
            alt="Yimesgen Azene"
            onLoad={() => setLoaded(true)}
            onError={() => setErr(true)}
            style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity .3s" }}
          />
        )}
        {/* placeholder when image not found */}
        {(!loaded || err) && (
          <div style={{ width: "100%", aspectRatio: "4/5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: loaded ? "absolute" : "static", inset: 0 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} style={{ opacity: .2 }}>
              <EthCross size={80} color="#D4AF77" />
            </motion.div>
            <p className="mono" style={{ fontSize: 10, letterSpacing: ".16em", color: "rgba(237,232,223,.25)", textTransform: "uppercase", textAlign: "center", padding: "0 20px" }}>
              Add photo to<br /><span style={{ color: "rgba(212,175,119,.4)" }}>/public/images/ymsgn.jpg</span>
            </p>
          </div>
        )}
        {/* caption */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 20px 16px", background: "linear-gradient(transparent, rgba(0,0,0,.7))", pointerEvents: "none" }}>
          <p className="mono" style={{ fontSize: 9, letterSpacing: ".16em", color: "rgba(237,232,223,.4)" }}>YIMESGEN AZENE · ADDIS ABABA · 2025</p>
        </div>
        {/* close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(237,232,223,.6)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >×</button>
      </motion.div>
      <p className="mono" style={{ position: "absolute", bottom: 20, fontSize: 9, letterSpacing: ".16em", color: "rgba(255,255,255,.18)", pointerEvents: "none" }}>
        ESC or click outside to close
      </p>
    </motion.div>
  );
}

export default function AboutClient() {
  const isMobile  = useIsMobile();
  const [showPhoto, setShowPhoto] = useState(false);
  const open  = useCallback(() => setShowPhoto(true),  []);
  const close = useCallback(() => setShowPhoto(false), []);

  const story = [
    "I started with YouTube tutorials at 15. Built my first HTML page by copying exactly what the video showed. When I changed something and it broke, I had no idea why. That confusion lasted about a year.",
    "JavaScript clicked differently. It had logic — you could reason about what it was doing. I spent a long time building things that almost worked. Closures made sense on the fifth explanation.",
    "I got serious about design around 2022. Most developer side projects look developer-built — technically fine, visually careless. I didn't want that. Started learning Figma, studying typography, paying attention to spacing.",
    "My first paid project was a simple business site. Fine. My second was Go Fresh Meals — a real restaurant that needed a real ordering system. That project taught me more than six months of tutorials.",
    "Still learning. Three.js shaders are what I'm in the middle of right now. And system design — reading about it for the first time, and it's changing how I think about everything I built before.",
  ];

  return (
    <Shell current="/about">
      {/* ── OPENING ── */}
      <section
        style={{
          minHeight: isMobile ? "65vh" : "80vh",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: isMobile ? "0 20px 56px" : "0 40px 80px",
          position: "relative", overflow: "hidden",
        }}
      >
        {!isMobile && <div style={{ position: "absolute", top: "12%", right: "6%", opacity: .05 }}><EthCross size={240} color="var(--gold)" spin /></div>}
        <Reveal><Label>About</Label></Reveal>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15, duration: .7, ease: [.16, 1, .3, 1] }}
          style={{ fontSize: "clamp(34px, 8vw, 120px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: .93, margin: "14px 0 22px" }}
        >
          I build things.<br />I&apos;m 19.<br /><span style={{ color: "var(--gold)" }}>I&apos;m from Ethiopia.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}
          style={{ color: "var(--muted)", maxWidth: 460, fontSize: isMobile ? 15 : 17, lineHeight: 1.78 }}>
          Self-taught developer and designer based in Addis Ababa. Serious about the work. Open to the world.
        </motion.p>
        <div style={{ position: "absolute", bottom: 0, left: isMobile ? 20 : 40, right: isMobile ? 20 : 40, height: 1, background: "var(--border)" }} />
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: isMobile ? "56px 20px" : "96px 40px", maxWidth: 740, margin: "0 auto" }}>
        <Label>The story</Label>
        {/* first paragraph has "see me" trigger */}
        <Reveal>
          <p style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.85, color: "var(--text)", marginBottom: 26 }}>
            I&apos;m Yimesgen —{" "}
            <motion.button
              onClick={open}
              whileHover={{ color: "var(--gold)" }}
              style={{
                display: "inline", fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit",
                fontStyle: "italic", background: "none", border: "none", padding: 0,
                cursor: "pointer", verticalAlign: "baseline", color: "var(--muted)",
                textDecoration: "underline", textDecorationStyle: "dotted",
                textDecorationColor: "rgba(255,255,255,.2)", textUnderlineOffset: "4px",
              }}
            >
              see me
            </motion.button>{" "}
            — and I started with YouTube tutorials at 15.
            Built my first HTML page by copying exactly what the video showed.
            When I changed something and it broke, I had no idea why.
            That confusion lasted about a year.
          </p>
        </Reveal>
        {story.slice(1).map((para, i) => (
          <Reveal key={i} delay={(i + 1) * .06}>
            <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.85, color: "var(--muted)", marginBottom: 26 }}>{para}</p>
          </Reveal>
        ))}
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 40px", background: "var(--s1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <Label>Timeline</Label>
          <Heading style={{ marginBottom: isMobile ? 36 : 52 }}>How I got here</Heading>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: isMobile ? 34 : 50, top: 0, bottom: 0, width: 1, background: "var(--border)" }} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * .05}>
                <div style={{ display: "flex", gap: isMobile ? 14 : 26, marginBottom: isMobile ? 28 : 36, alignItems: "flex-start" }}>
                  <div style={{ minWidth: isMobile ? 30 : 44, fontFamily: "inherit", fontSize: isMobile ? 10 : 11, color: "var(--gold)", paddingTop: 3, textAlign: "right", flexShrink: 0 }} className="mono">{t.year}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: i === TIMELINE.length - 1 ? "var(--gold)" : "#333", border: i === TIMELINE.length - 1 ? "none" : "1px solid var(--border)", position: "relative", zIndex: 1 }} />
                  <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.75, color: "var(--muted)", paddingTop: 1 }}>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH ── */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Label>Tools</Label>
          <Heading style={{ marginBottom: isMobile ? 32 : 48 }}>What I work with</Heading>
          <TechTicker items={TECH} />
        </div>
      </section>

      {/* ── CURRENTLY LEARNING ── */}
      <section style={{ padding: isMobile ? "40px 20px 64px" : "64px 40px 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Reveal>
            <div style={{ borderLeft: "2px solid var(--gold)", padding: "24px 28px", background: "var(--s2)", borderRadius: "0 8px 8px 0" }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--gold)", textTransform: "uppercase" }}>Currently Learning</span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Getting deeper into WebGL shaders — noise functions and volumetric light faking.",
                  "System design. Reading about it for the first time. It's making me rethink past decisions.",
                  "How Three.js handles custom geometry under the hood — not just the API.",
                ].map((item, i) => (
                  <p key={i} style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* photo lightbox */}
      <AnimatePresence>
        {showPhoto && <PhotoLightbox key="lb" onClose={close} />}
      </AnimatePresence>
    </Shell>
  );
}
