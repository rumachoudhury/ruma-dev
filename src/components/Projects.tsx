import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { featuredProjects, moreProjects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal as="h2">Selected work</Reveal>
        <Reveal as="p" className="lede" delay={1}>
          Three apps I&apos;m proud of, from a healthcare site with online
          booking to an ecommerce monorepo with an AI assistant.
        </Reveal>

        <div className="grid3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i} />
          ))}
        </div>

        <div className="more">
          <Reveal as="h3">More projects</Reveal>
          <div className="more-grid">
            {moreProjects.map((project, i) => (
              <Reveal
                as="article"
                className="mini"
                delay={i % 2}
                key={project.title}
              >
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <ul className="chips">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="links">
                  {project.links.map((l) => (
                    <a className="txt" href={l.href} key={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="all">
            <a className="btn" href={profile.githubRepos}>
              See all repositories on GitHub
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
