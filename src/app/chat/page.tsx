"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChatInput } from "./components/chat-input"
import { ChatMessageList, Message } from "./components/chat-message-list"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThinkingAnimation } from "./components/thinking-animation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Bookmark, BookmarkPlus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { LinearBlur } from "progressive-blur"
import Image from "next/image"
import { SearchDialogContext, ChatHistoryCategory } from "./contexts/search-dialog-context"

// Mock data for demonstration (matching the screenshot and adding more items)
const chatHistory: ChatHistoryCategory[] = [
  {
    category: "Previous 7 Days",
    chats: [
      { id: 1, title: "Example Chat Message 1", bookmarked: false },
      { id: 2, title: "Example Chat Message 2", bookmarked: true },
      { id: 3, title: "Example Chat Message 3", bookmarked: false },
      { id: 4, title: "Example Chat Message 4", bookmarked: false },
      { id: 5, title: "Example Chat Message 5", bookmarked: true },
      { id: 6, title: "Example Chat Message 6", bookmarked: false },
    ]
  },
  {
    category: "Previous 30 Days",
    chats: [
      { id: 7, title: "Example Chat Message 7", bookmarked: false },
      { id: 8, title: "Example Chat Message 8", bookmarked: true },
      { id: 9, title: "Example Chat Message 9", bookmarked: false },
      { id: 10, title: "Example Chat Message 10", bookmarked: false },
      { id: 11, title: "Example Chat Message 11", bookmarked: true },
    ]
  },
  {
    category: "April 2024",
    chats: [
      { id: 12, title: "Example Chat Message 12", bookmarked: false },
      { id: 13, title: "Example Chat Message 13", bookmarked: false },
      { id: 14, title: "Example Chat Message 14", bookmarked: true },
      { id: 15, title: "Example Chat Message 15", bookmarked: false },
      { id: 16, title: "Example Chat Message 16", bookmarked: false },
      { id: 17, title: "Example Chat Message 17", bookmarked: true },
      { id: 18, title: "Example Chat Message 18", bookmarked: false },
    ]
  }
]

// Animation variants for the dialog overlay and content
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
};

// Simple function to generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default function Page() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: generateId(),
      content: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [thinking, setThinking] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [localChatHistory, setLocalChatHistory] = React.useState(chatHistory)

  // Toggle bookmark status for a specific chat
  const handleToggleBookmark = (e: React.MouseEvent, chatId: number) => {
    e.stopPropagation()
    
    setLocalChatHistory(prevHistory => 
      prevHistory.map(category => ({
        ...category,
        chats: category.chats.map(chat => 
          chat.id === chatId 
            ? { ...chat, bookmarked: !chat.bookmarked } 
            : chat
        )
      }))
    )
  }

  // Handle selection of a chat from the history
  const handleSelectChat = () => {
    // For demo purposes, just close the dialog
    // In a real app, you would load the selected chat
    setOpen(false)
  }

  // Handle creating a new chat
  const handleNewChat = () => {
    // For demo purposes, just close the dialog
    // In a real app, you would create a new chat
    setOpen(false)
  }

  const handleSubmit = async (message: string) => {
    const userMessage: Message = {
      id: generateId(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    }
    
    setMessages((messages) => [...messages, userMessage])
    setThinking(true)
    
    // Simulate a delay before the assistant responds
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        content: `This is a mock response to your message: "${message}"`,
        isUser: false,
        timestamp: new Date(),
      }
      
      setMessages((messages) => [...messages, assistantMessage])
      setThinking(false)
    }, 2000)
  }
  
  // Provide context values
  const contextValue = {
    open,
    setOpen,
    chatHistory: localChatHistory,
    handleToggleBookmark,
    handleSelectChat,
    handleNewChat
  };

  return (
    <SearchDialogContext.Provider value={contextValue}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 relative">
            <div className="absolute inset-0 overflow-visible">
              <LinearBlur
                steps={8}
                strength={12}
                falloffPercentage={100}
                tint="rgba(0, 0, 0, 0)"
                side="top"
                style={{
                  position: 'absolute',
                  top: '-4rem',
                  left: 0,
                  right: 0,
                  bottom: '-2rem',
                  zIndex: 0,
                }}
              />
            </div>
            <div className="flex items-center justify-between w-full z-10 relative">
              <SidebarTrigger className="-ml-1" />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <div className="flex flex-col flex-1 h-[calc(100vh-4rem)] relative">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <Image src="/images/chat-logo.png" alt="chatbot logo" className="w-24 mb-6" width={96} height={96} />
                  <h1 className="text-4xl font-medium mb-12">How can we help today?</h1>
                  
                  {/* Centered chat input for initial state */}
                  <div className="w-full max-w-3xl px-4">
                    <ChatInput onSubmit={handleSubmit} isLoading={thinking} />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 overflow-hidden pb-36"
                >
                  <ChatMessageList messages={messages} />
                  {thinking && <ThinkingAnimation />}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Fixed input container without animation */}
            {messages.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent pt-8 z-10 max-w-full mx-auto" style={{ width: "calc(100% - var(--sidebar-width, 0px))" }}>
                <ChatInput onSubmit={handleSubmit} isLoading={thinking} />
              </div>
            )}
          </div>
          
          {/* Custom animated dialog using Framer Motion */}
          <AnimatePresence>
            {open && (
              <>
                {/* Dialog Backdrop */}
                <motion.div 
                  className="fixed inset-0 z-50 bg-background/30 backdrop-blur-sm"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={overlayVariants}
                  onClick={() => setOpen(false)}
                />
                
                {/* Dialog Content */}
                <motion.div 
                  className="fixed left-[50%] top-[50%] z-50 w-full max-w-[50vw] h-[50vh] translate-x-[-50%] translate-y-[-50%] border bg-background/70 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden flex flex-col"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  <div className="absolute right-4 top-4 z-50">
                    <button 
                      className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-col h-full overflow-hidden">
                    {/* Accessible title for screen readers */}
                    <h2 className="sr-only">Search Chats</h2>
                    
                    {/* Sticky search input */}
                    <div className="shrink-0 p-2 bg-background/70 backdrop-blur-sm border-b">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search chats..."
                          className="pl-9 h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                          value={""}
                          onChange={() => {}}
                          autoFocus
                        />
                      </div>
                    </div>
                    
                    {/* Scrollable content - takes remaining height */}
                    <div className="flex-1 overflow-hidden pl-2">
                      <ScrollArea className="h-full w-full">
                        <div className="py-1">
                          
                          {/* Chat history categories */}
                          {localChatHistory.map((category) => (
                            <div key={category.category} className="mt-2">
                              <h3 className="text-sm font-medium text-muted-foreground px-4 py-2">
                                {category.category}
                              </h3>
                              <div>
                                {category.chats.map((chat) => (
                                  <div 
                                    key={chat.id}
                                    className="flex items-center w-full justify-start px-3 pr-6 py-3 h-auto hover:bg-accent rounded-md mx-1 cursor-pointer"
                                    onClick={() => handleSelectChat()}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center">
                                        <Search className="size-4 mr-3 text-muted-foreground" />
                                        <span>{chat.title}</span>
                                      </div>
                                      <button
                                        onClick={(e) => handleToggleBookmark(e, chat.id)}
                                        className="text-muted-foreground hover:text-foreground"
                                        aria-label={chat.bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                                        type="button"
                                      >
                                        {chat.bookmarked ? 
                                          <Bookmark className="size-4" /> : 
                                          <BookmarkPlus className="size-4" />
                                        }
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          {localChatHistory.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground">
                              No chats found
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </SearchDialogContext.Provider>
  )
}
