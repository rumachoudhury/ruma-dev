export interface RingSkill {
  name: string;
  category: string;
  color: string;
}

/** Exactly 12 items: the 3D ring places each one 30 degrees apart. */
export const ringSkills: RingSkill[] = [
  { name: "React", category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", color: "#8B8FA8" },
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "Node.js", category: "Backend", color: "#68A063" },
  { name: "Express", category: "Backend", color: "#9AA0B4" },
  { name: "MongoDB", category: "Database", color: "#47A248" },
  { name: "Supabase", category: "Database", color: "#3ECF8E" },
  { name: "Tailwind CSS", category: "Styling", color: "#38BDF8" },
  { name: "Framer Motion", category: "Animation", color: "#FF5CAA" },
  { name: "GSAP", category: "Animation", color: "#88CE02" },
  { name: "NoSQL", category: "Database", color: "#F59E0B" },
  { name: "Cypress", category: "Testing", color: "#5DF2A0" },
];

export const toolbox = [
  {
    label: "Frontend",
    items:
      "HTML, CSS, Sass, Tailwind CSS, Bootstrap, JavaScript, TypeScript, React, Next.js, Framer Motion, GSAP",
  },
  {
    label: "Backend",
    items: "Node.js, Express, MongoDB, Mongoose, Supabase",
  },
  {
    label: "Tools",
    items: "Git, GitHub, Postman, VS Code, Cypress, Turborepo, n8n",
  },
];

export const alsoUse =
  "Also: HTML, CSS, Sass, Bootstrap, JavaScript, Mongoose, Turborepo, n8n, Postman, Git, GitHub and VS Code.";
