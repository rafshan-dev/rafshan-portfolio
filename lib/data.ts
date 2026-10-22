// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — the one file to edit for copy, links, and projects.
// Sourced from the updated resume (Md_Rafshanul_Hoque_Siam_Resume.pdf).
// Keep unverified project details out of the portfolio. Setting a link field
// to `null` hides the related button automatically.
// ─────────────────────────────────────────────────────────────────────────

export const siteUrl = "https://rafshan.dev";

export const site = {
  name: "Rafshanul Hoque Siam",
  role: "Senior Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "rafshanul.dev@gmail.com",
  phone: "+8801684454811",
  github: "https://github.com/rafshan-dev",
  linkedin: "https://www.linkedin.com/in/rafshanul-hoque-siam", // verify exact handle
  headline: "I build thoughtful web experiences that solve real problems.",
  intro:
    "Frontend engineer specializing in TypeScript, React, and Next.js, with 4+ years of experience building fast, interactive, cross-device interfaces for the fintech and marketing industries, with a focus on quality UX and DX.",
  seoDescription:
    "Portfolio of Rafshanul Hoque Siam, a Dhaka-based Senior Software Engineer specializing in TypeScript, React, and Next.js, building fast, interactive web applications for fintech and marketing.",
};

export const about = {
  paragraphs: [
    "I'm a frontend engineer who cares about the whole path from design to production: pixel-accurate interfaces from Figma, performance budgets that hold up, and codebases the next engineer can work in without fear.",
    "Currently at ConneQted agents, I optimize and architect a Next.js dashboard portal: a shared design system, an Nx monorepo, and tooling that turns microservice Swagger docs into TypeScript types. Before that I spent years at SoftwindTech building telco and marketing experiences for Robi, Airtel, DBL, and Banglalink, from interactive maps and data visualizations to Unity 3D integrations.",
    "I'm drawn to teams building products people rely on daily, where Core Web Vitals, type safety, and clear documentation are part of the definition of done.",
  ],
};

