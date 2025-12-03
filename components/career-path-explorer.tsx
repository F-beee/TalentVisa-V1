"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Star, ChevronRight, Clock, DollarSign } from "lucide-react"

interface CareerPathExplorerProps {
  currentSkills: {
    coding: number
    speaking: number
    logical: number
    personality: number
  }
  initialPath?: string
}

const careerPaths = [
  {
    id: "senior-engineer",
    title: "Senior Software Engineer",
    currentMatch: 85,
    timeToAchieve: "6-12 months",
    salaryRange: "$120k - $180k",
    requiredSkills: { coding: 95, speaking: 75, logical: 90, personality: 80 },
    improvements: [
      { skill: "Advanced System Design", current: 82, target: 95, priority: "High" },
      { skill: "Technical Leadership", current: 70, target: 85, priority: "Medium" },
    ],
    nextSteps: [
      "Complete advanced algorithms course",
      "Lead a major project initiative",
      "Mentor junior developers",
      "Contribute to open source projects",
    ],
  },
  {
    id: "full-stack-dev",
    title: "Full Stack Developer",
    currentMatch: 92,
    timeToAchieve: "3-6 months",
    salaryRange: "$100k - $160k",
    requiredSkills: { coding: 90, speaking: 60, logical: 80, personality: 70 },
    improvements: [
      { skill: "Frontend Frameworks", current: 85, target: 95, priority: "High" },
      { skill: "Backend Integration", current: 80, target: 90, priority: "Medium" },
    ],
    nextSteps: [
      "Build a full-stack project",
      "Learn advanced React patterns",
      "Master database optimization",
      "Contribute to open source",
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    currentMatch: 65,
    timeToAchieve: "12-18 months",
    salaryRange: "$130k - $200k",
    requiredSkills: { coding: 70, speaking: 95, logical: 85, personality: 95 },
    improvements: [
      { skill: "Public Speaking", current: 78, target: 95, priority: "High" },
      { skill: "Strategic Thinking", current: 80, target: 90, priority: "High" },
      { skill: "Stakeholder Management", current: 75, target: 95, priority: "Medium" },
    ],
    nextSteps: ["Develop business plan", "Build MVP product", "Network with investors", "Study entrepreneurship"],
  },
  {
    id: "tech-lead",
    title: "Technical Lead",
    currentMatch: 78,
    timeToAchieve: "8-15 months",
    salaryRange: "$140k - $190k",
    requiredSkills: { coding: 90, speaking: 85, logical: 95, personality: 85 },
    improvements: [
      { skill: "Architecture Design", current: 85, target: 95, priority: "High" },
      { skill: "Team Leadership", current: 75, target: 90, priority: "High" },
    ],
    nextSteps: [
      "Design system architecture",
      "Lead technical decisions",
      "Mentor team members",
      "Improve communication skills",
    ],
  },
  {
    id: "startup-founder",
    title: "Startup Founder",
    currentMatch: 55,
    timeToAchieve: "18-36 months",
    salaryRange: "Variable (Equity)",
    requiredSkills: { coding: 80, speaking: 95, logical: 90, personality: 98 },
    improvements: [
      { skill: "Business Strategy", current: 60, target: 90, priority: "High" },
      { skill: "Fundraising", current: 40, target: 85, priority: "High" },
      { skill: "Leadership", current: 70, target: 95, priority: "High" },
    ],
    nextSteps: ["Develop business plan", "Build MVP product", "Network with investors", "Study entrepreneurship"],
  },
]

export function CareerPathExplorer({ currentSkills, initialPath }: CareerPathExplorerProps) {
  const [selectedPath, setSelectedPath] = useState<string>(initialPath || "")

  useEffect(() => {
    if (initialPath) {
      setSelectedPath(initialPath)
    }
  }, [initialPath])

  const calculateMatch = (requiredSkills: any) => {
    const totalGap = Object.keys(requiredSkills).reduce((sum, skill) => {
      const current = currentSkills[skill as keyof typeof currentSkills]
      const required = requiredSkills[skill]
      return sum + Math.max(0, required - current)
    }, 0)
    return Math.max(0, 100 - totalGap / 4)
  }

  const sortedPaths = careerPaths
    .map((path) => ({
      ...path,
      calculatedMatch: calculateMatch(path.requiredSkills),
    }))
    .sort((a, b) => b.calculatedMatch - a.calculatedMatch)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
          <Target className="w-6 h-6 mr-2 text-primary" />
          Career Path Explorer
        </h3>
        <p className="text-muted-foreground">
          Discover how improving specific skills can unlock new career opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-start">
        {sortedPaths.map((path) => (
          <Card
            key={path.id}
            className={`glass-effect cursor-pointer transition-all hover:border-primary/40 ${
              selectedPath === path.id ? "border-primary/60 bg-primary/5" : "border-primary/20"
            }`}
            onClick={() => setSelectedPath(selectedPath === path.id ? "" : path.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <Badge
                  className={`${
                    path.calculatedMatch >= 80
                      ? "bg-green-500/20 text-green-400"
                      : path.calculatedMatch >= 60
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {Math.round(path.calculatedMatch)}% match
                </Badge>
              </div>
              <CardDescription className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {path.timeToAchieve}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {path.salaryRange}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Coding:</span>
                  <span
                    className={currentSkills.coding >= path.requiredSkills.coding ? "text-green-400" : "text-red-400"}
                  >
                    {currentSkills.coding}/{path.requiredSkills.coding}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Speaking:</span>
                  <span
                    className={
                      currentSkills.speaking >= path.requiredSkills.speaking ? "text-green-400" : "text-red-400"
                    }
                  >
                    {currentSkills.speaking}/{path.requiredSkills.speaking}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Logical:</span>
                  <span
                    className={currentSkills.logical >= path.requiredSkills.logical ? "text-green-400" : "text-red-400"}
                  >
                    {currentSkills.logical}/{path.requiredSkills.logical}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Personality:</span>
                  <span
                    className={
                      currentSkills.personality >= path.requiredSkills.personality ? "text-green-400" : "text-red-400"
                    }
                  >
                    {currentSkills.personality}/{path.requiredSkills.personality}
                  </span>
                </div>
              </div>

              {selectedPath === path.id && (
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div>
                    <h5 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1 text-accent" />
                      Key Improvements Needed
                    </h5>
                    <div className="space-y-2">
                      {path.improvements.map((improvement, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{improvement.skill}</span>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  improvement.priority === "High"
                                    ? "border-red-500/50 text-red-400"
                                    : "border-yellow-500/50 text-yellow-400"
                                }`}
                              >
                                {improvement.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {improvement.current} → {improvement.target}
                              </span>
                            </div>
                          </div>
                          <Progress value={(improvement.current / improvement.target) * 100} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-primary" />
                      Next Steps
                    </h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {path.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-center">
                          <ChevronRight className="w-3 h-3 mr-2 text-primary" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert("A tailored plan is being prepared for you for this role, and you will be notified via email once it gets ready.")
                    }}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Start This Path
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
