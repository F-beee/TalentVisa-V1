"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { TalentProfileModal } from "@/components/talent-profile-modal"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Download,
  Users,
  Star,
  TrendingUp,
  Target,
  ChevronRight,
  Zap,
  Building,
  MapPin,
  Sparkles,
  Crown,
  BarChart3,
  PieChart,
  CheckCircle,
  FileText,
  Upload,
  LineChart as LineChartIcon
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const calculateStdDev = (values: number[]) => {
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
  return Math.round(Math.sqrt(variance) * 10) / 10
}

const jobRoleTemplates = [
  {
    id: "software-engineer",
    title: "Software Engineer - Infosys",
    description: "Full-stack development with modern technologies",
    requiredSkills: { coding: 85, speaking: 70, logical: 80, personality: 75 },
    experience: "Both",
    matchCount: 1247,
  },
  {
    id: "product-manager",
    title: "Product Manager - Flipkart",
    description: "Lead product strategy and cross-functional teams",
    requiredSkills: { coding: 60, speaking: 90, logical: 85, personality: 95 },
    experience: "Experienced",
    matchCount: 432,
  },
  {
    id: "data-scientist",
    title: "Data Scientist - Zomato",
    description: "Analyze data and build ML models",
    requiredSkills: { coding: 90, speaking: 75, logical: 95, personality: 70 },
    experience: "Both",
    matchCount: 856,
  },
  {
    id: "tech-lead",
    title: "Tech Lead - Paytm",
    description: "Technical leadership and architecture decisions",
    requiredSkills: { coding: 95, speaking: 85, logical: 90, personality: 85 },
    experience: "Experienced",
    matchCount: 324,
  },
  {
    id: "ui-designer",
    title: "UI/UX Designer - Swiggy",
    description: "Design user interfaces and experiences",
    requiredSkills: { coding: 50, speaking: 80, logical: 75, personality: 90 },
    experience: "Both",
    matchCount: 678,
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer - BYJU'S",
    description: "Infrastructure and deployment automation",
    requiredSkills: { coding: 85, speaking: 70, logical: 90, personality: 75 },
    experience: "Experienced",
    matchCount: 445,
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer - Ola",
    description: "Build responsive web applications",
    requiredSkills: { coding: 88, speaking: 75, logical: 80, personality: 80 },
    experience: "Both",
    matchCount: 567,
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer - Razorpay",
    description: "Scalable server-side development",
    requiredSkills: { coding: 92, speaking: 70, logical: 88, personality: 75 },
    experience: "Both",
    matchCount: 423,
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer - PhonePe",
    description: "iOS and Android app development",
    requiredSkills: { coding: 87, speaking: 72, logical: 82, personality: 78 },
    experience: "Both",
    matchCount: 334,
  },
  {
    id: "sde-google",
    title: "SDE - Google (San Francisco)",
    description: "Software development at global scale",
    requiredSkills: { coding: 95, speaking: 85, logical: 92, personality: 88 },
    experience: "Experienced",
    matchCount: 156,
  },
  {
    id: "sde-microsoft",
    title: "SDE - Microsoft (Seattle)",
    description: "Cloud and enterprise solutions",
    requiredSkills: { coding: 93, speaking: 82, logical: 90, personality: 85 },
    experience: "Experienced",
    matchCount: 189,
  },
]