export type SkillGroup = { title: string; description: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces, motion, and visual work.",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "MUI",
      "Shadcn", "Bootstrap", "Framer Motion", "GSAP", "D3.js", "Chart.js",
      "Canvas", "React Three Fiber",
    ],
  },
  {
    title: "State & Data",
    description: "Predictable state and typed data flow.",
    skills: [
      "Redux", "Zustand", "RxJS", "TanStack Query", "REST APIs", "Swagger / OpenAPI",
      "Node.js", "Express", "Nest.js",
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Shipping and maintaining at scale.",
    skills: [
      "Git", "Docker", "Linux", "Nx Monorepo", "Micro-frontends", "Unit Testing",
      "Netlify", "Vercel", "Strapi / WordPress", "Jira & Confluence", "Figma",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  contribution: string;
  features: string[];
  stack: string[];
  image: string;
  demoUrl: string | null;
  sourceUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "pdf-pack",
    name: "PDF Pack",
    tagline: "A free SaaS toolkit for everyday PDF work.",
    problem:
      "People need to merge, split, compress, or convert PDFs, but end up in cluttered, ad-heavy tools or desktop installs for a one-off task.",
    contribution:
      "Developed the SaaS platform with a custom PDF implementation, focused on fast uploads and downloads and sub-2-second load times.",
    features: [
      "Merge, split, compress, and convert PDF files",
      "Fast uploads/downloads with sub-2-second load times",
      "Integrated analytics, targeting 50,000+ monthly active users within three months of launch",
    ],
    stack: ["Next.js", "Canvas", "React PDF (custom)"],
    image: "/projects/pdf-pack.svg",
    demoUrl: "https://pdfpack.com/",
    sourceUrl: null,
  },
  {
    slug: "toffee-quiz-app",
    name: "Quiz Application (Toffee)",
    tagline: "A full-featured quiz app built in two days.",
    problem:
      "Quiz experiences must feel snappy and rewarding, and this one had a hard constraint: UI design through UAT in a 2-day window.",
    contribution:
      "Owned the build end to end, from UI design to UAT, demonstrating rapid prototyping and delivery.",
    features: [
      "Complete question, scoring, and results flow",
      "UI designed and built from scratch",
      "Delivered through UAT within the 2-day deadline",
    ],
    stack: ["Next.js", "React", "Zustand", "Context API", "Axios"],
    image: "/projects/toffee-quiz.svg",
    demoUrl: null, // TODO: add link if publicly viewable
    sourceUrl: null,
  },
  {
    slug: "noobfeed",
    name: "NoobFeed & Critop",
    tagline: "Gaming review sites with critic and gamer reviews.",
    problem:
      "Review sites live on discoverability and speed: readers need ratings and insights across platforms, loading fast with high-resolution media.",
    contribution:
      "Developed the dynamic review sites, focusing on SEO and performance with ISR and optimized media delivery.",
    features: [
      "Critic and gamer reviews, ratings, and insights across platforms",
      "Organic traffic boosted 40% through SEO and performance work",
      "Google PageSpeed score of A",
    ],
    stack: ["Next.js", "TypeScript", "ISR"],
    image: "/projects/noobfeed.svg",
    demoUrl: "https://www.noobfeed.com/",
    sourceUrl: null,
  },
];

export type MoreWork = {
  name: string;
  description: string;
  stack: string[];
  links?: { label: string; url: string }[];
};

export const moreWork: MoreWork[] = [
  {
    name: "Telco Websites (Robi & Airtel)",
    description:
      "Owned end-to-end development of scalable modules for dashboards, packs, offers, purchases, maps, and digital services, serving 12K+ users, improving SEO 25%+, and keeping load under 3s.",
    stack: ["React", "Next.js", "Redux", "Google Maps", "Nx", "MUI"],
    links: [
      { label: "Robi", url: "https://www.robi.com.bd/en" },
      { label: "Airtel", url: "https://www.bd.airtel.com/en" },
    ],
  },
  {
    name: "Blockstak",
    description:
      "AI-driven web products: responsive interfaces, interactive features, and scalable components, collaborating on MVPs and AI integrations.",
    stack: ["Next.js", "TanStack Query", "Shadcn"],
  },
  {
    name: "Laxfo (DBL Group)",
    description:
      "Core developer improving UX, responsiveness, performance, and accessibility, delivering timely updates within tight deadlines.",
    stack: ["Next.js", "Bootstrap", "Tailwind", "Zustand"],
    links: [{ label: "Visit", url: "https://laxfo.net/en" }],
  },
  {
    name: "Robi FWA",
    description:
      "Custom web portal where users manage accounts, track orders, and purchase services. Expected outcomes: 30% higher online engagement and 25% lower call centre volume.",
    stack: ["Next.js", "Tailwind", "Redux", "Axios"],
    links: [{ label: "Visit", url: "https://robiwifi.robi.com.bd/" }],
  },
  {
    name: "Virtual Jewellery Try-on",
    description:
      "WebAR experience built for SoftwindTech that lets users try on jewellery virtually, currently across three categories.",
    stack: ["React", "React Three Fiber", "WebARRock", "SCSS"],
  },
  {
    name: "Interactive Microsites",
    description:
      "Robi T20 World Cup dual-video quiz, Mojo's Eid-ul-Adha cow-sound voice game, and the Liberation Battle comic story with synchronized audio and mobile vibration.",
    stack: ["Next.js", "React", "Context API", "Zustand", "Axios"],
  },
];

export type Role = { title: string; start: string; end: string; highlights: string[] };

export type ExperienceEntry = { company: string; summary?: string; roles: Role[] };

export const experience: ExperienceEntry[] = [
  {
    company: "ConneQted agents",
    roles: [
      {
        title: "Senior Software Engineer",
        start: "May 2025",
        end: "Present",
        highlights: [
          "Optimized a legacy Next.js application to a 90%+ Core Web Vitals score and cut bundle size by ~40%",
          "Advocated type-safe code standards, linting, and unit testing to improve maintainability",
          "Architected features and a design system in Next.js, with reusable components and directives for an integrated dashboard portal",
          "Consolidated projects into an Nx monorepo with shared libraries, eliminating code duplication",
          "Automated conversion of Swagger docs from multiple microservices into ready-to-use TypeScript types via a custom tool",
          "Authored documentation and guides for internal libraries used by affiliates and teammates",
        ],
      },
    ],
  },
  {
    company: "SoftwindTech Ltd.",
    roles: [
      {
        title: "Senior Frontend Engineer",
        start: "Sep 2023",
        end: "Apr 2025",
        highlights: [
          "Reduced load time by migrating a React Router project to Next.js Incremental Static Regeneration",
          "Recognized as a Star-rated developer in the annual evaluation for contributions beyond core responsibilities",
          "Improved Web Vitals and built SEO-friendly features across multiple web apps",
          "Migrated a class-based React telco website to functional React, then to a Next.js custom server",
        ],
      },
      {
        title: "Frontend Developer (React)",
        start: "Jun 2022",
        end: "Aug 2023",
        highlights: [
          "Delivered pixel-perfect, responsive UIs from Figma for Robi, Airtel, DBL, and Banglalink",
          "Built data visualizations, interactive maps, and marketing experiences with D3.js, Canvas, Chart.js, GSAP, Framer Motion, Sensor APIs, and CSS animations",
          "Integrated Unity 3D experiences into React via iframe and message passing",
          "Partnered with designers and stakeholders on technically constrained, business-critical features",
        ],
      },
    ],
  },
  {
    company: "eCarnivalBD Ltd.",
    roles: [
      {
        title: "Junior Software Engineer",
        start: "Jan 2021",
        end: "Aug 2022",
        highlights: [
          "Analyzed and refactored legacy code to improve performance, readability, and maintainability",
          "Contributed to the in-house product, translating client requirements into scalable solutions",
          "Contributed system design ideas and improvements in scrum meetings",
        ],
      },
    ],
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  detail: string;
  start?: string;
  end?: string;
};

export const education: EducationEntry[] = [
  {
    degree: "BSc in Computer Science and Engineering",
    institution: "Southeast University",
    detail: "CGPA 3.40 / 4.00",
    start: "Jan 2016",
    end: "Dec 2020",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Shaheed Ramiz Uddin Cantonment College",
    detail: "Science · GPA 4.58 / 5.00",
    end: "2015",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Uttar Khan Collegiate School",
    detail: "Science · GPA 4.88 / 5.00",
    end: "2013",
  },
  {
    degree: "Pearson Test of English (PTE)",
    institution: "English proficiency",
    detail: "Overall score: 66",
  },
];

export const contact = {
  heading: "Let's build something worth using.",
  body: "I'm open to conversations about senior frontend roles, freelance engagements, and interesting collaborations. If something here is relevant to what you're building, reach out.",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
