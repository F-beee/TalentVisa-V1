"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  BarChart3,
  Settings,
  FileText,
  QrCode,
  Shield,
  TrendingUp,
  CheckCircle,
  PieChart,
  LineChartIcon,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const calculateStdDev = (values: number[]) => {
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
  return Math.round(Math.sqrt(variance) * 10) / 10
}

export default function AdminPanel() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const file = formData.get("dataFile") as File

    if (!file) {
      alert("Please select a file")
      return
    }

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
        data = lines
          .slice(1)
          .filter((line) => line.trim())
          .map((line) => {
            const values = line.split(",").map((v) => v.trim())
            const obj: any = {}
            headers.forEach((header, index) => {
              obj[header] = values[index] || ""
            })
            return obj
          })
      } else if (file.name.endsWith(".json")) {
        data = JSON.parse(text)
      }

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

        return {
          ...record,
          recommendedRole,
          overallScore: Math.round((coding + speaking + logical + personality) / 4),
        }
      })

      const skillDistribution = {
        coding: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Coding) || 0), 0) / data.length,
        speaking: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Speaking) || 0), 0) / data.length,
        logical: roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Logical) || 0), 0) / data.length,
        personality:
          roleRecommendations.reduce((sum, r) => sum + (Number.parseInt(r.Personality) || 0), 0) / data.length,
      }

      const roleDistribution = roleRecommendations.reduce((acc: any, record: any) => {
        acc[record.recommendedRole] = (acc[record.recommendedRole] || 0) + 1
        return acc
      }, {})

      const collegePerformance = roleRecommendations.reduce((acc: any, record: any) => {
        if (!acc[record.College]) {
          acc[record.College] = { count: 0, totalScore: 0 }
        }
        acc[record.College].count += 1
        acc[record.College].totalScore += record.overallScore
        return acc
      }, {})

      const analysis = {
        totalRecords: data.length,
        averageScores: skillDistribution,
        topPerformers: roleRecommendations.sort((a, b) => b.overallScore - a.overallScore).slice(0, 5),
        roleDistribution: Object.entries(roleDistribution).map(([role, count]) => ({
          name: role,
          value: count,
        })),
        skillChartData: [
          { name: "Coding", value: Math.round(skillDistribution.coding) },
          { name: "Speaking", value: Math.round(skillDistribution.speaking) },
          { name: "Logical", value: Math.round(skillDistribution.logical) },
          { name: "Personality", value: Math.round(skillDistribution.personality) },
        ],
        collegePerformance: Object.entries(collegePerformance)
          .map(([college, data]: any) => ({
            name: college,
            avgScore: Math.round(data.totalScore / data.count),
            count: data.count,
          }))
          .sort((a, b) => b.avgScore - a.avgScore)
          .slice(0, 8),
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
          const ranges = [
            { range: "0-20", min: 0, max: 20, count: 0 },
            { range: "21-40", min: 21, max: 40, count: 0 },
            { range: "41-60", min: 41, max: 60, count: 0 },
            { range: "61-80", min: 61, max: 80, count: 0 },
            { range: "81-100", min: 81, max: 100, count: 0 },
          ]
          roleRecommendations.forEach(r => {
            const score = r.overallScore
            ranges.forEach(range => {
              if (score >= range.min && score <= range.max) range.count++
            })
          })
          return ranges
        })(),
        skillConsistency: roleRecommendations.map(r => {
          const scores = [
            Number.parseInt(r.Coding) || 0,
            Number.parseInt(r.Speaking) || 0,
            Number.parseInt(r.Logical) || 0,
            Number.parseInt(r.Personality) || 0
          ]
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length
          const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length
          return {
            name: r.Name,
            consistency: Math.round(100 - Math.sqrt(variance)),
            overallScore: r.overallScore
          }
        }).sort((a, b) => b.consistency - a.consistency).slice(0, 5),
        performanceQuartiles: (() => {
          const sorted = [...roleRecommendations].sort((a, b) => a.overallScore - b.overallScore)
          const q1Index = Math.floor(sorted.length * 0.25)
          const q2Index = Math.floor(sorted.length * 0.5)
          const q3Index = Math.floor(sorted.length * 0.75)
          
          return {
            q1: sorted[q1Index]?.overallScore || 0,
            median: sorted[q2Index]?.overallScore || 0,
            q3: sorted[q3Index]?.overallScore || 0,
            iqr: (sorted[q3Index]?.overallScore || 0) - (sorted[q1Index]?.overallScore || 0),
          }
        })(),
        skillBalance: (() => {
          const balanced = roleRecommendations.filter(r => {
            const scores = [
              Number.parseInt(r.Coding) || 0,
              Number.parseInt(r.Speaking) || 0,
              Number.parseInt(r.Logical) || 0,
              Number.parseInt(r.Personality) || 0
            ]
            const max = Math.max(...scores)
            const min = Math.min(...scores)
            return (max - min) < 20
          }).length
          
          return {
            balanced: balanced,
            specialized: data.length - balanced,
            balancedPercent: Math.round((balanced / data.length) * 100)
          }
        })(),
      }

      setAnalysisResults(analysis)
    } catch (error) {
      console.error("Error analyzing data:", error)
      alert("Error analyzing data. Please check file format.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateSkillCards = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          const link = document.createElement("a")
          link.href = "data:text/plain;charset=utf-8,Skill cards generated successfully!"
          link.download = "skill-cards.zip"
          link.click()
          alert("Skill cards generated and downloaded successfully!")
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const settings = {
      platformName: formData.get("platformName"),
      tagline: formData.get("tagline"),
      description: formData.get("description"),
    }
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
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
  <header className="glass-effect border-b border-primary/20 sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
      <div 
        className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => window.location.href = "/"}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">TalentRank Admin</h1>
        <Badge className="bg-accent/20 text-accent border-accent/30">Administrator</Badge>
      </div>
    </div>
  </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="flex flex-wrap gap-2 w-full lg:grid lg:w-fit lg:grid-cols-3 bg-muted/50">
              <TabsTrigger value="upload">Data Upload & Analytics</TabsTrigger>
              <TabsTrigger value="skillcards">Skill Cards</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
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
    const DEFAULT_CSV_DATA = `Name,College,Coding,Speaking,Logical,Personality,Experience
Gurnaam Singh,PSIT Kanpur,99,99,100,95,Experienced
Aditi Sharma,IIT Delhi,95,92,51,90,Experienced
Rohan Verma,IIT Madras,93,91,49,88,Experienced
Shreya Kapoor,IISc Bangalore,90,88,52,85,Experienced
Aaryan Patel,BITS Pilani,88,85,48,82,Experienced
Neha Dubey,NIT Trichy,85,82,53,78,Experienced
Karan Mehra,Jadavpur University,83,80,47,76,Experienced
Pooja Singh,DTU Delhi,80,78,50,74,Experienced
Vikas Yadav,IIT Bombay,78,75,51,72,Fresher
Sanya Rao,VIT Vellore,75,72,49,70,Experienced
Arjun Gupta,Amity University,73,70,53,68,Fresher
Divya Iyer,Anna University,70,68,48,66,Fresher
Ankit Khanna,LPU Jalandhar,68,65,52,64,Fresher
Riya Chawla,Symbiosis Pune,65,62,47,62,Experienced
Manish Das,Manipal Inst. of Tech.,90,30,51,40,Fresher
Siddharth Rai,IIT Kanpur,30,90,49,42,Experienced
Deepika Hegde,JNTU Hyderabad,85,25,52,35,Fresher
Rajesh Shah,PSIT Kanpur,25,85,48,38,Fresher
Amit Dagar,SRM Chennai,80,40,53,50,Fresher
Meenal Jain,Calcutta University,40,80,47,52,Fresher
Rahul Bose,Mumbai University,75,35,51,45,Fresher
Priya Garg,Delhi University,35,75,49,48,Fresher
Sachin Reddy,Osmania University,95,20,52,30,Fresher
Nikita D'Souza,Pune University,20,95,48,32,Fresher
Vivek Mishra,Lucknow University,65,45,53,55,Fresher
Sneha Nair,Thapar Inst. of Engg.,45,65,47,58,Fresher
Harsh Singhal,Christ University,58,55,51,60,Fresher
Samarth Joshi,Punjab University,55,58,49,61,Fresher
Tanvi Agarwal,Banasthali Vidyapith,62,60,52,63,Fresher
Rohan Nanda,MUIT Noida,60,62,48,64,Fresher
Muskan Sheikh,IIMT Meerut,50,52,53,48,Fresher
Alok Pande,IMS Ghaziabad,52,50,47,49,Fresher
Zoya Khan,Sharda University,48,45,51,52,Fresher
Prem Kumar,Galgotias University,45,48,49,53,Fresher
Kavita Bawa,IP University Delhi,53,51,52,50,Fresher
Deepak Das,KIIT Bhubaneswar,51,53,48,51,Fresher
Isha Saini,Bennett University,49,47,53,54,Fresher
Chetan Raj,Graphic Era University,47,49,47,55,Fresher
Siya Goel,DIT Dehradun,56,54,51,50,Fresher
Gautam Singh,Sanskriti University,54,56,49,51,Fresher
Aarav Dubey,NIT Warangal,46,44,52,48,Experienced
Vanya Sood,Manipal Inst. of Tech.,44,46,48,47,Fresher
Kunal Tandon,Amity University,51,49,53,50,Fresher
Roshni Sen,Jadavpur University,49,51,47,50,Fresher
Mohit Bansal,SRM Chennai,47,45,51,46,Experienced
Jhanvi Kaur,LPU Jalandhar,45,47,49,45,Fresher
Anshul Malik,Pune University,53,55,52,54,Fresher
Sneha Varma,Mumbai University,55,53,48,56,Fresher
Dhairya Shah,BITS Pilani,43,41,53,40,Experienced
Harshita Negi,DTU Delhi,41,43,47,41,Experienced
Gagan Bhardwaj,Anna University,58,60,51,59,Fresher
Tanisha Pal,Calcutta University,60,58,49,60,Fresher
Vishal Mehra,IIT Roorkee,39,37,52,38,Experienced
Simran Bajaj,Symbiosis Pune,37,39,48,39,Experienced
Kabir Khan,IIT Guwahati,63,65,53,64,Fresher
Priyanka Das,Thapar Inst. of Engg.,65,63,47,65,Fresher
Rishi Chopra,IIT Hyderabad,36,34,51,35,Experienced
Alisha Nair,VIT Vellore,34,36,49,36,Fresher
Devansh Singh,Osmania University,68,70,52,69,Fresher
Kriti Sharma,Lucknow University,70,68,48,70,Fresher
Rajiv Menon,IIT Kharagpur,33,31,53,32,Experienced
Swati Pillai,IIIT Bangalore,31,33,47,33,Experienced
Aman Verma,MUIT Noida,72,74,51,73,Fresher
Ira Mathur,Christ University,74,72,49,74,Fresher
Chirag Saxena,BHU Varanasi,29,27,52,28,Experienced
Esha Gandhi,JNTU Hyderabad,27,29,48,29,Fresher
Arnab Mitra,Galgotias University,78,80,53,79,Fresher
Shruti Iyer,Sharda University,80,78,47,80,Fresher
Suraj Patil,IIT BHU,26,24,51,25,Experienced
Nidhi Aggarwal,KIIT Bhubaneswar,24,26,49,26,Experienced
Manas Joshi,IP University Delhi,82,84,52,83,Fresher
Anjali Rai,Bennett University,84,82,48,84,Fresher
Varun Bhatia,IIT Gandhinagar,23,21,53,22,Experienced
Kavya Soni,Graphic Era University,21,23,47,23,Fresher
Rohit Narang,Sanskriti University,88,90,51,89,Fresher
Palak Mehra,DIT Dehradun,90,88,49,90,Fresher
Sarthak Wadhwa,IIIT Hyderabad,19,17,52,18,Experienced
Khushi Das,Banasthali Vidyapith,17,19,48,19,Fresher
Vivaan Sinha,Amity University,92,94,53,93,Fresher
Megha Reddy,IMS Ghaziabad,94,92,47,94,Fresher
Dhruv Anand,IIT Patna,16,14,51,15,Experienced
Trisha Bora,IIMT Meerut,14,16,49,16,Fresher
Jayesh Rao,NIT Calicut,96,98,52,97,Fresher
Suhani Pande,SPPU Pune,98,96,48,98,Fresher
Rajat Singh,IIT Ropar,13,11,53,12,Experienced
Diya Chauhan,Jadavpur University,11,13,47,13,Experienced
Vansh Kulkarni,SRM Chennai,10,8,51,9,Fresher
Naina Malhotra,VIT Vellore,8,10,49,10,Fresher
Vedant Sharma,IIT Indore,7,5,52,6,Experienced
Siya Gupta,LPU Jalandhar,5,7,48,7,Fresher
Karthik Iyer,Pune University,4,2,53,3,Fresher
Jasmine Khan,Mumbai University,2,4,47,4,Fresher
Yashwant Goud,BITS Goa,90,85,51,88,Experienced
Ayesha Mirza,Symbiosis Pune,85,90,49,87,Experienced
Ishaan Goel,Anna University,70,75,52,72,Fresher
Prakriti Sen,Calcutta University,75,70,48,73,Fresher
Rohini Yadav,IIT Madras,80,30,53,40,Experienced
Arnav Kumar,DTU Delhi,30,80,47,42,Experienced
Sanvi Jain,IIT Bombay,50,48,51,52,Fresher
Pranav Rao,Osmania University,48,50,49,51,Fresher
Muskan Chawla,IIT Delhi,92,40,52,38,Experienced
Dev Sharma,Manipal Inst. of Tech.,60,55,53,58,Fresher
Ria Batra,Lucknow University,55,60,47,57,Fresher
Sahil Duggal,Thapar Inst. of Engg.,35,25,51,30,Fresher
Tia Singh,IIT Mandi,25,35,49,28,Experienced
Vivan Nambiar,Christ University,72,68,52,70,Fresher
Ananya Pillai,Punjab University,68,72,48,71,Fresher
Siddhant Roy,Banasthali Vidyapith,42,38,53,40,Fresher
Krishnan Iyer,IIIT Delhi,38,42,47,41,Experienced
Simran Kaur,MUIT Noida,88,78,51,80,Fresher
Harsh Verma,IMS Ghaziabad,78,88,49,82,Fresher
Zara Quadri,IIMT Meerut,15,25,52,20,Fresher
Akash Negi,IIT Bhubaneswar,25,15,48,18,Experienced
Kirti Bansal,Sharda University,95,85,53,90,Fresher
Rishi Menon,Galgotias University,85,95,47,92,Fresher
Shalini Pal,IP University Delhi,12,8,51,10,Fresher
Devika Nair,NIT Surat,8,12,49,9,Experienced
Aryan Shetty,KIIT Bhubaneswar,50,55,52,52,Experienced
Mitali Yadav,Bennett University,55,50,48,53,Fresher
Prateek Sethi,Graphic Era University,45,40,53,42,Fresher
Anika Kapoor,Jadavpur University,40,45,47,43,Experienced
Yash Verma,DIT Dehradun,65,70,51,68,Fresher
Ishita Jain,Sanskriti University,70,65,49,67,Fresher
Aarush Gupta,IIT BHU,30,20,52,25,Fresher
Kunal Das,IIIT Hyderabad,20,30,48,22,Experienced
Navya Singh,NIT Kurukshetra,78,82,53,80,Experienced
Rohit Dagar,Amity University,82,78,47,81,Fresher
Pooja Reddy,IMS Ghaziabad,22,18,51,20,Fresher
Samar Khan,IIT Patna,18,22,49,19,Experienced
Trisha Verma,IIMT Meerut,53,50,52,51,Fresher
Jayesh Mehra,NIT Calicut,50,53,48,50,Fresher
Suhani Sharma,SPPU Pune,47,49,53,48,Fresher
Vivek Singhal,IIT Ropar,49,47,47,47,Experienced
Naina Yadav,Jadavpur University,46,48,51,47,Experienced
Vansh Kapoor,SRM Chennai,48,46,49,46,Fresher
Diya Aggarwal,VIT Vellore,54,56,52,55,Fresher
Vedant Patel,IIT Indore,56,54,48,55,Experienced
Siya Mishra,LPU Jalandhar,44,42,53,43,Fresher
Karthik Rao,Pune University,42,44,47,44,Fresher
Jasmine Nair,Mumbai University,59,61,51,60,Fresher
Yashwant Sharma,BITS Goa,61,59,49,60,Experienced
Ayesha Kumari,Symbiosis Pune,38,36,52,37,Experienced
Ishaan Verma,Anna University,36,38,48,37,Fresher
Prakriti Gupta,Calcutta University,66,68,53,67,Fresher
Rohini Das,IIT Madras,68,66,47,68,Experienced
Arnav Jain,DTU Delhi,31,29,51,30,Experienced
Sanvi Reddy,IIT Bombay,29,31,49,30,Fresher
Pranav Malik,Osmania University,71,73,52,72,Fresher
Muskan Sharma,IIT Delhi,73,71,48,73,Experienced
Dev Sharma,Manipal Inst. of Tech.,28,26,53,27,Fresher
Ria Malik,Lucknow University,26,28,47,28,Fresher
Sahil Duggal,Thapar Inst. of Engg.,76,78,51,77,Fresher
Tia Singh,IIT Mandi,78,76,49,78,Experienced
Vivan Nambiar,Christ University,20,18,52,19,Fresher
Ananya Pillai,Punjab University,18,20,48,19,Fresher
Siddhant Roy,Banasthali Vidyapith,85,87,53,86,Fresher
Krishnan Iyer,IIIT Delhi,87,85,47,87,Experienced
Simran Kaur,MUIT Noida,12,10,51,11,Fresher
Harsh Verma,IMS Ghaziabad,10,12,49,11,Fresher
Zara Quadri,IIMT Meerut,90,92,52,91,Fresher
Akash Negi,IIT Bhubaneswar,92,90,48,92,Experienced
Kirti Bansal,Sharda University,9,7,53,8,Fresher
Rishi Menon,Galgotias University,7,9,47,8,Fresher
Shalini Pal,IP University Delhi,6,4,51,5,Fresher
Devika Nair,NIT Surat,4,6,49,5,Experienced
Aryan Shetty,KIIT Bhubaneswar,50,45,52,48,Experienced
Mitali Yadav,Bennett University,45,50,48,47,Fresher
Prateek Sethi,Graphic Era University,55,60,53,58,Fresher
Anika Kapoor,Jadavpur University,60,55,47,57,Experienced
Yash Verma,DIT Dehradun,40,35,51,38,Fresher
Ishita Jain,Sanskriti University,35,40,49,37,Fresher
Aarush Gupta,IIT BHU,70,75,52,72,Fresher
Kunal Das,IIIT Hyderabad,75,70,48,73,Experienced
Navya Singh,NIT Kurukshetra,30,25,53,28,Experienced
Rohit Dagar,Amity University,25,30,47,27,Fresher
Pooja Reddy,IMS Ghaziabad,80,85,51,82,Fresher
Samar Khan,IIT Patna,85,80,49,83,Experienced
Trisha Verma,IIMT Meerut,18,15,52,17,Fresher
Jayesh Mehra,NIT Calicut,15,18,48,16,Fresher
Suhani Sharma,SPPU Pune,90,95,53,92,Fresher
Vivek Singhal,IIT Ropar,95,90,47,93,Experienced
Naina Yadav,Jadavpur University,10,5,51,8,Experienced
Vansh Kapoor,SRM Chennai,5,10,49,7,Fresher
Diya Aggarwal,VIT Vellore,52,50,52,51,Fresher
Vedant Patel,IIT Indore,50,52,48,51,Experienced
Siya Mishra,LPU Jalandhar,48,46,53,47,Fresher
Karthik Rao,Pune University,46,48,47,47,Fresher
Jasmine Nair,Mumbai University,51,49,51,50,Fresher
Yashwant Sharma,BITS Goa,49,51,49,50,Experienced
Ayesha Kumari,Symbiosis Pune,47,45,52,46,Experienced
Ishaan Verma,Anna University,45,47,48,46,Fresher
Prakriti Gupta,Calcutta University,53,55,53,54,Fresher
Rohini Das,IIT Madras,55,53,47,55,Experienced
Arnav Jain,DTU Delhi,43,41,51,42,Experienced
Sanvi Reddy,IIT Bombay,41,43,49,42,Fresher
Pranav Malik,Osmania University,58,60,52,59,Fresher
Muskan Sharma,IIT Delhi,60,58,48,60,Experienced
Dev Sharma,Manipal Inst. of Tech.,39,37,53,38,Fresher
Ria Malik,Lucknow University,37,39,47,39,Fresher
Sahil Duggal,Thapar Inst. of Engg.,63,65,51,64,Fresher
Tia Singh,IIT Mandi,65,63,49,65,Experienced
Vivan Nambiar,Christ University,36,34,52,35,Fresher
Ananya Pillai,Punjab University,34,36,48,36,Fresher
Siddhant Roy,Banasthali Vidyapith,68,70,53,69,Fresher
Krishnan Iyer,IIIT Delhi,70,68,47,70,Experienced
Simran Kaur,MUIT Noida,33,31,51,32,Fresher
Harsh Verma,IMS Ghaziabad,31,33,49,33,Fresher
Zara Quadri,IIMT Meerut,72,74,52,73,Fresher
Akash Negi,IIT Bhubaneswar,74,72,48,74,Experienced
Kirti Bansal,Sharda University,29,27,53,28,Fresher
Rishi Menon,Galgotias University,27,29,47,29,Fresher
Shalini Pal,IP University Delhi,78,80,51,79,Fresher
Devika Nair,NIT Surat,80,78,49,80,Experienced
Aryan Shetty,KIIT Bhubaneswar,26,24,52,25,Experienced
Mitali Yadav,Bennett University,24,26,48,26,Fresher
Prateek Sethi,Graphic Era University,82,84,53,83,Fresher
Anika Kapoor,Jadavpur University,84,82,47,84,Experienced
Yash Verma,DIT Dehradun,23,21,51,22,Fresher
Ishita Jain,Sanskriti University,21,23,49,23,Fresher
Aarush Gupta,IIT BHU,88,90,52,89,Fresher
Kunal Das,IIIT Hyderabad,90,88,48,90,Experienced
Navya Singh,NIT Kurukshetra,19,17,53,18,Experienced
Rohit Dagar,Amity University,17,19,47,19,Fresher
Pooja Reddy,IMS Ghaziabad,92,94,51,93,Fresher
Samar Khan,IIT Patna,94,92,49,94,Experienced
Trisha Verma,IIMT Meerut,16,14,52,15,Fresher
Jayesh Mehra,NIT Calicut,14,16,48,16,Fresher
Suhani Sharma,SPPU Pune,96,98,53,97,Fresher
Kiaan Sharma,IIT Delhi,88,75,52,70,Experienced
Myra Gupta,IIT Bombay,75,88,51,80,Experienced
Vihaan Singh,BITS Pilani,72,80,49,78,Fresher
Anaya Patel,NIT Trichy,80,72,50,75,Fresher
Advait Reddy,IIT Madras,40,20,51,15,Fresher
Zara Khan,Jadavpur University,20,40,49,25,Fresher
Kabir Kumar,DTU Delhi,35,25,50,30,Fresher
Ishaan Ali,IISc Bangalore,25,35,48,28,Fresher
Samaira Jain,VIT Vellore,82,78,51,80,Experienced
Rudra Mehra,Amity University,78,82,49,75,Experienced
Aaradhya Nair,Anna University,22,38,50,35,Fresher
Vivaan Roy,LPU Jalandhar,38,22,48,20,Fresher
Diya Iyer,Symbiosis Pune,48,45,49,46,Fresher
Arjun Menon,Manipal Inst. of Tech.,45,48,50,47,Fresher
Ishani Shah,IIT Kanpur,85,80,52,78,Fresher
Reyansh Verma,JNTU Hyderabad,80,85,49,72,Fresher
Shanaya Reddy,PSIT Kanpur,30,28,50,25,Fresher
Krish Bansal,SRM Chennai,28,30,48,26,Fresher
Rhea Prasad,Calcutta University,70,68,51,72,Experienced
Sai Joshi,Mumbai University,68,70,49,71,Experienced
Zain Sharma,Delhi University,42,38,50,40,Fresher
Avni Agarwal,Osmania University,38,42,48,41,Fresher
Arya Singh,Pune University,65,70,51,68,Fresher
Ayaan Khan,Lucknow University,70,65,49,66,Fresher
Anvi Kulkarni,Thapar Inst. of Engg.,28,18,50,22,Fresher
Shaurya Bhat,Christ University,18,28,48,20,Fresher
Navya Mishra,Punjab University,72,75,51,70,Experienced
Yuvaan Bajaj,Banasthali Vidyapith,75,72,49,71,Experienced
Pari Saxena,MUIT Noida,46,40,50,42,Fresher
Rohan Soni,IIMT Meerut,40,46,48,43,Fresher
Saanvi Chawla,IMS Ghaziabad,35,40,50,38,Fresher
Aarush Puri,Sharda University,40,35,48,37,Fresher
Eva Anand,Galgotias University,60,65,51,62,Fresher
Arin Paul,IP University Delhi,65,60,49,63,Fresher
Aadhya Bose,KIIT Bhubaneswar,18,12,50,15,Fresher
Atharv Ghosh,Bennett University,12,18,48,14,Fresher
Anika Sen,Graphic Era University,78,70,51,75,Experienced
Veer Tandon,DIT Dehradun,70,78,49,76,Experienced
Mira Das,Sanskriti University,42,48,50,45,Fresher
Ivaan Basu,NIT Warangal,48,42,48,46,Fresher
Agastya Sinha,IIT Roorkee,80,82,51,81,Experienced
Ananya Barua,IIT Guwahati,82,80,49,83,Experienced
Daksh Mandal,IIT Hyderabad,30,25,50,28,Fresher
Aarvi Dutta,IIIT Bangalore,25,30,48,29,Fresher
Arnav Hazarika,BHU Varanasi,50,48,49,51,Fresher
Anisha Kalita,IIT BHU,48,50,50,49,Fresher
Ayaan Bora,IIT Gandhinagar,75,68,51,70,Fresher
Alia Phukan,IIIT Hyderabad,68,75,49,72,Fresher
Ehsaan Saikia,IIT Patna,22,20,50,21,Fresher
Aiza Sarma,NIT Calicut,20,22,48,23,Fresher
Dhruv Gogoi,SPPU Pune,40,38,49,41,Fresher
Elina Das,IIT Ropar,38,40,50,39,Fresher
Farhan Ahmed,Jadavpur University,68,72,51,70,Experienced
Fatima Begum,IIT Indore,72,68,49,69,Experienced
Hassan Ali,BITS Goa,28,32,50,30,Fresher
Hiya Kalita,IIIT Delhi,32,28,48,29,Fresher
Ibrahim Baruah,IIT Mandi,45,40,49,42,Fresher
Inaya Das,IIT Bhubaneswar,40,45,50,43,Fresher
Jay Kalita,NIT Surat,80,75,51,78,Experienced
Jia Sarma,NIT Kurukshetra,75,80,49,79,Experienced
Kabir Gogoi,IIIT Allahabad,35,30,50,32,Fresher
Kashvi Das,IIITM Gwalior,30,35,48,33,Fresher
Madhav Bora,IIIT Jabalpur,50,52,49,51,Fresher
Manha Ahmed,IIIT Lucknow,52,50,50,53,Fresher
Nirvaan Saikia,NIT Jalandhar,70,65,51,68,Fresher
Noor Begum,NIT Silchar,65,70,49,66,Fresher
Omar Ali,NIT Rourkela,25,20,50,22,Fresher
Parth Hazarika,NIT Durgapur,20,25,48,23,Fresher
Qasim Baruah,NIT Bhopal,42,46,49,44,Fresher
Ruhan Das,NIT Agartala,46,42,50,45,Fresher
Ryan Kalita,NIT Hamirpur,72,78,51,75,Experienced
Saira Sarma,NIT Jaipur,78,72,49,76,Experienced
Samar Gogoi,NIT Jamshedpur,30,38,50,34,Fresher
Sara Das,NIT Kurukshetra,38,30,48,32,Fresher
Shaan Bora,NIT Meghalaya,48,45,49,46,Fresher
Siya Ahmed,NIT Nagaland,45,48,50,47,Fresher
Tahir Saikia,NIT Patna,65,70,51,68,Fresher
Tanisha Begum,NIT Puducherry,70,65,49,66,Fresher
Veer Ali,NIT Raipur,22,28,50,25,Fresher
Yusuf Hazarika,NIT Sikkim,28,22,48,24,Fresher
Zain Baruah,NIT Surathkal,40,45,49,42,Fresher
Zoya Das,NIT Uttarakhand,45,40,50,43,Fresher
Aarav Kalita,NIT Warangal,78,80,51,79,Experienced
Aarya Sarma,BITS Pilani,80,78,49,77,Experienced
Abir Gogoi,IIT Delhi,32,28,50,30,Fresher
Adah Das,IIT Bombay,28,32,48,29,Fresher
Advik Bora,IIT Madras,48,50,49,51,Fresher
Aisha Ahmed,IISc Bangalore,50,48,50,49,Fresher
Akhil Saikia,BITS Pilani,70,65,51,68,Fresher
Alina Begum,NIT Trichy,65,70,49,66,Fresher
Amar Ali,Jadavpur University,25,20,50,22,Fresher
Amara Hazarika,DTU Delhi,20,25,48,23,Fresher
Anay Baruah,IIT Bombay,42,46,49,44,Fresher
Anika Das,VIT Vellore,46,42,50,45,Fresher
Armaan Kalita,Amity University,72,78,51,75,Experienced
Aryahi Sarma,Anna University,78,72,49,76,Experienced
Ayaan Gogoi,LPU Jalandhar,30,38,50,34,Fresher
Ayana Das,Symbiosis Pune,38,30,48,32,Fresher
Aziz Bora,Manipal Inst. of Tech.,48,45,49,46,Fresher
Bhavya Ahmed,IIT Kanpur,45,48,50,47,Fresher
Chirag Saikia,JNTU Hyderabad,65,70,51,68,Fresher
Dev Hazarika,PSIT Kanpur,70,65,49,66,Fresher
Ekam Baruah,SRM Chennai,22,28,50,25,Fresher
Esha Das,Calcutta University,28,22,48,24,Fresher
Faisal Kalita,Mumbai University,40,45,49,42,Fresher
Fiza Sarma,Delhi University,45,40,50,43,Fresher
Gaurav Gogoi,Osmania University,78,80,51,79,Experienced
Geet Das,Pune University,80,78,49,77,Experienced
Hamza Bora,Lucknow University,32,28,50,30,Fresher
Heer Ahmed,Thapar Inst. of Engg.,28,32,48,29,Fresher
Hridaan Saikia,Christ University,48,50,49,51,Fresher
Hritik Hazarika,Punjab University,50,48,50,49,Fresher
Imran Baruah,Banasthali Vidyapith,70,65,51,68,Fresher
Ishika Das,MUIT Noida,65,70,49,66,Fresher
Ivan Kalita,IIMT Meerut,25,20,50,22,Fresher
Iva Sarma,IMS Ghaziabad,20,25,48,23,Fresher
Jahaan Gogoi,Sharda University,42,46,49,44,Fresher
Jiya Das,Galgotias University,46,42,50,45,Fresher
Kai Bora,IP University Delhi,72,78,51,75,Experienced
Keya Ahmed,KIIT Bhubaneswar,78,72,49,76,Experienced
Kiaan Saikia,Bennett University,30,38,50,34,Fresher
Kimaya Hazarika,Graphic Era University,38,30,48,32,Fresher
Krish Baruah,DIT Dehradun,48,45,49,46,Fresher
Lavanya Das,Sanskriti University,45,48,50,47,Fresher
Liam Kalita,NIT Warangal,65,70,51,68,Fresher
Luv Sarma,BITS Pilani,70,65,49,66,Fresher
Maan Gogoi,IIT Delhi,22,28,50,25,Fresher
Mahi Das,IIT Bombay,28,22,48,24,Fresher
Marya Bora,IIT Madras,40,45,49,42,Fresher
Meer Ahmed,IISc Bangalore,45,40,50,43,Fresher
Mihir Saikia,BITS Pilani,78,80,51,79,Experienced
Misha Hazarika,NIT Trichy,80,78,49,77,Experienced
Mohammad Baruah,Jadavpur University,32,28,50,30,Fresher
Mukul Das,DTU Delhi,28,32,48,29,Fresher
Myra Kalita,IIT Bombay,48,50,49,51,Fresher
Nakul Sarma,VIT Vellore,50,48,50,49,Fresher
Naved Gogoi,Amity University,70,65,51,68,Fresher
Neel Das,Anna University,65,70,49,66,Fresher
Nehmat Bora,LPU Jalandhar,25,20,50,22,Fresher
Neil Ahmed,Symbiosis Pune,20,25,48,23,Fresher
Neysa Saikia,Manipal Inst. of Tech.,42,46,49,44,Fresher
Nihal Hazarika,IIT Kanpur,46,42,50,45,Fresher
Nihaal Baruah,JNTU Hyderabad,72,78,51,75,Experienced
Nila Das,PSIT Kanpur,78,72,49,76,Experienced
Nirvi Kalita,SRM Chennai,30,38,50,34,Fresher
Nisha Sarma,Calcutta University,38,30,48,32,Fresher
Niyam Gogoi,Mumbai University,48,45,49,46,Fresher
Ojas Das,Delhi University,45,48,50,47,Fresher
Om Bora,Osmania University,65,70,51,68,Fresher
Orhan Ahmed,Pune University,70,65,49,66,Fresher
Paahi Saikia,Lucknow University,22,28,50,25,Fresher
Parv Hazarika,Thapar Inst. of Engg.,28,22,48,24,Fresher
Pihu Baruah,Christ University,40,45,49,42,Fresher
Pranay Das,Punjab University,45,40,50,43,Fresher
Prisha Kalita,Banasthali Vidyapith,78,80,51,79,Experienced
Purab Sarma,MUIT Noida,80,78,49,77,Experienced
Raahil Gogoi,IIMT Meerut,32,28,50,30,Fresher
Raavi Das,IMS Ghaziabad,28,32,48,29,Fresher
Raghav Bora,Sharda University,48,50,49,51,Fresher
Rahil Ahmed,Galgotias University,50,48,50,49,Fresher
Rai Saikia,IP University Delhi,70,65,51,68,Fresher
Raina Hazarika,KIIT Bhubaneswar,65,70,49,66,Fresher
Ranbir Baruah,Bennett University,25,20,50,22,Fresher
Ranveer Das,Graphic Era University,20,25,48,23,Fresher
Reva Kalita,DIT Dehradun,42,46,49,44,Fresher
Riaan Sarma,Sanskriti University,46,42,50,45,Fresher
Rishaan Gogoi,NIT Warangal,72,78,51,75,Experienced
Ritvik Das,BITS Pilani,78,72,49,76,Experienced
Rohan Bora,IIT Delhi,30,38,50,34,Fresher
Ronit Ahmed,IIT Bombay,38,30,48,32,Fresher
Rudra Saikia,IIT Madras,48,45,49,46,Fresher
Ruhaan Hazarika,IISc Bangalore,45,48,50,47,Fresher
Saanvi Baruah,BITS Pilani,65,70,51,68,Fresher
Sadhil Das,NIT Trichy,70,65,49,66,Fresher
Sahil Kalita,Jadavpur University,22,28,50,25,Fresher
Samael Sarma,DTU Delhi,28,22,48,24,Fresher
Samarth Gogoi,IIT Bombay,40,45,49,42,Fresher
Sami Das,VIT Vellore,45,40,50,43,Fresher
Samuel Bora,Amity University,78,80,51,79,Experienced
Sanchi Ahmed,Anna University,80,78,49,77,Experienced
Sarthak Saikia,LPU Jalandhar,32,28,50,30,Fresher
Sarvesh Hazarika,Symbiosis Pune,28,32,48,29,Fresher
Shaurya Baruah,Manipal Inst. of Tech.,48,50,49,51,Fresher
Shayak Das,IIT Kanpur,50,48,50,49,Fresher
Shlok Kalita,JNTU Hyderabad,70,65,51,68,Fresher
Shrey Sarma,PSIT Kanpur,65,70,49,66,Fresher
Soham Gogoi,SRM Chennai,25,20,50,22,Fresher
Sohail Das,Calcutta University,20,25,48,23,Fresher
Suhana Bora,Mumbai University,42,46,49,44,Fresher
Sumer Ahmed,Delhi University,46,42,50,45,Fresher
Taara Saikia,Osmania University,72,78,51,75,Experienced
Tanay Hazarika,Pune University,78,72,49,76,Experienced
Tanmay Baruah,Lucknow University,30,38,50,34,Fresher
Tavish Das,Thapar Inst. of Engg.,38,30,48,32,Fresher
Tejas Kalita,Christ University,48,45,49,46,Fresher
Uday Sarma,Punjab University,45,48,50,47,Fresher
Umang Gogoi,Banasthali Vidyapith,65,70,51,68,Fresher
Utkarsh Das,MUIT Noida,70,65,49,66,Fresher
Vaania Bora,IIMT Meerut,22,28,50,25,Fresher
Varun Ahmed,IMS Ghaziabad,28,22,48,24,Fresher
Veda Saikia,Sharda University,40,45,49,42,Fresher
Vedant Hazarika,Galgotias University,45,40,50,43,Fresher
Vihaan Baruah,IP University Delhi,78,80,51,79,Experienced
Viraaj Das,KIIT Bhubaneswar,80,78,49,77,Experienced
Virat Kalita,Bennett University,32,28,50,30,Fresher
Vivaan Sarma,Graphic Era University,28,32,48,29,Fresher
Yash Gogoi,DIT Dehradun,48,50,49,51,Fresher
Yashvi Das,Sanskriti University,50,48,50,49,Fresher
Yug Bora,NIT Warangal,70,65,51,68,Fresher
Yusra Ahmed,BITS Pilani,65,70,49,66,Fresher
Yuvraj Saikia,IIT Delhi,25,20,50,22,Fresher
Zahid Hazarika,IIT Bombay,20,25,48,23,Fresher
Zainab Baruah,IIT Madras,42,46,49,44,Fresher
Zidan Das,IISc Bangalore,46,42,50,45,Fresher
Zoya Kalita,BITS Pilani,72,78,51,75,Experienced
Zunair Sarma,NIT Trichy,78,72,49,76,Experienced
Aadavan Nair,Jadavpur University,85,80,51,82,Fresher
Aadhira Krishnan,DTU Delhi,80,85,49,83,Fresher
Aadit Iyer,IIT Bombay,35,40,50,38,Fresher
Aadya Menon,VIT Vellore,40,35,48,36,Fresher
Aahna Pillai,Amity University,52,55,49,54,Fresher
Aakaar Varma,Anna University,55,52,50,53,Fresher
Aalok Sharma,LPU Jalandhar,78,75,51,72,Fresher
Aanya Reddy,Symbiosis Pune,75,78,49,73,Fresher
Aarav Rao,Manipal Inst. of Tech.,28,22,50,24,Fresher
Aarvi Kumar,IIT Kanpur,22,28,48,25,Fresher
Aashi Bhat,JNTU Hyderabad,42,38,49,40,Fresher
Aayush Gupta,PSIT Kanpur,38,42,50,41,Fresher
Adah Singh,SRM Chennai,70,72,51,71,Experienced
Aditi Nair,Calcutta University,72,70,49,73,Experienced
Advaith Krishnan,Mumbai University,45,50,50,48,Fresher
Advay Iyer,Delhi University,50,45,48,46,Fresher
Agastya Menon,Osmania University,68,65,51,66,Fresher
Ahalya Pillai,Pune University,65,68,49,67,Fresher
Ahana Varma,Lucknow University,25,30,50,28,Fresher
Aida Sharma,Thapar Inst. of Engg.,30,25,48,26,Fresher
Aisha Reddy,Christ University,40,42,49,41,Fresher
Ajay Rao,Punjab University,42,40,50,43,Fresher
Akash Kumar,Banasthali Vidyapith,75,70,51,72,Experienced
Akira Bhat,MUIT Noida,70,75,49,73,Experienced
Akshay Gupta,IIMT Meerut,48,45,50,46,Fresher
Alia Singh,IMS Ghaziabad,45,48,48,47,Fresher
Alisha Nair,Sharda University,65,60,51,62,Fresher
Amar Krishnan,Galgotias University,60,65,49,63,Fresher
Amrita Iyer,IP University Delhi,30,28,50,29,Fresher
Anaisha Menon,KIIT Bhubaneswar,28,30,48,27,Fresher
Anand Pillai,Bennett University,42,45,49,44,Fresher
Anaya Varma,Graphic Era University,45,42,50,43,Fresher
Angad Sharma,DIT Dehradun,70,75,51,73,Experienced
Anika Reddy,Sanskriti University,75,70,49,71,Experienced
Anirudh Rao,NIT Warangal,46,50,49,48,Fresher
Anmol Kumar,BITS Pilani,50,46,50,47,Fresher
Anshu Bhat,IIT Delhi,62,68,51,65,Fresher
Anvi Gupta,IIT Bombay,68,62,49,64,Fresher
Anya Singh,IIT Madras,35,28,50,30,Fresher
Arjun Nair,IISc Bangalore,28,35,48,32,Fresher
Armaan Krishnan,BITS Pilani,40,45,49,42,Fresher
Arnav Iyer,NIT Trichy,45,40,50,43,Fresher
Arohi Menon,Jadavpur University,72,70,51,71,Experienced
Arush Pillai,DTU Delhi,70,72,49,73,Experienced
Arya Varma,IIT Bombay,48,50,49,49,Fresher
Aryahi Sharma,VIT Vellore,50,48,50,51,Fresher
Aryan Reddy,Amity University,68,65,51,66,Fresher
Ashvik Rao,Anna University,65,68,49,67,Fresher
Atharva Kumar,LPU Jalandhar,30,32,50,31,Fresher
Avani Bhat,Symbiosis Pune,32,30,48,29,Fresher
Avi Gupta,Manipal Inst. of Tech.,42,40,49,41,Fresher
Avika Singh,IIT Kanpur,40,42,50,43,Fresher
Aviral Nair,JNTU Hyderabad,70,72,51,71,Experienced
Avni Krishnan,PSIT Kanpur,72,70,49,73,Experienced
Ayaan Iyer,SRM Chennai,46,48,49,47,Fresher
Ayana Menon,Calcutta University,48,46,50,49,Fresher
Ayansh Pillai,Mumbai University,65,68,51,67,Fresher
Ayush Varma,Delhi University,68,65,49,66,Fresher
Bani Sharma,Osmania University,28,30,50,29,Fresher
Bhavin Reddy,Pune University,30,28,48,27,Fresher
Bhavya Rao,Lucknow University,40,42,49,41,Fresher
Bhuvan Kumar,Thapar Inst. of Engg.,42,40,50,43,Fresher
Charvi Bhat,Christ University,72,70,51,71,Experienced
Chirayu Gupta,Punjab University,70,72,49,73,Experienced
Daksh Singh,Banasthali Vidyapith,48,50,49,49,Fresher
Damini Nair,MUIT Noida,50,48,50,51,Fresher
Darsh Krishnan,IIMT Meerut,68,65,51,66,Fresher
Dev Iyer,IMS Ghaziabad,65,68,49,67,Fresher
Devansh Menon,Sharda University,30,32,50,31,Fresher
Dhriti Pillai,Galgotias University,32,30,48,29,Fresher
Dhruv Varma,IP University Delhi,42,40,49,41,Fresher
Dishita Sharma,KIIT Bhubaneswar,40,42,50,43,Fresher
Divit Reddy,Bennett University,72,70,51,71,Experienced
Divya Rao,Graphic Era University,70,72,49,73,Experienced
Diya Kumar,DIT Dehradun,48,50,49,49,Fresher
Drishti Bhat,Sanskriti University,50,48,50,51,Fresher
Eeshan Gupta,NIT Warangal,68,65,51,66,Fresher
Eesha Singh,BITS Pilani,65,68,49,67,Fresher
Ekansh Nair,IIT Delhi,30,32,50,31,Fresher
Ela Krishnan,IIT Bombay,32,30,48,29,Fresher
Elina Iyer,IIT Madras,42,40,49,41,Fresher
Eshaan Menon,IISc Bangalore,40,42,50,43,Fresher
Faiyaz Pillai,BITS Pilani,72,70,51,71,Experienced
Farah Varma,NIT Trichy,70,72,49,73,Experienced
Gaurang Sharma,Jadavpur University,48,50,49,49,Fresher
Gauri Reddy,DTU Delhi,50,48,50,51,Fresher
Gautam Rao,IIT Bombay,68,65,51,66,Fresher
Gayatri Kumar,VIT Vellore,65,68,49,67,Fresher
Girik Bhat,Amity University,30,32,50,31,Fresher
Giva Gupta,Anna University,32,30,48,29,Fresher
Grisha Singh,LPU Jalandhar,42,40,49,41,Fresher
Gunbir Nair,Symbiosis Pune,40,42,50,43,Fresher
Guneet Krishnan,Manipal Inst. of Tech.,72,70,51,71,Experienced
Gurman Iyer,IIT Kanpur,70,72,49,73,Experienced
Hardik Menon,JNTU Hyderabad,48,50,49,49,Fresher
Harini Pillai,PSIT Kanpur,50,48,50,51,Fresher
Harsh Varma,SRM Chennai,68,65,51,66,Fresher
Harshil Sharma,Calcutta University,65,68,49,67,Fresher
Heer Reddy,Mumbai University,30,32,50,31,Fresher
Hunar Rao,Delhi University,32,30,48,29,Fresher
Iaan Kumar,Osmania University,42,40,49,41,Fresher
Idhant Bhat,Pune University,40,42,50,43,Fresher
Ijay Gupta,Lucknow University,72,70,51,71,Experienced
Ikshu Singh,Thapar Inst. of Engg.,70,72,49,73,Experienced
Inaaya Nair,Christ University,48,50,49,49,Fresher
Indu Krishnan,Punjab University,50,48,50,51,Fresher
Ira Iyer,Banasthali Vidyapith,68,65,51,66,Fresher
Ishank Menon,MUIT Noida,65,68,49,67,Fresher
Ishir Pillai,IIMT Meerut,30,32,50,31,Fresher
Ishita Varma,IMS Ghaziabad,32,30,48,29,Fresher
Jairaj Sharma,Sharda University,42,40,49,41,Fresher
Janav Reddy,Galgotias University,40,42,50,43,Fresher
Janya Rao,IP University Delhi,72,70,51,71,Experienced
Jash Kumar,KIIT Bhubaneswar,70,72,49,73,Experienced
Jay Bhat,Bennett University,48,50,49,49,Fresher
Jiana Gupta,Graphic Era University,50,48,50,51,Fresher
Jivin Singh,DIT Dehradun,68,65,51,66,Fresher
Jiya Nair,Sanskriti University,65,68,49,67,Fresher
Kabir Krishnan,NIT Warangal,30,32,50,31,Fresher
Kalindi Iyer,BITS Pilani,32,30,48,29,Fresher
Kalpesh Menon,IIT Delhi,42,40,49,41,Fresher
Kanan Pillai,IIT Bombay,40,42,50,43,Fresher
Kanav Varma,IIT Madras,72,70,51,71,Experienced
Kanika Sharma,IISc Bangalore,70,72,49,73,Experienced
Kashvi Reddy,BITS Pilani,48,50,49,49,Fresher
Kavya Rao,NIT Trichy,50,48,50,51,Fresher
Kayra Kumar,Jadavpur University,68,65,51,66,Fresher
Kiaan Bhat,DTU Delhi,65,68,49,67,Fresher
Kiara Gupta,IIT Bombay,30,32,50,31,Fresher
Kimaya Singh,VIT Vellore,32,30,48,29,Fresher
Kovid Nair,Amity University,42,40,49,41,Fresher
Krish Krishnan,Anna University,40,42,50,43,Fresher
Krishna Iyer,LPU Jalandhar,72,70,51,71,Experienced
Krithi Menon,Symbiosis Pune,70,72,49,73,Experienced
Kritik Pillai,Manipal Inst. of Tech.,48,50,49,49,Fresher
Kunal Varma,IIT Kanpur,50,48,50,51,Fresher
Kush Sharma,JNTU Hyderabad,68,65,51,66,Fresher
Kuvira Reddy,PSIT Kanpur,65,68,49,67,Fresher
Kyra Rao,SRM Chennai,30,32,50,31,Fresher
Laksh Kumar,Calcutta University,32,30,48,29,Fresher
Lakshay Bhat,Mumbai University,42,40,49,41,Fresher
Lakshit Gupta,Delhi University,40,42,50,43,Fresher
Lakshya Singh,Osmania University,72,70,51,71,Experienced
Larisa Nair,Pune University,70,72,49,73,Experienced
Lavan Krishnan,Lucknow University,48,50,49,49,Fresher
Lavit Iyer,Thapar Inst. of Engg.,50,48,50,51,Fresher
Laya Menon,Christ University,68,65,51,66,Fresher
Lehar Pillai,Punjab University,65,68,49,67,Fresher
Liam Varma,Banasthali Vidyapith,30,32,50,31,Fresher
Lovya Sharma,MUIT Noida,32,30,48,29,Fresher
Luv Reddy,IIMT Meerut,42,40,49,41,Fresher
Maanav Rao,IMS Ghaziabad,40,42,50,43,Fresher
Madhav Kumar,Sharda University,72,70,51,71,Experienced
Mahi Bhat,Galgotias University,70,72,49,73,Experienced
Mahika Gupta,IP University Delhi,48,50,49,49,Fresher
Mahir Singh,KIIT Bhubaneswar,50,48,50,51,Fresher
Manan Nair,Bennett University,68,65,51,66,Fresher
Manas Krishnan,Graphic Era University,65,68,49,67,Fresher
Manav Iyer,DIT Dehradun,30,32,50,31,Fresher
Manavi Menon,Sanskriti University,32,30,48,29,Fresher
Manha Pillai,NIT Warangal,42,40,49,41,Fresher
Manik Varma,BITS Pilani,40,42,50,43,Fresher
Manish Sharma,IIT Delhi,72,70,51,71,Experienced
Manvi Reddy,IIT Bombay,70,72,49,73,Experienced
Mayra Rao,IIT Madras,48,50,49,49,Fresher
Medhansh Kumar,IISc Bangalore,50,48,50,51,Fresher
Mehar Bhat,BITS Pilani,68,65,51,66,Fresher
Meher Gupta,NIT Trichy,65,68,49,67,Fresher
Mihika Singh,Jadavpur University,30,32,50,31,Fresher
Mihir Nair,DTU Delhi,32,30,48,29,Fresher
Mishti Krishnan,IIT Bombay,42,40,49,41,Fresher
Mohit Iyer,VIT Vellore,40,42,50,43,Fresher
Moksh Menon,Amity University,72,70,51,71,Experienced
Mukul Pillai,Anna University,70,72,49,73,Experienced
Naavya Varma,LPU Jalandhar,48,50,49,49,Fresher
Naksh Sharma,Symbiosis Pune,50,48,50,51,Fresher
Nakul Reddy,Manipal Inst. of Tech.,68,65,51,66,Fresher
Naman Rao,IIT Kanpur,65,68,49,67,Fresher
Namit Kumar,JNTU Hyderabad,30,32,50,31,Fresher
Namrata Bhat,PSIT Kanpur,32,30,48,29,Fresher
Navya Gupta,SRM Chennai,42,40,49,41,Fresher
Nayan Singh,Calcutta University,40,42,50,43,Fresher
Neel Nair,Mumbai University,72,70,51,71,Experienced
Nehal Krishnan,Delhi University,70,72,49,73,Experienced
Nia Iyer,Osmania University,48,50,49,49,Fresher
Nihar Menon,Pune University,50,48,50,51,Fresher
Niharika Pillai,Lucknow University,68,65,51,66,Fresher
Nikunj Varma,Thapar Inst. of Engg.,65,68,49,67,Fresher
Nila Sharma,Christ University,30,32,50,31,Fresher
Nilay Reddy,Punjab University,32,30,48,29,Fresher
Nilesh Rao,Banasthali Vidyapith,42,40,49,41,Fresher
Nirvi Kumar,MUIT Noida,40,42,50,43,Fresher
Nishant Bhat,IIMT Meerut,72,70,51,71,Experienced
Nishka Gupta,IMS Ghaziabad,70,72,49,73,Experienced
Nitya Singh,Sharda University,48,50,49,49,Fresher
Niyati Nair,Galgotias University,50,48,50,51,Fresher
Naman Ojha,IP University Delhi,68,65,51,66,Fresher
Ojas Krishnan,KIIT Bhubaneswar,65,68,49,67,Fresher
Onkar Iyer,Bennett University,30,32,50,31,Fresher
Oviya Menon,Graphic Era University,32,30,48,29,Fresher
Paarth Pillai,DIT Dehradun,42,40,49,41,Fresher
Paavan Varma,Sanskriti University,40,42,50,43,Fresher
Parth Sharma,NIT Warangal,72,70,51,71,Experienced
Parv Reddy,BITS Pilani,70,72,49,73,Experienced
Pavan Rao,IIT Delhi,48,50,49,49,Fresher
Pavi Kumar,IIT Bombay,50,48,50,51,Fresher
Pavitra Bhat,IIT Madras,68,65,51,66,Fresher
Pia Gupta,IISc Bangalore,65,68,49,67,Fresher
Pooja Singh,BITS Pilani,30,32,50,31,Fresher
Pranay Nair,NIT Trichy,32,30,48,29,Fresher
Pranit Krishnan,Jadavpur University,42,40,49,41,Fresher
Pranavi Iyer,DTU Delhi,40,42,50,43,Fresher
Pratham Menon,IIT Bombay,72,70,51,71,Experienced
Prisha Pillai,VIT Vellore,70,72,49,73,Experienced
Pritam Varma,Amity University,48,50,49,49,Fresher
Prithvi Sharma,Anna University,50,48,50,51,Fresher
Purab Reddy,LPU Jalandhar,68,65,51,66,Fresher
Purvi Rao,Symbiosis Pune,65,68,49,67,Fresher
Pushkar Kumar,Manipal Inst. of Tech.,30,32,50,31,Fresher
Raahi Bhat,IIT Kanpur,32,30,48,29,Fresher
Raahil Gupta,JNTU Hyderabad,42,40,49,41,Fresher
Raakesh Singh,PSIT Kanpur,40,42,50,43,Fresher
Raashi Nair,SRM Chennai,72,70,51,71,Experienced
Radha Krishnan,Calcutta University,70,72,49,73,Experienced
Raghav Iyer,Mumbai University,48,50,49,49,Fresher
Rahi Menon,Delhi University,50,48,50,51,Fresher
Rahul Pillai,Osmania University,68,65,51,66,Fresher
Raina Varma,Pune University,65,68,49,67,Fresher
Rajat Sharma,Lucknow University,30,32,50,31,Fresher
Rajveer Reddy,Thapar Inst. of Engg.,32,30,48,29,Fresher
Rishaan Rao,Christ University,42,40,49,41,Fresher
Rishi Kumar,Punjab University,40,42,50,43,Fresher
Rishika Bhat,Banasthali Vidyapith,72,70,51,71,Experienced
Rishit Gupta,MUIT Noida,70,72,49,73,Experienced
Rithvik Singh,IIMT Meerut,48,50,49,49,Fresher
Riti Nair,IMS Ghaziabad,50,48,50,51,Fresher
Rituraj Krishnan,Sharda University,68,65,51,66,Fresher
Rivan Iyer,Galgotias University,65,68,49,67,Fresher
Rohan Menon,IP University Delhi,30,32,50,31,Fresher
Rohit Pillai,KIIT Bhubaneswar,32,30,48,29,Fresher
Ronit Varma,Bennett University,42,40,49,41,Fresher
Rudra Sharma,Graphic Era University,40,42,50,43,Fresher
Ruhi Reddy,DIT Dehradun,72,70,51,71,Experienced
Runal Rao,Sanskriti University,70,72,49,73,Experienced
`;
    
    const file = new File([DEFAULT_CSV_DATA], "default-data.csv", { type: "text/csv" });
    analyzeUploadedData(file);
  }}
  variant="outline"
  className="w-full"
  disabled={isUploading}
