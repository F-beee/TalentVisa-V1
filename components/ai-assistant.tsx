"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, X, MessageCircle, Loader2 } from "lucide-react"

interface AiAssistantProps {
  talentData: any
}

export function AiAssistant({ talentData }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Hello ${talentData?.name?.split(" ")[0] || "there"}! I see your Coding score is ${talentData?.skills?.coding || 0}%. That's impressive! How can I help you today?`,
    },
  ])
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          context: talentData 
        }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "system", content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Sorry, I'm having trouble connecting. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================================
  // 1. THE FLASHY BUTTON (Closed State)
  // =========================================================
  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50 group">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-70 blur-xl animate-pulse group-hover:opacity-100 transition-all duration-500" />
        
        <Button 
          onClick={() => setIsOpen(true)}
          className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border-none shadow-2xl bg-black hover:bg-zinc-900 transition-transform hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20" />
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white relative z-10" />
          <span className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full border-2 border-black animate-bounce" />
        </Button>
      </div>
    )
  }

  // =========================================================
  // 2. THE HUGE NEON WINDOW (Open State)
  // =========================================================
  return (
    // FIX: CENTERED ON MOBILE (left-1/2 -translate-x-1/2)
    // DESKTOP: Bottom Right (sm:left-auto sm:translate-x-0 sm:right-6)
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 sm:bottom-6 z-50 w-[90vw] sm:w-[450px] h-[80vh] sm:h-[650px] animate-in zoom-in-95 fade-in duration-300 origin-bottom">
       
       {/* RGB NEON HALO */}
       <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-[#FF0000] via-[#00FF00] to-[#0000FF] opacity-75 blur-lg animate-pulse" />

       <Card className="relative h-full flex flex-col border-none shadow-2xl bg-zinc-900 text-white rounded-2xl overflow-hidden">
        
        {/* HEADER */}
        <CardHeader className="bg-zinc-900/50 backdrop-blur-md pb-4 border-b border-white/10 p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                TalentVisa AI
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-zinc-400">
                Coach for {talentData?.name?.split(" ")[0]}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        {/* CHAT AREA */}
        <CardContent className="flex-1 p-0 overflow-hidden bg-black/40">
          <ScrollArea className="h-full px-4 sm:px-5 py-4 sm:py-5">
            <div className="space-y-6 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "system" && (
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 mt-1 ring-2 ring-blue-500/30">
                      <AvatarImage src="/bot-avatar.png" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs">AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md leading-relaxed ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-blue-500/20"
                        : "bg-zinc-800 text-zinc-100 border border-white/10 rounded-tl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 justify-start">
                   <Avatar className="h-8 w-8 sm:h-9 sm:w-9 mt-1">
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-zinc-800/50 rounded-2xl rounded-tl-none px-5 py-3.5 flex items-center border border-white/5">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span className="text-sm text-zinc-400 ml-2 font-medium">Analyzing...</span>
                    </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="p-4 bg-zinc-900 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex w-full gap-3 items-center"
          >
            <Input
              placeholder="Ask about scores..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="rounded-full bg-zinc-800 border-transparent text-white placeholder:text-zinc-500 focus:bg-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all h-10 sm:h-12 px-5 text-sm sm:text-base"
            />
            
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              className="rounded-full h-10 w-10 sm:h-12 sm:w-12 shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/40 border border-white/10"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
