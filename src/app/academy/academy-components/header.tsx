"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const gettingStartedLinks = [
  {
    title: "All Courses",
    href: "/docs",
    description: "Re-usable components built using Radix UI and Tailwind CSS."
  },
  {
    title: "All Dashboards", 
    href: "/docs/installation",
    description: "How to install dependencies and structure your app."
  },
  {
    title: "All Dashboards",
    href: "/docs/primitives/typography", 
    description: "Styles for headings, paragraphs, lists...etc"
  }
]

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const mainLinks = [
  {
    title: "Updates",
    href: "/docs"
  },
  {
    title: "Back to Hub",
    href: "/"
  }
]

export function Header() {
  const [hasScrolled, setHasScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn(
      "sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background/70 backdrop-blur transition-all duration-200"
    )}>
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="Commercial Analytics" width={24} height={24} className="size-6" />
        <div className="text-lg font-semibold">Commercial Academy</div>
      </div>
      <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
          <NavigationMenuTrigger>Trainings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/40 to-primary hover:bg-primary p-6 no-underline outline-none focus:shadow-md transition-colors duration-500 transition-ease-in"
                    href="/"
                  >
                    <Icons.logo className="size-6 text-background" />
                    <div className="mb-2 mt-4 text-lg text-background font-medium">
                      Consumption Navigator
                    </div>
                    <p className="text-sm leading-tight text-background/80">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {gettingStartedLinks.map((link) => (
                <ListItem key={link.href} href={link.href} title={link.title}>
                  {link.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="w-full">
            <ul className="grid w-full gap-3 p-4 md:grid-cols-2 ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {mainLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link href="/chat">
          <Button variant="outline">Chatbot Test</Button>
        </Link>
        <Button variant="default">Request Access</Button>
      </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 left-0 transition-opacity duration-300 ease-in-out",
          hasScrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
