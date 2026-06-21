"use client"

import React, { useState, useRef } from "react"
import { 
  Wheat, 
  Droplets, 
  ShieldCheck, 
  Activity, 
  Search, 
  Calculator,
  Lock,
  LineChart,
  Target,
  CheckCircle2,
  Stethoscope,
  ScanBarcode
} from "lucide-react"
import { AiAssistant } from "@/components/ai-assistant"

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

function Badge({ label, className = "" }: { label: string, className?: string }) {
  return (
    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-white/5 border border-white/10 text-zinc-300 ${className}`}>
      {label}
    </span>
  )
}

export default function SaralShaktiPage() {
  const [showJudgesPanel, setShowJudgesPanel] = useState(false)

  // Compressed text strictly to save API tokens
  const saralContext = `You are representing Saral Foods Ltd.
  Problem: India's protein gap is a literacy crisis. 74% urban Indians can't identify their daily protein needs. People have supplement fatigue.
  Solution: Stealth fortification in daily staples. No habit change needed.
  Products:
  1. Shakti Atta: >=15% protein (Soy/Pea blend). ₹270–285 per 5kg pack. (FSSAI 2023 compliant).
  2. Shakti Dairy+: High-protein lassi (>=8g protein per 200ml, ₹35 ASP) and fortified curd.
  Business Moats: 120M household reach, regulatory first-mover, behavioral stealth, QR lab-tested credibility.
  Unit Economics: 12-15% premium, ₹8-12 incremental ingredient cost, 14-18% steady state EBITDA. Target: 1000 Cr in 5 years.`;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden pb-24">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-900/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Wheat className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Saral <span className="text-emerald-400">Shakti</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowJudgesPanel(!showJudgesPanel)}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
            >
              {showJudgesPanel ? "Close Dashboard" : (
                <><Lock className="w-3 h-3 text-amber-400" /> View Business Moats</>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Activity className="w-3.5 h-3.5" />
              Strategic Implementation Pitch
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Roz ka protein.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-200">
                Ghar ki thaali.
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
              India’s protein gap isn't just a supply crisis; it's a literacy crisis. 
              Over 70% of households are protein deficient, yet 90% don't know their daily requirements. 
              <strong className="text-zinc-200 font-semibold"> Saral Shakti solves this without changing daily habits.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: "I need help calculating my family's daily protein requirement." }))}
                  className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-black rounded-full text-white border border-white/10 font-medium"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Calculate Family Need
                </button>
              </div>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 font-medium border border-white/10 transition-all"
              >
                Explore the Logic
              </button>
            </div>
          </div>
          
          <div className="relative lg:pl-12">
            <TiltCard>
              <div className="relative bg-zinc-950/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl -z-10 transition-transform group-hover:scale-110" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <Badge label="Mass Staple Innovation" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20" />
                  <Wheat className="w-8 h-8 text-amber-500/50" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Shakti Atta (5kg)</h3>
                <p className="text-zinc-400 text-sm mb-6 relative z-10">Stealth fortification. Exact same taste and texture, scientifically powered.</p>
                
                <div className="space-y-3 relative z-10 font-mono text-sm">
                  <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-zinc-500">Target_Protein_Content</span>
                    <span className="font-bold text-emerald-400">≥ 15.0%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-zinc-500">FSSAI_2023_Compliance</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
                    <span className="text-emerald-500">Consumer_Price_Target</span>
                    <span className="font-bold text-emerald-400">₹270–285</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </section>

      {/* --- THE PERSONA & PROBLEM --- */}
      <section className="py-20 relative z-10 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">The "Conscious Homemaker" Dilemma</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm hover:bg-zinc-900/80 transition text-left">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Aware, but Confused</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                She knows protein is important, but nearly 74% of urban Indians are unable to correctly identify their recommended intake.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm hover:bg-zinc-900/80 transition text-left">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                <Stethoscope className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Supplement Fatigue</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Navigating expensive powders and niche fitness bars is overwhelming and breaks the household grocery budget.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm hover:bg-zinc-900/80 transition text-left">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">The Habit Barrier</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Natural intake requires zero cognitive effort. The solution must fit seamlessly into the daily chapati or lassi ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE ANCHORS (PRODUCTS) --- */}
      <section id="products" className="py-24 relative z-10 scroll-m-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Everyday Nutrition Arsenal</h2>
              <p className="text-zinc-400">Designed for scale, formulated for trust, and priced for the Indian household.</p>
            </div>
            <Badge label="Execution Phase 1" className="bg-zinc-800 text-zinc-300" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Anchor 1 */}
            <TiltCard>
              <div className="h-full rounded-3xl bg-zinc-950 border border-white/10 p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -z-10 group-hover:bg-amber-500/10 transition-colors" />
                
                <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <Wheat className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Shakti Atta</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                  The Primary Anchor. Protein-enriched multigrain atta designed for mass rural and semi-urban penetration.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm text-zinc-300"><strong>≥ 15% Protein</strong> (Cost-rationalized Soy/Pea blend)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm text-zinc-300">1kg Trial & 5kg Family SKUs to drive LTV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm text-zinc-300">Zero disruption to dough texture or cooking ritual</span>
                  </li>
                </ul>
              </div>
            </TiltCard>

            {/* Anchor 2 */}
            <TiltCard>
              <div className="h-full rounded-3xl bg-zinc-950 border border-white/10 p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <Droplets className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Shakti Dairy+</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                  The Secondary Anchor. High-protein dairy extending Saral's equity into youth snacking and on-the-go refreshment.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-sm text-zinc-300"><strong>≥ 8g Protein</strong> per 200ml Lassi serve</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-sm text-zinc-300">Fortified Curd variants (Family & Single-serve)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-sm text-zinc-300">Highly accessible ASP of ₹35 for impulse buys</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- THE CREDIBILITY LAYER (Tech/Data Vibe) --- */}
      <section className="py-20 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge label="The Trust Engine" className="bg-amber-500/10 text-amber-400 border-amber-500/20" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-6 mb-4">
                "Know Your Protein" Platform
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                The market is flooded with deceptive "high protein" labels. We neutralize skepticism by building an unshakeable, data-driven credibility moat. 
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">QR-Scannable Lab Reports</h4>
                    <p className="text-xs text-zinc-500 mt-1">Every batch's exact protein content validated by 3rd-party clinical labs, directly accessible on-pack.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Localized Requirement Calculators</h4>
                    <p className="text-xs text-zinc-500 mt-1">Free digital tools to help mothers calculate exact dietary needs for their families without nutrition jargon.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-zinc-950 p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              
              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Verified
              </div>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
                <div className="w-16 h-16 bg-black border border-white/10 rounded-xl flex items-center justify-center">
                  <ScanBarcode className="w-8 h-8 text-zinc-600" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-mono mb-1">BATCH_ID #SK-9942</div>
                  <div className="font-bold text-white text-sm">Shakti Atta (5kg) Analytics</div>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Target_Protein</span>
                  <span className="text-xs font-semibold text-white">15.0%</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-white/5 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[15.2%] shadow-[0_0_10px_#10b981]" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-zinc-500">Lab_Tested_Result</span>
                  <span className="text-sm font-bold text-emerald-400">15.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- JUDGES ONLY DASHBOARD (TOGGLED) --- */}
      {showJudgesPanel && (
        <section className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-950 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-zinc-800 p-6 sm:p-10 relative">
            
            <button 
              onClick={() => setShowJudgesPanel(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full px-4 py-2 text-xs font-mono transition"
            >
              [ ESC ] Close Dashboard
            </button>
            
            <div className="flex items-center gap-3 mb-8">
              <Lock className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Strategy & Business Viability</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Financials */}
              <div className="bg-black/50 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-emerald-500" /> Unit Economics & Growth
                </h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                    <span className="text-zinc-500">Target Premium (Atta)</span>
                    <span className="font-bold text-white">12–15% (₹270-285)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                    <span className="text-zinc-500">Incremental Ingred. Cost</span>
                    <span className="font-bold text-amber-500">₹8–12 / kg</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
                    <span className="text-zinc-500">Steady State EBITDA (Yr 4+)</span>
                    <span className="font-bold text-emerald-500">14–18%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-zinc-500">Year 5 Target Revenue</span>
                    <span className="font-bold text-white">≥ ₹1,000 Crore</span>
                  </div>
                </div>
              </div>

              {/* The 4 Moats */}
              <div className="bg-black/50 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> The Defensibility Moats
                </h3>
                <div className="space-y-3">
                  <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <h4 className="text-xs font-bold text-white mb-1">1. Distribution (120M HHs)</h4>
                    <p className="text-[11px] text-zinc-400">Immediate access to Tier-2/3 GT networks. Niche brands cannot replicate this scale in 5 years.</p>
                  </div>
                  <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <h4 className="text-xs font-bold text-white mb-1">2. Regulatory First-Mover</h4>
                    <p className="text-[11px] text-zinc-400">Early alignment with FSSAI 2023 atta standards builds an institutional moat before the market floods.</p>
                  </div>
                  <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                    <h4 className="text-xs font-bold text-white mb-1">3. Behavioural Stealth</h4>
                    <p className="text-[11px] text-zinc-400">Zero consumer habit change required. Natural integration into the daily chapati/lassi ritual.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Go To Market */}
            <div className="mt-6 bg-black/50 rounded-2xl p-6 border border-zinc-800">
               <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-500" /> Go-To-Market Phasing
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border-l-2 border-zinc-800 pl-4">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-500 mb-1">Phase 1 (Months 0-6)</div>
                    <div className="text-xs text-white font-medium">Pilot & Validate</div>
                    <div className="text-[11px] text-zinc-500 mt-1">2-state pilot focusing on validation, QC, and initial GT trials.</div>
                  </div>
                  <div className="border-l-2 border-zinc-800 pl-4">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-amber-500 mb-1">Phase 2 (Months 6-18)</div>
                    <div className="text-xs text-white font-medium">Regional Scale</div>
                    <div className="text-[11px] text-zinc-500 mt-1">Expand to 8-10 states, launch Dairy+ in major metros.</div>
                  </div>
                  <div className="border-l-2 border-zinc-800 pl-4">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-blue-500 mb-1">Phase 3 (Months 18-36)</div>
                    <div className="text-xs text-white font-medium">National Rollout</div>
                    <div className="text-[11px] text-zinc-500 mt-1">Full national distribution and adjacent SKU extensions.</div>
                  </div>
                </div>
            </div>

          </div>
        </section>
      )}

      {/* AI ASSISTANT INJECTED WITH SARAL THEME */}
      <AiAssistant 
        isVisitor={true} 
        variant="saral"
        talentData={saralContext} 
      />

    </div>
  )
}
