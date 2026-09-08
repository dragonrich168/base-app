export const DENSITIES = ["comfortable", "compact"] as const;

export type Density = (typeof DENSITIES)[number];
