"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Sparkles, Send, X, Bot, Loader2 } from "lucide-react"

interface AiAssistantProps {
  talentData: any
}

export function AiAssistant({ talentData }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: `Hi ${talentData.name}! I'm your AI Coach. I see your scores. How can I help you get hired?` }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = input
    setInput("")
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context: talentData })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I couldn't reach the server." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <Card className="w-[320px] h-[450px] shadow-2xl border-primary/20 glass-effect-strong mb-4 pointer-events-auto flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          <CardHeader className="flex flex-row items-center justify-between p-3 border-b border-white/10 bg-primary/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-sm font-bold">TalentVisa AI</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden bg-black/80 backdrop-blur-md">
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg text-xs max-w-[85%] ${msg.role === 'ai' ? 'bg-zinc-800 text-white' : 'bg-indigo-600 text-white'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground mx-auto" />}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-white/10">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask..." className="h-8 text-xs bg-zinc-900 border-zinc-700" />
                <Button type="submit" size="icon" className="h-8 w-8 bg-indigo-600"><Send className="w-3 h-3" /></Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
      <Button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-110 pointer-events-auto shadow-xl">
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </Button>
    </div>
  )
}
