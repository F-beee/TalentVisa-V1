"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TalentProfileModal } from "@/components/talent-profile-modal"
import { CareerPathExplorer } from "@/components/career-path-explorer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  TrendingUp,
  Code,
  MessageSquare,
  Brain,
  Users,
  Star,
  ArrowUp,
  Target,
  Briefcase,
  ChevronRight,
  Search,
  Filter,
  Medal,
  Crown,
  Award,
  CheckCircle,
  Download,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Info,
  Building,
} from "lucide-react"
import { AiAssistant } from "@/components/ai-assistant"

// Mock data
const mockTalentData = {
  name: "Rahul Agarwal",
  college: "IIT Bombay",
  rank: 42,
  totalTalents: 10247,
  skills: { coding: 97, speaking: 78, logical: 85, personality: 88 },
  experience: "Experienced",
  suggestedRoles: [
    { role: "Senior Software Engineer", match: 95 },
    { role: "Tech Lead", match: 88 },
    { role: "Full Stack Developer", match: 92 },
  ],
  improvementAreas: [
    { skill: "Public Speaking", current: 78, target: 85, impact: "Unlock Product Manager roles" },
    { skill: "System Design", current: 82, target: 90, impact: "Qualify for Senior Architect positions" },
  ],
  overallScore: 85,
}

// Mock smart suggestions
const smartSuggestions = {
  topRoles: [
    {
      role: "Senior Software Engineer",
      match: 95,
      company: "Google",
      location: "Mountain View, CA",
      salary: "$160k - $220k",
      reason: "Perfect match for your coding and logical reasoning skills",
      urgency: "High demand",
    },
    {
      role: "Full Stack Developer",
      match: 92,
      company: "Stripe",
      location: "San Francisco, CA",
      salary: "$140k - $190k",
      reason: "Strong technical skills align with full-stack requirements",
      urgency: "Actively hiring",
    },
    {
      role: "Technical Lead",
      match: 88,
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$150k - $200k",
      reason: "Leadership potential with strong technical foundation",
      urgency: "New openings",
    },
  ],
  dreamRoleInsights: {
    role: "Product Manager",
    currentMatch: 65,
    targetMatch: 90,
    timeToAchieve: "12-18 months",
    keyImprovements: [
      { skill: "Public Speaking", gap: 17, impact: "High" },
      { skill: "Strategic Thinking", gap: 12, impact: "High" },
      { skill: "Stakeholder Management", gap: 15, impact: "Medium" },
    ],
  },
  trendingOpportunities: [
    {
      field: "AI/Machine Learning",
      growth: "+45%",
      avgSalary: "$180k",
      skillsNeeded: ["Python", "TensorFlow", "Statistics"],
      matchPotential: 78,
    },
    {
      field: "Cloud Architecture",
      growth: "+38%",
      avgSalary: "$165k",
      skillsNeeded: ["AWS", "Kubernetes", "System Design"],
      matchPotential: 85,
    },
    {
      field: "DevOps Engineering",
      growth: "+32%",
      avgSalary: "$155k",
      skillsNeeded: ["Docker", "CI/CD", "Infrastructure"],
      matchPotential: 82,
    },
  ],
}

