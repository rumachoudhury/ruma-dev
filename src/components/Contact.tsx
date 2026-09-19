"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const say = (text: string) => {
    setMessage(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      say("Copied to clipboard");
    } catch {
      say("Copy failed. Select the address above instead.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal className="cta">
          <div>
            <h2>Contact</h2>
            <p className="lede">Email is the quickest way to reach me.</p>
            <a className="email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                Send an email
              </a>
              <button className="btn" type="button" onClick={copyEmail}>
                Copy email address
              </button>
              <span className="copied" role="status" aria-live="polite">
                {message}
              </span>
            </div>
            <div className="elsewhere">
              <a className="txt" href={profile.github}>
                GitHub
              </a>
              <a className="txt" href={profile.linkedin}>
                LinkedIn
              </a>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* A CSS-only 3D cube: six faces rotated around a shared center. */}
          <div className="cube-stage" aria-hidden="true">
            <div className="cube">
              <div className="f f1">RC</div>
              <div className="f f2" />
              <div className="f f3" />
              <div className="f f4" />
              <div className="f f5" />
              <div className="f f6" />
            </div>
          </div>
        </Reveal>

        <footer>
          <span>&copy; {new Date().getFullYear()} {profile.name}</span>
          <a href="#top">Back to top</a>
        </footer>
      </div>
    </section>
  );
}
