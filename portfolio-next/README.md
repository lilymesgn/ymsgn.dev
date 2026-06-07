# ymsgn.dev

Personal portfolio — Yimesgen Azene, developer & designer from Addis Ababa.

## Stack

Next.js 14 · TypeScript · Framer Motion · Simple Icons CDN · App Router

## Setup

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
npm run start      # serve production build locally
```

## Deploy to Vercel

```bash
npx vercel         # follow prompts, done in ~60 seconds
```

Or connect the repo in vercel.com → New Project → Import Git Repository.

## Your photo

Drop a square-ish photo at `/public/images/ymsgn.jpg`.  
It shows in the "see me" lightbox on the About page.  
Aspect ratio 4:5 looks best (portrait).

## Contact form

The form is wired up but needs a real email service.  
In `components/pages/ContactPage.tsx`, replace the `setTimeout` with:

```ts
// Option A — Resend (recommended)
await fetch("/api/contact", { method:"POST", body:JSON.stringify(form) });

// Then create app/api/contact/route.ts:
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  const body = await req.json();
  await resend.emails.send({
    from: "portfolio@ymsgn.dev",
    to: "hello@yimesgen.studio",
    subject: `New message from ${body.name}`,
    text: body.message,
  });
  return Response.json({ ok: true });
}
```

Add `RESEND_API_KEY=re_...` to `.env.local`.

## Fonts

Currently using Google Fonts (Syne, Inter, DM Mono) for build stability.  
To swap in Fontshare fonts (Clash Display, Satoshi, General Sans):

1. Download woff2 files from fontshare.com
2. Place in `/public/fonts/`
3. Replace `next/font/google` imports in `app/layout.tsx` with `next/font/local`

## Customise

- Projects: `lib/data.ts` → `PROJECTS` array
- Services: `lib/data.ts` → `SERVICES_DATA` array  
- Tech icons: `lib/data.ts` → `TECH_ICONS` array
- Timeline / Values / Currently Learning: all in `lib/data.ts`
