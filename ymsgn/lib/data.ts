export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  accent: string;
  grad: string;
  tech: string[];
  live: boolean;
  demoUrl: string;
  githubUrl: string;
  problem: string;
  approach: string;
  outcome: string;
  learned: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "go-fresh-meals",
    title: "Go Fresh Meals",
    tagline: "Food ordering site for a real restaurant in Addis Ababa.",
    year: "2024",
    tags: ["Web", "Full Stack"],
    accent: "#C4704F",
    grad: "linear-gradient(135deg,#1a0800,#2e1200,#0f0500)",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    live: true,
    demoUrl: "https://gofreshet.com",
    githubUrl: "",
    problem: "The restaurant had no online presence. Customers ordered through Instagram DMs and the owner tracked everything manually. They needed something that worked on low-end Android phones, loaded in under three seconds, and didn't require a backend or subscription.",
    approach: "No framework — a single HTML file any shared host can serve. Cart state in localStorage so it survives a page refresh. WhatsApp checkout matched the owner's existing workflow so adoption was immediate. Open/closed status calculated from Addis Ababa UTC+3 time so customers always know before they try to order.",
    outcome: "Launched and in active use. The owner stopped managing orders through DMs. Menu search, bilingual Amharic/English copy, and a debounced search field made it feel faster than it technically was.",
    learned: [
      "Debounce is as much about perceived speed as actual performance.",
      "Designing for the actual device your users have — not your MacBook — changes every decision.",
      "LocalStorage is a legitimate database for simple cart flows. I overcomplicated my first approach.",
    ],
  },
  {
    slug: "this-portfolio",
    title: "Portfolio v2",
    tagline: "My personal site. Six design directions before this one.",
    year: "2025",
    tags: ["Web", "3D"],
    accent: "#D4AF77",
    grad: "linear-gradient(135deg,#08080f,#10101a,#08080f)",
    tech: ["Next.js 14", "TypeScript", "Framer Motion"],
    live: false,
    demoUrl: "",
    githubUrl: "",
    problem: "My previous portfolio was a customised template. It showed. Everything looked like it came from somewhere else. I wanted something that felt made, not assembled.",
    approach: "Started from constraints: dark, Ethiopian cross motif, no gradients on text, no marketing copy. Built the preloader first because it set the tone for everything else. Went through roughly six major visual directions — one Three.js-heavy version, two Tailwind-grid versions — before landing on this structure.",
    outcome: "What you're looking at now. The constraint of writing honest copy in the first person made every design decision easier — there was no room for decoration that didn't serve a sentence.",
    learned: [
      "Starting with copy instead of layout produces more honest design.",
      "Prefers-reduced-motion has to be baked in from day one, not retrofitted.",
      "Six bad versions are part of the work, not a detour from it.",
    ],
  },
  {
    slug: "fitlog",
    title: "FitLog",
    tagline: "Workout tracker for people who hate fitness apps.",
    year: "2023",
    tags: ["App"],
    accent: "#d4774a",
    grad: "linear-gradient(135deg,#100805,#1e0e07,#100805)",
    tech: ["React Native", "TypeScript", "SQLite", "Expo"],
    live: false,
    demoUrl: "",
    githubUrl: "",
    problem: "Every fitness app has a subscription, twelve screens, and wants you to share your workouts. I wanted something that tracks sets and reps and stays out of the way.",
    approach: "SQLite on-device only. No account, no cloud, no sync. Three screens: workout list, active session, history. The constraint of three screens forced every feature question to be answered with 'no'.",
    outcome: "Used it for eight months before the project felt finished. Fast because everything is local. The history charts using react-native-reanimated were the last thing added and the first thing people noticed.",
    learned: [
      "React Native FlatList re-renders everything on state change without keyExtractor and React.memo.",
      "Local-first means offline by default, not as a fallback.",
      "Three screens was the right call every time I questioned it.",
    ],
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    tagline: "Internal dashboard for a small e-commerce business.",
    year: "2023",
    tags: ["Web", "UI/UX"],
    accent: "#4a8fb5",
    grad: "linear-gradient(135deg,#05080f,#0a1020,#05080f)",
    tech: ["React", "Recharts", "Tailwind CSS", "REST API"],
    live: false,
    demoUrl: "",
    githubUrl: "",
    problem: "The client was making business decisions based on gut feeling. Sales data lived in a spreadsheet. They couldn't see patterns without hours of manual work.",
    approach: "Asked one question before writing any code: what five things do you check every morning? Those became the five charts. Everything else was cut. Connected to Shopify's REST API, date range filtering, CSV export.",
    outcome: "Went from twelve charts to five. The client opened it daily. The earlier version with twelve charts got opened, stared at, and closed.",
    learned: [
      "More data on a dashboard makes it less useful.",
      "The right first question is what decisions this needs to support, not what data is available.",
      "Recharts handles 95% of dashboard needs. D3 is for the other 5%.",
    ],
  },
];

