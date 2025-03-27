"use client"

import * as React from "react"

// Define the chat history type
export type ChatHistoryItem = {
  id: number;
  title: string;
  bookmarked: boolean;
}

export type ChatHistoryCategory = {
  category: string;
  chats: ChatHistoryItem[];
}

// Create a context to share the dialog state and chat history
export const SearchDialogContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatHistory: ChatHistoryCategory[];
  handleToggleBookmark: (e: React.MouseEvent, chatId: number) => void;
  handleSelectChat: (chatId: number) => void;
  handleNewChat: () => void;
}>({
  open: false,
  setOpen: () => {},
  chatHistory: [],
  handleToggleBookmark: () => {},
  handleSelectChat: () => {},
  handleNewChat: () => {},
}); 