"use client"

import React, { useState } from "react"
import { 
  Wheat, 
  Droplets, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Search, 
  ArrowRight,
  Calculator,
  Lock,
  LineChart,
  Target,
  Layers,
  CheckCircle2,
  Stethoscope
} from "lucide-react"

export default function SaralShaktiPage() {
  const [showJudgesPanel, setShowJudgesPanel] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-800 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <Wheat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-900">
              Saral <span className="text-emerald-600">Shakti</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowJudgesPanel(!showJudgesPanel)}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition flex items-center gap-2"
            >
              <Lock className="w-3 h-3" />
              {showJudgesPanel ? "Close Judges Panel" : "View Business Moats"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-amber-100/50 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-emerald-50/50 blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
              <Activity className="w-4 h-4" />
              The Future of Everyday Nutrition
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight">
              Roz ka protein.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Ghar ki thaali.
              </span>
            </h1>
            
            <p className="text-lg text-zinc-600 leading-relaxed max-w-xl">
              India’s protein gap isn't just a supply crisis; it's a literacy crisis. 
              Over 70% of households are protein deficient, yet 90% don't know their daily requirements. 
              <strong className="text-zinc-900 font-semibold"> Saral Shakti changes that without changing your daily habits.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1">
                <Calculator className="w-5 h-5" />
                Calculate Family Need
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-zinc-50 text-zinc-800 font-medium border border-zinc-200 transition-all">
                Explore the Range
              </button>
            </div>
          </div>
          
          {/* Hero Visual Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-emerald-200 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl" />
            <div className="relative bg-white p-8 rounded-3xl border border-zinc-100 shadow-2xl overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-8">
                <Badge label="Mass Staple Innovation" />
                <Wheat className="w-8 h-8 text-amber-500 opacity-20" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 mb-2">Shakti Atta (5kg)</h3>
              <p className="text-zinc-500 mb-6">Stealth fortification. Exact same taste, naturally powered.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl">
                  <span className="text-sm font-medium text-zinc-600">Protein Content</span>
                  <span className="text-sm font-bold text-emerald-600">≥ 15% (Dry-weight)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl">
                  <span className="text-sm font-medium text-zinc-600">FSSAI Compliant</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl border border-amber-200 bg-amber-50/50">
                  <span className="text-sm font-medium text-amber-800">Consumer Price</span>
                  <span className="text-sm font-bold text-amber-800">₹270–285</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE PERSONA & PROBLEM --- */}
      <section className="py-20 bg-emerald-900 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">The "Conscious Homemaker" Dilemma</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Search className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Aware, but Confused</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">
                She knows protein is important, but nearly 74% of urban Indians are unable to correctly identify their recommended intake.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform md:-translate-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Stethoscope className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Supplement Fatigue</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">
                Navigating expensive powders and niche fitness bars is overwhelming and breaks the household grocery budget.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-semibold mb-3">The Habit Barrier</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed">
                Natural intake requires zero cognitive effort. The solution must fit seamlessly into the daily chapati or lassi ritual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE ANCHORS (PRODUCTS) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">The Everyday Nutrition Arsenal</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Designed for scale, formulated for trust, and priced for the Indian household.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Anchor 1 */}
            <div className="group rounded-3xl bg-zinc-50 border border-zinc-200 p-8 sm:p-10 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Wheat className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Shakti Atta</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                The Primary Anchor. Protein-enriched multigrain atta designed for mass rural and semi-urban penetration.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700"><strong>≥ 15% Protein</strong> (Soy/Pea blend)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700">1kg Trial & 5kg Family SKUs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700">Zero change in dough texture or taste</span>
                </li>
              </ul>
              <button className="text-emerald-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                View Nutritional Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Anchor 2 */}
            <div className="group rounded-3xl bg-zinc-50 border border-zinc-200 p-8 sm:p-10 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Shakti Dairy+</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                The Secondary Anchor. High-protein dairy extending Saral's equity into youth snacking and refreshment.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700"><strong>≥ 8g Protein</strong> per 200ml Lassi serve</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700">Fortified Curd (Family & Single-serve)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700">Highly accessible ASP of ₹35</span>
                </li>
              </ul>
              <button className="text-blue-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore Dairy Range <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE CREDIBILITY LAYER --- */}
      <section className="py-20 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge label="The Trust Engine" className="bg-amber-200/50 text-amber-800" />
              <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 mt-6 mb-4">
                "Know Your Protein" Platform
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-8">
                The market is flooded with deceptive "high protein" labels. We neutralize skepticism by building an unshakeable credibility moat. 
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                    <Search className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900">QR-Scannable Lab Reports</h4>
                    <p className="text-sm text-zinc-500 mt-1">Every batch's exact protein content validated by 3rd-party clinical labs.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                    <Calculator className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900">Localized Requirement Calculators</h4>
                    <p className="text-sm text-zinc-500 mt-1">Free digital tools to help mothers calculate exact dietary needs for their families.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Mock QR / Report Visual */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 relative">
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Verified
              </div>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100">
                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-mono">SCAN<br/>ME</span>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-mono">BATCH #SK-9942</div>
                  <div className="font-bold text-zinc-900">Shakti Atta 5kg</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-600">Claimed Protein</span>
                  <span className="text-sm font-semibold">15.0%</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[15%]" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-zinc-600">Lab Tested Result</span>
                  <span className="text-sm font-bold text-emerald-600">15.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- JUDGES ONLY DASHBOARD (HIDDEN BY DEFAULT) --- */}
      {showJudgesPanel && (
        <section className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-zinc-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-zinc-800 p-8 sm:p-10 relative">
            <button 
              onClick={() => setShowJudgesPanel(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-800 rounded-full px-4 py-2 text-sm font-semibold transition"
            >
              Close Dashboard
            </button>
            
            <div className="flex items-center gap-3 mb-8">
              <Lock className="w-6 h-6 text-amber-500" />
              <h2 className="text-3xl font-bold text-white tracking-tight">Strategy & Business Viability</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Financials */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-emerald-500" /> Unit Economics & Growth
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                    <span className="text-sm text-zinc-400">Target Premium (Atta)</span>
                    <span className="text-sm font-bold text-white">12–15% (₹270-285)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                    <span className="text-sm text-zinc-400">Incremental Ingred. Cost</span>
                    <span className="text-sm font-bold text-amber-500">₹8–12 / kg</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                    <span className="text-sm text-zinc-400">Steady State EBITDA (Yr 4+)</span>
                    <span className="text-sm font-bold text-emerald-500">14–18%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-zinc-400">Year 5 Target Revenue</span>
                    <span className="text-lg font-bold text-white">≥ ₹1,000 Crore</span>
                  </div>
                </div>
              </div>

              {/* The 4 Moats */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" /> The Defensibility Moats
                </h3>
                <div className="space-y-4">
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <h4 className="text-sm font-bold text-white mb-1">1. Distribution (120M HHs)</h4>
                    <p className="text-xs text-zinc-400">Immediate access to Tier-2/3 GT networks. Niche brands cannot replicate this scale in 5 years.</p>
                  </div>
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <h4 className="text-sm font-bold text-white mb-1">2. Regulatory First-Mover</h4>
                    <p className="text-xs text-zinc-400">Early alignment with FSSAI 2023 atta standards builds an institutional moat before the market floods.</p>
                  </div>
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <h4 className="text-sm font-bold text-white mb-1">3. Behavioural Stealth</h4>
                    <p className="text-xs text-zinc-400">Zero consumer habit change required. Natural integration into the daily chapati/lassi ritual.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Go To Market */}
            <div className="mt-8 bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
               <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" /> Go-To-Market Phasing
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border-l-2 border-zinc-700 pl-4">
                    <div className="text-xs font-bold text-emerald-500 mb-1">Phase 1 (Months 0-6)</div>
                    <div className="text-sm text-white font-medium">Pilot & Validate</div>
                    <div className="text-xs text-zinc-500 mt-1">2-state pilot focusing on validation, QC, and initial GT trials.</div>
                  </div>
                  <div className="border-l-2 border-zinc-700 pl-4">
                    <div className="text-xs font-bold text-amber-500 mb-1">Phase 2 (Months 6-18)</div>
                    <div className="text-sm text-white font-medium">Regional Scale</div>
                    <div className="text-xs text-zinc-500 mt-1">Expand to 8-10 states, launch Dairy+ in major metros.</div>
                  </div>
                  <div className="border-l-2 border-zinc-700 pl-4">
                    <div className="text-xs font-bold text-blue-500 mb-1">Phase 3 (Months 18-36)</div>
                    <div className="text-sm text-white font-medium">National Rollout</div>
                    <div className="text-xs text-zinc-500 mt-1">Full national distribution and adjacent SKU extensions.</div>
                  </div>
                </div>
            </div>

          </div>
        </section>
      )}

      {/* --- AI WIDGET PLACEHOLDER --- */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500 animate-pulse" />
          <div className="w-16 h-16 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transform transition-transform group-hover:scale-110 active:scale-95">
            <span className="text-white text-xs font-bold">AI<br/>Coach</span>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max px-4 py-2 bg-white rounded-xl shadow-lg border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-xs font-semibold text-zinc-800">Ask the Saral Nutritionist</p>
          </div>
        </div>
      </div>

    </div>
  )
}

// Simple Badge Component to keep code clean
function Badge({ label, className = "" }: { label: string, className?: string }) {
  return (
    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-zinc-100 text-zinc-600 ${className}`}>
      {label}
    </span>
  )
}
