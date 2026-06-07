"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, Label, Heading, ProjectCard, useIsMobile } from "./ui";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Web", "App", "UI/UX", "3D", "Full Stack"];

export default function ProjectsClient() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <Shell current="/projects">
      <section style={{ padding: isMobile ? "48px 20px 64px" : "64px 40px 80px" }}>
        {/* header */}
        <Label>Portfolio</Label>
        <Heading as="h1" style={{ marginBottom: 14 }}>
          All work
        </Heading>
        <p style={{ color: "var(--muted)", maxWidth: 460, marginBottom: isMobile ? 32 : 48, lineHeight: 1.75, fontSize: isMobile ? 15 : 16 }}>
          Four projects across web, mobile, and design. Every one has a full write-up — problem, approach, and what failed.
        </p>

        {/* filter pills — horizontal scroll on mobile */}
        <div
          style={{
            display: "flex", gap: 8,
            flexWrap: isMobile ? "nowrap" : "wrap",
            overflowX: isMobile ? "auto" : "visible",
            paddingBottom: isMobile ? 6 : 0,
            marginBottom: isMobile ? 32 : 48,
            scrollbarWidth: "none",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontFamily: "inherit",
                fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
                padding: "9px 18px", borderRadius: 6, flexShrink: 0, minHeight: 40,
                border: active === f ? "1px solid var(--gold)" : "1px solid var(--border)",
                color: active === f ? "var(--gold)" : "var(--muted)",
                background: active === f ? "rgba(212,175,119,.07)" : "transparent",
                transition: "all .18s",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: isMobile ? 32 : 48 }} />

        {/* grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .22 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
              gap: isMobile ? 14 : 16,
              alignItems: "start",
            }}
          >
            {filtered.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
            {filtered.length === 0 && (
              <p className="mono" style={{ fontSize: 12, color: "var(--muted)", padding: "60px 0" }}>
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </Shell>
  );
}
