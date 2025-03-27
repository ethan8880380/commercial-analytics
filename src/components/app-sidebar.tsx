import * as React from "react"
import { Minus, Plus, Home, MessageCircle, BookOpen, Search, Bookmark, BookmarkPlus } from "lucide-react"
import { useContext } from "react"
import { SearchDialogContext } from "@/app/chat/contexts/search-dialog-context"
import { LinearBlur } from "progressive-blur"
import Image from "next/image"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Folders",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Bookmarks",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get the dialog context from the page component
  const { setOpen, chatHistory, handleToggleBookmark, handleSelectChat, handleNewChat } = useContext(SearchDialogContext);
  
  // Combine all chats from different categories into a single list
  const allChats = chatHistory.flatMap(category => category.chats);
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border">
                  <Image 
                    src="/images/chat-logo.png" 
                    alt="chatbot logo"
                    width={28}
                    height={28}
                    className="w-7 -ml-1.5 -mt-1" 
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Hub Chat</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="relative flex flex-col">
        <div className="flex-1 overflow-y-auto pb-[150px]">
          <SidebarGroup>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="size-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleNewChat}>
                  <MessageCircle className="size-4" />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <button
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground h-8"
                  data-slot="sidebar-menu-button" 
                  data-sidebar="menu-button"
                  data-size="default"
                  onClick={() => setOpen(true)}
                >
                  <Search className="size-4" />
                  <span>Search Chats</span>
                </button>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-4">
                <SidebarMenuButton>
                  <BookOpen className="size-4" />
                  <span>Resources</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Display main navigation items */}
              {data.navMain.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.title}{" "}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={item.isActive}
                              >
                                <a href={item.url}>{item.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              {/* Chat History at the bottom */}
              <Collapsible
                className="group/collapsible"
                defaultOpen={false}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      Chat History{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {allChats.map((chat) => (
                        <SidebarMenuSubItem key={chat.id}>
                          <div className="flex items-center justify-between w-full pr-2">
                            <SidebarMenuSubButton
                              onClick={() => handleSelectChat(chat.id)}
                              className="truncate max-w-[180px]"
                            >
                              <span className="truncate block" title={chat.title}>
                                {chat.title}
                              </span>
                            </SidebarMenuSubButton>
                            <button
                              onClick={(e) => handleToggleBookmark(e, chat.id)}
                              className="text-muted-foreground hover:text-foreground flex-shrink-0"
                              aria-label={chat.bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
                              type="button"
                            >
                              {chat.bookmarked ? 
                                <Bookmark className="size-3.5" /> : 
                                <BookmarkPlus className="size-3.5" />
                              }
                            </button>
                          </div>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </div>
        {/* Linear blur - absolute positioned at the bottom of the sidebar */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "150px" }}>
          <LinearBlur
            steps={8}
            strength={12}
            falloffPercentage={100}
            tint="rgba(0, 0, 0, 0)"
            side="bottom"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
