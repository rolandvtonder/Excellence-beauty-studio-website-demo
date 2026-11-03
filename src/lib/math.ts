export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Where `v` sits between `a` and `b`, clamped to 0–1. */
export const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