>
  Load Default Data (500 Entries)
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
                      <code className="text-xs text-muted-foreground">
                        Name,College,Coding,Speaking,Logical,Personality,Experience
                        <br />
                        Akshay Kapoor,PSIT,85,78,92,88,Experienced
                      </code>
                    </div>
                  </CardContent>
                </Card>

                {!analysisResults ? (
                  <Card className="glass-effect border-primary/20">
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
                    <div className="grid md:grid-cols-2 gap-6">
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

                      <Card className="glass-effect border-accent/20">
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

                    <div className="grid md:grid-cols-2 gap-6">
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

                    <Card className="glass-effect border-primary/20">
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
                                {stdDev < 10 ? "Very Consistent" : stdDev < 15 ? "Consistent" : stdDev < 20 ? "Moderate" : "High Variance"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-effect border-accent/20">
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

                    <div className="grid md:grid-cols-2 gap-6">
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

                    <Card className="glass-effect border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChartIcon className="w-5 h-5 mr-2 text-primary" />
                        College Performance Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Increased height slightly for better label spacing */}
                      <ResponsiveContainer width="100%" height={350}> 
                        <BarChart 
                          data={analysisResults.collegePerformance}
                          margin={{ top: 5, right: 0, left: -20, bottom: 80 }} /* Adjust margins */
                         > 
                          {/* Fainter grid using border variable */}
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} /> 
                          <XAxis
                            dataKey="name"
                            stroke="var(--muted-foreground)" // Use theme color
                            angle={-45}
                            textAnchor="end"
                            height={100} // Increased height for longer names
                            interval={0} // Ensure all labels show
                            tick={{ fontSize: 10 }} // Smaller font size
                          />
                          <YAxis 
                            stroke="var(--muted-foreground)" // Use theme color
                            tick={{ fontSize: 11 }}
                            /* Added Y-Axis Label */
                            label={{ value: 'Score / Count', angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)', fontSize: 12, dx:-5 }} 
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "var(--popover)", // Use theme variable
                              border: "1px solid var(--border)",   // Use theme variable
                              borderRadius: "var(--radius-md)", // Use theme variable
                              color: "var(--popover-foreground)", // Use theme variable
                              fontSize: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                            cursor={{ fill: "var(--primary)", fillOpacity: 0.1 }} // Use theme color for cursor
                            itemStyle={{ color: "var(--popover-foreground)"}}
                            labelStyle={{ color: "var(--foreground)", fontWeight: "bold"}}
                          />
                          {/* Styled Legend */}
                          <Legend 
                             wrapperStyle={{ 
                               color: 'var(--muted-foreground)', 
                               fontSize: '12px',
                               paddingTop: '10px' // Add some space above legend
                             }} 
                             verticalAlign="top" // Move legend to top
                             align="right"
                           /> 
                           {/* Bars using theme colors and radius */}
                          <Bar dataKey="avgScore" fill="var(--accent)" name="Avg Score" radius={[4, 4, 0, 0]} /> 
                          <Bar dataKey="count" fill="var(--chart-3)" name="Count" radius={[4, 4, 0, 0]} /> 
                        </BarChart>
                      </ResponsiveContainer>
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
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="skillcards" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-5 h-5 mr-2 text-primary" />
                    Skill Cards
                  </CardTitle>
                  <CardDescription>Generate and download skill cards for talent assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={generateSkillCards}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isUploading}
                  >
                    {isUploading ? "Generating..." : "Generate Skill Cards"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription>Configure platform settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input
                        id="platformName"
                        name="platformName"
                        type="text"
                        placeholder="TalentRank"
                        className="bg-background/50 border-primary/30 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        name="tagline"
                        type="text"
                        placeholder="Empowering talent discovery"
                        className="bg-background/50 border-primary/30 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="A platform for talent assessment and career development"
                        className="bg-background/50 border-primary/30 focus:border-primary"
                        rows={3}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Save Settings
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
