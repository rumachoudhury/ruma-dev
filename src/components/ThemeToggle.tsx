"use client";

import { useEffect, useState } from "react";

const moon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);
const sun = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

/** Switches between light and dark. Follows the system setting until the visitor picks one. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = document.documentElement.getAttribute("data-theme");
    setDark(saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const value = next ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", value);
    try {
      localStorage.setItem("theme", value);
    } catch {
      /* storage can be blocked, the theme still changes for this visit */
    }
  };

  return (
    <button
      className="theme"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? sun : moon}
    </button>
  );
}
