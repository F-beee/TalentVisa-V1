"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Shield, Calendar, MapPin, Download, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function GurnaamVerificationPage() {
  const candidate = {
    name: "Gurnaam Singh",
    id: "TR-GURN-882910",
    college: "PSIT Kanpur",
    issueDate: new Date().toLocaleDateString(),
    status: "Verified",
    scores: { coding: 99, speaking: 99, logical: 100, personality: 98 }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 font-serif">TalentVisa</h1>
        <p className="text-slate-500 text-sm tracking-widest uppercase mt-1">Official Verification Portal</p>
      </div>

      <Card className="w-full max-w-lg shadow-xl border-slate-200 bg-white overflow-hidden">
        <div className="bg-green-100 border-b border-green-200 p-4 flex items-center justify-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5 fill-green-600 text-white" />
          <span className="font-semibold">Officially Verified Candidate</span>
        </div>

        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg mx-auto">
              <AvatarImage src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Chase" />
              <AvatarFallback>GS</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-sm border-2 border-white" title="Identity Verified">
                <Shield className="w-4 h-4" />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold text-slate-900">{candidate.name}</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-1">
            <MapPin className="w-3 h-3" />
            <span>{candidate.college}</span>
          </div>
          <Badge variant="outline" className="mt-3 bg-slate-100 text-slate-600 border-slate-200 font-mono text-xs w-fit mx-auto">
            ID: {candidate.id}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Verified Skill Scores</h3>
            <div className="grid grid-cols-2 gap-4">
               {Object.entries(candidate.scores).map(([skill, score]) => (
                 <div key={skill} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700 capitalize">{skill}</span>
                     <span className="font-bold text-blue-600">{score}%</span>
                   </div>
                   <Progress value={score} className="h-1.5 bg-slate-200" />
                 </div>
               ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Issued: {candidate.issueDate}</span>
            </div>
            <span>TalentVisa Auth v1.0</span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="w-full text-slate-600 hover:bg-slate-50" onClick={() => window.location.href = '/dashboard?guest=true'}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-xs text-slate-400 max-w-xs">
        <p>This page confirms the authenticity of the skill assessment record for the individual named above.</p>
        <p className="mt-2">© 2025 TalentVisa Inc.</p>
      </div>
    </div>
  )
}
