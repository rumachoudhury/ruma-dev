import Reveal from "./Reveal";
import { toolbox } from "@/data/skills";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <Reveal as="h2">About</Reveal>
        <Reveal delay={1}>
          <div className="prose">
            <p>
              I&apos;m a full-stack developer who recently finished an intensive IT bootcamp. I build
              with the MERN stack and Next.js, and I like working on the whole path of a feature: the
              interface someone clicks, the API behind it, and the data it saves.
            </p>
            <p>
              I write JavaScript and TypeScript, build REST APIs with Node and Express, model data
              with MongoDB and Supabase, and test whole flows with Cypress. Lately I&apos;ve been
              adding AI features to my apps too, like an assistant wired up with n8n.
            </p>
            <p>
              Right now I&apos;m going deeper on Next.js and React, and I&apos;m preparing for my first
              full-time developer role.
            </p>
          </div>
          <dl className="toolbox">
            {toolbox.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
