import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <div className="relative isolate px-6 mt-24">
      <div className="grid grid-cols-4">
        <div className="text-left col-span-3">
          <h1 className="text-4xl font-semibold tracking-[1.05] sm:text-6xl">
            Commercial Analytics Hub: Everything you need in the same great place
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Transform your business data into actionable insights. Our analytics platform helps you make better decisions with powerful visualization and reporting tools.
          </p>
          <div className="mt-10 flex items-left justify-left gap-x-3">
            <Button size="lg">
              Get started
            </Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Image
          src="/hero.jpg"
          alt="Hero Image"
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
