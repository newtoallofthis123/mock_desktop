"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  name: string
  content: string
}

interface Conversation {
  name: string
  messages: Message[]
}

interface ChatInterfaceProps {
  conversations: Conversation[]
}

export default function ChatInterface({ conversations }: ChatInterfaceProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 bg-slate-50 border-b">
          <h1 className="font-semibold text-xl">Chats</h1>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.name}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 transition-colors",
                selectedConversation.name === conversation.name && "bg-slate-100",
              )}
              onClick={() => setSelectedConversation(conversation)}
            >
              <Avatar>
                <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{conversation.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.messages[conversation.messages.length - 1].content.substring(0, 40)}
                  {conversation.messages[conversation.messages.length - 1].content.length > 40 ? "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">{selectedConversation.name}</h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {selectedConversation.messages.map((message, index) => (
              <div key={index} className={cn("flex", message.name === "You" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-4 py-2 shadow-sm",
                    message.name === "You" ? "bg-primary text-primary-foreground" : "bg-white",
                  )}
                >
                  {message.name !== "You" && (
                    <p className="text-xs font-medium text-muted-foreground mb-1">{message.name}</p>
                  )}
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button className="rounded-full bg-primary p-2 text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

