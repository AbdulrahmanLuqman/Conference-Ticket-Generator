import { useState, useEffect } from "react";
import { getItem, setItem } from "../util/localStorage";

export function useStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // Fix SSR issue
    try {
      const storedValue = getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}