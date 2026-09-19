"use client";

import { createElement, type ReactNode } from "react";
import { useRevealOnce } from "@/hooks/useRevealOnce";
import type { CSSVars } from "@/hooks/cssVars";

type Tag = "div" | "h2" | "h3" | "p" | "article";

interface RevealProps {
  as?: Tag;
  /** Stagger step. Each step adds 110ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Wraps content so it fades and tilts into place when it scrolls into view. */
export default function Reveal({ as = "div", delay = 0, className = "", children }: RevealProps) {
  const ref = useRevealOnce<HTMLElement>();
  return createElement(
    as,
    { ref, className: `reveal ${className}`.trim(), style: { "--d": delay } as CSSVars },
    children
  );
}
