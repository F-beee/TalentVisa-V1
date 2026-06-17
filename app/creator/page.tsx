"use client"

import React, { useState, useEffect } from "react"
import {
  ArrowLeft,
  BrainCircuit,
  Target,
  Trophy,
  Cuboid,
  Terminal,
  Cpu,
  Swords
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ==========================================
// 1. IDENTITY DECRYPTION COMPONENT
// ==========================================
const DecryptText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("")
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%"

  useEffect(() => {
    let iteration = 0
    let animationFrame: number

    const animate = () => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index]
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      )

      if (iteration < text.length) {
        iteration += 1 / 3 // Speed of decryption
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [text])

  return <span className="font-mono tracking-widest">{displayText}</span>
}

// ==========================================
// MAIN PAGE
// ==========================================
export default function ArchitectPage() {
  // Skill Tree State
  const [activeNode, setActiveNode] = useState("core")

  // Node Data (Contains your exact professional copy)
  const treeData: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    core: {
      title: "The Architect",
      icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
      content: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">System Overview</Badge>
          <p className="text-zinc-300 leading-relaxed">
            I am passionate about understanding how ideas evolve into products, businesses, and systems that create meaningful impact. My interests lie at the intersection of technology and management, where innovation, strategy, and execution come together to solve real-world problems.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            I enjoy approaching challenges with curiosity and an analytical mindset. Over time, I have developed a habit of questioning assumptions, testing ideas, and learning through outcomes rather than relying solely on theory.
          </p>
        </div>
      )
    },
    builds: {
      title: "Physical & Digital Builds",
      icon: <Cuboid className="w-6 h-6 text-purple-400" />,
      content: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Execution Log</Badge>
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="text-white font-medium mb-1">PowerrPad</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A smart laptop charging case concept. I was involved in product development, 3D modelling, prototyping, and feasibility analysis. The venture received support through a DST NIDHI grant and was later incorporated as a registered company.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">TalentVisa</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A skill benchmarking platform designed to help individuals showcase capabilities beyond traditional credentials. These projects exposed me to challenges involving product design, user behavior, execution, and scalability.
              </p>
            </div>
          </div>
        </div>
      )
    },
    skills: {
      title: "Capabilities",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      content: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Current Focus</Badge>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Some of the skills I am currently developing include:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Product Thinking", "Analytical Problem-Solving", "Strategic Thinking", "Communication", "Digital Product Development", "Basic 3D Modelling", "Data-Driven Decisions"].map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-zinc-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )
    },
    offcourt: {
      title: "Beyond Projects",
      icon: <Swords className="w-6 h-6 text-amber-400" />,
      content: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">The Sandbox</Badge>
          <p className="text-zinc-300 leading-relaxed">
            Beyond projects, I enjoy playing table tennis and have had the opportunity to compete at the national level. Sports have taught me discipline, resilience, focus, and the ability to perform under pressure.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            When I am not studying or building, you can usually find me testing my patience and problem-solving mechanics in <strong>Elden Ring</strong>, or exploring to find a genuinely good cup of coffee.
          </p>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30 relative overflow-hidden pb-24">

      {/* Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 sm:pt-20">

        {/* Navigation */}
        <Button
          variant="ghost"
          className="text-zinc-500 hover:text-white hover:bg-white/5 -ml-4 mb-12 transition-all"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pipeline
        </Button>

        {/* SECTION 1: THE IDENTITY DECRYPTION HERO */}
        <div className="space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            Verification Status: Authenticated
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
            <span className="text-blue-500/50 select-none mr-2">{">"}</span>
            <DecryptText text="GURNAAM SINGH" />
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mt-4">
            XIMB BM &apos;26-28. Architecting ideas into meaningful impact at the intersection of technology, strategy, and execution.
          </p>
        </div>

        {/* SECTION 2: THE RPG SKILL TREE */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-6 h-6 text-zinc-400" />
            <h2 className="text-2xl font-bold text-white">System Architecture Map</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">

            {/* Left Column: The Node Tree */}
            <div className="lg:col-span-4 space-y-4 relative">
              {/* Connecting vertical line (Visual only) */}
              <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent -z-10 hidden sm:block" />

              {Object.entries(treeData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveNode(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${activeNode === key
                      ? "bg-zinc-900 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[1.02]"
                      : "bg-black/40 border-white/5 hover:bg-zinc-900/50 hover:border-white/10"
                    }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${activeNode === key ? "bg-white/10" : "bg-black/50"}`}>
                    {data.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${activeNode === key ? "text-white" : "text-zinc-400"}`}>
                      {data.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: The Terminal Display */}
            <div className="lg:col-span-8">
              <div className="h-full min-h-[400px] p-8 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
                {/* Terminal Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 bg-zinc-900/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-zinc-600 font-mono ml-4 uppercase tracking-wider">
                    Node_Inspect: {activeNode}.tsx
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="pt-8">
                  {treeData[activeNode].content}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
