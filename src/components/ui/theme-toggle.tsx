"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem("theme")
    
    // Check if system prefers dark mode
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    // Add a class to prevent transitions during theme change
    document.documentElement.classList.add("disable-transitions")
    
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      
      // Save preference to localStorage
      localStorage.setItem("theme", newTheme)
      
      // Update document class
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      
      return newTheme
    })
    
    // Remove the class after a short delay to re-enable transitions
    setTimeout(() => {
      document.documentElement.classList.remove("disable-transitions")
    }, 10)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn("", className)}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Sun className="size-[1.2rem]" />
      ) : (
        <Moon className="size-[1.2rem]" />
      )}
    </Button>
  )
} 