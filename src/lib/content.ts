export const NAV_LINKS = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "SERVICES", id: "services" },
  { label: "WORK", id: "work" },
  { label: "PRODUCTS", id: "capabilities" },
] as const;

export const HERO_LABELS = ["WEB DEVELOPMENT", "SOFTWARE", "AI", "DIGITAL PRODUCTS"] as const;

export type Service = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "WEBSITE DEVELOPMENT",
    summary:
      "Business websites, landing pages, portfolios, e-commerce experiences, and modern web applications.",
    detail:
      "From a sharp single-page presence to a complete e-commerce experience, we design and engineer websites that load fast, rank well, and feel effortless to use. Every build is responsive, performance-audited, and prepared to grow with the business behind it.",
    tags: ["Business Websites", "Landing Pages", "Portfolios", "E-Commerce", "Web Apps"],
  },
  {
    index: "02",
    title: "UI/UX DESIGN",
    summary:
      "Beautiful interfaces, thoughtful user experiences, interactive prototypes, and design systems.",
    detail:
      "We shape how a product feels before a single line of code is written. Research, wireframes, interactive prototypes, and scalable design systems ensure the final interface is beautiful, intuitive, and consistent across every screen.",
    tags: ["Interface Design", "User Flows", "Prototypes", "Design Systems"],
  },
  {
    index: "03",
    title: "CUSTOM SOFTWARE",
    summary:
      "Business management systems, dashboards, booking systems, and custom applications.",
    detail:
      "Off-the-shelf tools rarely fit a business perfectly. We engineer custom software around the way you actually work — management systems, operational dashboards, booking platforms, and internal tools built to be reliable and easy to evolve.",
    tags: ["Management Systems", "Dashboards", "Booking Systems", "Internal Tools"],
  },
  {
    index: "04",
    title: "AI SOLUTIONS",
    summary:
      "AI-powered applications, intelligent assistants, chatbots, and AI integrations.",
    detail:
      "We build practical AI: assistants that answer customers, chatbots that qualify inquiries, and integrations that bring intelligence into the tools a business already uses. Every AI feature is scoped to solve a real problem — never added for hype.",
    tags: ["AI Applications", "Assistants", "Chatbots", "AI Integrations"],
  },
  {
    index: "05",
    title: "BUSINESS AUTOMATION",
    summary:
      "Workflow automation, customer inquiry automation, reporting, and operational systems.",
    detail:
      "Repetitive work is where software quietly earns its value. We automate inquiry handling, reporting, follow-ups, and operational workflows so teams spend their time on decisions instead of manual tasks.",
    tags: ["Workflow Automation", "Inquiry Handling", "Reporting", "Ops Systems"],
  },
  {
    index: "06",
    title: "MAINTENANCE & SUPPORT",
    summary:
      "Website maintenance, performance improvements, bug fixing, security, and technical support.",
    detail:
      "Launch is the beginning, not the end. We keep websites and systems healthy with ongoing maintenance, performance tuning, security updates, fast bug fixes, and a direct line to the people who built your product.",
    tags: ["Maintenance Plans", "Performance", "Security", "Support"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  approach: string;
  stack: string[];
  previewKind: "landing" | "commerce" | "dashboard" | "experience" | "ai" | "brand";
  accentNote: string;
};

export const PROJECT_CATEGORIES = [
  "ALL",
  "BUSINESS WEBSITES",
  "E-COMMERCE",
  "SAAS & DASHBOARDS",
  "DIGITAL EXPERIENCES",
  "AI APPLICATIONS",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "meridian",
    title: "MERIDIAN",
    category: "BUSINESS WEBSITES",
    year: "2026",
    description:
      "A concept website for an architecture studio — an editorial, image-led experience presenting projects, practice, and philosophy.",
    approach:
      "Oversized typography, generous negative space, and a project index that behaves like a printed monograph. Built around a flexible CMS-ready content structure.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    previewKind: "landing",
    accentNote: "Editorial grid / full-bleed imagery",
  },
  {
    id: "auric",
    title: "AURIC",
    category: "E-COMMERCE",
    year: "2026",
    description:
      "A concept storefront for a contemporary metalwork and jewelry label — minimal product presentation with a quiet, luxurious checkout flow.",
    approach:
      "Monochrome product photography language, distraction-free product pages, and a conversion-focused cart experience with persistent state.",
    stack: ["Next.js", "React", "Payments API", "Framer Motion"],
    previewKind: "commerce",
    accentNote: "Product-first / quiet luxury",
  },
  {
    id: "pulseboard",
    title: "PULSEBOARD",
    category: "SAAS & DASHBOARDS",
    year: "2025",
    description:
      "A concept analytics dashboard turning raw operational data into a calm, legible command center for decision makers.",
    approach:
      "Information hierarchy first: one glance for health, one click for depth. Dark UI, dense data tables, and live-updating visualizations.",
    stack: ["React", "TypeScript", "Recharts", "REST APIs"],
    previewKind: "dashboard",
    accentNote: "Data density / calm control",
  },
  {
    id: "nocturne",
    title: "NOCTURNE",
    category: "DIGITAL EXPERIENCES",
    year: "2025",
    description:
      "A concept interactive experience for an independent music release — scroll-driven visuals, audio-reactive motion, and collectible moments.",
    approach:
      "WebGL scenes synchronized with scroll and sound. Built to make a release feel like a place you visit, not a file you download.",
    stack: ["Three.js", "GSAP", "Web Audio API", "React"],
    previewKind: "experience",
    accentNote: "WebGL / audio-reactive",
  },
  {
    id: "atlas-ai",
    title: "ATLAS AI",
    category: "AI APPLICATIONS",
    year: "2026",
    description:
      "A concept document-intelligence assistant that reads contracts, answers questions, and surfaces risks with cited sources.",
    approach:
      "Retrieval-augmented answering with transparent citations. The interface shows its sources — trust is designed, not claimed.",
    stack: ["Next.js", "LLM APIs", "Vector Search", "TypeScript"],
    previewKind: "ai",
    accentNote: "RAG / cited answers",
  },
  {
    id: "terra-form",
    title: "TERRA FORM",
    category: "BUSINESS WEBSITES",
    year: "2025",
    description:
      "A concept site for a sustainable materials brand — technical specifications presented with editorial calm and tactile detail.",
    approach:
      "Structured spec data rendered as narrative. Material libraries, filterable catalogs, and inquiry flows engineered for B2B buyers.",
    stack: ["Next.js", "Sanity-style CMS", "Tailwind CSS"],
    previewKind: "brand",
    accentNote: "Spec-driven / B2B calm",
  },
];

