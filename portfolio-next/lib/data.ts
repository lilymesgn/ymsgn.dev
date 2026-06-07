export interface Project {
  slug: string; title: string; tagline: string; year: string;
  tags: string[]; accent: string; grad: string; tech: string[];
  live: boolean; demoUrl: string; githubUrl: string;
  problem: string; thinking: string; built: string; failed: string;
  learned: string[]; screenshots: string[];
}
export interface Service { id:string; num:string; title:string; short:string; desc:string; items:string[]; price:string; timeline:string; }
export interface TechIconData { name:string; slug:string; color:string; }

export const PROJECTS: Project[] = [
  {
    slug:"go-fresh-meals", title:"Go Fresh Meals", tagline:"A full food-ordering website for a real restaurant in Addis Ababa.",
    year:"2024", tags:["Web","Full Stack"], accent:"#C4704F",
    grad:"linear-gradient(135deg,#1a0800 0%,#2e1000 60%,#0f0500 100%)",
    tech:["HTML","CSS","JavaScript","LocalStorage"], live:true, demoUrl:"https://gofreshet.com", githubUrl:"",
    problem:"The restaurant had no online presence. Customers were ordering through DMs and the owner was manually tracking everything. They needed something that worked on mobile, loaded fast, and didn't require a backend.",
    thinking:"I decided against any framework. A single HTML file that any shared host can serve. Cart state in localStorage so it survives a page refresh. WhatsApp checkout was the obvious integration — the owner already handled orders there.",
    built:"Built a cart system from scratch. Real open/closed logic based on Addis Ababa UTC+3 time. Full bilingual support in Amharic and English. Menu search with a debounce function. No external libraries.",
    failed:"The original design had a floating cart widget that looked great on desktop but kept blocking content on small Android screens. Replaced it with a fixed bottom bar. Should have tested on the actual devices first.",
    learned:["Debounce isn't just a performance trick — it changes how an interface feels.","LocalStorage as a cart database is fine for this use case. I overcomplicated my first approach.","Designing for low-end Android first made the desktop experience better, not worse."],
    screenshots:[],
  },
  {
    slug:"this-portfolio", title:"Portfolio v2", tagline:"Rebuilt my personal site from scratch. Took longer than I expected.",
    year:"2025", tags:["Web","3D"], accent:"#D4AF77",
    grad:"linear-gradient(135deg,#08080f 0%,#10101e 60%,#08080f 100%)",
    tech:["Next.js 14","TypeScript","Three.js","Framer Motion"], live:false, demoUrl:"", githubUrl:"",
    problem:"The previous portfolio was a template I customized. It showed. Every element looked like it came from somewhere else. I wanted something that felt like mine.",
    thinking:"Three.js for the intro — the Ethiopian cross in WebGL felt like the right anchor. Framer Motion for all transitions. I wrote the i18n system myself because the requirements were simple.",
    built:"Full bilingual site. 3D Ethiopian cross on the preloader. Mouse-tracked tilt on project cards. Scroll storytelling on the about page. Took about six major design directions before landing here.",
    failed:"The first version of the 3D hero had too much going on. Particles, rotating cross, moving camera, shifting colors. Looked impressive for three seconds then became noise. Stripped it back.",
    learned:["WebGL performance on mobile is much worse than you assume during desktop development.","Animation systems need to respect prefers-reduced-motion from the start, not as an afterthought.","Bilingual layout requires thinking in two languages at every design decision."],
    screenshots:[],
  },
  {
    slug:"component-library", title:"UI Component Library", tagline:"A set of reusable components I actually use across projects.",
    year:"2024", tags:["UI/UX","Web"], accent:"#5a8f6a",
    grad:"linear-gradient(135deg,#050e08 0%,#0a1a0f 60%,#050e08 100%)",
    tech:["React","TypeScript","Tailwind","Storybook"], live:false, demoUrl:"", githubUrl:"",
    problem:"I kept rewriting the same components for every project. After the third time, I collected them.",
    thinking:"Started with the things I needed immediately. Modal, Toast, Dropdown, Input, Button variants. Documented each in Storybook so I could actually find them.",
    built:"About 20 components. Each has TypeScript props, keyboard navigation, and works without JavaScript for static renders. Accessible by default.",
    failed:"Tried to make the toast system too smart — auto-dismissing, stacking, priority queues. Overengineered it. Rewrote as a simple hook with a queue array.",
    learned:["Good component APIs are harder to design than good component implementations.","Storybook is worth the setup time if you're maintaining more than 10 components.","Accessible components aren't harder to build — they just require thinking about keyboard paths from the start."],
    screenshots:[],
  },
  {
    slug:"brand-identity", title:"Merkato Market Branding", tagline:"Brand identity for a local marketplace startup.",
    year:"2024", tags:["UI/UX"], accent:"#8b6bb1",
    grad:"linear-gradient(135deg,#0a0810 0%,#130f1e 60%,#0a0810 100%)",
    tech:["Figma","Illustrator"], live:false, demoUrl:"", githubUrl:"",
    problem:"A local marketplace app needed a visual identity that felt modern but grounded in Ethiopian culture. Not Western-looking, not generic startup, not folkloric.",
    thinking:"Spent a lot of time looking at Ethiopian textiles — the patterns in traditional woven fabrics. The geometric repetition there is sophisticated. That became the underlying grid.",
    built:"Logo system, color palette, type scale, icon set, and a component guide for the app UI. The primary mark works at 16px favicon size and large format print.",
    failed:"The first three logo directions were competent and completely wrong. They looked like Ethiopian branding designed by someone who Googled 'Ethiopian patterns'. The fourth came from actual observation.",
    learned:["Cultural reference in design requires immersion, not research.","A logo system needs to survive every size, every color, every background before you present it.","Generic 'African-inspired' design is its own cliche."],
    screenshots:[],
  },
  {
    slug:"fitness-tracker", title:"FitLog", tagline:"A simple workout tracking app for people who find fitness apps annoying.",
    year:"2023", tags:["App"], accent:"#d4774a",
    grad:"linear-gradient(135deg,#100805 0%,#1e0f07 60%,#100805 100%)",
    tech:["React Native","TypeScript","SQLite","Expo"], live:false, demoUrl:"", githubUrl:"",
    problem:"Every fitness app has too many features, a subscription, and wants you to share your workouts. I wanted something that just tracks sets and reps and gets out of the way.",
    thinking:"SQLite on-device only. No account, no sync, no cloud. Simple schema: workouts, exercises, sets. Three screens total.",
    built:"Three screen app. Workout list, exercise log during a session, history view. Charts for progress. Fast — no loading states because everything is local.",
    failed:"React Native's FlatList re-renders the entire list on state change. The workout history screen was janky until I fixed it with proper keyExtractor, React.memo, and useCallback.",
    learned:["React Native's FlatList re-renders everything on state change unless you specifically prevent it with keyExtractor and memo.","Local-first is underrated. The app works offline by default because there is no online.","Three screens is enough. Every feature I thought about adding made the core worse."],
    screenshots:[],
  },
  {
    slug:"data-dashboard", title:"Analytics Dashboard", tagline:"Internal dashboard for a small e-commerce business.",
    year:"2023", tags:["Web","UI/UX"], accent:"#4a8fb5",
    grad:"linear-gradient(135deg,#05080f 0%,#0a101e 60%,#05080f 100%)",
    tech:["React","Recharts","Tailwind","REST API"], live:false, demoUrl:"", githubUrl:"",
    problem:"The client was making business decisions based on Instagram likes. They had sales data in a spreadsheet but couldn't see patterns quickly.",
    thinking:"Dashboards are about reducing the time from question to answer. I asked what five things they check every morning. Those became the five primary charts.",
    built:"Revenue over time, top products, customer geography, order volume by day of week, return rate. Date range filtering. Exports to CSV. Shopify REST API.",
    failed:"The first version had twelve charts because the data supported twelve charts. It was useless. Rebuilding with five charts made it something they used daily.",
    learned:["More data on a dashboard makes it less useful, not more.","Recharts is good enough for most dashboards. D3 is overkill unless you need custom geometry.","Asking what someone checks every morning is better than asking what data they want."],
    screenshots:[],
  },
];

