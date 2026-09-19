import Reveal from "./Reveal";
import { profile } from "@/data/profile";

const highlights = [
  "MERN Stack / Full-Stack Developer with 2+ years of hands-on project experience",
  "Strong front-end skills in React, Next.js, TypeScript, Tailwind CSS, and modern UI patterns",
  "Full-stack delivery across Node.js, Express.js, MongoDB, and API integrations",
  "Focused on responsive, accessible, and user-friendly product experiences",
];

const skills = [
  "HTML5, CSS3, JavaScript, TypeScript",
  "React.js, Next.js, Tailwind CSS, Sass",
  "Node.js, Express.js, MongoDB, Mongoose, Prisma",
  "Git, GitHub, Vercel, Postman, Cypress",
];

export default function Resume() {
  return (
    <section className="section" id="resume">
      <div className="wrap resume-wrap">
        <Reveal as="h2">Resume</Reveal>

        <Reveal delay={1}>
          <div className="resume-panel">
            <div className="resume-header">
              <div>
                <p className="resume-kicker">Professional summary</p>
                <h3>{profile.name}</h3>
              </div>
              <a className="btn primary small" href={profile.resume} target="_blank" rel="noreferrer">
                Open resume
              </a>
            </div>

            <div className="resume-grid">
              <div>
                <p className="resume-text">
                  MERN Stack / Full-Stack Developer with 2+ years of hands-on, project-based experience
                  building responsive, user-focused web applications. Skilled in React.js, Next.js,
                  JavaScript, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB, with
                  experience developing modern frontend interfaces and full-stack applications.
                </p>

                <ul className="resume-list">
                  {highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="resume-side">
                <div className="resume-box">
                  <h4>Core stack</h4>
                  <ul>
                    {skills.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="resume-box">
                  <h4>Highlights</h4>
                  <ul>
                    <li>MERN Full-Stack Software Engineer</li>
                    <li>TS4U Bootcamp</li>
                    <li>English &amp; Bengali</li>
                    <li>Based in New York, NY</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
