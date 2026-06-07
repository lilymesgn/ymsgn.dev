# ymsgn.dev — Portfolio

**Next.js 14 · TypeScript · Framer Motion · App Router**

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — should exit 0
```

## Deploy to Vercel (recommended)

```bash
npx vercel
```

Or: Vercel dashboard → New Project → Import Git Repository → done.
No configuration required — `vercel.json` is already set.

## Deploy to Netlify

Push to GitHub, connect in Netlify dashboard.
Build command: `npm run build`
Publish directory: `.next`
`public/_redirects` is already included.

---

## Customise content

All content lives in **`lib/data.ts`**. Edit that file only.

### Add a project
Add an object to the `PROJECTS` array. The `slug` becomes the URL: `/projects/your-slug`.

### Add your photo
Drop a portrait photo at `/public/images/ymsgn.jpg`.
It appears in the "see me" lightbox on the About page.
Aspect ratio 4:5 (portrait) looks best.

### Wire the contact form
In `components/ContactClient.tsx`, replace the `setTimeout` with a real API call.

**Option A — Resend (recommended)**
1. Create `app/api/contact/route.ts`:
```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  const { name, email, service, message } = await req.json();
  await resend.emails.send({
    from: "portfolio@ymsgn.dev",
    to: "hello@yimesgen.studio",
    subject: `Message from ${name} — ${service || "no service selected"}`,
    text: `${message}\n\nFrom: ${email}`,
  });
  return Response.json({ ok: true });
}
```
2. Add `RESEND_API_KEY=re_...` to Vercel environment variables.
3. Uncomment the `fetch("/api/contact", ...)` call in `ContactClient.tsx`.

**Option B — Formspree**
Replace `submit()` with:
```ts
await fetch("https://formspree.io/f/YOUR_ID", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
```

### Swap fonts
The site uses system fonts by default for zero-latency rendering.
To use Fontshare fonts (Clash Display, Satoshi, General Sans):
1. Download woff2 files from fontshare.com
2. Place in `/public/fonts/`
3. Add `@font-face` rules to `app/globals.css`
4. Update `font-family` references in the globals

---

## Why no hydration errors?

- `useIsMobile()` starts `false` on both server and client, updates after mount
- `useMounted()` gates anything that differs between server/client (clock, particles)
- Particles use pre-computed coordinates — no `Math.random()` in render
- `LiveClock` renders a static placeholder on the server, live clock after mount
- `sessionStorage` access is wrapped in `try/catch`
- `navigator.vibrate` is checked for existence before calling

## File structure

```
app/
  layout.tsx              root layout (server component)
  page.tsx                home → <HomeClient />
  about/page.tsx          about → <AboutClient />
  projects/page.tsx       projects list → <ProjectsClient />
  projects/[slug]/page.tsx  project detail → <ProjectDetailClient />
  contact/page.tsx        contact → <ContactClient />
  not-found.tsx           custom 404
  globals.css             all styles

components/
  ui.tsx                  ALL shared primitives (Nav, Footer, Shell, EthCross,
                          ProjectCard, TechTicker, LiveClock, Preloader, Particles,
                          GoldBtn, Heading, Label, useIsMobile, useMounted)
  HomeClient.tsx          home page
  AboutClient.tsx         about page
  ProjectsClient.tsx      projects listing
  ProjectDetailClient.tsx project detail / case study
  ContactClient.tsx       contact form

lib/
  data.ts                 all portfolio content (projects, services, tech, timeline)

public/
  images/ymsgn.jpg        your photo (add this)
  _redirects              Netlify SPA redirect
```
