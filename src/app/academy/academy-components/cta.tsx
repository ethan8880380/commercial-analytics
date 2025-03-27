import * as React from "react"
import { Button } from "@/components/ui/button"

interface CTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export function CTA({
  title = "Want to learn more about the Academy?",
  description = "Click the button below to learn more about the Academy and how it can help you.",
  buttonText = "Learn More",
  buttonHref = "/academy/about"
}: CTAProps) {
  return (
    <div className="bg-primary py-16 m-6 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl text-primary-foreground font-bold mb-4">{title}</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <Button asChild variant="secondary" className="text-primary dark:bg-background" size="lg">
            <a href={buttonHref}>{buttonText}</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