export const SERVICES_DATA: Service[] = [
  { id:"web", num:"01", title:"Web Development", short:"Websites and web apps that load fast and hold up.",
    desc:"Full-stack web development. I handle the frontend, the backend if you need it, and the deployment. Most projects use Next.js and TypeScript. Core Web Vitals are not an afterthought.",
    items:["Landing pages and marketing sites","Full-stack web applications","E-commerce with real checkout flows","CMS integration (Contentful, Sanity, Notion)","Performance audits and optimization"],
    price:"Starting at $500", timeline:"1–6 weeks depending on scope" },
  { id:"design", num:"02", title:"UI/UX Design", short:"Design that works before it looks good.",
    desc:"Product design and UI work. I design in Figma and deliver files that developers can actually use — proper components, auto-layout, documented states. I think about the user flow before I think about how it looks.",
    items:["Product design from concept to handoff","Design systems and component libraries","User flow mapping and wireframing","Interface audits with specific recommendations","Brand identity and visual systems"],
    price:"Starting at $400", timeline:"1–4 weeks depending on scope" },
  { id:"app", num:"03", title:"App Development", short:"Cross-platform mobile apps with React Native.",
    desc:"React Native for iOS and Android from one codebase. Production apps, not demos. I've shipped apps that people actually use. I know the FlatList performance issues, the navigation quirks, the OTA update workflow.",
    items:["Cross-platform iOS and Android apps","Expo-based apps for faster deployment","Local-first apps with SQLite","App Store and Play Store submission","Maintenance and updates after launch"],
    price:"Starting at $800", timeline:"3–10 weeks depending on scope" },
  { id:"3d", num:"04", title:"3D & Motion", short:"WebGL, Three.js, and Framer Motion when it makes sense.",
    desc:"Interactive 3D on the web and complex animation systems. I use this when it genuinely improves the product — not as a novelty. I'm careful about performance: mobile users exist.",
    items:["Three.js and WebGL experiences","Framer Motion animation systems","3D product showcases","Interactive data visualizations","Motion design consultation"],
    price:"Starting at $600", timeline:"1–5 weeks depending on scope" },
];

