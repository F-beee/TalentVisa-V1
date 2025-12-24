"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Play, ChevronRight, Award, Shield, Users, TrendingUp, Zap } from "lucide-react"

export default function PitchPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effects for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "hero", title: "Vision" },
    { id: "problem", title: "The Crisis" },
    { id: "solution", title: "The Solution" },
    { id: "traction", title: "Traction" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-foreground relative selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-float opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-float opacity-40" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse opacity-30" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Floating Nav for Judges */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TalentVisa <span className="text-muted-foreground font-normal text-sm ml-2 hidden sm:inline">| Pitch Deck</span></span>
          </div>
          <div className="flex gap-4">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {section.title}
              </button>
            ))}
            <Button size="sm" className="bg-primary hover:bg-primary/90 ml-4 hidden md:flex" onClick={() => window.location.href = "/"}>
              Live App
            </Button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO - THE VISION */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container px-4 text-center z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all px-4 py-1 text-sm uppercase tracking-widest">
            The Authenticity Engine
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight">
            Where <span className="bg-gradient-to-r from-primary via-accent to-blue-500 bg-clip-text text-transparent animate-gradient">Skill</span> <br />
            Replaces Guesswork.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Resume inflation is a global crisis. We built the protocol to authenticate human talent through rigorous, proctored simulations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 rounded-full" onClick={() => scrollToSection("problem")}>
              Why This Matters <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM - INTERACTIVE COMPARISON */}
      <section id="problem" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="container px-4 z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The <span className="text-red-500">Crisis</span> of Trust</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Employers are drowning in noise. Resume inflation means the paper profile rarely matches the real person.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            
            {/* The Old Way: Resume */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <Card className="relative bg-black border-red-500/30 p-6 h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">The Resume</h3>
                      <p className="text-red-400 text-sm">Self-Reported Claims</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="space-y-4 opacity-70">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded mt-4">
                      <p className="text-red-300 text-sm font-mono">"Expert in Python"</p>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <p className="text-red-300 text-sm font-mono">"5 Years Experience"</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-center text-red-400 font-bold">The Reality: Unverified & Inflated</p>
                </div>
              </Card>
            </div>

            {/* The New Way: TalentVisa */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
              <Card className="relative bg-black border-primary/50 p-6 h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Talent Visa</h3>
                      <p className="text-primary text-sm">Verified Performance Data</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-white">92/100</div>
                      <div className="text-xs text-primary uppercase">Coding Score</div>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="text-2xl font-bold text-white">Top 5%</div>
                      <div className="text-xs text-accent uppercase">Global Rank</div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary fill-current" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">Performance Recording</p>
                      <p className="text-xs text-muted-foreground">Watch the actual test (Transparent)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-center text-primary font-bold">The Reality: Proven & Authentic</p>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION - FEATURES */}
      <section id="solution" className="min-h-screen flex items-center justify-center relative py-20 bg-white/5">
        <div className="container px-4 z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Our Protocol</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Build Trust</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We replaced multiple-choice questions with rigorous, real-world simulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="bg-black/50 border-white/10 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">No Scope for Cheating</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Assessments are conducted in a proctored, standardized environment. We eliminate the "AI Pilot" problem entirely.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-black/50 border-white/10 hover:border-accent/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Eliminating Noise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We filter out non-performers immediately. Recruiters go from reviewing 500 inflated resumes to interviewing 5 verified candidates.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-black/50 border-white/10 hover:border-blue-500/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Total Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Employers can access actual performance recordings. Trust is built on evidence you can see, not just a score.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 4: TRACTION & VALIDATION */}
      <section id="traction" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="container px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-none">
                Built with <br />
                <span className="text-primary">Obsession.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We didn't just build a website. We engineered a standard.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-white">400+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Iterations on <br/>Scoring Logic</div>
                </div>
                <div className="w-full h-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-white">700+</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">UI/UX Iterations <br/>for Perfection</div>
                </div>
                <div className="w-full h-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-white">MVP</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Model Live <br/>& Functional</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Validated by Industry Leaders</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Siemens', 'ICICI Bank', 'Muthoot Fincorp', 'Godrej Properties', 'Prespect AI'].map((company) => (
                  <div key={company} className="bg-black/40 p-4 rounded-xl text-center border border-white/5 flex items-center justify-center h-20">
                    <span className="font-semibold text-gray-300">{company}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
                <p className="text-primary font-medium">"The Authenticity Layer we've been missing."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-20 border-t border-white/10 text-center relative z-10 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to see the future of hiring?</h2>
          <Button size="lg" className="h-16 px-10 text-xl rounded-full animate-pulse-glow" onClick={() => window.location.href = "/"}>
            <Zap className="mr-2 w-6 h-6" /> Launch Live MVP
          </Button>
          <p className="mt-12 text-sm text-muted-foreground">
            MVP by <span className="text-primary font-bold">Gurnaam Singh (FBEE)</span>
          </p>
        </div>
      </footer>

    </div>
  )
}
