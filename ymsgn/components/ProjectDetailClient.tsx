"use client";

import { motion } from "framer-motion";
import { Shell, EthCross, Label, useIsMobile } from "./ui";
import { PROJECTS } from "@/lib/data";

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: .55, ease: [.16, 1, .3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const isMobile = useIsMobile();
  const p   = PROJECTS.find((x) => x.slug === slug);
  const idx = PROJECTS.findIndex((x) => x.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  if (!p) {
    return (
      <Shell current="/projects">
        <div style={{ padding: "80px 40px", textAlign: "center" }}>
          <p className="mono" style={{ color: "var(--muted)" }}>Project not found.</p>
          <a href="/projects" style={{ color: "var(--gold)", marginTop: 16, display: "inline-block" }}>← Back to work</a>
        </div>
      </Shell>
    );
  }

  const pad = isMobile ? "48px 20px 72px" : "64px 40px 100px";

  return (
    <Shell current="/projects">
      <article style={{ maxWidth: 820, margin: "0 auto", padding: pad }}>

        {/* back */}
        <a
          href="/projects"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44,
            fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em",
            color: "var(--muted)", textTransform: "uppercase",
            marginBottom: isMobile ? 32 : 48,
          }}
        >
          ← All projects
        </a>

        {/* header */}
        <span className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--gold)", textTransform: "uppercase" }}>
          {p.tags.join(" · ")} · {p.year}
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1, duration: .6 }}
          style={{
            fontSize: "clamp(28px, 5.5vw, 64px)",
            fontWeight: 800, letterSpacing: "-.03em",
            lineHeight: 1.04, margin: "14px 0 12px",
          }}
        >
          {p.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .25 }}
          style={{ fontSize: isMobile ? 16 : 18, color: "var(--muted)", lineHeight: 1.7, marginBottom: 32 }}
        >
          {p.tagline}
        </motion.p>

        {/* links */}
        {(p.demoUrl || p.githubUrl) && (
          <div style={{ display: "flex", gap: 12, marginBottom: isMobile ? 32 : 48, flexWrap: "wrap" }}>
            {p.demoUrl && (
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 26px", borderRadius: 6, fontWeight: 600, minHeight: 44, background: "var(--gold)", color: "#000" }}>
                View live
              </a>
            )}
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", padding: "12px 26px", borderRadius: 6, fontWeight: 600, minHeight: 44, background: "transparent", color: "var(--gold)", border: "1px solid var(--gold)" }}>
                View code
              </a>
            )}
          </div>
        )}

        {/* tech */}
        <div style={{ marginBottom: isMobile ? 32 : 48 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: ".2em", color: "var(--muted)", textTransform: "uppercase" }}>Stack</span>
          <p className="mono" style={{ fontSize: 13, color: "var(--text)", marginTop: 8, letterSpacing: ".05em", lineHeight: 1.8 }}>
            {p.tech.join(", ")}
          </p>
        </div>

        {/* divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: isMobile ? 36 : 56 }} />

        {/* browser mockup cover */}
        <div
          style={{
            height: isMobile ? 210 : 360, borderRadius: 12,
            background: p.grad, position: "relative", overflow: "hidden",
            marginBottom: isMobile ? 44 : 64, border: "1px solid var(--border)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 32% 42%, ${p.accent}25 0%, transparent 62%)` }} />
          {/* chrome bar */}
          <div style={{
            position: "absolute", top: isMobile ? 12 : 20,
            left: isMobile ? 12 : 20, right: isMobile ? 12 : 20,
            background: "rgba(0,0,0,.42)", backdropFilter: "blur(8px)",
            borderRadius: 8, padding: isMobile ? "8px 12px" : "10px 14px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: isMobile ? 8 : 10, height: isMobile ? 8 : 10, borderRadius: "50%", background: c, opacity: .75 }} />
              ))}
            </div>
            {!isMobile && (
              <div style={{ flex: 1, background: "rgba(255,255,255,.06)", borderRadius: 4, padding: "4px 12px" }}>
                <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.28)" }}>
                  {p.demoUrl || `${p.slug}.vercel.app`}
                </span>
              </div>
            )}
          </div>
          <div style={{ position: "absolute", bottom: isMobile ? 14 : 22, right: isMobile ? 14 : 22, opacity: .1 }}>
            <EthCross size={isMobile ? 44 : 72} color={p.accent} />
          </div>
          <div style={{ position: "absolute", bottom: isMobile ? 14 : 22, left: isMobile ? 14 : 22 }}>
            <span className="mono" style={{ fontSize: 9, color: "rgba(255,255,255,.22)" }}>Screenshot coming soon</span>
          </div>
        </div>

        {/* case study sections */}
        {[
          { label: "The Problem",      body: p.problem  },
          { label: "The Approach",     body: p.approach },
          { label: "The Outcome",      body: p.outcome  },
        ].map((sec, i) => (
          <Reveal key={sec.label} delay={i * .05}>
            <div style={{ marginBottom: isMobile ? 40 : 56 }}>
              <Label>{sec.label}</Label>
              <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.85, color: "var(--muted)", maxWidth: 660 }}>
                {sec.body}
              </p>
            </div>
          </Reveal>
        ))}

        {/* what I learned */}
        <Reveal delay={.1}>
          <div style={{ marginBottom: isMobile ? 48 : 64 }}>
            <Label>What I learned</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {p.learned.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--s2)", border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--gold)", borderRadius: "0 8px 8px 0",
                    padding: isMobile ? "14px 18px" : "16px 22px",
                  }}
                >
                  <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.75, color: "var(--muted)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: isMobile ? 32 : 48 }} />

        {/* prev/next */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <a href="/projects" style={{ fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", minHeight: 44, display: "inline-flex", alignItems: "center" }}>
            ← All projects
          </a>
          <a href={`/projects/${next.slug}`} style={{ fontFamily: "inherit", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", minHeight: 44, display: "inline-flex", alignItems: "center" }}>
            Next: {next.title} →
          </a>
        </div>
      </article>
    </Shell>
  );
}