// Corrected Scores
const leaderboardData = [
  {
    rank: 1,
    name: "Gurnaam Singh",
    college: "PSIT Kanpur",
    score: 99,
    skills: { coding: 99, speaking: 99, logical: 100, personality: 98 },
    experience: "Experienced",
    category: "Overall",
    linkedin: "https://www.linkedin.com/in/gurnaam",
  },
  {
    rank: 2,
    name: "Sayali Kamath",
    college: "IIM Bangalore",
    score: 92,
    skills: { coding: 92, speaking: 89, logical: 96, personality: 91 },
    experience: "Experienced",
    category: "Overall",
  },
  {
    rank: 3,
    name: "Maruti Konduri",
    college: "IIM Ahmedabad",
    score: 89,
    skills: { coding: 88, speaking: 85, logical: 92, personality: 90 },
    experience: "Experienced",
    category: "Overall",
  },
  {
    rank: 4,
    name: "Rohan Gupta",
    college: "IIT Madras",
    score: 85,
    skills: { coding: 84, speaking: 82, logical: 88, personality: 87 },
    experience: "Fresher",
    category: "Overall",
  },
  {
    rank: 5,
    name: "Ananya Singh",
    college: "IIT Kanpur",
    score: 82,
    skills: { coding: 81, speaking: 79, logical: 85, personality: 84 },
    experience: "Experienced",
    category: "Overall",
  },
  {
    rank: 6,
    name: "Kavya Nair",
    college: "IIIT Bangalore",
    score: 80,
    skills: { coding: 95, speaking: 70, logical: 78, personality: 75 },
    experience: "Experienced",
    category: "Coding",
  },
  {
    rank: 7,
    name: "Aditya Joshi",
    college: "NIT Trichy",
    score: 80,
    skills: { coding: 72, speaking: 93, logical: 74, personality: 82 },
    experience: "Fresher",
    category: "Speaking",
  },
  {
    rank: 8,
    name: "Sneha Iyer",
    college: "BITS Pilani",
    score: 76,
    skills: { coding: 70, speaking: 73, logical: 89, personality: 71 },
    experience: "Experienced",
    category: "Logical",
  },
  {
    rank: 9,
    name: "Karthik Menon",
    college: "IIT Guwahati",
    score: 77,
    skills: { coding: 76, speaking: 70, logical: 72, personality: 88 },
    experience: "Fresher",
    category: "Personality",
  },
  {
    rank: 10,
    name: "Deepika Rao",
    college: "IIT Roorkee",
    score: 72,
    skills: { coding: 73, speaking: 71, logical: 74, personality: 70 },
    experience: "Experienced",
    category: "Overall",
  },
]

const mockJobRecommendations = [
  {
    role: "Software Engineer",
    company: "Google",
    match: 95,
    salary: "$150k - $180k",
    skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
  },
  {
    role: "Data Scientist",
    company: "Microsoft",
    match: 92,
    salary: "$160k - $200k",
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
  },
  {
    role: "Product Manager",
    company: "Amazon",
    match: 88,
    salary: "$140k - $170k",
    skills: ["Product Strategy", "Market Analysis", "User Research", "Agile", "Communication"],
  },
]

const mockSkillSuggestions = [
  { skill: "Public Speaking", impact: 15, reason: "Improve communication skills to unlock more opportunities." },
  { skill: "Data Analysis", impact: 20, reason: "Enhance analytical skills to excel in data-driven roles." },
  { skill: "Leadership", impact: 18, reason: "Develop leadership skills to lead teams and projects effectively." },
]

const testCenters = [
  {
    name: "Bangalore Test Center",
    address: "Tech Park, Whitefield, Bangalore - 560066",
    phone: "+91-80-4141-5000",
    email: "bangalore@TalentVisa.com",
    timings: "Mon-Sat: 9:00 AM - 6:00 PM",
  },
  {
    name: "Delhi Test Center",
    address: "DLF CyberCity, Sector 24, Gurugram - 110001",
    phone: "+91-11-4141-5000",
    email: "delhi@TalentVisa.com",
    timings: "Mon-Sat: 9:00 AM - 6:00 PM",
  },
  {
    name: "Mumbai Test Center",
    address: "Corporate Tower, Bandra, Mumbai - 400050",
    phone: "+91-22-4141-5000",
    email: "mumbai@TalentVisa.com",
    timings: "Mon-Sat: 9:00 AM - 6:00 PM",
  },
]

