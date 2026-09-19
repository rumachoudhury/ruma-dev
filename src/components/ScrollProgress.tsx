"use client";

import { useEffect } from "react";

/** The thin gradient line at the top of the page that fills as you scroll. */
export default function ScrollProgress() {
  useEffect(() => {
    let ticking = false;
    const root = document.documentElement;

    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--p", p.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="progress" aria-hidden="true" />;
}
