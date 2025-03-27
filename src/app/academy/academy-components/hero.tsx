"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

// Props interface for the component
interface HeroProps {
  heroContent: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

export default function Hero({ heroContent }: HeroProps) {
    return (
        <section className="relative px-6 py-24 overflow-hidden flex flex-col items-left justify-left">
            <div className="flex flex-col md:flex-row gap-12 items-center mx-auto relative z-10 w-full">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl mb-6 text-left">
                        {heroContent.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 text-left">
                        {heroContent.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <Button size="lg">{heroContent.primaryButtonText}</Button>
                    </div>
                </div>
            </div>
            <Image 
              src="/hero.jpg" 
              alt="Students learning analytics" 
              width={1200}
              height={600}
              className="w-full h-full mt-12 relative z-10"
            />
        </section>  
    )
}