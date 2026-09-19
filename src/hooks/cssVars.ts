import type { CSSProperties } from "react";

/** Lets us pass CSS custom properties (like --d or --i) through the `style` prop with type safety. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