export const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    desc: "Full sites and web apps. Next.js, TypeScript, performance-first. I care about load times, Core Web Vitals, and whether the code is readable six months later.",
    price: "From $500",
  },
  {
    num: "02",
    title: "UI/UX Design",
    desc: "Figma to finished product. I design things I would actually use. Clean, specific, no wasted space. Handoff files your developers can actually work from.",
    price: "From $400",
  },
  {
    num: "03",
    title: "App Development",
    desc: "React Native for iOS and Android. Production apps that people have on their phones. I know the FlatList issues, the navigation quirks, the OTA workflow.",
    price: "From $800",
  },
  {
    num: "04",
    title: "3D & Motion",
    desc: "Three.js, WebGL, Framer Motion. When something needs to feel alive — not just animated for the sake of it. Performance-aware: mobile users exist.",
    price: "From $600",
  },
];

export const TECH = [
  { name: "Next.js",      slug: "nextdotjs",        color: "#ffffff" },
  { name: "React",        slug: "react",            color: "#61DAFB" },
  { name: "TypeScript",   slug: "typescript",       color: "#3178C6" },
  { name: "Tailwind",     slug: "tailwindcss",      color: "#06B6D4" },
  { name: "Three.js",     slug: "threedotjs",       color: "#ffffff" },
  { name: "Framer",       slug: "framer",           color: "#0055FF" },
  { name: "Node.js",      slug: "nodedotjs",        color: "#339933" },
  { name: "Figma",        slug: "figma",            color: "#F24E1E" },
  { name: "React Native", slug: "react",            color: "#61DAFB" },
  { name: "Git",          slug: "git",              color: "#F05032" },
  { name: "JavaScript",   slug: "javascript",       color: "#F7DF1E" },
  { name: "MongoDB",      slug: "mongodb",          color: "#47A248" },
  { name: "Vercel",       slug: "vercel",           color: "#ffffff" },
  { name: "HTML5",        slug: "html5",            color: "#E34F26" },
  { name: "CSS3",         slug: "css3",             color: "#1572B6" },
  { name: "Expo",         slug: "expo",             color: "#ffffff" },
];

export const TIMELINE = [
  { year: "2020", text: "Started watching YouTube tutorials. First HTML page looked exactly like the tutorial." },
  { year: "2021", text: "Learned JavaScript. Three months of things that almost worked. Closures made sense on the fifth explanation." },
  { year: "2022", text: "Switched to React. Started taking design seriously after noticing most developer projects look developer-built." },
  { year: "2023", text: "First client project. First time someone paid me for code. First scope change mid-project." },
  { year: "2024", text: "Three.js, React Native, Framer Motion. Shipped Go Fresh Meals — first production site for a real business." },
  { year: "2025", text: "This portfolio. Working with clients outside Ethiopia. Reading about system design for the first time." },
];
