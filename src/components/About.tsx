import Reveal from "./Reveal";
import { toolbox } from "@/data/skills";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <div className="about-side">
          <Reveal as="h2">About</Reveal>
          <div className="about-card">
            <p className="about-kicker">Currently</p>
            <h3>{profile.name}</h3>
            <p className="about-summary">
              Full-stack developer focused on building clean, scalable, and
              user-centered web experiences.
            </p>
            <ul className="about-meta">
              <li>
                <span>Location</span>
                <strong>{profile.location}</strong>
              </li>
              <li>
                <span>Status</span>
                <strong>{profile.availability}</strong>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <Reveal delay={1}>
          <div className="prose">
            <p>
              I&apos;m a full-stack developer with hands-on experience building
              modern web applications from concept to deployment. My work spans
              both the frontend and backend, from polished user interfaces to
              scalable APIs and robust data models.
            </p>
            <p>
              I work primarily with JavaScript and TypeScript, build REST APIs
              with Node.js and Express, and design data layers with MongoDB and
              Supabase. I also use Cypress to test end-to-end user flows and
              have recently expanded into AI-powered product experiences,
              including workflow automation with n8n.
            </p>
            <p>
              I&apos;m currently deepening my expertise in Next.js and React
              while preparing for my next full-time developer opportunity.
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