export const TECH_ICONS: TechIconData[] = [
  { name:"Next.js",      slug:"nextdotjs",        color:"#ffffff" },
  { name:"React",        slug:"react",            color:"#61DAFB" },
  { name:"TypeScript",   slug:"typescript",       color:"#3178C6" },
  { name:"Tailwind CSS", slug:"tailwindcss",      color:"#06B6D4" },
  { name:"Three.js",     slug:"threedotjs",       color:"#ffffff" },
  { name:"Framer",       slug:"framer",           color:"#0055FF" },
  { name:"Node.js",      slug:"nodedotjs",        color:"#339933" },
  { name:"Figma",        slug:"figma",            color:"#F24E1E" },
  { name:"React Native", slug:"react",            color:"#61DAFB" },
  { name:"Git",          slug:"git",              color:"#F05032" },
  { name:"JavaScript",   slug:"javascript",       color:"#F7DF1E" },
  { name:"MongoDB",      slug:"mongodb",          color:"#47A248" },
  { name:"Vercel",       slug:"vercel",           color:"#ffffff" },
  { name:"HTML5",        slug:"html5",            color:"#E34F26" },
  { name:"CSS3",         slug:"css3",             color:"#1572B6" },
  { name:"Expo",         slug:"expo",             color:"#ffffff" },
  { name:"Storybook",    slug:"storybook",        color:"#FF4785" },
  { name:"VS Code",      slug:"visualstudiocode", color:"#007ACC" },
];

export const TIMELINE = [
  { year:"2020", event:"Started watching YouTube tutorials. First HTML page. It looked exactly like the tutorial." },
  { year:"2021", event:"Learned JavaScript. Spent three months building things that almost worked. Understood closures after the fifth time someone explained them." },
  { year:"2022", event:"Switched to React. Rebuilt everything I had made. Started taking design seriously after noticing that most developer side projects look developer-built." },
  { year:"2023", event:"First client project — the fitness tracking app. First time someone paid me for code. First time I experienced a scope change mid-project." },
  { year:"2024", event:"Three.js, Framer Motion, React Native. Shipped Go Fresh Meals — my first full production site for a real business. Started focusing on performance metrics." },
  { year:"2025", event:"This portfolio. Working with clients outside Ethiopia. Getting deeper into WebGL and thinking about system design for the first time." },
];

export const VALUES = [
  { title:"Honesty in the interface", body:"If a button does something surprising, that's a bug, not a feature. I care about UIs that say what they do and do what they say." },
  { title:"Performance is not optional", body:"I check Lighthouse scores. I care about cumulative layout shift. These are not extra steps — they are part of the work." },
  { title:"Less is usually more", body:"I've seen projects get worse with every feature added. I try to push back when scope grows past the core problem." },
  { title:"Readable code ages better", body:"The best code I've written is the code someone else could understand and change a year later without calling me." },
];

export const CURRENTLY_LEARNING = [
  "Getting deeper into WebGL shaders. Specifically noise functions and how to fake volumetric light.",
  "Reading about system design for the first time. It's making me rethink past architecture decisions.",
  "Learning how Three.js handles custom geometry under the hood — not just how to use it.",
];
