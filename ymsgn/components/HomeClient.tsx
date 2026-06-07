"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shell, EthCross, Label, Heading, GoldBtn, TechTicker, ProjectCard, useIsMobile } from "./ui";
import { PROJECTS, SERVICES, TECH } from "@/lib/data";

export default function HomeClient() {
  const isMobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 28, damping: 14 });
  const smy = useSpring(my, { stiffness: 28, damping: 14 });

  useEffect(() => {
    if (isMobile) return;
    const fn = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - .5) * 12);
      my.set((e.clientY / window.innerHeight - .5) * 12);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [isMobile, mx, my]);

  const letters = "YIMESGEN".split("");

  return (
    <Shell current="/">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: isMobile ? "0 20px 60px" : "0 40px 80px",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* ambient glow */}
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute", top: "15%", left: "5%",
              width: 640, height: 640, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,175,119,.06) 0%, transparent 70%)",
              pointerEvents: "none", x: smx, y: smy,
            }}
          />
        )}

        {/* background cross */}
        <motion.div
          style={{
            position: "absolute",
            top: isMobile ? "4%" : "8%",
            right: isMobile ? "-6%" : "3%",
            pointerEvents: "none",
            x: isMobile ? 0 : useTransform(smx, v => -v * .55),
            y: isMobile ? 0 : useTransform(smy, v => -v * .55),
          }}
        >
          <EthCross size={isMobile ? 120 : 210} color="rgba(212,175,119,.07)" />
        </motion.div>

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* eyebrow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} style={{ marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--gold)", textTransform: "uppercase" }}>
              Developer &amp; Designer · Addis Ababa, Ethiopia
            </span>
          </motion.div>

          {/* name */}
          <h1
            style={{
              fontSize: "clamp(44px, 11vw, 164px)",
              fontWeight: 800, lineHeight: .88, letterSpacing: "-.035em",
              marginBottom: isMobile ? 24 : 40,
            }}
          >
            {letters.map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: .3 + i * .04, duration: .6, ease: [.16, 1, .3, 1] }}
                style={{ display: "inline-block" }}
              >
                {c}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: .72, duration: .6, ease: [.16, 1, .3, 1] }}
              style={{ display: "inline-block", color: "var(--gold)" }}
            >
              AZENE
            </motion.span>
          </h1>

          {/* bottom row */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 20 : 24 }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .95 }}
              style={{ maxWidth: 420, color: "var(--muted)", fontSize: isMobile ? 15 : 17, lineHeight: 1.75 }}
            >
              I&apos;m 19. I build websites, apps, and 3D interfaces. Started from YouTube tutorials and kept going. Based in Ethiopia, working with anyone.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ display: "flex", gap: isMobile ? 16 : 10, flexDirection: isMobile ? "row" : "column", alignItems: isMobile ? "center" : "flex-end" }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <div className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
                <span className="mono" style={{ fontSize: 10, color: "var(--green)", letterSpacing: ".12em", textTransform: "uppercase" }}>Open to work</span>
              </div>
              <a href="/projects" style={{ fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em", color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: 2, textTransform: "uppercase", minHeight: 44, display: "inline-flex", alignItems: "flex-end" }}>See my work</a>
            </motion.div>
          </div>
        </div>

        {/* bottom rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: .8, ease: [.16, 1, .3, 1] }}
          style={{ position: "absolute", bottom: 0, left: isMobile ? 20 : 40, right: isMobile ? 20 : 40, height: 1, background: "var(--border)", transformOrigin: "left" }}
        />
      </section>

      {/* ── TECH TICKER ──────────────────────────────────────── */}
      <TechTicker items={TECH} />

      {/* ── FEATURED WORK ────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "64px 20px" : "96px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 32 : 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Label>Selected work</Label>
            <Heading>Things I&apos;ve built</Heading>
          </div>
          <a href="/projects" style={{ fontSize: 11, letterSpacing: ".12em", color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: 2, textTransform: "uppercase", minHeight: 44, display: "inline-flex", alignItems: "flex-end" }}>View all</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: isMobile ? 14 : 16, alignItems: "start" }}>
          {PROJECTS.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "56px 20px" : "96px 40px", background: "var(--s1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Label>What I do</Label>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 32 : 48, flexWrap: "wrap", gap: 16 }}>
          <Heading>Services</Heading>
          <a href="/contact" style={{ fontSize: 11, letterSpacing: ".12em", color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: 2, textTransform: "uppercase", minHeight: 44, display: "inline-flex", alignItems: "flex-end" }}>Get pricing</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: isMobile ? 12 : 2 }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: isMobile ? 0 : i * .06, duration: .55 }}
              style={{ background: "var(--s2)", border: "1px solid var(--border)", borderRadius: 10, padding: isMobile ? "22px 18px" : "28px 24px" }}
            >
              <span className="mono" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: ".14em", textTransform: "uppercase" }}>{s.num}</span>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "14px 0 10px", letterSpacing: "-.01em" }}>{s.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              <p className="mono" style={{ fontSize: 11, color: "var(--gold)", marginTop: 16 }}>{s.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "80px 20px" : "120px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {!isMobile && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: .04 }}>
            <EthCross size={380} color="var(--gold)" />
          </div>
        )}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }} style={{ position: "relative", zIndex: 1 }}>
          <Label>Let&apos;s talk</Label>
          <h2 style={{ fontSize: isMobile ? "clamp(36px,10vw,80px)" : "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-.04em", margin: "20px 0 28px", lineHeight: 1 }}>
            Got something<br />to build?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: isMobile ? 15 : 17, maxWidth: 380, margin: "0 auto 36px" }}>
            I&apos;m open to freelance projects, long-term work, and interesting problems.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <GoldBtn href="/contact">Get in touch</GoldBtn>
            <GoldBtn href="/projects" outline>See my work</GoldBtn>
          </div>
        </motion.div>
      </section>
    </Shell>
  );
}
