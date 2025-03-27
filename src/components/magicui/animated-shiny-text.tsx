import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => { 
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "relative inline-block animate-shiny-text",
        
        // Basic styling
        "text-neutral-600 dark:text-neutral-400",
        
        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/40 to-transparent dark:via-white/40",
        
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
