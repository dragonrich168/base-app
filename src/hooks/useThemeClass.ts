import { useEffect } from "react";
import type { Theme } from "../types/theme";
import { useMediaQuery } from "./useMediaQuery";

export function useThemeClass(theme: Theme): void {
  const prefersLight = useMediaQuery("(prefers-color-scheme: light)");
  const resolved = theme === "system" ? (prefersLight ? "light" : "dark") : theme;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);
}
