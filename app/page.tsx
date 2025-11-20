"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Users, TrendingUp, Shield, Star, ArrowRight, Building } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

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

  const handleAdminLogin = () => {
    window.location.href = "/admin"
  }

  const handleEmployerLogin = () => {
    window.location.href = "/employers"
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Google login successful! Redirecting to dashboard...")
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
          {isLoading ? "Loading..." : "Employer Login"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdminLogin}
          disabled={isLoading}
          className="glass-effect hover:bg-primary/20 hover:scale-105 transition-all duration-300 bg-transparent cursor-pointer pointer-events-auto"
        >
          <Shield className="w-4 h-4 mr-2" />
          {isLoading ? "Loading..." : "Admin Login"}
        </Button>
      </div>

<div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-32 sm:pt-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
<Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse-glow text-xl text-base py-6 px-9 -mt-12" >
                <Zap className="w-4 h-4 mr-2" />
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
                      className="glass-effect hover:bg-red-500/10 hover:border-red-500/30 hover:scale-105 transition-all duration-300 bg-transparent"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.84c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s.43 3.45 1.18 4.93l2.85-2.84.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
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

                  <Button
                    variant="outline"
                    className="w-full glass-effect hover:bg-accent/20 hover:scale-105 border-accent/30 bg-transparent transition-all duration-300"
                    onClick={handleGuestLogin}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Continue as Guest
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
