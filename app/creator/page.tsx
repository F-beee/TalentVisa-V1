"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  ArrowLeft, 
  BrainCircuit, 
  Trophy, 
  Cuboid, 
  Terminal, 
  Activity,
  Code,
  Award,
  Zap,
  ChevronRight,
  Linkedin,
  Bot
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { AiAssistant } from "@/components/ai-assistant"

// ==========================================
// 1. 3D HOLOGRAPHIC TILT COMPONENT
// ==========================================
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; 

    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    setRotation({ x: rotateX, y: rotateY })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlare({ ...glare, opacity: 0 })
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      <div 
        className="absolute inset-0 z-50 pointer-events-none rounded-inherit transition-opacity duration-300 hidden md:block"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8), transparent 40%)`,
          mixBlendMode: "overlay"
        }}
      />
      {children}
    </div>
  )
}

// ==========================================
// 2. IDENTITY DECRYPTION & SEQUENTIAL TYPEWRITER 
// ==========================================
const DecryptText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("")
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"

  useEffect(() => {
    let iteration = 0
    let animationFrame: number
    const animate = () => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index]
          return letters[Math.floor(Math.random() * letters.length)]
        }).join("")
      )
      if (iteration < text.length) {
        iteration += 1 / 3
        animationFrame = requestAnimationFrame(animate)
      }
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [text])

  return <span className="font-mono tracking-widest">{displayText}</span>
}

const TypewriterText = ({ text, delay = 12, startDelay = 0, hideCursorOnComplete = false }: { text: string, delay?: number, startDelay?: number, hideCursorOnComplete?: boolean }) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(startDelay === 0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => setHasStarted(true), startDelay)
      return () => clearTimeout(timer)
    }
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, delay, text, hasStarted])

  return (
    <span>
      {currentText}
      {hasStarted && (!isComplete || !hideCursorOnComplete) && (
        <span className="animate-pulse text-blue-500">_</span>
      )}
    </span>
  )
}

// ==========================================
// 3. RADAR CHART DATA & CUSTOM TICK
// ==========================================
const metricsData = [
  { subject: 'Product Strategy', score: 95 },
  { subject: 'Execution', score: 85 },
  { subject: 'Caffeine\nTolerance', score: 100 }, 
  { subject: 'Analytics', score: 80 },
  { subject: 'Development', score: 75 },
  { subject: 'Agility', score: 88 },
];

const CustomTick = ({ payload, x, y, textAnchor }: any) => {
  const lines = payload.value.split('\n');
  return (
    <text x={x} y={y} textAnchor={textAnchor} className="text-[10px] fill-zinc-400 font-sans">
      {lines.map((line: string, index: number) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : 12}>{line}</tspan>
      ))}
    </text>
  );
};

// ==========================================
// MAIN PAGE
// ==========================================
export default function ArchitectPage() {
  const [activeNode, setActiveNode] = useState("core")
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "> SYSTEM INITIALIZED.",
    "> BYPASSING AUTHENTICATION...",
    "> CANDIDATE ZERO VERIFIED."
  ])

  useEffect(() => {
    const logs = {
      core: "> Fetching intersectional strategy...",
      execution: "> Accessing PSIT Scholar data... Fetching Pilot status...",
      metrics: "> Loading real-time performance datasets...",
      sandbox: "> Analyzing kinetic motion in Table Tennis..."
    }
    setSystemLogs(prev => [...prev.slice(-3), logs[activeNode as keyof typeof logs] || "> Processing..."])
  }, [activeNode])

  const treeData: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    core: {
      title: "System Architecture",
      icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Init: Philosophy</Badge>
            <span className="text-xs text-zinc-500 font-mono">Status: Active</span>
          </div>
          <div className="space-y-4 text-zinc-300 leading-relaxed font-mono text-sm sm:text-base relative">
            
            <p className="min-h-[100px] sm:min-h-[80px]">
              <TypewriterText 
                text="I am passionate about understanding how ideas evolve into products, businesses, and systems that create meaningful impact. While I love the mechanics of building, my ultimate goal is to work at the intersection of technology and strategy, bringing a builder's analytical execution to a larger ecosystem to create some impact." 
                delay={12}
                hideCursorOnComplete={true}
              />
            </p>
            
            <p className="min-h-[100px] animate-in fade-in duration-1000 fill-mode-both" style={{ animationDelay: '3.8s' }}>
              <TypewriterText 
                text="I approach challenges with an analytical mindset, but I know the best solutions often come from genuine conversations. Over time, I have developed a habit of questioning assumptions, connecting with diverse perspectives, and learning through outcomes rather than relying solely on theory. This mindset dictates my approach to projects, decisions, and continuous learning." 
                delay={5} 
                startDelay={3800} 
              />
            </p>

          </div>
        </div>
      )
    },
    execution: {
      title: "Deployment Log",
      icon: <Cuboid className="w-5 h-5 text-purple-400" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Init: Execution Records</Badge>
            <span className="text-xs text-zinc-500 font-mono">Records: 3 Verified</span>
          </div>
          
          <div className="grid gap-4 pr-1 sm:pr-2">
            <div className="p-4 sm:p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="text-white font-medium flex items-center gap-2"><Code className="w-4 h-4 text-blue-400"/> TalentVisa</h4>
                <Badge variant="outline" className="border-blue-500/30 text-blue-300 bg-blue-500/10">Pilot Approved</Badge>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 relative z-10">
                A skill benchmarking platform designed to help individuals showcase capabilities beyond traditional credentials. Built to solve the global resume inflation crisis, and secured a green flag to pilot it at my college.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium flex items-center gap-2"><Cuboid className="w-4 h-4 text-purple-400"/> PowerrPad</h4>
                <Badge variant="outline" className="border-purple-500/30 text-purple-300">3D Modelling</Badge>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                A smart laptop charging case concept. Involved in product development, 3D modelling, prototyping, and feasibility analysis. We were fortunate enough to receive a grant from the government under the Department of Science and Technology (DST-NIDHI).
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium flex items-center gap-2"><Award className="w-4 h-4 text-amber-400"/> Scholar of the Year</h4>
                <Badge variant="outline" className="border-amber-500/30 text-amber-300">PSIT 2025</Badge>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3">
                Awarded by the Management Department. This recognition was secured after rigorous rounds of assessment, problem-solving evaluations, and business pitching.
              </p>
            </div>
          </div>
        </div>
      )
    },
    metrics: {
      title: "Performance Analytics",
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Init: Data Visualization</Badge>
            <span className="text-xs text-zinc-500 font-mono">Live Feed</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-full sm:w-1/2 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metricsData}>
                  <PolarGrid stroke="#3f3f46" />
                  <PolarAngleAxis dataKey="subject" tick={<CustomTick />} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px' }} />
                  <Radar name="Performance" dataKey="score" stroke="#3b82f6" fill="url(#colorUv)" fillOpacity={0.5} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full sm:w-1/2 space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed">
                Raw data verification. Visualizing capabilities is the core philosophy behind the TalentVisa engine. 
              </p>
              <div className="space-y-2">
                {metricsData.slice(0, 4).map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs text-zinc-400 whitespace-pre-line">{metric.subject.replace('\n', ' ')}</span>
                    <span className={`text-xs font-mono ${metric.score === 100 ? "text-amber-400 animate-pulse" : "text-blue-400"}`}>
                      {metric.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    sandbox: {
      title: "Hobbies & Interests",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Init: Off-Court Environment</Badge>
          </div>
          
          <div className="grid gap-4 pr-1 sm:pr-2">
            <div className="p-4 sm:p-5 bg-zinc-900/50 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute right-0 bottom-0 opacity-5 text-7xl sm:text-8xl transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform select-none">🏓</div>
              <h4 className="text-white font-medium mb-2 text-sm relative z-10 flex items-center gap-2">Athletic Agility</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10 max-w-[95%] sm:max-w-[90%]">
                Had the opportunity to compete at the National level (2018-2019) and secured district and college golds. The medals were great, but the real takeaway was learning how to maintain structure, discipline, and focus under high pressure.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-zinc-900/50 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute right-0 bottom-0 opacity-5 text-7xl sm:text-8xl transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform select-none">♟️</div>
              <h4 className="text-white font-medium mb-2 text-sm relative z-10 flex items-center gap-2">Strategy & Mechanics</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10 max-w-[95%] sm:max-w-[90%]">
                I am a complete novice at chess, but I am actively trying to improve my foresight and strategy. Off the board, I'm fascinated by the physical mechanics of bowling—mapping out the exact wrist motions required to generate perfect spin and accuracy.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-zinc-900/50 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute right-0 bottom-0 opacity-5 text-7xl sm:text-8xl transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform select-none">📺</div>
              <h4 className="text-white font-medium mb-2 text-sm relative z-10 flex items-center gap-2">Downtime</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10 max-w-[95%] sm:max-w-[90%]">
                When I am not working or studying, I am usually testing my reaction times and crosshair placement in <strong>Valorant</strong>, unwinding with a good sitcom, or exploring the city to find a genuinely good cup of coffee.
              </p>
            </div>
          </div>
        </div>
      )
    }
  }

  // ==========================================
  // COMPRESSED VISITOR CONTEXT
  // ==========================================
  const visitorContext = {
    name: "Visitor",
    greeting: "Hello! I am the TalentVisa AI. I can answer questions about Gurnaam, his projects, or this platform. What would you like to know?",
    system_context: "You are an AI on Gurnaam Singh's portfolio. Gurnaam is an incoming XIMB BM student, founder of TalentVisa, and recipient of the DST-NIDHI grant for PowerrPad. Be concise."
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30 relative overflow-hidden pb-24">
      
      {/* Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        
        {/* Animated Grid Lines for OS Vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-16">
        
        {/* Navigation & AI Cue Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-12 gap-8 lg:gap-4">
          
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-4 -ml-2 sm:-ml-4 mb-6">
              <Button 
                variant="ghost" 
                className="text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* LinkedIn Button Updated */}
              <Button 
                variant="outline" 
                className="rounded-full border-white/10 bg-black/50 hover:bg-white/10 text-zinc-300 hover:text-white transition-all backdrop-blur-md"
                onClick={() => window.open('https://www.linkedin.com/in/gurnaam/', '_blank')}
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-400" />
                Connect
              </Button>
            </div>

            {/* AI Assistant Callout Box */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl max-w-sm backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              <div className="flex gap-2 items-center text-sm font-semibold text-white mb-1.5">
                <Bot className="w-4 h-4 text-blue-400" />
                TalentVisa AI Online
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Got questions about me or the platform? The AI model is integrated directly into this page. Click the glowing chat bubble in the bottom right corner to ask anything.
              </p>
            </div>
          </div>

          {/* MASSIVE GLOWING TALENTVISA CTA WITH THE HOOK */}
          <div className="flex flex-col lg:items-end gap-2 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
               <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
               Sub-Directory: /architect
            </div>
            <p className="text-xs text-zinc-400 max-w-[290px] lg:text-right mb-2 leading-relaxed">
              Reading about a system is one thing; interacting with it is another. Step out of the sub-directory and experience the live execution:
            </p>
            <div className="relative group cursor-pointer w-full sm:w-auto" onClick={() => window.location.href = '/'}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <button className="relative w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3 sm:py-2.5 bg-black rounded-full leading-none text-white border border-white/10 font-medium">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Enter TalentVisa Platform</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 1: THE IDENTITY DECRYPTION HERO */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 sm:mb-16 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-medium text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              Verified Profile: Candidate Zero
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              <span className="text-blue-500/50 select-none mr-1 sm:mr-2">{">"}</span>
              <DecryptText text="GURNAAM SINGH" />
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
              <Badge className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">XIMB BM 2026-2028</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">Section E</Badge>
            </div>
          </div>
          
          {/* Live System Log Window */}
          <TiltCard className="hidden md:block">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 h-32 overflow-hidden relative backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent" />
              <div className="space-y-1 font-mono text-[10px] text-zinc-500">
                {systemLogs.map((log, i) => (
                  <div key={i} className={i === systemLogs.length - 1 ? "text-blue-400 animate-pulse" : ""}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* SECTION 2: THE INTERACTIVE DASHBOARD */}
        <div className="grid lg:grid-cols-12 gap-6 relative">
          
          {/* Left Column: The Node Tree */}
          <div className="lg:col-span-4 flex flex-col gap-3 relative z-10">
            {Object.entries(treeData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveNode(key)}
                className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-300 text-left border relative overflow-hidden ${
                  activeNode === key 
                    ? "bg-zinc-900/90 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-100 sm:scale-[1.02]" 
                    : "bg-black/40 border-white/5 hover:bg-zinc-900/50 hover:border-white/10"
                }`}
              >
                {/* Active Glow Bar */}
                {activeNode === key && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500" />
                )}
                
                <div className={`p-2 rounded-xl transition-colors ${activeNode === key ? "bg-blue-500/10" : "bg-black/50"}`}>
                  {data.icon}
                </div>
                <div>
                  <h3 className={`font-medium text-sm sm:text-base ${activeNode === key ? "text-white" : "text-zinc-400"}`}>
                    {data.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: The Terminal Display (with 3D Tilt) */}
          <div className="lg:col-span-8 z-10">
            <TiltCard>
              <div className="h-full min-h-[400px] sm:min-h-[450px] p-5 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col shadow-2xl">
                
                {/* Scanline Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />

                {/* Terminal Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 bg-black/50 flex items-center px-4 gap-2 z-20">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/50" />
                  <span className="text-[10px] text-zinc-500 font-mono ml-4 uppercase tracking-wider flex items-center gap-2">
                    root@gurnaam:~/{activeNode} 
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse hidden sm:block" />
                  </span>
                </div>

                {/* Terminal Content Area */}
                <div className="pt-8 flex-1 relative z-10">
                  {treeData[activeNode].content}
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>
      
      {/* INTEGRATED AI ASSISTANT WIDGET */}
      <AiAssistant talentData={visitorContext} />
    </div>
  )
}