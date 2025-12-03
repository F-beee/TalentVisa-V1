"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Users, TrendingUp, Shield, Star, ArrowRight, Building, Info, Award, } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [autoLoginCountdown, setAutoLoginCountdown] = useState(4)
  const [showAutoLoginTimer, setShowAutoLoginTimer] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAutoLoginTimer(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showAutoLoginTimer) {
      if (autoLoginCountdown > 0) {
        const timer = setInterval(() => setAutoLoginCountdown((c) => c - 1), 1000)
        return () => clearInterval(timer)
      } else {
        handleGuestLogin()
      }
    }
  }, [showAutoLoginTimer, autoLoginCountdown])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 2000)
  }

  const handleGuestLogin = () => {
    window.location.href = "/dashboard?guest=true"
  }

  const handleEmployerLogin = () => {
    window.location.href = "/employers"
  }

  const handleGitHubLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("GitHub login successful! Redirecting to dashboard...")
      window.location.href = "/dashboard"
    }, 2000)
  }

  const handleLinkedInLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("LinkedIn login successful! Redirecting to dashboard...")
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="absolute top-6 right-6 z-50 flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmployerLogin}
          disabled={isLoading}
          className="glass-effect hover:bg-accent/20 hover:scale-105 transition-all duration-300 bg-transparent cursor-pointer pointer-events-auto"
        >
          <Building className="w-4 h-2 mr-2" />
          {isLoading ? "Loading..." : "For Employers"}
        </Button>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-32 sm:pt-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse-glow text-xl text-base py-6 px-9 -mt-12">
                <Award className="w-4 h-4 mr-2" />
                Next-Gen Talent Platform
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Performance
                </span>{" "}
                is Your Resume
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Show your skills, get rated, and land jobs. Connect with opportunities based on real talent, not just
                credentials.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass-effect p-4 rounded-xl text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Talents Ranked</div>
              </div>
              <div className="glass-effect p-4 rounded-xl text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="glass-effect p-4 rounded-xl text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md glass-effect border-primary/20">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Welcome to TalentVisa</CardTitle>
                <CardDescription>Access your skill-based career platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-background/50 border-primary/30 focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          className="bg-background/50 border-primary/30 focus:border-primary"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 animate-pulse-glow"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="bg-background/50 border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="bg-background/50 border-primary/30 focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-background/50 border-primary/30 focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <Input
                          id="signupPassword"
                          type="password"
                          className="bg-background/50 border-primary/30 focus:border-primary"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 animate-pulse-glow"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-primary/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="glass-effect hover:bg-zinc-500/10 hover:border-zinc-500/30 hover:scale-105 transition-all duration-300 bg-transparent"
                      onClick={handleGitHubLogin}
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="glass-effect hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 bg-transparent"
                      onClick={handleLinkedInLogin}
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  {showAutoLoginTimer && (
                    <div className="text-center mb-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary text-xs animate-pulse">
                        Auto-login in {autoLoginCountdown}s
                      </Badge>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full glass-effect hover:bg-accent/20 hover:scale-105 border-accent/30 bg-transparent transition-all duration-300"
                    onClick={handleGuestLogin}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Continue as Guest
                  </Button>

                  <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm">
                    <h3 className="font-semibold flex items-center gap-2 mb-2 text-primary text-xs uppercase tracking-wider">
                      <Info className="w-3 h-3" /> 
                      MVP Tour Guide
                    </h3>
                    <div className="space-y-2 text-muted-foreground text-xs">
                      <p>
                        This is an MVP website. You don't need to login. Just chill, you will be auto-logged in as a guest in 10 seconds.
                      </p>
                      <p>
                        <span className="font-medium text-foreground">🏢 For Employers:</span> Click the button (top-right) to browse verified candidates, analytics, and hiring tools.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cool Trademark Footer */}
      <footer className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <div className="glass-effect px-5 py-2 rounded-full border border-primary/20 shadow-lg backdrop-blur-md">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            MVP by <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold animate-gradient">Gurnaam</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