const talentPool = [
  { rank: 1, name: "Gurnaam Singh", college: "PSIT Kanpur", score: 99, skills: { coding: 99, speaking: 99, logical: 100, personality: 98 }, experience: "Experienced", location: "Kanpur, Uttar Pradesh", availability: "Available", roleMatch: 98, isSpotlight: true, linkedIn: "https://www.linkedin.com/in/gurnaam" },
  { rank: 2, name: "Shraddha Kapoor", college: "IIT Bombay", score: 94, skills: { coding: 92, speaking: 89, logical: 96, personality: 91 }, experience: "Experienced", location: "Mumbai, Maharashtra", availability: "Available", roleMatch: 95, isSpotlight: true },
  { rank: 3, name: "Vihaan Patel", college: "IIT Delhi", score: 89, skills: { coding: 88, speaking: 85, logical: 92, personality: 90 }, experience: "Experienced", location: "New Delhi, Delhi", availability: "Available", roleMatch: 92, isSpotlight: true },
  { rank: 4, name: "Rohan Gupta", college: "IIT Madras", score: 86, skills: { coding: 84, speaking: 82, logical: 88, personality: 87 }, experience: "Fresher", location: "Chennai, Tamil Nadu", availability: "Available", roleMatch: 89, isSpotlight: false },
  { rank: 5, name: "Ananya Singh", college: "IIT Kanpur", score: 83, skills: { coding: 81, speaking: 79, logical: 85, personality: 84 }, experience: "Experienced", location: "Kanpur, Uttar Pradesh", availability: "Available", roleMatch: 87, isSpotlight: false },
  { rank: 6, name: "Vikram Reddy", college: "IIT Hyderabad", score: 80, skills: { coding: 78, speaking: 76, logical: 82, personality: 81 }, experience: "Fresher", location: "Hyderabad, Telangana", availability: "Available", roleMatch: 85, isSpotlight: false },
  { rank: 7, name: "Aditi Sharma", college: "IIT Delhi", score: 95, skills: { coding: 95, speaking: 92, logical: 51, personality: 90 }, experience: "Experienced", location: "Delhi", availability: "Available", roleMatch: 84, isSpotlight: false },
  { rank: 8, name: "Rohan Verma", college: "IIT Madras", score: 93, skills: { coding: 93, speaking: 91, logical: 49, personality: 88 }, experience: "Experienced", location: "Chennai", availability: "Available", roleMatch: 83, isSpotlight: false },
  { rank: 9, name: "Shreya Kapoor", college: "IISc Bangalore", score: 90, skills: { coding: 90, speaking: 88, logical: 52, personality: 85 }, experience: "Experienced", location: "Bangalore", availability: "Available", roleMatch: 82, isSpotlight: false },
  { rank: 10, name: "Aaryan Patel", college: "BITS Pilani", score: 88, skills: { coding: 88, speaking: 85, logical: 48, personality: 82 }, experience: "Experienced", location: "Pilani", availability: "Available", roleMatch: 81, isSpotlight: false },
  { rank: 11, name: "Neha Dubey", college: "NIT Trichy", score: 85, skills: { coding: 85, speaking: 82, logical: 53, personality: 78 }, experience: "Experienced", location: "Trichy", availability: "Available", roleMatch: 80, isSpotlight: false },
  { rank: 12, name: "Karan Mehra", college: "Jadavpur University", score: 83, skills: { coding: 83, speaking: 80, logical: 47, personality: 76 }, experience: "Experienced", location: "Kolkata", availability: "Available", roleMatch: 79, isSpotlight: false },
  { rank: 13, name: "Pooja Singh", college: "DTU Delhi", score: 80, skills: { coding: 80, speaking: 78, logical: 50, personality: 74 }, experience: "Experienced", location: "Delhi", availability: "Available", roleMatch: 78, isSpotlight: false },
  { rank: 14, name: "Vikas Yadav", college: "IIT Bombay", score: 78, skills: { coding: 78, speaking: 75, logical: 51, personality: 72 }, experience: "Fresher", location: "Mumbai", availability: "Available", roleMatch: 77, isSpotlight: false },
  { rank: 15, name: "Sanya Rao", college: "VIT Vellore", score: 75, skills: { coding: 75, speaking: 72, logical: 49, personality: 70 }, experience: "Experienced", location: "Vellore", availability: "Available", roleMatch: 76, isSpotlight: false },
  { rank: 16, name: "Arjun Gupta", college: "Amity University", score: 73, skills: { coding: 73, speaking: 70, logical: 53, personality: 68 }, experience: "Fresher", location: "Noida", availability: "Available", roleMatch: 75, isSpotlight: false },
  { rank: 17, name: "Divya Iyer", college: "Anna University", score: 70, skills: { coding: 70, speaking: 68, logical: 48, personality: 66 }, experience: "Fresher", location: "Chennai", availability: "Available", roleMatch: 74, isSpotlight: false },
  { rank: 18, name: "Ankit Khanna", college: "LPU Jalandhar", score: 68, skills: { coding: 68, speaking: 65, logical: 52, personality: 64 }, experience: "Fresher", location: "Jalandhar", availability: "Available", roleMatch: 73, isSpotlight: false },
  { rank: 19, name: "Riya Chawla", college: "Symbiosis Pune", score: 65, skills: { coding: 65, speaking: 62, logical: 47, personality: 62 }, experience: "Experienced", location: "Pune", availability: "Available", roleMatch: 72, isSpotlight: false },
  { rank: 20, name: "Manish Das", college: "Manipal Inst. of Tech.", score: 90, skills: { coding: 90, speaking: 30, logical: 51, personality: 40 }, experience: "Fresher", location: "Manipal", availability: "Available", roleMatch: 71, isSpotlight: false },
  { rank: 21, name: "Siddharth Rai", college: "IIT Kanpur", score: 30, skills: { coding: 30, speaking: 90, logical: 49, personality: 42 }, experience: "Experienced", location: "Kanpur", availability: "Available", roleMatch: 70, isSpotlight: false },
  { rank: 22, name: "Deepika Hegde", college: "JNTU Hyderabad", score: 85, skills: { coding: 85, speaking: 25, logical: 52, personality: 35 }, experience: "Fresher", location: "Hyderabad", availability: "Available", roleMatch: 69, isSpotlight: false },
  { rank: 23, name: "Rajesh Shah", college: "PSIT Kanpur", score: 25, skills: { coding: 25, speaking: 85, logical: 48, personality: 38 }, experience: "Fresher", location: "Kanpur", availability: "Available", roleMatch: 68, isSpotlight: false },
  { rank: 24, name: "Amit Dagar", college: "SRM Chennai", score: 80, skills: { coding: 80, speaking: 40, logical: 53, personality: 50 }, experience: "Fresher", location: "Chennai", availability: "Available", roleMatch: 67, isSpotlight: false },
  { rank: 25, name: "Meenal Jain", college: "Calcutta University", score: 40, skills: { coding: 40, speaking: 80, logical: 47, personality: 52 }, experience: "Fresher", location: "Kolkata", availability: "Available", roleMatch: 66, isSpotlight: false },
  { rank: 26, name: "Rahul Bose", college: "Mumbai University", score: 75, skills: { coding: 75, speaking: 35, logical: 51, personality: 45 }, experience: "Fresher", location: "Mumbai", availability: "Available", roleMatch: 65, isSpotlight: false },
  { rank: 27, name: "Priya Garg", college: "Delhi University", score: 35, skills: { coding: 35, speaking: 75, logical: 49, personality: 48 }, experience: "Fresher", location: "Delhi", availability: "Available", roleMatch: 64, isSpotlight: false },
  { rank: 28, name: "Sachin Reddy", college: "Osmania University", score: 95, skills: { coding: 95, speaking: 20, logical: 52, personality: 30 }, experience: "Fresher", location: "Hyderabad", availability: "Available", roleMatch: 63, isSpotlight: false },
  { rank: 29, name: "Nikita D'Souza", college: "Pune University", score: 20, skills: { coding: 20, speaking: 95, logical: 48, personality: 32 }, experience: "Fresher", location: "Pune", availability: "Available", roleMatch: 62, isSpotlight: false },
  { rank: 30, name: "Vivek Mishra", college: "Lucknow University", score: 65, skills: { coding: 65, speaking: 45, logical: 53, personality: 55 }, experience: "Fresher", location: "Lucknow", availability: "Available", roleMatch: 61, isSpotlight: false },
  { rank: 31, name: "Sneha Nair", college: "Thapar Inst. of Engg.", score: 45, skills: { coding: 45, speaking: 65, logical: 47, personality: 58 }, experience: "Fresher", location: "Patiala", availability: "Available", roleMatch: 60, isSpotlight: false },
  { rank: 32, name: "Harsh Singhal", college: "Christ University", score: 58, skills: { coding: 58, speaking: 55, logical: 51, personality: 60 }, experience: "Fresher", location: "Bangalore", availability: "Available", roleMatch: 59, isSpotlight: false },
  { rank: 33, name: "Samarth Joshi", college: "Punjab University", score: 55, skills: { coding: 55, speaking: 58, logical: 49, personality: 61 }, experience: "Fresher", location: "Chandigarh", availability: "Available", roleMatch: 58, isSpotlight: false },
  { rank: 34, name: "Tanvi Agarwal", college: "Banasthali Vidyapith", score: 62, skills: { coding: 62, speaking: 60, logical: 52, personality: 63 }, experience: "Fresher", location: "Jaipur", availability: "Available", roleMatch: 57, isSpotlight: false },
  { rank: 35, name: "Rohan Nanda", college: "MUIT Noida", score: 60, skills: { coding: 60, speaking: 62, logical: 48, personality: 64 }, experience: "Fresher", location: "Noida", availability: "Available", roleMatch: 56, isSpotlight: false },
  { rank: 36, name: "Muskan Sheikh", college: "IIMT Meerut", score: 50, skills: { coding: 50, speaking: 52, logical: 53, personality: 48 }, experience: "Fresher", location: "Meerut", availability: "Available", roleMatch: 55, isSpotlight: false },
  { rank: 37, name: "Alok Pande", college: "IMS Ghaziabad", score: 52, skills: { coding: 52, speaking: 50, logical: 47, personality: 49 }, experience: "Fresher", location: "Ghaziabad", availability: "Available", roleMatch: 54, isSpotlight: false },
  { rank: 38, name: "Zoya Khan", college: "Sharda University", score: 48, skills: { coding: 48, speaking: 45, logical: 51, personality: 52 }, experience: "Fresher", location: "Greater Noida", availability: "Available", roleMatch: 53, isSpotlight: false },
  { rank: 39, name: "Prem Kumar", college: "Galgotias University", score: 45, skills: { coding: 45, speaking: 48, logical: 49, personality: 53 }, experience: "Fresher", location: "Greater Noida", availability: "Available", roleMatch: 52, isSpotlight: false },
  { rank: 40, name: "Kavita Bawa", college: "IP University Delhi", score: 53, skills: { coding: 53, speaking: 51, logical: 52, personality: 50 }, experience: "Fresher", location: "Delhi", availability: "Available", roleMatch: 51, isSpotlight: false },
  { rank: 41, name: "Deepak Das", college: "KIIT Bhubaneswar", score: 51, skills: { coding: 51, speaking: 53, logical: 48, personality: 51 }, experience: "Fresher", location: "Bhubaneswar", availability: "Available", roleMatch: 50, isSpotlight: false },
  { rank: 42, name: "Isha Saini", college: "Bennett University", score: 49, skills: { coding: 49, speaking: 47, logical: 53, personality: 54 }, experience: "Fresher", location: "Greater Noida", availability: "Available", roleMatch: 49, isSpotlight: false },
  { rank: 43, name: "Chetan Raj", college: "Graphic Era University", score: 47, skills: { coding: 47, speaking: 49, logical: 47, personality: 55 }, experience: "Fresher", location: "Dehradun", availability: "Available", roleMatch: 48, isSpotlight: false },
  { rank: 44, name: "Siya Goel", college: "DIT Dehradun", score: 56, skills: { coding: 56, speaking: 54, logical: 51, personality: 50 }, experience: "Fresher", location: "Dehradun", availability: "Available", roleMatch: 47, isSpotlight: false },
  { rank: 45, name: "Gautam Singh", college: "Sanskriti University", score: 54, skills: { coding: 54, speaking: 56, logical: 49, personality: 51 }, experience: "Fresher", location: "Mathura", availability: "Available", roleMatch: 46, isSpotlight: false },
  { rank: 46, name: "Aarav Dubey", college: "NIT Warangal", score: 46, skills: { coding: 46, speaking: 44, logical: 52, personality: 48 }, experience: "Experienced", location: "Warangal", availability: "Available", roleMatch: 45, isSpotlight: false },
  { rank: 47, name: "Vanya Sood", college: "Manipal Inst. of Tech.", score: 44, skills: { coding: 44, speaking: 46, logical: 48, personality: 47 }, experience: "Fresher", location: "Manipal", availability: "Available", roleMatch: 44, isSpotlight: false },
  { rank: 48, name: "Kunal Tandon", college: "Amity University", score: 51, skills: { coding: 51, speaking: 49, logical: 53, personality: 50 }, experience: "Fresher", location: "Noida", availability: "Available", roleMatch: 43, isSpotlight: false },
  { rank: 49, name: "Roshni Sen", college: "Jadavpur University", score: 49, skills: { coding: 49, speaking: 51, logical: 47, personality: 50 }, experience: "Fresher", location: "Kolkata", availability: "Available", roleMatch: 42, isSpotlight: false },
  { rank: 50, name: "Mohit Bansal", college: "SRM Chennai", score: 47, skills: { coding: 47, speaking: 45, logical: 51, personality: 46 }, experience: "Experienced", location: "Chennai", availability: "Available", roleMatch: 41, isSpotlight: false }
]

