"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/profile";

const links = [
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const active = useActiveSection(links.map((l) => l.id));

  return (
    <header className="site-header">
      <div className="pill">
        <a className="logo" href="#top" aria-label={`${profile.name}, back to top`}>
          RC
        </a>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="pill-r">
          <a className="btn small" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a className="btn primary small" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