export const CURRENT_WEB = ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS"] as const;
export const CURRENT_INFRA = ["SUPABASE", "DATABASES", "API INTEGRATIONS", "VERCEL"] as const;
export const FUTURE_TECH = ["PYTHON", "ARTIFICIAL INTELLIGENCE", "AUTOMATION", "CLOUD SYSTEMS"] as const;

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "DISCOVER",
    text: "Understand the business, objectives, audience, and requirements.",
  },
  {
    index: "02",
    title: "DESIGN",
    text: "Develop the experience, structure, and visual direction.",
  },
  {
    index: "03",
    title: "DEVELOP",
    text: "Engineer, test, refine, and optimize the solution.",
  },
  {
    index: "04",
    title: "DELIVER",
    text: "Launch, support, and continuously improve.",
  },
] as const;

export const WHY_POINTS = [
  { title: "PURPOSE-DRIVEN DEVELOPMENT", text: "Every feature earns its place. We build what moves the business forward." },
  { title: "MODERN ENGINEERING", text: "Current, proven technology — chosen for longevity, not novelty." },
  { title: "ATTENTION TO DETAIL", text: "Spacing, motion, edge cases. The details are the product." },
  { title: "TRANSPARENT COMMUNICATION", text: "Clear scopes, honest timelines, direct conversations — no intermediaries." },
  { title: "PERFORMANCE-FOCUSED", text: "Fast by default. Speed is a feature your users can feel." },
  { title: "LONG-TERM THINKING", text: "We build systems meant to grow, not demos meant to impress once." },
] as const;

export const ENGAGEMENT_MODELS = [
  {
    index: "01",
    title: "PROJECT BASED",
    desc: "For websites, landing pages, and custom development projects.",
    points: ["Fixed scope & timeline", "Defined deliverables", "Launch & handover support"],
  },
  {
    index: "02",
    title: "ONGOING PARTNERSHIP",
    desc: "For maintenance, support, and continuous improvements.",
    points: ["Priority response", "Continuous optimization", "A studio that knows your product"],
  },
  {
    index: "03",
    title: "CUSTOM SOLUTIONS",
    desc: "For advanced software, automation, and AI-powered systems.",
    points: ["Discovery-led scoping", "Architecture & build", "Iterative rollout"],
  },
] as const;

export const COLLABORATION_COMMITMENTS = [
  {
    title: "CLEAR SCOPE",
    text: "Before any work begins, you know exactly what is being built, when, and why.",
  },
  {
    title: "VISIBLE PROGRESS",
    text: "Working previews throughout the build — you watch the product take shape, not wait for a reveal.",
  },
  {
    title: "DIRECT ACCESS",
    text: "You speak with the people building your product. Nothing is lost in translation.",
  },
  {
    title: "HONEST ADVICE",
    text: "If something should not be built, we say so. Our reputation compounds with every project.",
  },
] as const;

export const FAQS = [
  {
    q: "What services does QODIX provide?",
    a: "QODIX builds websites, e-commerce experiences, UI/UX design systems, custom software such as dashboards and management tools, AI-powered applications, business automation, and ongoing maintenance and support.",
  },
  {
    q: "How does the development process work?",
    a: "Every engagement moves through four stages: Discover (understanding your goals), Design (structure and visual direction), Develop (engineering, testing, refinement), and Deliver (launch and continued support). You see working previews at every stage.",
  },
  {
    q: "How can I start a project?",
    a: "Use the Start a Project form on this site or reach out directly. We begin with a short conversation about your goals, follow with a written scope and quote, then move into design and development once everything is agreed.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. QODIX is remote-first and works with clients across time zones. Communication is async-friendly with scheduled calls when they matter, so distance never slows a project down.",
  },
  {
    q: "Can you develop custom software?",
    a: "Yes. We build custom applications around how your business actually works — management systems, booking platforms, internal dashboards, and integrations between the tools you already use.",
  },
  {
    q: "Do you provide website maintenance?",
    a: "Yes. We offer ongoing maintenance covering updates, performance improvements, security, bug fixes, and small content changes, so your website stays healthy long after launch.",
  },
  {
    q: "How are project costs determined?",
    a: "Costs follow scope. After a short discovery conversation we provide a transparent, written estimate — no hourly ambiguity and no surprises mid-project. Engagement models range from fixed-scope projects to ongoing partnerships.",
  },
  {
    q: "Can you integrate AI into an existing business?",
    a: "Yes. We add AI where it creates measurable value — customer-facing assistants, inquiry automation, intelligent search, and workflow intelligence — integrated into the systems your business already runs on.",
  },
] as const;

export const PROJECT_TYPES = [
  "Website",
  "E-Commerce",
  "Web Application",
  "UI/UX Design",
  "Custom Software",
  "AI Solution",
  "Business Automation",
  "Maintenance & Support",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Under ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const;

export const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"] as const;
