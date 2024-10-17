"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { THEME_MODE } from "./constants";

export function ThemeMode() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="ml-6 text-foreground hover:cursor-pointer">
      {theme === THEME_MODE.DARK ? (
        <Moon
          size={20}
          onClick={() => {
            setTheme(THEME_MODE.LIGHT);
          }}
        />
      ) : (
        <Sun
          size={20}
          onClick={() => {
            setTheme(THEME_MODE.DARK);
          }}
        />
      )}
    </div>
  );
}
