"use client"
import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, MessageSquare, Brain, Users, Trophy, TrendingUp, Briefcase, Star, Target, X, Move } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TalentProfileModalProps {
  talent: {
    rank: number
    name: string
    college: string
    score: number
    skills: {
      coding: number
      speaking: number
      logical: number
      personality: number
    }
    experience?: string
    suggestedRoles?: Array<{ role: string; match: number }>
    improvementAreas?: Array<{ skill: string; current: number; target: number; impact: string }>
  }
  isOpen: boolean
  onClose: () => void
}

export function TalentProfileModal({ talent, isOpen, onClose }: TalentProfileModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const overallScore = Math.round(
    (talent.skills.coding + talent.skills.speaking + talent.skills.logical + talent.skills.personality) / 4,
  )

  const defaultSuggestedRoles = [
    { role: "Software Developer", match: Math.max(85, talent.skills.coding - 5) },
    {
      role: "Technical Consultant",
      match: Math.max(80, Math.round((talent.skills.speaking + talent.skills.logical) / 2)),
    },
    {
      role: "Product Manager",
      match: Math.max(75, Math.round((talent.skills.personality + talent.skills.speaking) / 2)),
    },
  ]

  const defaultImprovementAreas = [
    {
      skill: "Public Speaking",
      current: talent.skills.speaking,
      target: Math.min(100, talent.skills.speaking + 10),
      impact: "Unlock leadership roles",
    },
    {
      skill: "System Design",
      current: talent.skills.logical,
      target: Math.min(100, talent.skills.logical + 8),
      impact: "Qualify for senior positions",
    },
  ]

  const suggestedRoles = talent.suggestedRoles || defaultSuggestedRoles
  const improvementAreas = talent.improvementAreas || defaultImprovementAreas

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`relative bg-background border border-primary/20 rounded-lg shadow-2xl ${
  isMobile ? 'w-[92vw] max-w-[440px] h-[82vh]' : 'w-[90vw] max-w-4xl max-h-[90vh]'
} flex flex-col`}
        style={
          !isMobile
            ? {
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'default',
              }
            : {}
        }
      >
        {/* Header with Drag Handle */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-primary/20 ${
            !isMobile ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex items-center space-x-2">
            {!isMobile && <Move className="w-4 h-4 text-muted-foreground" />}
            <h2 className="text-lg font-semibold">Talent Profile</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className={isMobile ? 'w-12 h-12' : 'w-16 h-16'}>
              <AvatarImage
                src={
                  talent.name === "Gurnaam Singh"
                    ? "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Chase"
                    : `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${talent.name}`
                }
              />
              <AvatarFallback className={isMobile ? 'text-base' : 'text-lg'}>
                {talent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'} truncate`}>{talent.name}</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'} truncate`}>
                {talent.college} • {talent.experience || "Experienced"}
              </p>
              <div className="flex items-center space-x-2 mt-2 flex-wrap gap-1">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  <Trophy className="w-3 h-3 mr-1" />
                  Rank #{talent.rank}
                </Badge>
                <Badge variant="outline" className="text-xs">Score: {overallScore}</Badge>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-4`}>
            {/* Skills Breakdown */}
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center ${isMobile ? 'text-base' : 'text-lg'}`}>
                  <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                  Skill Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium">
                      <Code className="w-4 h-4 mr-2 text-primary" />
                      Coding
                    </span>
                    <span className="font-semibold text-sm">{talent.skills.coding}/100</span>
                  </div>
                  <Progress value={talent.skills.coding} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium">
                      <MessageSquare className="w-4 h-4 mr-2 text-accent" />
                      Speaking
                    </span>
                    <span className="font-semibold text-sm">{talent.skills.speaking}/100</span>
                  </div>
                  <Progress value={talent.skills.speaking} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium">
                      <Brain className="w-4 h-4 mr-2 text-primary" />
                      Logical Reasoning
                    </span>
                    <span className="font-semibold text-sm">{talent.skills.logical}/100</span>
                  </div>
                  <Progress value={talent.skills.logical} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium">
                      <Users className="w-4 h-4 mr-2 text-accent" />
                      Personality
                    </span>
                    <span className="font-semibold text-sm">{talent.skills.personality}/100</span>
                  </div>
                  <Progress value={talent.skills.personality} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Suggested Roles */}
            <Card className="border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center text-accent ${isMobile ? 'text-base' : 'text-lg'}`}>
                  <Target className="w-4 h-4 mr-2" />
                  Best Fit Roles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedRoles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium text-sm truncate">{role.role}</span>
                    </div>
                    <Badge variant="secondary" className="bg-accent/20 text-accent text-xs ml-2">
                      {role.match}% 
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card className={`border-primary/20 ${isMobile ? '' : 'lg:col-span-2'}`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center ${isMobile ? 'text-base' : 'text-lg'}`}>
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {improvementAreas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{area.skill}</span>
                      <span className="text-xs text-muted-foreground">
                        {area.current} → {area.target}
                      </span>
                    </div>
                    <Progress value={(area.current / area.target) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">{area.impact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
