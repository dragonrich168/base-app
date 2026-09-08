import type { Density } from "./density";
import type { Theme } from "./theme";

export interface AppSettings {
  displayName: string;
  tagline: string;
  theme: Theme;
  density: Density;
  showActivity: boolean;
}
