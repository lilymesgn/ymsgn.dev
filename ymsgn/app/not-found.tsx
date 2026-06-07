import type { Metadata } from "next";

export const metadata: Metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ background: "#080808", color: "#EDE8DF", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 16 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: ".2em", color: "#D4AF77", textTransform: "uppercase" }}>404</p>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.02em" }}>Page not found</h1>
        <a href="/" style={{ marginTop: 8, fontSize: 13, color: "#666", borderBottom: "1px solid #333", paddingBottom: 2 }}>← Back home</a>
      </body>
    </html>
  );
}
