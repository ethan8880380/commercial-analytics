import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        yellow: "border-yellow-300 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-900",
        green: "border-green-300 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 dark:border-green-900",
        red: "border-red-300 bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 dark:border-red-900",
        purple: "border-purple-300 bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
