import { useCallback, useEffect, useState } from "react";
import { readJson, writeJson } from "../lib/storage";

export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => readJson(key, fallback));

  useEffect(() => {
    writeJson(key, state);
  }, [key, state]);

  const update = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => (typeof value === "function" ? (value as (prev: T) => T)(prev) : value));
  }, []);

  return [state, update];
}
