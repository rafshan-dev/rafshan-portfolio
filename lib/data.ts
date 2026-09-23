// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT
// This is the single file you need to edit to update the portfolio's copy.
// Sourced from Rafshanul's resume (FlowCV export). A couple of small gaps
// that weren't in the resume are still marked "PLACEHOLDER" — search for
// that word before shipping. Setting a link field to `null` hides the
// related button automatically.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Rafshanul Hoque Siam",
  role: "Senior Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "rafshanulsiam811@gmail.com",
  phone: "+8801684454811",
  github: "https://github.com/siam88",
  gitlab: "https://gitlab.com/siam88",
  linkedin: "https://linkedin.com/in/siam88",
  website: "https://mrhoque.netlify.app",
  headline: "I build thoughtful web experiences that solve real problems.",
  intro:
    "I'm a Dhaka-based software engineer with 4+ years of experience shipping production web applications for telecom, e-commerce, and SaaS products — from large-scale customer portals used by hundreds of thousands of people to focused tools built under two-day deadlines.",
  seoDescription:
    "Portfolio of Rafshanul Hoque Siam, a Dhaka-based Senior Software Engineer specializing in React, Next.js, and TypeScript, with 4+ years of experience building web applications for telecom, e-commerce, and SaaS products.",
};

export const about = {
  paragraphs: [
    "I'm a frontend-focused engineer with 4+ years of experience building web applications end to end — from large customer-facing portals for telecom operators to focused SaaS tools and gaming platforms.",
    "Most of my work has involved translating complex, multi-stakeholder requirements into interfaces that stay fast and maintainable at scale — improving Core Web Vitals and SEO performance across production apps, and building the dashboards, purchase flows, and interactive experiences that sit on top of them.",
    "I'm currently a Senior Software Engineer at softwindTech Ltd., where I work across client engagements for companies including Robi, Airtel, DBL, and Banglalink, alongside internal SaaS and gaming products.",
  ],
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Building interfaces and the systems behind them.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "SASS",
      "Bootstrap",
      "Material UI",
      "Ant Design",
    ],
  },
  {
    title: "State & Data",
    description: "Keeping application state predictable at scale.",
    skills: ["Redux", "Zustand", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & Deployment",
    description: "Shipping and running software in production.",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "React Testing Library",
      "ElectronJS",
      "Node.js",
      "Trello",
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
  image: string; // path under /public
  demoUrl: string | null; // null hides the "Live Demo" button
  sourceUrl: string | null; // null hides the "Source Code" button
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "pdf-pack",
    name: "PDF Pack",
    tagline: "A free, focused SaaS toolkit for everyday PDF operations.",
    problem:
      "People frequently need to merge, split, compress, or convert PDFs but end up bouncing between cluttered, ad-heavy web tools or installing desktop software for a one-off task.",
    contribution:
      "Developing this SaaS platform from the ground up, with a focus on fast uploads/downloads and keeping large-file processing under a two-second load target.",
    features: [
      "Merge, split, compress, and convert PDF files",
      "Fast uploads and downloads, tuned for large PDFs",
      "Integrated analytics to track user engagement",
      "Consistent interaction pattern reused across every tool in the suite",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/pdf-pack.svg",
    demoUrl: "https://pdfpack.com/",
    sourceUrl: null,
    featured: true,
  },
  {
    slug: "toffee-quiz-app",
    name: "TidBit — Quiz by Toffee",
    tagline: "An interactive quiz app built end to end in a two-day sprint.",
    problem:
      "Quiz-style experiences need to feel snappy and rewarding — and this one came with a hard constraint: the entire build, from UI design to development to UAT, had to land in two days.",
    contribution:
      "Owned the full build myself — UI design and markup, development, and user acceptance testing — under that compressed timeline.",
    features: [
      "Full question, scoring, and results flow",
      "UI designed and built from scratch, not adapted from a template",
      "Shipped through UAT within the two-day window",
    ],
    stack: ["Next.js", "TypeScript"],
    image: "/projects/toffee-quiz.svg",
    demoUrl: null, // TODO: add link if this is publicly viewable
    sourceUrl: null,
  },
  {
    slug: "noobfeed",
    name: "NoobFeed",
    tagline: "A dynamic gaming review platform.",
    problem:
      "Gaming review sites live or die on how easily readers can browse critiques and ratings across a constant stream of new releases without the interface getting in the way.",
    contribution:
      "Built the platform's core experience — critique and ratings display, insights across multiple gaming platforms, and the performance work behind it.",
    features: [
      "Comprehensive critiques, ratings, and insights across platforms",
      "Built for a Google performance rating of A",
      "Structured content layout for fast browsing of new releases",
    ],
    stack: ["Next.js", "TypeScript"],
    image: "/projects/noobfeed.svg",
    demoUrl: "https://www.noobfeed.com/",
    sourceUrl: null,
  },
  {
    slug: "excellent-leather-agency",
    name: "Excellent Leather Agency",
    tagline: "A storefront-style site for a leather goods business.",
    problem:
      "A product-based business needed a web presence that presents its catalog clearly and builds enough trust to convert visits into inquiries, without the overhead of a full e-commerce platform.",
    contribution:
      "Built the site's frontend — product presentation, layout, and responsive behavior — translating brand and catalog requirements into a straightforward, browsable interface.",
    features: [
      "Structured product catalog with categories",
      "Responsive layout tuned for product photography",
      "Fast page loads via static generation",
      "Clear inquiry/contact pathway for prospective buyers",
    ],
    stack: ["React", "Next.js", "Tailwind CSS"],
    image: "/projects/excellent-leather.svg",
    demoUrl: null, // TODO: add live demo URL if/when available
    sourceUrl: null, // TODO: add repository URL if it's public
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "softwindTech Ltd.",
    role: "Senior Software Engineer",
    start: "Jun 2022",
    end: "Present",
    location: "Dhaka, Bangladesh",
    summary:
      "Collaborating with multidisciplinary teams across major client engagements — including Robi, Airtel, DBL, and Banglalink — building and maintaining production web applications on the MERN stack.",
    highlights: [
      "Improved Web Vitals scores and page performance across multiple production web apps",
      "Developed SEO-friendly features to support organic growth for client platforms",
      "Built and maintained applications on the MERN stack, from dashboards to interactive microsites",
      "Introduced technical fixes for recurring development issues to keep delivery on schedule",
    ],
  },
  {
    company: "eCarnivalBD Ltd.",
    role: "Software Engineer",
    start: "Jan 2021",
    end: "May 2022",
    location: "Dhaka, Bangladesh",
    summary:
      "Contributed to the core development team building the company's in-house product, working closely with the scrum team on system design and delivery.",
    highlights: [
      "Contributed to a product update associated with a 27% increase in revenue and 170% more new customers",
      "Maintained code integrity and organization across the codebase",
      "Fed system design and improvement proposals into scrum planning",
    ],
  },
  {
    company: "Nanosoft Ltd.",
    role: "Software Engineering Intern",
    start: "Feb 2020",
    end: "May 2020",
    location: "Dhaka, Bangladesh",
    summary:
      "Early-career internship focused on requirements gathering and working within an existing codebase.",
    highlights: [
      "Met directly with clients to discuss project-specific requirements",
      "Reviewed and rewrote existing code for clarity and effectiveness",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  start: string;
  end: string;
  location: string;
};

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "Southeast University",
    start: "2016",
    end: "2021",
    location: "Dhaka, Bangladesh",
  },
];

export const certificates: string[] = [
  "Scrum Foundation Professional Certificate (SFPC)",
  "Interactivity with JavaScript",
  "JavaScript Intermediate",
];

export const languages: string[] = ["English", "Bangla"];

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
