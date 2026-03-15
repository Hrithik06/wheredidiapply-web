// src/context/ThemeContext.tsx

import { createContext, useContext, useState, useEffect } from "react";

type ThemeName = "sunrise" | "midnight";

type ThemeContextValue = {
  themeName: ThemeName;
  isMidnight: boolean;
  toggle: () => void;
  meta: { icon: string; label: string };
};

const TOGGLE_META = {
  sunrise: { icon: "🌙", label: "Midnight" },
  midnight: { icon: "☀️", label: "Sunrise" },
};

// null default — hook will throw if used outside Provider
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Provider — owns the single useState ──────────────────────────
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(
    () => (localStorage.getItem("theme") as ThemeName) || "sunrise",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggle = () =>
    setThemeName((n) => (n === "sunrise" ? "midnight" : "sunrise"));

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        isMidnight: themeName === "midnight",
        toggle,
        meta: TOGGLE_META[themeName],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ── useTheme — just reads from context, no own state ─────────────
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
};