export default function EmployersPage() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [filters, setFilters] = useState({
    experience: "Both",
    college: "",
    minCoding: [0],
    minSpeaking: [0],
    minLogical: [0],
    minPersonality: [0],
    availability: "All",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTalents, setSelectedTalents] = useState<string[]>([])
  const [selectedTalent, setSelectedTalent] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // --- START ANALYTICS LOGIC ---
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const file = formData.get("dataFile") as File
    if (!file) { alert("Please select a file"); return }
    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          analyzeUploadedData(file)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const analyzeUploadedData = async (file: File) => {
    setIsAnalyzing(true)
    try {
      const text = await file.text()
      let data: any[] = []
      if (file.name.endsWith(".csv")) {
        const lines = text.split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())
        data = lines.slice(1).filter((line) => line.trim()).map((line) => {
            const values = line.split(",").map((v) => v.trim())
            const obj: any = {}
            headers.forEach((header, index) => { obj[header] = values[index] || "" })
            return obj
          })
      } else if (file.name.endsWith(".json")) { data = JSON.parse(text) }

      const roleRecommendations = data.map((record: any) => {
        const coding = Number.parseInt(record.Coding) || 0
        const speaking = Number.parseInt(record.Speaking) || 0
        const logical = Number.parseInt(record.Logical) || 0
        const personality = Number.parseInt(record.Personality) || 0
        let recommendedRole = "General"
        if (coding > 85 && logical > 80) recommendedRole = "Backend Developer"
        else if (coding > 80 && personality > 85) recommendedRole = "Full Stack Developer"
        else if (speaking > 85 && personality > 85) recommendedRole = "Product Manager"
        else if (logical > 85 && speaking > 75) recommendedRole = "Data Analyst"
        else if (coding > 75 && speaking > 80) recommendedRole = "Technical Lead"
        return { ...record, recommendedRole, overallScore: Math.round((coding + speaking + logical + personality) / 4) }
      })

      const skillDistribution = {
        coding: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Coding) || 0), 0) / data.length,
        speaking: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Speaking) || 0), 0) / data.length,
        logical: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Logical) || 0), 0) / data.length,
        personality: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Personality) || 0), 0) / data.length,
      }
      const roleDistribution = roleRecommendations.reduce((acc: any, record: any) => {
        acc[record.recommendedRole] = (acc[record.recommendedRole] || 0) + 1
        return acc
      }, {})
      const collegePerformance = roleRecommendations.reduce((acc: any, record: any) => {
        if (!acc[record.College]) { acc[record.College] = { count: 0, totalScore: 0 } }
        acc[record.College].count += 1
        acc[record.College].totalScore += record.overallScore
        return acc
      }, {})

      setAnalysisResults({
        totalRecords: data.length,
        averageScores: skillDistribution,
        topPerformers: roleRecommendations.sort((a, b) => b.overallScore - a.overallScore).slice(0, 5),
        roleDistribution: Object.entries(roleDistribution).map(([role, count]) => ({ name: role, value: count })),
        skillChartData: [
          { name: "Coding", value: Math.round(skillDistribution.coding) },
          { name: "Speaking", value: Math.round(skillDistribution.speaking) },
          { name: "Logical", value: Math.round(skillDistribution.logical) },
          { name: "Personality", value: Math.round(skillDistribution.personality) },
        ],
        collegePerformance: Object.entries(collegePerformance)
          .map(([college, data]: any) => ({ name: college, avgScore: Math.round(data.totalScore / data.count), count: data.count }))
          .sort((a, b) => b.avgScore - a.avgScore).slice(0, 8),
        experienceDistribution: data.reduce((acc: any, record) => {
          acc[record.Experience] = (acc[record.Experience] || 0) + 1
          return acc
        }, {}),
        standardDeviation: {
          coding: calculateStdDev(roleRecommendations.map(r => Number.parseInt(r.Coding) || 0)),
          speaking: calculateStdDev(roleRecommendations.map(r => Number.parseInt(r.Speaking) || 0)),
          logical: calculateStdDev(roleRecommendations.map(r => Number.parseInt(r.Logical) || 0)),
          personality: calculateStdDev(roleRecommendations.map(r => Number.parseInt(r.Personality) || 0)),
          overall: calculateStdDev(roleRecommendations.map(r => r.overallScore)),
        },
        scoreDistribution: (() => {
          const ranges = [ { range: "0-20", min: 0, max: 20, count: 0 }, { range: "21-40", min: 21, max: 40, count: 0 }, { range: "41-60", min: 41, max: 60, count: 0 }, { range: "61-80", min: 61, max: 80, count: 0 }, { range: "81-100", min: 81, max: 100, count: 0 } ]
          roleRecommendations.forEach(r => { ranges.forEach(range => { if (r.overallScore >= range.min && r.overallScore <= range.max) range.count++ }) })
          return ranges
        })(),
        skillConsistency: roleRecommendations.map(r => {
          const scores = [ Number.parseInt(r.Coding) || 0, Number.parseInt(r.Speaking) || 0, Number.parseInt(r.Logical) || 0, Number.parseInt(r.Personality) || 0 ]
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length
          const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length
          return { name: r.Name, consistency: Math.round(100 - Math.sqrt(variance)), overallScore: r.overallScore }
        }).sort((a, b) => b.consistency - a.consistency).slice(0, 5),
        performanceQuartiles: (() => {
          const sorted = [...roleRecommendations].sort((a, b) => a.overallScore - b.overallScore)
          const q1 = sorted[Math.floor(sorted.length * 0.25)]?.overallScore || 0
          const q3 = sorted[Math.floor(sorted.length * 0.75)]?.overallScore || 0
          return { q1, median: sorted[Math.floor(sorted.length * 0.5)]?.overallScore || 0, q3, iqr: q3 - q1 }
        })(),
        skillBalance: (() => {
          const balanced = roleRecommendations.filter(r => {
            const scores = [ Number.parseInt(r.Coding) || 0, Number.parseInt(r.Speaking) || 0, Number.parseInt(r.Logical) || 0, Number.parseInt(r.Personality) || 0 ]
            return (Math.max(...scores) - Math.min(...scores)) < 20
          }).length
          return { balanced, specialized: data.length - balanced, balancedPercent: Math.round((balanced / data.length) * 100) }
        })(),
      })
    } catch (error) { console.error("Error:", error); alert("Error analyzing data."); } 
    finally { setIsAnalyzing(false) }
  }
  // --- END ANALYTICS LOGIC ---

  const filteredTalents = talentPool.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.college.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExperience = filters.experience === "Both" || talent.experience === filters.experience
    const matchesCollege = !filters.college || talent.college.toLowerCase().includes(filters.college.toLowerCase())
    const matchesSkills =
      talent.skills.coding >= filters.minCoding[0] &&
      talent.skills.speaking >= filters.minSpeaking[0] &&
      talent.skills.logical >= filters.minLogical[0] &&
      talent.skills.personality >= filters.minPersonality[0]

    return matchesSearch && matchesExperience && matchesCollege && matchesSkills
  })

  const spotlightTalents = talentPool.filter((talent) => talent.isSpotlight).slice(0, 3)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    const role = jobRoleTemplates.find((r) => r.id === roleId)
    if (role) {
      setFilters({
        ...filters,
        minCoding: [role.requiredSkills.coding],
        minSpeaking: [role.requiredSkills.speaking],
        minLogical: [role.requiredSkills.logical],
        minPersonality: [role.requiredSkills.personality],
        experience: role.experience,
      })
      // Scroll to the confirmation card
      setTimeout(() => {
        const element = document.getElementById("selected-role-card")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    }
  }

  const toggleTalentSelection = (talentName: string) => {
    setSelectedTalents((prev) =>
      prev.includes(talentName) ? prev.filter((name) => name !== talentName) : [...prev, talentName],
    )
  }

  const exportShortlist = () => {
    const shortlistedTalents = filteredTalents.filter((talent) => selectedTalents.includes(talent.name))

    // Create CSV content
    const csvContent = [
      "Name,College,Overall Score,Coding,Speaking,Logical,Personality,Experience,Location,Availability",
      ...shortlistedTalents.map(
        (talent) =>
          `${talent.name},${talent.college},${talent.score},${talent.skills.coding},${talent.skills.speaking},${talent.skills.logical},${talent.skills.personality},${talent.experience},${talent.location},${talent.availability}`,
      ),
    ].join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `talent-shortlist-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)

    alert(`Successfully exported ${shortlistedTalents.length} talents to CSV file!`)
  }

  const openTalentProfile = (talent: any) => {
    setSelectedTalent(talent)
    setIsProfileModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
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
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.location.href = "/"}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg md:text-xl font-bold truncate">TalentVisa for Employers</h1>
              <Badge className="hidden md:inline-flex bg-accent/20 text-accent border-accent/30">Hire by Skills</Badge>
            </div>

            
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-balance mb-4">
              Hire by{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Skills
              </span>
              , Not Just Resumes
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Access our talent pool of 10,000+ skilled professionals ranked by real performance metrics. Find the
              perfect match for your team.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 lg:w-fit bg-muted/50 p-1 h-auto">
              <TabsTrigger 
                value="analytics"
                className="rounded-md px-2 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 h-full whitespace-normal text-center text-xs sm:text-sm"
              >
                Analytics & Upload
              </TabsTrigger>
              <TabsTrigger 
                value="browse"
                className="rounded-md px-2 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 h-full whitespace-normal text-center text-xs sm:text-sm"
              >
                Browse Talents
              </TabsTrigger>
              <TabsTrigger 
                value="templates"
                className="rounded-md px-2 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 h-full whitespace-normal text-center text-xs sm:text-sm"
              >
                Job Templates
              </TabsTrigger>
              <TabsTrigger 
                value="spotlight"
                className="rounded-md px-2 py-2 transition-all duration-300 hover:bg-primary/20 hover:scale-105 data-[state=active]:bg-none data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 h-full whitespace-normal text-center text-xs sm:text-sm"
              >
                Talent Spotlight
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-effect border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Upload Talent Data
                    </CardTitle>
                    <CardDescription>Upload CSV or JSON files with talent information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleFileUpload} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dataFile">Select File</Label>
                        <Input
                          id="dataFile"
                          name="dataFile"
                          type="file"
                          accept=".csv,.json"
                          className="bg-background/50 border-primary/30 focus:border-primary"
                          required
                        />
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isUploading}>
                        {isUploading ? "Processing..." : "Upload & Analyze"}
                      </Button>
                    </form>
                    <div className="flex items-center gap-4 my-4">
                      <div className="flex-1 border-t border-border"></div>
                      <span className="text-sm text-muted-foreground">OR</span>
                      <div className="flex-1 border-t border-border"></div>
                    </div>

                    <Button
                      onClick={() => {
                        const colleges = ["PSIT Kanpur", "IIT Delhi", "IIT Bombay", "IIT Madras", "BITS Pilani", "NIT Trichy", "IIIT Hyderabad", "DTU Delhi", "VIT Vellore", "SRM Chennai", "Manipal Inst. of Tech.", "Anna University", "Jadavpur University", "Amity University", "LPU Jalandhar", "Symbiosis Pune", "Christ University", "Thapar Inst. of Engg.", "Chandigarh University", "UPES Dehradun"];
                        const firstNames = ["Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Rohan", "Kabir", "Dhruv", "Rudra", "Arnav", "Aadya", "Diya", "Saanvi", "Ananya", "Kiara", "Pari", "Myra", "Riya", "Aadhya", "Kavya", "Khushi", "Anika", "Navya", "Angel", "Amaya"];
                        const lastNames = ["Singh", "Sharma", "Patel", "Verma", "Gupta", "Malhotra", "Bhat", "Saxena", "Mehra", "Kapoor", "Rao", "Reddy", "Nair", "Iyer", "Menon", "Pillai", "Das", "Bose", "Ghosh", "Chatterjee", "Mishra", "Pandey", "Tiwari", "Dubey", "Joshi", "Kumar", "Chopra", "Jain", "Agarwal", "Bansal"];

                        // 1. RANDOMIZE BATCH FLAVOR (Determines which roles are popular this time)
                        // This fixes the "General Dominance" by forcing roles to appear
                        const flavor = Math.random();
                        let roleWeights = { backend: 0.1, pm: 0.1, lead: 0.1, general: 0.5, low: 0.2 };

                        if (flavor < 0.33) {
                           // Tech Hiring Batch
                           roleWeights = { backend: 0.4, pm: 0.1, lead: 0.2, general: 0.2, low: 0.1 };
                        } else if (flavor < 0.66) {
                           // Product/Management Batch
                           roleWeights = { backend: 0.1, pm: 0.4, lead: 0.1, general: 0.3, low: 0.1 };
                        } else {
                           // Balanced/General
                           roleWeights = { backend: 0.2, pm: 0.2, lead: 0.1, general: 0.4, low: 0.1 };
                        }

                        // Helper: Normal distribution (Bell Curve) - NO TYPES to avoid errors
                        const gaussian = (mean: any, stdev: any) => {
                          const u = 1 - Math.random(); 
                          const v = Math.random();
                          const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
                          return Math.max(0, Math.min(100, Math.round(z * stdev + mean)));
                        };

                        let csvContent = "Name,College,Coding,Speaking,Logical,Personality,Experience\n";
                        csvContent += "Gurnaam Singh,PSIT Kanpur,99,99,100,95,Experienced\n";

                        for (let i = 0; i < 500; i++) {
                          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                          const college = colleges[Math.floor(Math.random() * colleges.length)];
                          
                          const roll = Math.random();
                          let coding, speaking, logical, personality;

                          // TARGETED GENERATION: Forces scores to hit specific role thresholds
                          if (roll < roleWeights.backend) {
                            // Backend: Needs Coding > 85, Logical > 80
                            coding = gaussian(90, 15); logical = gaussian(88, 15); speaking = gaussian(50, 20); personality = gaussian(60, 20);
                          } else if (roll < roleWeights.backend + roleWeights.pm) {
                            // PM: Needs Speaking > 85, Personality > 85
                            coding = gaussian(50, 20); logical = gaussian(70, 15); speaking = gaussian(92, 10); personality = gaussian(90, 10);
                          } else if (roll < roleWeights.backend + roleWeights.pm + roleWeights.lead) {
                            // Tech Lead: Coding > 75, Speaking > 80
                            coding = gaussian(82, 15); logical = gaussian(80, 15); speaking = gaussian(85, 10); personality = gaussian(75, 15);
                          } else if (roll < roleWeights.backend + roleWeights.pm + roleWeights.lead + roleWeights.low) {
                            // Low Tier (Fills the 0-40 bucket for Bell Curve)
                            coding = gaussian(30, 15); logical = gaussian(30, 15); speaking = gaussian(30, 15); personality = gaussian(30, 15);
                          } else {
                            // Generalist (Mid Tier 40-80)
                            coding = gaussian(65, 20); logical = gaussian(65, 20); speaking = gaussian(65, 20); personality = gaussian(65, 20);
                          }

                          const avgScore = (coding + speaking + logical + personality) / 4;
                          const experience = (avgScore > 75 || Math.random() > 0.8) ? "Experienced" : "Fresher";

                          csvContent += `${firstName} ${lastName},${college},${coding},${speaking},${logical},${personality},${experience}\n`;
                        }

                        const file = new File([csvContent], "generated-data.csv", { type: "text/csv" });
                        analyzeUploadedData(file);

                        // SCROLL DOWN ANIMATION (Updated to target the new ID)
                        setTimeout(() => {
                          const element = document.getElementById("role-distribution-chart");
                          if (element) {
                            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for fixed header
                            window.scrollTo({ top: y, behavior: "smooth" });
                          } else {
                            // Fallback if ID is missing (e.g., initial render delay)
                            window.scrollBy({ top: 600, behavior: "smooth" });
                          }
                        }, 200);
                      }}
                      variant="outline"
                      className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      disabled={isUploading}
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
                      Generate Dynamic Talent Report
                    </Button>

                    {isAnalyzing && (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-2">Analyzing data...</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="glass-effect border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <FileText className="w-5 h-5 mr-2" />
                      Data Format Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Required Fields:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Name (string)</li>
                        <li>• College (string)</li>
                        <li>• Coding (0-100)</li>
                        <li>• Speaking (0-100)</li>
                        <li>• Logical (0-100)</li>
                        <li>• Personality (0-100)</li>
                        <li>• Experience (Fresher/Experienced)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">Sample CSV Format:</h5>
                      <code className="text-xs text-muted-foreground block whitespace-pre-wrap break-all">
                        Name,College,Coding,Speaking,Logical,Personality,Experience
                        <br />
                        Kashi Mishra,PSIT,85,78,92,88,Experienced
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {!analysisResults ? (
                  <Card className="glass-effect border-primary/20 md:col-span-2">
                    <CardContent className="py-12">
                      <div className="text-center space-y-4">
                        <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
                        <h3 className="text-lg font-semibold">No Data Uploaded Yet</h3>
                        <p className="text-muted-foreground">Upload a CSV or JSON file to see analytics and insights</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6 md:col-span-2">
                      <Card className="glass-effect border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                            Skill Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={analysisResults.skillChartData} margin={{ bottom: 50 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis 
                                dataKey="name" 
                                stroke="rgba(255,255,255,0.5)"
                                fontSize={11}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                              />
                              <YAxis stroke="rgba(255,255,255,0.5)" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(30, 30, 40, 0.95)",
                                  border: "1px solid rgba(139, 92, 246, 0.5)",
                                  borderRadius: "8px",
                                  color: "#fff",
                                }}
                                cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                              />
                              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card id="role-distribution-chart" className="glass-effect border-accent/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <PieChart className="w-5 h-5 mr-2 text-accent" />
                            Role Distribution (Bar Chart)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={analysisResults.roleDistribution} margin={{ bottom: 50 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis
                                dataKey="name"
                                stroke="rgba(255,255,255,0.5)"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                fontSize={11}
                                interval={0}
                              />
                              <YAxis stroke="rgba(255,255,255,0.5)" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(30, 30, 40, 0.95)",
                                  border: "1px solid rgba(236, 72, 153, 0.5)",
                                  borderRadius: "8px",
                                  color: "#fff",
                                }}
                                cursor={{ fill: "rgba(236, 72, 153, 0.1)" }}
                              />
                              <Bar dataKey="value" fill="#ec4899" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:col-span-2">
                      <Card className="glass-effect border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                            Experience Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {Object.entries(analysisResults.experienceDistribution).map(([exp, count]: any) => (
                              <div key={exp} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium">{exp}</span>
                                  <span className="text-primary font-bold">{count}</span>
                                </div>
                                <Progress value={(count / analysisResults.totalRecords) * 100} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-effect border-accent/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                            Skill Gap Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {analysisResults.skillChartData.map((skill: any) => {
                              const gap = 100 - skill.value
                              return (
                                <div key={skill.name} className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-accent">{skill.value}/100</span>
                                  </div>
                                  <Progress value={skill.value} className="h-2" />
                                  <div className="text-xs text-muted-foreground">Gap: {gap} points</div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="glass-effect border-primary/20 md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                          Standard Deviation Analysis
                        </CardTitle>
                        <CardDescription>Measure of score variability (lower = more consistent)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {Object.entries(analysisResults.standardDeviation).map(([skill, stdDev]: any) => (
                            <div key={skill} className="p-4 bg-muted/30 rounded-lg text-center">
                              <div className="text-sm text-muted-foreground capitalize mb-1">{skill}</div>
                              <div className="text-2xl font-bold text-primary">σ = {stdDev}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {stdDev < 15 ? "High Consistency" : stdDev < 25 ? "Healthy Diversity" : "Broad Range"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="overall-score-distribution" className="glass-effect border-accent/20 md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-accent" />
                          Overall Score Distribution
                        </CardTitle>
                        <CardDescription>Frequency distribution of candidate scores</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={analysisResults.scoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                              dataKey="range" 
                              stroke="rgba(255,255,255,0.5)"
                              fontSize={12}
                            />
                            <YAxis stroke="rgba(255,255,255,0.5)" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(30, 30, 40, 0.95)",
                                border: "1px solid rgba(236, 72, 153, 0.5)",
                                borderRadius: "8px",
                                color: "#fff",
                              }}
                              cursor={{ fill: "rgba(236, 72, 153, 0.1)" }}
                            />
                            <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6 md:col-span-2">
                      <Card className="glass-effect border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                            Performance Quartiles
                          </CardTitle>
                          <CardDescription>Statistical distribution of scores</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                              <span className="text-sm font-medium">Q1 (25th percentile)</span>
                              <span className="text-xl font-bold text-primary">{analysisResults.performanceQuartiles.q1}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                              <span className="text-sm font-medium">Median (50th percentile)</span>
                              <span className="text-xl font-bold text-accent">{analysisResults.performanceQuartiles.median}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                              <span className="text-sm font-medium">Q3 (75th percentile)</span>
                              <span className="text-xl font-bold text-primary">{analysisResults.performanceQuartiles.q3}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-accent/20 rounded-lg border border-accent/30">
                              <span className="text-sm font-medium">IQR (Interquartile Range)</span>
                              <span className="text-xl font-bold text-accent">{analysisResults.performanceQuartiles.iqr}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-effect border-accent/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <PieChart className="w-5 h-5 mr-2 text-accent" />
                            Skill Balance Index
                          </CardTitle>
                          <CardDescription>Balanced vs specialized talent distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="text-center py-4">
                              <div className="text-5xl font-bold text-accent mb-2">
                                {analysisResults.skillBalance.balancedPercent}%
                              </div>
                              <div className="text-sm text-muted-foreground">of candidates are balanced</div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Balanced Skills</span>
                                <span className="text-accent font-bold">{analysisResults.skillBalance.balanced}</span>
                              </div>
                              <Progress value={(analysisResults.skillBalance.balanced / analysisResults.totalRecords) * 100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Specialized Skills</span>
                                <span className="text-primary font-bold">{analysisResults.skillBalance.specialized}</span>
                              </div>
                              <Progress value={(analysisResults.skillBalance.specialized / analysisResults.totalRecords) * 100} className="h-2" />
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              * Balanced: Skills differ by less than 20 points
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                      <Card className="glass-effect border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                            Most Consistent Performers
                          </CardTitle>
                          <CardDescription>Candidates with balanced skill profiles</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysisResults.skillConsistency.map((performer: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div>
                                  <div className="font-semibold">{performer.name}</div>
                                  <div className="text-xs text-muted-foreground">Overall: {performer.overallScore}/100</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-primary">{performer.consistency}%</div>
                                  <div className="text-xs text-muted-foreground">Consistency</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-effect border-accent/20">
                        <CardHeader>
                          <CardTitle className="flex items-center text-accent">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Top Performers & Role Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysisResults.topPerformers.map((performer: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div>
                                  <div className="font-semibold">{performer.Name}</div>
                                  <div className="text-sm text-muted-foreground">{performer.College}</div>
                                </div>
                                <div className="text-right">
                                  <Badge className="bg-accent/20 text-accent border-accent/30 mb-1">
                                    {performer.recommendedRole}
                                  </Badge>
                                  <div className="text-lg font-bold text-primary">{performer.overallScore}/100</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="glass-effect border-primary/20 md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <LineChartIcon className="w-5 h-5 mr-2 text-primary" />
                          College Performance Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}> 
                          <BarChart 
                            data={analysisResults.collegePerformance}
                            margin={{ top: 5, right: 0, left: -20, bottom: 80 }}
                           > 
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} /> 
                            <XAxis
                              dataKey="name"
                              stroke="var(--muted-foreground)"
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              interval={0}
                              tick={{ fontSize: 10 }}
                            />
                            <YAxis 
                              stroke="var(--muted-foreground)"
                              tick={{ fontSize: 11 }}
                              label={{ value: 'Score / Count', angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)', fontSize: 12, dx:-5 }} 
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "var(--popover)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-md)",
                                color: "var(--popover-foreground)",
                                fontSize: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                              }}
                              cursor={{ fill: "var(--primary)", fillOpacity: 0.1 }}
                              itemStyle={{ color: "var(--popover-foreground)"}}
                              labelStyle={{ color: "var(--foreground)", fontWeight: "bold"}}
                            />
                            <Legend 
                               wrapperStyle={{ 
                                 color: 'var(--muted-foreground)', 
                                 fontSize: '12px',
                                 paddingTop: '10px'
                               }} 
                               verticalAlign="top"
                               align="right"
                             /> 
                            <Bar dataKey="avgScore" fill="var(--accent)" name="Avg Score" radius={[4, 4, 0, 0]} /> 
                            <Bar dataKey="count" fill="var(--chart-3)" name="Count" radius={[4, 4, 0, 0]} /> 
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6 items-start">
                {/* Filters Sidebar */}
                <Card className="glass-effect border-primary/20 lg:col-span-1 lg:sticky lg:top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2 text-primary" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Name or college..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-background/50 border-primary/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <Select
                        value={filters.experience}
                        onValueChange={(value) => setFilters({ ...filters, experience: value })}
                      >
                        <SelectTrigger className="bg-background/50 border-primary/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Both">Both</SelectItem>
                          <SelectItem value="Fresher">Fresher</SelectItem>
                          <SelectItem value="Experienced">Experienced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>College</Label>
                      <Input
                        placeholder="Filter by college..."
                        value={filters.college}
                        onChange={(e) => setFilters({ ...filters, college: e.target.value })}
                        className="bg-background/50 border-primary/30"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Min Coding Score: {filters.minCoding[0]}</Label>
                        <Slider
                          value={filters.minCoding}
                          onValueChange={(value) => setFilters({ ...filters, minCoding: value })}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Min Speaking Score: {filters.minSpeaking[0]}</Label>
                        <Slider
                          value={filters.minSpeaking}
                          onValueChange={(value) => setFilters({ ...filters, minSpeaking: value })}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Min Logical Score: {filters.minLogical[0]}</Label>
                        <Slider
                          value={filters.minLogical}
                          onValueChange={(value) => setFilters({ ...filters, minLogical: value })}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Min Personality Score: {filters.minPersonality[0]}</Label>
                        <Slider
                          value={filters.minPersonality}
                          onValueChange={(value) => setFilters({ ...filters, minPersonality: value })}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() =>
                        setFilters({
                          experience: "Both",
                          college: "",
                          minCoding: [0],
                          minSpeaking: [0],
                          minLogical: [0],
                          minPersonality: [0],
                          availability: "All",
                        })
                      }
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>

                {/* Talent Results */}
                <div id="talent-results-container" className="lg:col-span-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {filteredTalents.length} Talents Found
                        {selectedRole && (
                          <Badge className="ml-2 bg-primary/20 text-primary">
                            {jobRoleTemplates.find((r) => r.id === selectedRole)?.title}
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedTalents.length} selected for shortlist</p>
                    </div>

                    {selectedTalents.length > 0 && (
                      <Button onClick={exportShortlist} className="bg-primary hover:bg-primary/90">
                        <Download className="w-4 h-4 mr-2" />
                        Export Shortlist ({selectedTalents.length})
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTalents.map((talent, index) => (
                      <Card
                        key={index}
                        className="glass-effect border-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0">
                                  {talent.rank}
                                </div>
                                <Avatar className="w-12 h-12">
                                  <AvatarImage
                                    src={
                                      talent.name === "Gurnaam Singh"
                                        ? "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Chase"
                                        : `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${talent.name}`
                                    }
                                  />
                                  <AvatarFallback className="text-sm font-semibold">
  {talent.name.split(" ").map((n) => n[0]).join("")}
</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="text-base font-bold text-foreground leading-tight">{talent.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    {talent.isSpotlight && (
                                      <Badge className="bg-accent/20 text-accent border-accent/30 text-[10px] h-5 px-1.5">
                                        Spotlight
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground">{talent.experience}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-center shrink-0">
                                <div className="text-lg font-bold text-primary leading-none">{talent.score}</div>
                                <div className="text-[10px] text-muted-foreground">Score</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 bg-muted/20 p-2 rounded-lg">
                              <div className="text-center">
                                <div className="text-xs font-bold text-primary">{talent.skills.coding}</div>
                                <div className="text-[10px] text-muted-foreground">Code</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs font-bold text-accent">{talent.skills.speaking}</div>
                                <div className="text-[10px] text-muted-foreground">Speak</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs font-bold text-primary">{talent.skills.logical}</div>
                                <div className="text-[10px] text-muted-foreground">Logic</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs font-bold text-accent">{talent.skills.personality}</div>
                                <div className="text-[10px] text-muted-foreground">Pers</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-1">
                              <div className="text-xs text-muted-foreground truncate flex-1">
                                <MapPin className="w-3 h-3 inline mr-1" />
                                {talent.location}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (talent.linkedIn) {
                                    window.open(talent.linkedIn, "_blank")
                                  } else {
                                    openTalentProfile(talent)
                                  }
                                }}
                                className="h-7 text-xs bg-transparent hover:bg-primary/10 px-2"
                              >
                                {talent.linkedIn ? "Connect" : "Profile"}
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Job Role Templates</h3>
                <p className="text-muted-foreground">
                  Select a role template to automatically filter candidates with the right skill mix
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobRoleTemplates.map((role) => (
                  <Card
                    key={role.id}
                    className={`glass-effect cursor-pointer transition-all hover:border-primary/40 ${
                      selectedRole === role.id ? "border-primary/60 bg-primary/5" : "border-primary/20"
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{role.title}</span>
                        <Badge variant="outline">{role.matchCount} matches</Badge>
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Required Skills:</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>Coding:</span>
                            <span className="font-semibold">{role.requiredSkills.coding}+</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speaking:</span>
                            <span className="font-semibold">{role.requiredSkills.speaking}+</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Logical:</span>
                            <span className="font-semibold">{role.requiredSkills.logical}+</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Personality:</span>
                            <span className="font-semibold">{role.requiredSkills.personality}+</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {role.experience}
                        </Badge>
                        <Button
                          size="sm"
                          className={selectedRole === role.id ? "bg-primary" : "bg-transparent"}
                          variant={selectedRole === role.id ? "default" : "outline"}
                        >
                          {selectedRole === role.id ? "Selected" : "Select Role"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedRole && (
                <Card id="selected-role-card" className="glass-effect border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <Target className="w-5 h-5 mr-2" />
                      Best-Fit Candidates for {jobRoleTemplates.find((r) => r.id === selectedRole)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center py-4 space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground bg-muted px-3 py-1 rounded-full text-xs">
                        <Users className="w-3 h-3" />
                        <span className="font-medium">
                          Pool: {jobRoleTemplates.find((r) => r.id === selectedRole)?.matchCount} candidates available
                        </span>
                      </div>
                      
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 min-w-[200px] shadow-lg shadow-primary/20"
                        onClick={() => {
                          setActiveTab("browse")
                          setTimeout(() => {
                            const el = document.getElementById("talent-results-container")
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 120
                              window.scrollTo({ top: y, behavior: "smooth" })
                            }
                          }, 100)
                        }}
                      >
                        View Top Matches
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                      
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Sorted by Talent Rank
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="spotlight" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 mr-2 text-accent" />
                  Talent Spotlight
                </h3>
                <p className="text-muted-foreground">
                  Featured top performers and fresh talents making waves in the platform
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spotlightTalents.map((talent, index) => (
                  <Card key={index} className="glass-effect border-accent/20 hover:border-accent/40 transition-colors">
                    <CardHeader className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage
                          src={
                            talent.name === "Gurnaam Singh"
                              ? "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Chase"
                              : `https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=${talent.name}`
                          }
                        />
                        <AvatarFallback className="text-lg">
                          {talent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="flex items-center justify-center space-x-2">
                        <span>{talent.name}</span>
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          <Crown className="w-3 h-3 mr-1" />#{talent.rank}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {talent.college} • {talent.experience}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <div className="font-semibold text-primary">{talent.skills.coding}</div>
                          <div className="text-xs text-muted-foreground">Coding</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <div className="font-semibold text-accent">{talent.skills.speaking}</div>
                          <div className="text-xs text-muted-foreground">Speaking</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <div className="font-semibold text-primary">{talent.skills.logical}</div>
                          <div className="text-xs text-muted-foreground">Logical</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded">
                          <div className="font-semibold text-accent">{talent.skills.personality}</div>
                          <div className="text-xs text-muted-foreground">Personality</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{talent.score}</div>
                        <div className="text-sm text-muted-foreground">Overall Score</div>
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => openTalentProfile(talent)}>
                        View Full Profile
                        <Star className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle>Why These Talents Stand Out</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Top Performers</h4>
                    <p className="text-sm text-muted-foreground">Consistently high scores across all skill areas</p>
                  </div>
                  <div className="text-center p-4">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <h4 className="font-semibold mb-1">Rising Stars</h4>
                    <p className="text-sm text-muted-foreground">Fresh talents with exceptional potential</p>
                  </div>
                  <div className="text-center p-4">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold mb-1">Team Players</h4>
                    <p className="text-sm text-muted-foreground">Strong personality and communication skills</p>
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
    </div>
  )
}
