"use client"

import { 
  ArrowLeft, 
  BrainCircuit, 
  Target, 
  Trophy, 
  Cuboid, 
  Terminal, 
  Layers, 
  Compass,
  Cpu
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ArchitectPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30 relative overflow-hidden pb-24">
      
      {/* Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 sm:pt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Navigation */}
        <Button 
          variant="ghost" 
          className="text-zinc-500 hover:text-white hover:bg-white/5 -ml-4 mb-8 sm:mb-12 transition-all"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Platform
        </Button>

        {/* SECTION 1: The Hero */}
        <div className="space-y-6 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-2">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            Bhubaneswar, India • XIMB BM '26-28
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Architecting ideas into <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              meaningful impact.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            I am passionate about understanding how ideas evolve into products, businesses, and systems. 
            My interests lie at the intersection of technology and management, where innovation, strategy, 
            and execution come together to solve real-world problems.
          </p>
        </div>

        {/* SECTION 2: Mindset & Approach */}
        <div className="mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">The Analytical Mindset</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              I enjoy approaching challenges with curiosity and an analytical mindset. Over time, I have developed a habit of questioning assumptions, testing ideas, and learning through outcomes rather than relying solely on theory. This mindset has shaped how I approach projects, decisions, and continuous learning.
            </p>
          </div>
        </div>

        {/* SECTION 3: The Builds (Bento Grid) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-400" />
            Execution & Builds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl leading-relaxed">
            My journey has involved building both physical and digital products. These projects exposed me to challenges involving product design, user behavior, execution, scalability, and decision-making.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Project 1: PowerrPad */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                  <Cuboid className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="border-purple-500/20 text-purple-300 bg-purple-500/5">Physical Product</Badge>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">PowerrPad</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A smart laptop charging case concept. I was involved in product development, 3D modelling, prototyping, and feasibility analysis. The venture received support through a DST NIDHI grant and was later incorporated as a registered company.
              </p>
            </div>

            {/* Project 2: TalentVisa */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="border-blue-500/20 text-blue-300 bg-blue-500/5">Digital Platform</Badge>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">TalentVisa</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Building on my previous experiences, I developed this skill benchmarking platform designed to help individuals showcase capabilities beyond traditional credentials, strengthening my interest in how technology and management intersect to create value.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Capabilities / Skills */}
        <div className="mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-zinc-400" />
              <h2 className="text-xl font-semibold text-white">Current Focus & Capabilities</h2>
            </div>
            <p className="text-zinc-400 mb-6 text-sm sm:text-base">
              I am particularly interested in understanding how products are built, positioned, scaled, and improved over time. Skills I am currently developing include:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {["Product Thinking", "Analytical Problem-Solving", "Strategic Thinking", "Communication", "Digital Product Development", "Basic 3D Modelling", "Data-Driven Decision Making"].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 hover:bg-white/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: Off-Court & The Future */}
        <div className="grid sm:grid-cols-5 gap-6">
          
          {/* Sports/Interests */}
          <div className="sm:col-span-3 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-semibold text-white">Beyond the Screen</h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
              I enjoy playing table tennis and have had the opportunity to compete at the national level. Sports have taught me discipline, resilience, focus, and the ability to perform under pressure. 
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              I am also deeply interested in technology, artificial intelligence, product strategy, marketing, business models, and emerging trends that shape industries and consumer behavior.
            </p>
          </div>

          {/* The MBA Next Step */}
          <div className="sm:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 flex flex-col justify-center">
            <div className="mb-4 text-blue-400">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">The Next Chapter</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              As I begin my MBA journey at XIMB, I look forward to learning from diverse perspectives, collaborating with talented peers, and exploring opportunities at the intersection of technology, product, marketing, and business strategy.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}