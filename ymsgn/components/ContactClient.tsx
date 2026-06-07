"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shell, Label, Heading, LiveClock, useIsMobile } from "./ui";

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = "Name is required";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = "Valid email required";
  }
  if (form.message.trim().length < 20) {
    e.message = "Please write at least 20 characters";
  }
  return e;
}

const SOCIALS = [
  { label: "GitHub",     url: "https://github.com"  },
  { label: "Instagram",  url: "#"                   },
  { label: "Twitter / X",url: "#"                   },
  { label: "Telegram",   url: "#"                   },
  { label: "LinkedIn",   url: "#"                   },
];

export default function ContactClient() {
  const isMobile = useIsMobile();
  const [form,   setForm]   = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    const e = validate(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");
    // ── Replace with real API call ──────────────────────
    // await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%", background: "var(--s2)",
    border: `1px solid ${err ? "var(--terra)" : "var(--border)"}`,
    borderRadius: 8, padding: "14px 16px", fontSize: 15,
    color: "var(--text)", fontFamily: "inherit", outline: "none",
    transition: "border-color .2s",
  });

  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };

  const labelStyle = (err?: string): React.CSSProperties => ({
    fontFamily: "inherit", fontSize: 9, letterSpacing: ".18em",
    textTransform: "uppercase", color: err ? "var(--terra)" : "var(--muted)",
  });

  return (
    <Shell current="/contact">
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: isMobile ? "48px 20px 72px" : "64px 40px 100px" }}>
        <Label>Let&apos;s work together</Label>
        <Heading as="h1" style={{ marginBottom: 16 }}>Get in touch</Heading>
        <p style={{ color: "var(--muted)", maxWidth: 420, marginBottom: isMobile ? 48 : 72, lineHeight: 1.75, fontSize: isMobile ? 15 : 16 }}>
          Open to freelance projects, long-term collaborations, and interesting problems. Fill out the form or email directly.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: isMobile ? 48 : 80,
            alignItems: "start",
          }}
        >
          {/* ── info panel ── */}
          <div>
            <LiveClock />

            <div style={{ height: 1, background: "var(--border)", margin: "28px 0" }} />

            <div style={{ marginBottom: 28 }}>
              <p className="mono" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>Email</p>
              <a
                href="mailto:hello@yimesgen.studio"
                style={{ color: "var(--gold)", fontFamily: "inherit", fontSize: 14, letterSpacing: ".04em" }}
              >
                hello@yimesgen.studio
              </a>
            </div>

            <div style={{ marginBottom: 28 }}>
              <p className="mono" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>Location</p>
              <p className="mono" style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.8, letterSpacing: ".05em" }}>
                Addis Ababa, Ethiopia<br />
                <span style={{ color: "var(--muted)" }}>Remote-friendly worldwide</span>
              </p>
            </div>

            <div>
              <p className="mono" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 12 }}>Elsewhere</p>
              <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? "8px 24px" : 8 }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "var(--muted)", transition: "color .18s", minHeight: 36, display: "inline-flex", alignItems: "center" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF77")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── form ── */}
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "var(--s2)", border: "1px solid rgba(74,155,111,.22)",
                borderRadius: 12, padding: isMobile ? "36px 24px" : "48px 40px",
                textAlign: "center",
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(74,155,111,.14)", border: "1px solid var(--green)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
              }}>
                <span style={{ color: "var(--green)", fontSize: 20 }}>✓</span>
              </div>
              <p className="mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--green)", textTransform: "uppercase" }}>
                Message sent
              </p>
              <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12 }}>
                I&apos;ll get back to you within a day or two.
              </p>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* name + email */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                <div style={fieldStyle}>
                  <label className="mono" style={labelStyle(errors.name)}>{errors.name || "Name"}</label>
                  <input type="text" value={form.name} onChange={set("name")} style={inputStyle(errors.name)} />
                </div>
                <div style={fieldStyle}>
                  <label className="mono" style={labelStyle(errors.email)}>{errors.email || "Email"}</label>
                  <input type="email" value={form.email} onChange={set("email")} style={inputStyle(errors.email)} />
                </div>
              </div>

              {/* service select */}
              <div style={fieldStyle}>
                <label className="mono" style={labelStyle()}>What do you need</label>
                <select
                  value={form.service}
                  onChange={set("service")}
                  style={{
                    ...inputStyle(),
                    cursor: "pointer", appearance: "none",
                    color: form.service ? "var(--text)" : "var(--muted)",
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="app">App Development</option>
                  <option value="3d">3D &amp; Motion</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              {/* message */}
              <div style={fieldStyle}>
                <label className="mono" style={labelStyle(errors.message)}>{errors.message || "Message (min. 20 characters)"}</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  style={{ ...inputStyle(errors.message), resize: "vertical" }}
                />
              </div>

              {/* submit row */}
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                justifyContent: "space-between", gap: 14,
              }}>
                <p className="mono" style={{ fontSize: 9, color: "var(--muted)", letterSpacing: ".1em" }}>
                  {/* connect to Resend: add RESEND_API_KEY in Vercel env vars */}
                  ENCRYPTED IN TRANSIT
                </p>
                <button
                  onClick={submit}
                  disabled={status === "sending"}
                  style={{
                    background: "var(--gold)", color: "#000",
                    padding: "16px 36px", borderRadius: 8,
                    fontFamily: "inherit", fontSize: 12,
                    letterSpacing: ".12em", fontWeight: 700,
                    textTransform: "uppercase",
                    minHeight: 52, cursor: "pointer",
                    opacity: status === "sending" ? .65 : 1,
                    transition: "opacity .2s",
                    border: "none",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
