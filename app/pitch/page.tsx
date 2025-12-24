"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Play, ChevronRight, Award, Shield, Users, TrendingUp, Zap, Search, Lock, FileText, AlertTriangle, Monitor, Mic, Brain, ArrowRight } from "lucide-react"

export default function PitchPage() {
  const [scrolled, setScrolled] = useState(false)
  
  // Problem Section State
  const [activeProblem, setActiveProblem] = useState<'resume' | 'interview'>('resume')
  const [resumeHovered, setResumeHovered] = useState(false)
  const [interviewStep, setInterviewStep] = useState<'start' | 'question' | 'result'>('start')
  const [interviewOutcome, setInterviewOutcome] = useState<'lucky' | 'niche'>('lucky')

  // Solution Demo State
  const [demoStage, setDemoStage] = useState<'idle' | 'analyzing' | 'complete'>('idle')
  const [progress, setProgress] = useState(0)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Interview Simulation Logic
  const runInterviewSim = (type: 'lucky' | 'niche') => {
    setInterviewStep('question')
    setInterviewOutcome(type)
    setTimeout(() => setInterviewStep('result'), 1500)
  }

  const resetInterview = () => setInterviewStep('start')

  // Verification Demo Logic
  const runVerificationDemo = () => {
    if (demoStage === 'analyzing') return
    setDemoStage('analyzing')
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setDemoStage('complete')
          return 100
        }
        return prev + 2
      })
    }, 40)
  }

  const resetDemo = () => {
    setDemoStage('idle')
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-black text-foreground relative selection:bg-primary/30 font-sans overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-float opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px] animate-float opacity-30" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" : "py-6 bg-transparent"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white hidden sm:inline">TalentVisa</span>
          </div>
          <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-6" onClick={() => window.location.href = "/"}>
            Launch App
          </Button>
        </div>
      </nav>

      {/* 1. HERO: The Hook */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container px-4 text-center z-10 flex flex-col items-center">
          <Badge className="mb-8 bg-white/5 text-gray-300 border-white/10 px-4 py-1.5 text-sm uppercase tracking-widest backdrop-blur-md">
            The Pitch Deck
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8 leading-tight max-w-6xl">
            Truth over <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">Guesswork.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Hiring is broken. We built the <strong>Authenticity Engine</strong> to fix it.
            <br />Scroll to experience the problem and the solution.
          </p>
          <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection("problem")}>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
              <ChevronRight className="w-6 h-6 rotate-90 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SIMULATION */}
      <section id="problem" className="min-h-screen flex flex-col justify-center py-24 relative border-t border-white/5 bg-[#050505]">
        <div className="container px-4 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Hiring is a <span className="text-red-500">Gamble</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Select a scenario to simulate why traditional methods fail.
            </p>
            
            <div className="flex justify-center gap-4 mb-12">
              <button 
                onClick={() => setActiveProblem('resume')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeProblem === 'resume' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
              >
                1. The Inflated Resume
              </button>
              <button 
                onClick={() => setActiveProblem('interview')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeProblem === 'interview' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
              >
                2. The 10-Min Interview
              </button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto min-h-[500px]">
            {/* SCENARIO 1: RESUME INFLATION */}
            {activeProblem === 'resume' && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center animate-fade-in">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">The "Prompt Engineer" Candidate</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Candidates today use AI to write perfect resumes. It's effortless to fake credentials, and recruiters drown in noise trying to filter them.
                  </p>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    <strong>Reality Check:</strong> Hover over the resume card to audit the claims.
                  </div>
                </div>

                <div 
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setResumeHovered(true)}
                  onMouseLeave={() => setResumeHovered(false)}
                  onClick={() => setResumeHovered(!resumeHovered)} // Mobile tap
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl blur opacity-20 transition duration-500 ${resumeHovered ? "opacity-60" : ""}`}></div>
                  <Card className="relative bg-[#0A0A0A] border-red-500/30 p-6 md:p-8 transition-transform duration-500 transform group-hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <Badge variant="outline" className="mb-2 border-red-500/50 text-red-400 bg-red-500/10">Candidate CV</Badge>
                        <h3 className="text-2xl font-bold text-white">Alex Chen</h3>
                      </div>
                      {resumeHovered && <span className="text-red-500 font-mono text-xs animate-pulse">!! UNVERIFIED !!</span>}
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Full Stack Dev</span>
                          <span className={`font-bold transition-all duration-300 ${resumeHovered ? "text-red-500" : "text-gray-500"}`}>
                            {resumeHovered ? "Tutorial Hell Only" : "Senior Level"}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${resumeHovered ? "w-[15%] bg-red-500" : "w-[90%] bg-gray-500"}`}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Cloud Arch</span>
                          <span className={`font-bold transition-all duration-300 ${resumeHovered ? "text-red-500" : "text-gray-500"}`}>
                            {resumeHovered ? "Used AWS Once" : "Expert"}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${resumeHovered ? "w-[5%] bg-red-500" : "w-[85%] bg-gray-500"}`}></div>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-[2px] rounded-xl transition-opacity duration-300 ${resumeHovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                      <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm font-medium flex items-center gap-2">
                        <Search className="w-4 h-4" /> Hover / Tap to Reveal Truth
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* SCENARIO 2: INTERVIEW BIAS */}
            {activeProblem === 'interview' && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center animate-fade-in">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">The "Lucky Question" Bias</h3>
                  <p className="text-gray-400 leading-relaxed">
                    You can't judge 4 years of skill in 15 minutes. It's high variance. A bad candidate can get lucky, and a good one can get unlucky.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => runInterviewSim('lucky')}
                      disabled={interviewStep !== 'start'}
                      className="border-green-500/30 hover:bg-green-500/10 text-green-400"
                    >
                      Ask Easy Question
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => runInterviewSim('niche')}
                      disabled={interviewStep !== 'start'}
                      className="border-red-500/30 hover:bg-red-500/10 text-red-400"
                    >
                      Ask Niche Question
                    </Button>
                  </div>
                  {interviewStep === 'result' && (
                    <Button size="sm" variant="ghost" onClick={resetInterview} className="text-gray-500 hover:text-white">
                      Reset Simulation
                    </Button>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl blur opacity-20"></div>
                  <Card className="relative bg-[#0A0A0A] border-orange-500/30 h-[300px] flex items-center justify-center p-8 text-center">
                    
                    {interviewStep === 'start' && (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-xl font-medium text-white">Candidate Ready</p>
                        <p className="text-sm text-gray-500">Waiting for interviewer question...</p>
                      </div>
                    )}

                    {interviewStep === 'question' && (
                      <div className="space-y-4 animate-pulse">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto">
                          <Mic className="w-8 h-8 text-orange-500" />
                        </div>
                        <p className="text-xl font-medium text-orange-400">Interviewer asking...</p>
                      </div>
                    )}

                    {interviewStep === 'result' && interviewOutcome === 'lucky' && (
                      <div className="space-y-4 animate-scale-in">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <div>
                          <h4 className="text-xl font-bold text-green-400">Hired (False Positive)</h4>
                          <p className="text-sm text-gray-400 mt-2">Candidate knew ONE answer but lacks depth.<br/>You just hired a bad fit.</p>
                        </div>
                      </div>
                    )}

                    {interviewStep === 'result' && interviewOutcome === 'niche' && (
                      <div className="space-y-4 animate-scale-in">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <div>
                          <h4 className="text-xl font-bold text-red-400">Rejected (False Negative)</h4>
                          <p className="text-sm text-gray-400 mt-2">Candidate is an expert but missed a niche fact.<br/>You just lost a star employee.</p>
                        </div>
                      </div>
                    )}

                  </Card>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION - INTERACTIVE DEMO */}
      <section id="demo" className="min-h-screen flex items-center justify-center relative py-24 bg-[#050505]">
        <div className="container px-4 z-10">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">The Solution</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Verification Engine</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We replace guesswork with standardized protocols. Run the engine to see how we authenticate talent.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/80 border-white/10 backdrop-blur-xl overflow-hidden relative min-h-[400px] flex flex-col items-center justify-center shadow-2xl shadow-primary/10">
              
              {/* STAGE 1: IDLE */}
              {demoStage === 'idle' && (
                <div className="text-center space-y-8 animate-fade-in-up">
                  <div className="flex justify-center gap-8 opacity-50 mb-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"><Lock className="w-5 h-5" /></div>
                      <span className="text-xs">Proctoring</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"><Brain className="w-5 h-5" /></div>
                      <span className="text-xs">Simulations</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
                      <span className="text-xs">Analytics</span>
                    </div>
                  </div>
                  
                  <Button size="lg" onClick={runVerificationDemo} className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                    Start Verification Protocol <Zap className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* STAGE 2: ANALYZING */}
              {demoStage === 'analyzing' && (
                <div className="w-full max-w-lg px-8 space-y-10 animate-fade-in">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium uppercase tracking-widest">
                      <span className="text-primary animate-pulse">Processing...</span>
                      <span className="text-white">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary via-purple-500 to-accent transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className={`p-4 rounded-xl border text-center transition-all duration-500 transform ${progress > 10 ? "bg-green-500/10 border-green-500/30 text-green-400 scale-105" : "bg-white/5 border-white/5 text-gray-600 scale-100"}`}>
                      <Lock className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-xs font-bold uppercase">No Cheating</span>
                    </div>
                    <div className={`p-4 rounded-xl border text-center transition-all duration-500 transform ${progress > 45 ? "bg-blue-500/10 border-blue-500/30 text-blue-400 scale-105" : "bg-white/5 border-white/5 text-gray-600 scale-100"}`}>
                      <FileText className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-xs font-bold uppercase">Raw Output</span>
                    </div>
                    <div className={`p-4 rounded-xl border text-center transition-all duration-500 transform ${progress > 80 ? "bg-purple-500/10 border-purple-500/30 text-purple-400 scale-105" : "bg-white/5 border-white/5 text-gray-600 scale-100"}`}>
                      <Award className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-xs font-bold uppercase">Verified Score</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: COMPLETE - SHOW THE CARD */}
              {demoStage === 'complete' && (
                <div className="w-full max-w-md animate-scale-in">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-primary/40 p-6 rounded-2xl relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                      <Award className="w-24 h-24 text-white/5" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <span className="font-bold text-xl text-white">GS</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Gurnaam Singh</h3>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/50 mt-1">Verified Talent</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="text-xs text-gray-400 uppercase">Coding</div>
                        <div className="text-xl font-bold text-white">98/100</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <div className="text-xs text-gray-400 uppercase">Logic</div>
                        <div className="text-xl font-bold text-white">95/100</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="w-full bg-white text-black hover:bg-gray-200" onClick={() => window.location.href = "/"}>
                        View Profile
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 hover:bg-white/10" onClick={resetDemo}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            </Card>
          </div>
        </div>
      </section>

      {/* 4. TRACTION & STATS */}
      <section id="traction" className="min-h-screen flex items-center justify-center relative py-20 border-t border-white/5">
        <div className="container px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-none">
                Built with <br />
                <span className="text-primary">Obsession.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                We didn't just build a website. We engineered a standard.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="text-5xl font-bold text-white group-hover:text-primary transition-colors duration-300">400+</div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">Iterations on <br/>Scoring Logic</div>
                </div>
                
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="text-5xl font-bold text-white group-hover:text-accent transition-colors duration-300">700+</div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">UI/UX Iterations <br/>for Perfection</div>
                </div>
                
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="text-5xl font-bold text-white group-hover:text-blue-500 transition-colors duration-300">MVP</div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">Model Live <br/>& Functional</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-8 text-center">Validated by Industry Leaders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Siemens', 'ICICI Bank', 'Muthoot Fincorp', 'Godrej Properties', 'Prespect AI'].map((company) => (
                  <div key={company} className="bg-black/40 p-4 rounded-xl text-center border border-white/5 flex items-center justify-center h-16 hover:border-primary/30 transition-colors group">
                    <span className="font-semibold text-gray-400 group-hover:text-white transition-colors">{company}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20 text-center">
                <p className="text-white text-lg font-medium italic">"The Authenticity Layer we've been missing."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-24 border-t border-white/10 text-center relative z-10 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Ready to see the future of hiring?</h2>
          <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]" onClick={() => window.location.href = "/"}>
            Launch Live MVP <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          <p className="mt-16 text-sm text-gray-500">
            MVP by <span className="text-gray-300 font-bold">Gurnaam Singh</span>
          </p>
        </div>
      </footer>

    </div>
  )
}
