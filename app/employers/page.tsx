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
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { TalentProfileModal } from "@/components/talent-profile-modal"
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
  Medal,
} from "lucide-react"

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
  {
    rank: 1,
    name: "Gurnaam Singh",
    college: "PSIT Kanpur",
    score: 99,
    skills: { coding: 99, speaking: 99, logical: 100, personality: 98 },
    experience: "Experienced",
    location: "Kanpur, Uttar Pradesh",
    availability: "Available",
    roleMatch: 98,
    isSpotlight: true,
    linkedIn: "https://www.linkedin.com/in/gurnaam",
  },
  {
    rank: 2,
    name: "Arjun Sharma",
    college: "IIT Bombay",
    score: 94,
    skills: { coding: 92, speaking: 89, logical: 96, personality: 91 },
    experience: "Experienced",
    location: "Mumbai, Maharashtra",
    availability: "Available",
    roleMatch: 95,
    isSpotlight: true,
  },
  {
    rank: 3,
    name: "Priya Patel",
    college: "IIT Delhi",
    score: 89,
    skills: { coding: 88, speaking: 85, logical: 92, personality: 90 },
    experience: "Experienced",
    location: "New Delhi, Delhi",
    availability: "Available",
    roleMatch: 92,
    isSpotlight: true,
  },
  {
    rank: 4,
    name: "Rohan Gupta",
    college: "IIT Madras",
    score: 86,
    skills: { coding: 84, speaking: 82, logical: 88, personality: 87 },
    experience: "Fresher",
    location: "Chennai, Tamil Nadu",
    availability: "Available",
    roleMatch: 89,
    isSpotlight: false,
  },
  {
    rank: 5,
    name: "Ananya Singh",
    college: "IIT Kanpur",
    score: 83,
    skills: { coding: 81, speaking: 79, logical: 85, personality: 84 },
    experience: "Experienced",
    location: "Kanpur, Uttar Pradesh",
    availability: "Available",
    roleMatch: 87,
    isSpotlight: false,
  },
  {
    rank: 6,
    name: "Vikram Reddy",
    college: "IIT Hyderabad",
    score: 80,
    skills: { coding: 78, speaking: 76, logical: 82, personality: 81 },
    experience: "Fresher",
    location: "Hyderabad, Telangana",
    availability: "Available",
    roleMatch: 85,
    isSpotlight: false,
  },
]

export default function EmployersPage() {
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
        <header className="glass-effect border-b border-primary/20 sticky top-0 z-50" style={{ minWidth: '100%' }}>
  <div className="w-full px-4 py-4 flex items-center justify-between" style={{ minWidth: 'max-content' }}>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">TalentVisa for Employers</h1>
              <Badge className="bg-accent/20 text-accent border-accent/30">Hire by Skills</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")}>
                Back to Platform
              </Button>
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

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3 bg-muted/50">
              <TabsTrigger value="browse">Browse Talents</TabsTrigger>
              <TabsTrigger value="templates">Job Templates</TabsTrigger>
              <TabsTrigger value="spotlight">Talent Spotlight</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <Card className="glass-effect border-primary/20 lg:col-span-1">
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
                <div className="lg:col-span-3 space-y-4">
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

                  <div className="space-y-3">
                    {filteredTalents.map((talent, index) => (
                      <Card
                        key={index}
                        className="glass-effect border-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            {/* Selection and Rank */}
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={selectedTalents.includes(talent.name)}
                                onCheckedChange={() => toggleTalentSelection(talent.name)}
                              />

                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-sm">
                                {talent.rank <= 3 ? (
                                  talent.rank === 1 ? (
                                    <Crown className="w-5 h-5 text-yellow-500" />
                                  ) : talent.rank === 2 ? (
                                    <Medal className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <Medal className="w-5 h-5 text-amber-600" />
                                  )
                                ) : (
                                  talent.rank
                                )}
                              </div>
                            </div>

                            {/* Avatar */}
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?key=9tgqf&key=hwbad&height=48&width=48&query=${talent.name}`}
                              />
                              <AvatarFallback className="text-sm font-semibold">
                                {talent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            {/* Main Info Section */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="text-lg font-bold text-foreground mb-1">{talent.name}</h4>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm text-muted-foreground font-medium">{talent.college}</span>
                                    {talent.isSpotlight && (
                                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        Spotlight
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                    <span className="flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {talent.location}
                                    </span>
                                    <Badge variant="outline" className="text-xs px-2 py-0">
                                      {talent.experience}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Overall Score */}
                                <div className="text-center">
                                  <div className="text-xl font-bold text-primary">{talent.score}</div>
                                  <div className="text-xs text-muted-foreground">Overall</div>
                                  {selectedRole && (
                                    <Badge className="mt-1 bg-accent/20 text-accent text-xs">
                                      {talent.roleMatch}% match
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Skills Grid */}
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-6">
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-primary">{talent.skills.coding}</div>
                                    <div className="text-xs text-muted-foreground">Coding</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-accent">{talent.skills.speaking}</div>
                                    <div className="text-xs text-muted-foreground">Speaking</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-primary">{talent.skills.logical}</div>
                                    <div className="text-xs text-muted-foreground">Logical</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm font-bold text-accent">{talent.skills.personality}</div>
                                    <div className="text-xs text-muted-foreground">Personality</div>
                                  </div>
                                </div>

                                {/* Connect Button */}
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
                                  className="bg-transparent hover:bg-primary/10"
                                >
                                  {talent.linkedIn ? "Connect" : "View Profile"}
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
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
                <Card className="glass-effect border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <Target className="w-5 h-5 mr-2" />
                      Best-Fit Candidates for {jobRoleTemplates.find((r) => r.id === selectedRole)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <Button
                        onClick={() => {
                          const browseTab = document.querySelector('[value="browse"]') as HTMLElement
                          browseTab?.click()
                        }}
                      >
                        View {jobRoleTemplates.find((r) => r.id === selectedRole)?.matchCount} Matching Candidates
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ml-8">
                {spotlightTalents.map((talent, index) => (
                  <Card key={index} className="glass-effect border-accent/20 hover:border-accent/40 transition-colors">
                    <CardHeader className="text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?key=9tgqf&key=hwbad&height=80&width=80&query=${talent.name}`}
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
