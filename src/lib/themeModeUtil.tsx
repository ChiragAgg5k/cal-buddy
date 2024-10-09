"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import SunSVG from "../../assets/svg/theme/sun";
import MoonSVG from "../../assets/svg/theme/moon";

export function ThemeMode() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="ml-6">
      {theme === "dark" ? (
        <MoonSVG onClick={() => setTheme("light")} />
      ) : (
        <SunSVG onClick={() => setTheme("dark")} />
      )}
    </div>
  );
}
