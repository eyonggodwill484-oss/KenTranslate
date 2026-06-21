"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("kt-theme") as Theme) ?? "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("kt-theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  /* Avoid hydration flash by not rendering until mounted */
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
