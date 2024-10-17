"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import SunSVG from "../../assets/svg/theme/sun";
import MoonSVG from "../../assets/svg/theme/moon";
import { THEME_MODE } from "./constants";

export function ThemeMode() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="ml-6 dark:bg-white">
      {theme === THEME_MODE.DARK ? (
        <MoonSVG
          onClick={() => {
            setTheme(THEME_MODE.LIGHT);
          }}
        />
      ) : (
        <SunSVG
          onClick={() => {
            setTheme(THEME_MODE.DARK);
          }}
        />
      )}
    </div>
  );
}
