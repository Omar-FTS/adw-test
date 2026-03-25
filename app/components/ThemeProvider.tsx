"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ThemeContextValue = { theme: Theme; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
})

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const stored = localStorage.getItem("theme")
  if (stored === "dark" || stored === "light") return stored
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  } catch {
    return "light"
  }
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", next)
    setTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
