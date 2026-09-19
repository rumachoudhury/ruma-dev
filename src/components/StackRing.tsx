import Reveal from "./Reveal";
import { ringSkills, alsoUse } from "@/data/skills";
import type { CSSVars } from "@/hooks/cssVars";

/** A ring of 12 tiles that rotates in 3D using only CSS transforms. */
export default function StackRing() {
  return (
    <section className="section stack-sec" id="stack">
      <div className="wrap">
        <Reveal as="h2">Stack</Reveal>
        <Reveal as="p" className="lede" delay={1}>
          The tools I reach for across the browser, the API, the database and the tests. Hover to
          pause the ring.
        </Reveal>
      </div>

      <Reveal className="ring-stage" delay={2}>
        <div className="ring-tilt" role="list" aria-label="Technologies I work with">
          <div className="ring">
            {ringSkills.map((skill, i) => (
              <div
                className="tile"
                role="listitem"
                key={skill.name}
                style={{ "--i": i, "--tc": skill.color } as CSSVars}
              >
                <b>{skill.name}</b>
                <small>{skill.category}</small>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="wrap">
        <Reveal as="p" className="also">
          {alsoUse}
        </Reveal>
      </div>
    </section>
  );
}