// --- MAIN WRAPPER (Fixes useSearchParams Error) ---
export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const [isGuest, setIsGuest] = useState(false)
  const [selectedTalent, setSelectedTalent] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [leaderboardFilter, setLeaderboardFilter] = useState("Overall")
  const [searchQuery, setSearchQuery] = useState("")
  const [skillCardTalent, setSkillCardTalent] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookTestModalOpen, setIsBookTestModalOpen] = useState(false)
  const [selectedTestCenter, setSelectedTestCenter] = useState<any>(null)
  const [selectedCareerPath, setSelectedCareerPath] = useState("")
  const [bookingStep, setBookingStep] = useState<"confirm" | "success">("confirm")

  useEffect(() => {
    setIsGuest(searchParams.get("guest") === "true")
  }, [searchParams])

  // Generate certificate URL when talent is selected for preview
  useEffect(() => {
    if (skillCardTalent) {
      setPreviewUrl("") // Clear previous URL
      generateSkillCard(skillCardTalent).then((url) => {
        setPreviewUrl(url)
      })
    }
  }, [skillCardTalent])

  const filteredLeaderboard = leaderboardData.filter((talent) => {
    const matchesFilter = leaderboardFilter === "Overall" || talent.category === leaderboardFilter
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.college.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openTalentProfile = (talent: any) => {
    setSelectedTalent(talent)
    setIsProfileModalOpen(true)
  }

  const handleRoleClick = (roleName: string) => {
    const roleMap: Record<string, string> = {
      "Senior Software Engineer": "senior-engineer",
      "Tech Lead": "tech-lead",
      "Full Stack Developer": "full-stack-dev",
      "Product Manager": "product-manager",
    }
    const pathId = roleMap[roleName]
    if (pathId) {
      setSelectedCareerPath(pathId)
      setActiveTab("suggestions")
      setTimeout(() => {
        const careerPathSection = document.getElementById("career-path-section")
        if (careerPathSection) {
          careerPathSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  // --- CERTIFICATE GENERATOR ---
  const generateSkillCard = async (talentData = mockTalentData) => {
    if (typeof document === "undefined") return ""
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return ""

    // High resolution canvas
    canvas.width = 1200
    canvas.height = 800

    // 1. Background (Clean White)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 2. Professional Border (Navy & Gold)
    ctx.strokeStyle = "#1e3a8a"
    ctx.lineWidth = 5
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    ctx.strokeStyle = "#d97706"
    ctx.lineWidth = 2
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110)

    // 3. Header Section
    ctx.fillStyle = "#1e3a8a"
    ctx.font = "bold 50px 'Cinzel Decorative', serif"
    ctx.textAlign = "center"
    ctx.fillText("TalentVisa", canvas.width / 2, 130)

    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 52px 'Times New Roman', serif"
    ctx.fillText("CERTIFICATE OF EXCELLENCE", canvas.width / 2, 195)

    // 4. Candidate Section
    ctx.fillStyle = "#64748b"
    ctx.font = "italic 24px Arial"
    ctx.fillText("Proudly awarded to", canvas.width / 2, 245)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 64px Arial"
    ctx.fillText(talentData.name, canvas.width / 2, 310)

    ctx.fillStyle = "#475569"
    ctx.font = "20px Arial"
    ctx.fillText(`For successfully demonstrating exceptional proficiency`, canvas.width / 2, 355)
    ctx.fillText(`in the verified skill assessment.`, canvas.width / 2, 380)

    ctx.fillStyle = "#d97706"
    ctx.fillRect(canvas.width / 2 - 80, 405, 160, 3)

    // 5. Skills Grid
    ctx.textAlign = "left"
    const skills = [
      { name: "Coding", score: talentData.skills.coding },
      { name: "Speaking", score: talentData.skills.speaking },
      { name: "Logical", score: talentData.skills.logical },
      { name: "Personality", score: talentData.skills.personality },
    ]

    const startY = 455
    const col1X = 180
    const col2X = 680

    skills.forEach((skill, index) => {
      const isCol2 = index % 2 !== 0
      const x = isCol2 ? col2X : col1X
      const y = startY + Math.floor(index / 2) * 80

      ctx.fillStyle = "#334155"
      ctx.font = "bold 20px Arial"
      ctx.fillText(skill.name, x, y)

      ctx.textAlign = "right"
      ctx.fillStyle = "#0f172a"
      ctx.fillText(`${skill.score}%`, x + 350, y)
      ctx.textAlign = "left"

      ctx.fillStyle = "#e2e8f0"
      ctx.fillRect(x, y + 12, 350, 8)

      ctx.fillStyle = "#1e3a8a"
      const fillWidth = (skill.score / 100) * 350
      ctx.fillRect(x, y + 12, fillWidth, 8)
    })

    // 6. Footer Section
    const footerY = 640

    ctx.textAlign = "left"
    ctx.fillStyle = "#64748b"
    ctx.font = "14px Arial"
    ctx.fillText("DATE ISSUED", 100, footerY)
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 16px Arial"
    ctx.fillText(new Date().toLocaleDateString(), 100, footerY + 25)

    ctx.fillStyle = "#64748b"
    ctx.font = "14px Arial"
    ctx.fillText("CERTIFICATE ID", 100, footerY + 60)
    const certId = `TR-${talentData.name.replace(/\s+/g, "").toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-6)}`
    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 16px Arial"
    ctx.fillText(certId, 100, footerY + 85)

    // Center Signature
    const sigX = canvas.width / 2
    ctx.textAlign = "center"

    // Force wait for the fancy font to load before drawing
    await document.fonts.load("52px 'Pinyon Script'")

    // Use the reliable Google Font
    ctx.font = "52px 'Pinyon Script', cursive"
    ctx.fillStyle = "#000000"
    // Added a slight space in the name for better cursive readability
    ctx.fillText("Talent Visa", sigX, footerY + 35)

    ctx.fillStyle = "#94a3b8"
    ctx.fillRect(sigX - 120, footerY + 50, 240, 1)

    ctx.fillStyle = "#64748b"
    ctx.font = "14px Arial"
    ctx.fillText("AUTHORIZED SIGNATORY", sigX, footerY + 70)

    // RIGHT: QR Code
    const qrSize = 90
    const qrX = canvas.width - 210
    const qrY = footerY - 5

    // --- SMART QR LOGIC ---
    // Mapping for specific users to their custom pages
    const realQrUsers: Record<string, string> = {
      "Rahul Agarwal": "rahul_agarwal",
      "Gurnaam Singh": "gurnaam_singh",
      "Sayali Kamath": "sayali_kamath",
    }

    if (realQrUsers[talentData.name]) {
      // Generate REAL QR Code pointing to their specific page
      const slug = realQrUsers[talentData.name]
      const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : "https://talentvisa.space"}/verify/${slug}`
      const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}&bgcolor=ffffff`

      const qrImage = new Image()
      qrImage.crossOrigin = "Anonymous"
      qrImage.src = qrImgUrl

      await new Promise((resolve) => {
        qrImage.onload = resolve
        qrImage.onerror = resolve
      })

      try {
        ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize)
      } catch (e) {
        // Fallback
        ctx.strokeStyle = "#cbd5e1"
        ctx.strokeRect(qrX, qrY, qrSize, qrSize)
      }
    } else {
      // Use STATIC Image for everyone else
      const imgElement = document.getElementById("certificate-qr-source") as HTMLImageElement
      if (imgElement && imgElement.complete && imgElement.naturalWidth !== 0) {
        try {
          ctx.drawImage(imgElement, qrX, qrY, qrSize, qrSize)
        } catch (e) {
          ctx.strokeStyle = "#000000"
          ctx.strokeRect(qrX, qrY, qrSize, qrSize)
        }
      } else {
        ctx.strokeStyle = "#cbd5e1"
        ctx.strokeRect(qrX, qrY, qrSize, qrSize)
      }
    }

    ctx.textAlign = "center"
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Arial"
    ctx.fillText("Scan to Verify", qrX + qrSize / 2, qrY + qrSize + 15)

    return canvas.toDataURL("image/png", 1.0)
  }

  const handleDownloadSkillCard = async () => {
    const imageData = await generateSkillCard(mockTalentData)
    if (!imageData) return
    const link = document.createElement("a")
    link.href = imageData
    link.download = `${mockTalentData.name.replace(" ", "_")}_TalentVisa_Certificate.png`
    link.click()
    alert("🎉 Skill Certificate downloaded successfully! Share this with employers to verify your skills.")
  }

  const handleViewSkillCard = () => {
    setSkillCardTalent(mockTalentData)
  }

  const handleViewCareerPath = () => {
    setActiveTab("suggestions")
    setTimeout(() => {
      const careerPathSection = document.getElementById("career-path-section")
      if (careerPathSection) {
        careerPathSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const handleConnectWithTalent = (talent: any) => {
    if (talent.linkedin) {
      window.open(talent.linkedin, "_blank")
    } else {
      alert(`🤝 Connection request sent to ${talent.name}! They will be notified and can reach out to you directly.`)
    }
  }

  const handleDownloadLeaderboardSkillCard = async (talent: any) => {
    const imageData = await generateSkillCard(talent)
    if (!imageData) return
    const link = document.createElement("a")
    link.href = imageData
    link.download = `${talent.name.replace(" ", "_")}_TalentVisa_Certificate.png`
    link.click()
    alert("🎉 Skill Certificate downloaded successfully! Share this with employers to verify your skills.")
  }

  const handlePreviewLeaderboardSkillCard = (talent: any) => {
    setSkillCardTalent(talent)
  }

  const handleConnectWithEmployers = () => {
    alert("Connection request sent to employers! They can now view your profile and reach out directly.")
  }

  const handleApplyToJob = (role: any) => {
    alert(`✅ Application submitted for ${role.role} at ${role.company}! You'll be contacted within 2-3 business days.`)
  }

  const handleCreateLearningPlan = () => {
    alert("📚 Learning plan created! Check your email for personalized skill development recommendations.")
  }

  const handleExplorePath = (field: string) => {
    alert(`🚀 Exploring career path in ${field}. Detailed roadmap and skill requirements will be sent to your email.`)
  }

  const handleOpenProfile = () => {
    setSelectedTalent(mockTalentData)
    setIsProfileModalOpen(true)
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleBookTest = (center: any) => {
    setSelectedTestCenter(center)
    setBookingStep("confirm")
    setIsBookTestModalOpen(true)
  }

  const handleOpenMaps = (centerName: string) => {
    const mapsUrls: { [key: string]: string } = {
      "Bangalore Test Center": "https://maps.google.com/?q=Tech+Park,+Whitefield,+Bangalore+560066",
      "Delhi Test Center": "https://maps.google.com/?q=DLF CYBERCITY,+Sector 24,+Gurugram",
      "Mumbai Test Center": "https://maps.google.com/?q=789+Corporate+Tower,+Bandra,+Mumbai+400050",
    }
    if (mapsUrls[centerName]) {
      window.open(mapsUrls[centerName], "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Load Google Font for Signature */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');`}</style>
      <img
        id="certificate-qr-source"
        src="/abstract-geometric-shapes.png"
        crossOrigin="anonymous"
        className="hidden"
        alt="QR Source"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <header className="glass-effect-static border-b border-primary/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => (window.location.href = "/")}
              >
                <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <h1
                className="text-lg md:text-xl font-bold cursor-pointer hover:text-primary transition-colors"
                onClick={() => (window.location.href = "/")}
              >
                TalentVisa
              </h1>
              <Badge className="hidden md:inline-flex bg-primary/20 text-primary border-primary/30">
                Performance Platform
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                className="bg-gradient-to-r from-primary via-purple-500 to-accent text-white border-0 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 animate-pulse-glow mr-2 font-bold tracking-wide"
                onClick={() => (window.location.href = "/employers")}
              >
                <Building className="w-4 h-4 mr-2 fill-white/20" />
                For Employers
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full h-auto gap-2 bg-muted/50 z-20 p-1 lg:grid lg:w-fit lg:grid-cols-5">
              <TabsTrigger
                value="overview"
                className="rounded-md px-3 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105"
              >
                My Profile
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="rounded-md px-3 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105"
              >
                Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="rounded-md px-3 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105"
              >
                Smart Match
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="rounded-md px-3 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="book-test"
                className="col-span-2 lg:col-span-1 rounded-md px-3 py-2 bg-gradient-to-r from-accent to-primary text-white hover:shadow-lg hover:scale-110 transition-all duration-300 font-semibold"
              >
                📋 Book Test
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-effect border-primary/20 md:col-span-2 lg:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex flex-row items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg sm:text-xl">{mockTalentData.name}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {mockTalentData.college} • {mockTalentData.experience}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-primary">#{mockTalentData.rank}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">
                          of {mockTalentData.totalTalents.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="flex items-center">
                            <Code className="w-3 h-3 mr-1.5 text-primary" />
                            Coding
                          </span>
                          <span className="font-semibold">{mockTalentData.skills.coding}/100</span>
                        </div>
                        <Progress value={mockTalentData.skills.coding} className="h-1.5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1.5 text-accent" />
                            Speaking
                          </span>
                          <span className="font-semibold">{mockTalentData.skills.speaking}/100</span>
                        </div>
                        <Progress value={mockTalentData.skills.speaking} className="h-1.5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="flex items-center">
                            <Brain className="w-3 h-3 mr-1.5 text-primary" />
                            Logical
                          </span>
                          <span className="font-semibold">{mockTalentData.skills.logical}/100</span>
                        </div>
                        <Progress value={mockTalentData.skills.logical} className="h-1.5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1.5 text-accent" />
                            Personality
                          </span>
                          <span className="font-semibold">{mockTalentData.skills.personality}/100</span>
                        </div>
                        <Progress value={mockTalentData.skills.personality} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <Award className="w-5 h-5 mr-2" />
                      Skill Certificate
                    </CardTitle>
                    <CardDescription>Download your verified skill certificate with QR code</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Certificate Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your skills have been verified and certified. Share this certificate with employers.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleViewSkillCard}>
                        <Star className="w-4 h-4 mr-2" />
                        Preview Certificate
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-transparent"
                        onClick={handleDownloadSkillCard}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Top 3 Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTalentData.suggestedRoles.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => handleRoleClick(role.role)}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium truncate">{role.role}</span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                            {role.match}%
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-effect border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <ArrowUp className="w-5 h-5 mr-2" />
                      Areas to Improve
                    </CardTitle>
                    <CardDescription>Enhance these skills to unlock more opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockTalentData.improvementAreas.map((area, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{area.skill}</span>
                          <span className="text-sm text-muted-foreground">
                            {area.current} → {area.target}
                          </span>
                        </div>
                        <Progress value={(area.current / area.target) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">{area.impact}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 justify-center md:col-span-1 lg:col-span-1">
                  <Button
                    className="w-full h-14 justify-start bg-transparent hover:bg-primary/20 hover:scale-105 transition-all duration-300 border border-primary/20"
                    variant="outline"
                    onClick={handleViewCareerPath}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">View Career Path</div>
                        <div className="text-xs text-muted-foreground">Explore your future roadmap</div>
                      </div>
                    </div>
                  </Button>
                  <Button
                    className="w-full h-14 justify-start bg-transparent hover:bg-primary/20 hover:scale-105 transition-all duration-300 border border-primary/20"
                    variant="outline"
                    onClick={handleConnectWithEmployers}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Connect with Employers</div>
                        <div className="text-xs text-muted-foreground">Get noticed by top companies</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-12 sm:mt-0">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-primary" />
                    Global Talent Leaderboard
                  </h2>
                  <p className="text-muted-foreground">Top performers across all skill categories</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search.."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 border-primary/30"
                    />
                  </div>
                  <Select value={leaderboardFilter} onValueChange={setLeaderboardFilter}>
                    <SelectTrigger className="w-40 bg-background/50 border-primary/30">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Overall">Overall</SelectItem>
                      <SelectItem value="Coding">Coding</SelectItem>
                      <SelectItem value="Speaking">Speaking</SelectItem>
                      <SelectItem value="Logical">Logical</SelectItem>
                      <SelectItem value="Personality">Personality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass-effect border-primary/20">
                  <CardContent className="p-4 text-center">
                    <Crown className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">10,247</div>
                    <div className="text-sm text-muted-foreground">Total Talents</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-accent/20">
                  <CardContent className="p-4 text-center">
                    <Medal className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">84.2</div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-primary/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">542</div>
                    <div className="text-sm text-muted-foreground">Active Today</div>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-accent/20">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground">New This Month</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                {filteredLeaderboard.map((talent, index) => (
                  <div
                    key={index}
                    className={`glass-effect rounded-xl p-3 sm:p-4 flex flex-wrap items-center gap-3 sm:gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
                      talent.rank === 1
                        ? "border-yellow-500/40 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                        : talent.rank === 2
                          ? "border-zinc-400/40 bg-zinc-400/5 shadow-[0_0_20px_rgba(161,161,170,0.1)]"
                          : talent.rank === 3
                            ? "border-orange-500/40 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                            : "border-white/5 hover:border-white/10"
                    }`}
                    onClick={() => openTalentProfile(talent)}
                  >
                    <div className="flex items-center justify-between w-full sm:w-auto flex-1 min-w-[200px]">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-sm sm:text-base shrink-0 shadow-inner ${
                            talent.rank === 1
                              ? "bg-primary/20 text-red-600"
                              : talent.rank === 2
                                ? "bg-primary/20 text-yellow-500"
                                : talent.rank === 3
                                  ? "bg-primary/20 text-green-500"
                                  : "bg-primary/10 text-primary"
                          }`}
                        >
                          {talent.rank === 1 ? (
                            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                          ) : talent.rank === 2 ? (
                            <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          ) : talent.rank === 3 ? (
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                          ) : (
                            talent.rank
                          )}
                        </div>

                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border border-white/10">
                          <AvatarImage
                            src={
                              talent.name === "Gurnaam Singh"
                                ? "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Chase"
                                : `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${talent.name}`
                            }
                          />
                          <AvatarFallback>
                            {talent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm sm:text-base truncate">{talent.name}</h4>
                            {talent.rank === 1 && (
                              <Badge
                                variant="outline"
                                className="hidden sm:inline-flex text-[10px] h-5 border-yellow-500/50 text-yellow-500 px-1.5 bg-yellow-500/5"
                              >
                                Top
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{talent.college}</p>
                        </div>
                      </div>

                      <div className="text-right sm:hidden shrink-0 ml-2">
                        <div
                          className={`text-lg font-bold leading-none ${
                            talent.rank === 1
                              ? "text-red-600"
                              : talent.rank === 2
                                ? "text-yellow-500"
                                : talent.rank === 3
                                  ? "text-green-500"
                                  : "text-primary"
                          }`}
                        >
                          {talent.score}
                        </div>
                        <div className="text-[9px] text-muted-foreground">Avg Score</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 w-full sm:w-auto mt-1 sm:mt-0 border-t sm:border-0 border-white/5 pt-2 sm:pt-0">
                      <div className="text-right mr-4 hidden sm:block">
                        <div
                          className={`text-xl font-bold leading-none ${
                            talent.rank === 1
                              ? "text-red-600"
                              : talent.rank === 2
                                ? "text-yellow-500"
                                : talent.rank === 3
                                  ? "text-green-500"
                                  : "text-primary"
                          }`}
                        >
                          {talent.score}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Avg Score</div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          className="flex-1 sm:flex-none h-8 px-3 bg-primary/90 hover:bg-primary text-white shadow-sm text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (talent.linkedin) window.open(talent.linkedin, "_blank")
                            else handleConnectWithTalent(talent)
                          }}
                        >
                          <Users className="w-3 h-3 mr-1.5" />
                          Connect
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none h-8 px-3 border-primary/20 text-primary bg-transparent hover:bg-primary/10 text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePreviewLeaderboardSkillCard(talent)
                          }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1.5" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-6 pt-12">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-primary" />
                      Recommended Jobs
                    </CardTitle>
                    <CardDescription>Perfect matches based on your skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockJobRecommendations.map((job, index) => (
                      <div
                        key={index}
                        className="p-4 border border-primary/20 rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{job.role}</h4>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm font-medium text-primary">{job.match}% Match</span>
                              <span className="text-sm text-muted-foreground">{job.salary}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.skills.slice(0, 3).map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                            onClick={() => handleApplyToJob(job)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="glass-effect border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center text-accent">
                        <Target className="w-5 h-5 mr-2" />
                        Skill Development
                      </CardTitle>
                      <CardDescription>Enhance your profile with these skills</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockSkillSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 border border-accent/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{suggestion.skill}</span>
                            <Badge className="bg-accent/20 text-accent border-accent/30">
                              +{suggestion.impact}% opportunities
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{suggestion.reason}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full hover:bg-accent/20 hover:scale-105 transition-all duration-300 bg-transparent"
                            onClick={handleCreateLearningPlan}
                          >
                            Create Learning Plan
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div id="career-path-section">
                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Career Path Explorer
                    </CardTitle>
                    <CardDescription>Explore different career paths based on your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CareerPathExplorer currentSkills={mockTalentData.skills} initialPath={selectedCareerPath} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6 pt-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-accent" />
                  Trending Opportunities
                </h3>
                <p className="text-muted-foreground">High-growth fields where your skills could make an impact</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {smartSuggestions.trendingOpportunities.map((opportunity, index) => (
                  <Card
                    key={index}
                    className="glass-effect border-primary/20 hover:border-primary/40 transition-colors"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{opportunity.field}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {opportunity.growth}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Average Salary: {opportunity.avgSalary}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Your Match Potential</span>
                          <span>{opportunity.matchPotential}%</span>
                        </div>
                        <Progress value={opportunity.matchPotential} className="h-2" />
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-sm">Skills Needed:</h5>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.skillsNeeded.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        size="sm"
                        onClick={() => handleExplorePath(opportunity.field)}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Explore Path
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="book-test" className="space-y-6 pt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-accent" />
                  <span>Book Assessment Test</span>
                </h2>
                <p className="text-muted-foreground text-lg">Get your skills verified at our authorized test centers</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testCenters.map((center, index) => (
                  <Card
                    key={index}
                    className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center text-accent">
                        <MapPin className="w-5 h-5 mr-2" />
                        {center.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">{center.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Phone className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{center.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Mail className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{center.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Clock className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">Timings</p>
                            <p className="text-sm text-muted-foreground">{center.timings}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:scale-105 transition-all duration-300 text-white font-semibold"
                        onClick={() => handleBookTest(center)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Test Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="glass-effect border-primary/20 mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-5 h-5 mr-2 text-primary" />
                    About Our Assessment Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                        What's Tested
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Coding & Programming Skills</li>
                        <li>• Logical Reasoning</li>
                        <li>• Communication & Speaking</li>
                        <li>• Personality Assessment</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-accent" />
                        Test Duration
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Total Duration: 3 hours</li>
                        <li>• Coding: 90 minutes</li>
                        <li>• Aptitude: 60 minutes</li>
                        <li>• Interview: 30 minutes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedTalent && (
        <TalentProfileModal
          talent={selectedTalent}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}

      {skillCardTalent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Skill Certificate Preview</h3>
                <Button variant="outline" size="sm" onClick={() => setSkillCardTalent(null)}>
                  Close
                </Button>
              </div>
              <div className="text-center">
                {/* Dynamically Loaded Image Preview */}
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Skill Certificate"
                    className="mx-auto border rounded-lg shadow-lg max-w-full h-auto"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                    Generating Certificate with QR...
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => handleDownloadLeaderboardSkillCard(skillCardTalent)}
                    className="w-full sm:w-auto h-11 px-8 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 border-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-11 px-6 border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-pink-500/50 rounded-full backdrop-blur-md transition-all duration-300 active:scale-95 group"
                    onClick={() => {
                      const textToCopy = `https://talentvisa.space/verify/${skillCardTalent.name.replace(/\s+/g, "_").toLowerCase()}`
                      navigator.clipboard.writeText(textToCopy).then(() => alert("Link copied!"))
                    }}
                  >
                    <span className="group-hover:text-pink-400 transition-colors duration-300">Copy Link</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBookTestModalOpen && selectedTestCenter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md glass-effect-strong border-white/10 shadow-2xl overflow-hidden">
            {bookingStep === "confirm" ? (
              <>
                <CardHeader className="text-center pt-8 pb-2">
                  <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-2 ring-primary/20">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Confirm Booking</CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Review your appointment details
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8 px-8 pb-8">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="p-2 bg-muted/20 rounded-md">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Test Center
                        </p>
                        <p className="text-base font-semibold">{selectedTestCenter.name}</p>
                        <p className="text-sm text-muted-foreground leading-snug mt-0.5">
                          {selectedTestCenter.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="p-2 bg-muted/20 rounded-md">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date & Time
                        </p>
                        <p className="text-base font-semibold">
                          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          • 10:00 AM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 pt-2">
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold text-base shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 rounded-xl"
                      onClick={() => setBookingStep("success")}
                    >
                      Confirm Booking
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-11 border-white/10 hover:bg-white/5 hover:text-accent hover:border-accent/30 text-muted-foreground transition-all duration-200 active:scale-[0.98] rounded-xl bg-transparent"
                        onClick={() => handleOpenMaps(selectedTestCenter.name)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Map
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-11 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-[0.98] rounded-xl"
                        onClick={() => setIsBookTestModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardContent className="pt-12 pb-10 text-center space-y-6">
                  <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center ring-4 ring-green-500/10 animate-in zoom-in duration-300">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>

                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Booking Confirmed!</CardTitle>
                    <CardDescription className="max-w-[260px] mx-auto text-base">
                      We've sent a confirmation email to{" "}
                      <span className="text-foreground font-medium">rahulagrwal05@gmail.com</span>
                    </CardDescription>
                  </div>

                  <div className="p-4 bg-muted/10 rounded-xl border border-white/5 mx-4">
                    <p className="text-sm font-medium text-foreground">{selectedTestCenter.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} • 10:00 AM
                    </p>
                  </div>

                  <div className="pt-4 px-4">
                    <Button
                      className="w-full h-11 bg-muted/20 hover:bg-muted/30 text-foreground border border-white/5 hover:border-white/10 active:scale-[0.98] transition-all rounded-xl"
                      onClick={() => {
                        setIsBookTestModalOpen(false)
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      )}

      <AiAssistant talentData={mockTalentData} />
    </div>
  )
}
