import HeroScene from "./HeroScene";
import { profile } from "@/data/profile";
import type { CSSVars } from "@/hooks/cssVars";

export default function Hero() {
  // Split the name into words and letters so each letter can flip up in 3D.
  const words = profile.name.split(" ");
  let index = 0;

  return (
    <div className="wrap hero">
      <div className="hero-text">
        <span className="status">
          <i aria-hidden="true" />
          {profile.availability}
        </span>

        <h1 aria-label={profile.name}>
          {words.map((word) => (
            <span key={word} className="word" aria-hidden="true">
              {word.split("").map((ch) => {
                const i = index++;
                return (
                  <span key={i} className="ch" style={{ "--c": i } as CSSVars}>
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="role">{profile.role}</p>

        <div className="actions">
          <a className="btn primary" href="#projects">
            See my work
          </a>
          <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
        </div>

        <div className="socials">
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
        </div>
      </div>

      <HeroScene />
    </div>
  );
}
