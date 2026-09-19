export type VisualKind = "shop" | "therapy" | "sora";

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  visual: VisualKind;
}

export interface MoreProject {
  title: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
}

const GH = "https://github.com/rumachoudhury";

/** The three big cards. Add `live: "https://..."` support in Projects.tsx if you deploy them. */
export const featuredProjects: FeaturedProject[] = [
  {
    title: "Ecommerce monorepo with an AI assistant",
    description:
      "A full-stack ecommerce app in a Turborepo monorepo, with an AI assistant built on n8n.",
    tech: ["Next.js", "Turborepo", "TypeScript", "Tailwind CSS", "n8n"],
    repo: `${GH}/monorepo-ecommerce-app`,
    visual: "shop",
  },
  {
    title: "Bright Path Therapy",
    description:
      "A full-stack healthcare website with appointment booking, contact management and an admin dashboard.",
    tech: ["Next.js", "Node.js", "Express", "MongoDB"],
    repo: `${GH}/bright-path-therapy`,
    visual: "therapy",
  },
  {
    title: "Sora landing page",
    description:
      "A landing page for a calm, mindful productivity workspace, with smooth animations and a responsive layout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    repo: `${GH}/Sora-LandingPage`,
    visual: "sora",
  },
];

export const moreProjects: MoreProject[] = [
  {
    title: "Single-vendor platform",
    description:
      "A single-vendor project split into a client, a backend and a Python AI service.",
    tech: ["TypeScript", "Python"],
    links: [
      { label: "Client", href: `${GH}/single-vendor-client1` },
      { label: "Backend", href: `${GH}/single-vendor-backend1` },
      { label: "AI service", href: `${GH}/single-vendor-ai1` },
    ],
  },
  {
    title: "AI form builder",
    description: "An AI form builder, split into a client and a backend.",
    tech: ["TypeScript"],
    links: [
      { label: "Client", href: `${GH}/ai-form-builder-client` },
      { label: "Backend", href: `${GH}/ai-form-builder-backend` },
    ],
  },
  {
    title: "School management dashboard",
    description: "A dashboard for managing a school, built in TypeScript.",
    tech: ["TypeScript"],
    links: [{ label: "Code", href: `${GH}/school-management-dashboard` }],
  },
  {
    title: "Fresh Bucket",
    description: "A JavaScript web app, deployed live on Netlify.",
    tech: ["JavaScript", "Netlify"],
    links: [
      { label: "Live site", href: "https://splendorous-monstera-13bfe5.netlify.app/" },
      { label: "Code", href: `${GH}/Fresh-Bucket` },
    ],
  },
];
