"use client"

import * as React from "react"
import { Paperclip, Mic, CornerDownLeft } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSubmit?: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSubmit, isLoading = false }: ChatInputProps) {
  const [input, setInput] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    onSubmit?.(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl">
        <form 
          onSubmit={handleSubmit}
          className="relative"
        >
          <div className="flex flex-col rounded-lg border border-input bg-secondary/30 overflow-hidden focus-within:border-primary transition-all duration-300">
            <TextareaAutosize
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Anything.."
              className={cn(
                "w-full resize-none bg-transparent px-4 py-3",
                "focus:outline-none",
                "min-h-[50px] max-h-[100px]"
              )}
              disabled={isLoading}
            />
            <div className="flex items-right justify-end p-4 border-input">
              <div className="flex items-center gap-2 mr-4">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-9"
                  disabled={isLoading}
                >
                  <Paperclip className="size-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-9"
                  disabled={isLoading}
                >
                  <Mic className="size-5" />
                </Button>
              </div>
              <Button 
                type="submit"
                size="default"
                disabled={isLoading || !input.trim()}
                className=""
              >
                Send <CornerDownLeft className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
