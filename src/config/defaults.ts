import type { AppSettings } from "../types/settings";
import { APP_TAGLINE } from "../constants/copy";

export const defaultSettings: AppSettings = {
  displayName: "Builder",
  tagline: APP_TAGLINE,
  theme: "dark",
  density: "comfortable",
  showActivity: true,
};
