import { useState, useEffect } from "react";

type ThemeName = "sunrise" | "midnight";

const TOGGLE_META: Record<ThemeName, { icon: string; label: string }> = {
  sunrise:  { icon: "🌙", label: "Midnight" },
  midnight: { icon: "☀️", label: "Sunrise"  },
};

export function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>(
    () => (localStorage.getItem("theme") as ThemeName) || "sunrise"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggle = () =>
    setThemeName((n) => (n === "sunrise" ? "midnight" : "sunrise"));

  return {
    themeName,
    isMidnight: themeName === "midnight",
    toggle,
    meta: TOGGLE_META[themeName], // { icon, label } — the only theme data that stays in JS
  };
}
