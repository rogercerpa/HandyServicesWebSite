"use client";

import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  primaryColor: string;
  accentColor: string;
}

export function ThemeProvider({ children, primaryColor, accentColor }: ThemeProviderProps) {
  // Apply custom CSS variables for theme colors
  const themeStyles = {
    "--color-electric": primaryColor,
    "--color-accent-orange": accentColor,
  } as React.CSSProperties;

  return (
    <div style={themeStyles} className="contents">
      {children}
    </div>
  );
}

