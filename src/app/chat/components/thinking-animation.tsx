"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"

export function ThinkingAnimation() {
  // State to track if the image fails to load
  const [imageError, setImageError] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full max-w-3xl mx-auto mb-4 justify-start"
    >
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex items-center">
          {!imageError ? (
            <Image 
              src="/images/loading.gif" 
              alt="Loading" 
              width={24} 
              height={24} 
              className="mr-2 overflow-hidden rounded-full"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback loading indicator
            <div className="flex space-x-2 mr-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-foreground opacity-60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-foreground opacity-60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-foreground opacity-60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
            </div>
          )}
          <AnimatedGradientText
             speed={2}
             colorFrom="#4ade80"
             colorTo="#06b6d4"
             className="tracking-tight font-medium"
          >
            Generating response...
          </AnimatedGradientText>
        </div>
      </div>
    </motion.div>
  )
} 