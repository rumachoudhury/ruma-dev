"use client";

import type { PointerEvent } from "react";
import { useRevealOnce } from "@/hooks/useRevealOnce";
import type { CSSVars } from "@/hooks/cssVars";
import type { FeaturedProject } from "@/data/projects";
import { Visual } from "./visuals";

interface Props {
  project: FeaturedProject;
  delay?: number;
}

/** A featured project. It tilts toward the cursor and its layers float forward on hover. */
export default function ProjectCard({ project, delay = 0 }: Props) {
  const wrapRef = useRevealOnce<HTMLDivElement>();
  const cardRef = useRevealOnce<HTMLElement>();

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((x - 0.5) * 14).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 14).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={wrapRef} className="card-wrap reveal" style={{ "--d": delay } as CSSVars}>
      <article ref={cardRef} className="card" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="card-bg" />
        <Visual kind={project.visual} />
        <div className="card-body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className="chips">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="links">
            <a className="btn small" href={project.repo}>
              View code
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
