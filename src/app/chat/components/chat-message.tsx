"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Copy, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react"

interface ChatMessageProps {
  content: string
  isUser: boolean
  timestamp?: Date
}

export function ChatMessage({ 
  content, 
  isUser
}: ChatMessageProps) {
  // Add state to track if animation has played
  const [animationPlayed, setAnimationPlayed] = React.useState(false);

  // Effect to trigger animation played state once
  React.useEffect(() => {
    // Small timeout to allow animation to start before marking as played
    const timer = setTimeout(() => {
      setAnimationPlayed(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full max-w-3xl mx-auto mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          isUser 
            ? "px-3 py-2 rounded-lg max-w-[80%] bg-secondary text-foreground border" 
            : "max-w-[80%] mt-8" // No background or padding for bot messages
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <>
            {!animationPlayed ? (
              <TextAnimate 
                animation="blurIn" 
                as="h1"
                onAnimationComplete={() => setAnimationPlayed(true)}
              >
                {content}
              </TextAnimate>
            ) : (
              <h1>{content}</h1>
            )}
            
            {/* Action buttons - only display for bot messages */}
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <button 
                className="p-1 rounded hover:bg-muted hover:text-foreground transition-colors" 
                title="Copy to clipboard"
                onClick={() => {
                  navigator.clipboard.writeText(content)
                    .then(() => {
                      console.log("Text copied to clipboard");
                    })
                    .catch(err => {
                      console.error("Could not copy text: ", err);
                    });
                }}
              >
                <Copy size={16} />
              </button>
              <button className="p-1 rounded hover:bg-muted hover:text-foreground transition-colors" title="Thumbs up">
                <ThumbsUp size={16} />
              </button>
              <button className="p-1 rounded hover:bg-muted hover:text-foreground transition-colors" title="Thumbs down">
                <ThumbsDown size={16} />
              </button>
              <button className="p-1 rounded hover:bg-muted hover:text-foreground transition-colors" title="Read aloud">
                <Volume2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
} 