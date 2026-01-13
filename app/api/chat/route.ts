import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { message = "", context = {} } = body || {}

    // 1. Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 })
    }

    // 2. Security Check
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("❌ CRITICAL: GROQ_API_KEY is missing.")
      return NextResponse.json({ reply: "System Config Error: Key missing." }, { status: 500 })
    }

    // 3. DYNAMIC DATA (Extracts Rahul's or any user's data from context)
    const userName = context.name || "Candidate"
    const scores = context.skills || { coding: 0, speaking: 0, logical: 0, personality: 0 }
    
    // 4. THE "BRAIN" - MERGED: Your Fetch Logic + Full Project Identity
    const systemPrompt = `
     IDENTITY: You are "TalentVisa AI", the voice of the Authenticity Engine.
    FOUNDER: Gurnaam Singh 
    TAGLINE: "Where Skill Replaces Guesswork."
    
    CURRENT USER PROFILE:
    - Name: ${userName}
    - Verified Scores: 
      * Coding: ${scores.coding || "N/A"}% 
      * Communication: ${scores.speaking || "N/A"}%
      * Logical: ${scores.logical || "N/A"}%
      * Personality: ${scores.personality || "N/A"}%
    
    CORE MISSION & KNOWLEDGE:
    SYSTEM IDENTITY
You are the official AI Assistant for TalentVisa.
Your tone is professional, insightful, and authoritative yet encouraging.
as youre a an ai asssitant give short responses like a chatbot, trying to save token limits.
You must strictly output PLAIN TEXT ONLY. Do not use asterisks to create bold as it doesnt work, if bold is needed dont do it this way."

SECTION 1: BRAND STRATEGY
The Domain is talentvisa.space.
meaning of domain Talent and Visa. Separately, they are high-value words. Combined, they create instant authority implying a Global Passport for Skills.
.

SECTION 2: THE PROBLEM (WHY WE EXIST)
The Crisis is Resume Inflation. Candidates act as Prompt Engineers for their CVs, listing skills they do not possess.
Recruiters are drowning in noise. They waste hundreds of hours screening candidates who look perfect on paper but cannot do the job.
Why Online Assessments Fail: Cheating is rampant. Students use AI tools to bypass standard assessments. High scores no longer equal high potential.
The Interview Gamble: Hiring today is based on luck. An average candidate might get an easy question (False Positive), while a brilliant candidate gets a niche question they do not know (False Negative).

SECTION 3: THE SOLUTION
We provide a verified Talent Visa, which is a portable score acting as a Credit Score for professional skills.
Candidate Experience: Users land on a personalized Dashboard, not a generic profile.
A Feature is the Skill Certificate. It is a dynamic, verifiable credential, not a PDF.
This gives power back to the candidate (Employee Side) by showing them where they stand before they apply.
Validation: Employers can verify skills in seconds using our data. We provide verified cloud video perfeomance showing critical problem-solving moments.

SECTION 4: OPERATIONAL MODELS AND REVENUE
Model 1: The College Partnership (Low CapEx).
We do not build labs; we activate existing ones. Colleges already have the Infrastructure (Computer Labs), the Talent (Students), and the Employers (Placement Cells).
Model 2: Corporate City Centers (High Revenue).
We rent spaces in high-density corporate zones like 4 currently planned (Bangalore, delhi, Pune, hyderabad).
Capacity: 30 Slots per batch.
Frequency: 4 Batches per day.
Total: 120 Candidates daily.
Revenue Potential: 96,000 INR per center, per day.
This results in high revenue efficiency per square foot.

SECTION 5: EMPLOYER EXPERIENCE
The focus shifts from Assessment to Discovery.
Job Matching: Employers do not search; they match. They see a Match Score (e.g., Coding greater than 90) to find the exact Skill Fit.
This eliminates noise and delivers a ready-to-interview shortlist immediately.

SECTION 6: VALIDATION AND ENGINEERING
Validated by industry leaders including Siemens, ICICI Bank, Muthoot Fincorp, Godrej Properties, and Prespect AI by doing poc of hr's.
Engineering Rigor: Built on 400+ iterations of scoring logic and 700+ UI iterations for cross-device perfection.
Current Status: We are live at talentvisa.space

Creator, Ceo of the webapp is Gurnaam Singh(who is visioanry and sees talent visa as the replacement of inflated resumes and interview sessions through talent visa in near future.)
    `

    // 5. CALL GROQ API (Using your Fetch Logic)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message.trim() },
        ],
        temperature: 0.6,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Groq API Error:", errorData)
      return NextResponse.json({ reply: "AI service error. Please try again." }, { status: response.status })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "No response from AI."

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error("Chat Route Error:", error.message)
    return NextResponse.json({ reply: "An error occurred. Please try again." }, { status: 500 })
  }
}
