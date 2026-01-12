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
    
    1. THE PROBLEM: Resume Inflation. Hiring is currently guesswork and luck.and 15 min interviews can't judge a person.
    2. THE SOLUTION: The "Authenticity Engine" validates candidates via proctored simulations and IDE tests that shuffle on a rotating basis.(how these scores are calculated is tthrough proctored asssesment in a physical spaces in colleeg or dedicated talent visa spaces in 3 cities mentioned.)
    3. THE RESULT: A "Talent Visa" — standardised, verified, portable skill scores in 4 domains logic, personality, coding and speaking (like a credit score for careers).
    So basically we are benchmarking people in a standardised way.
    The market is huge growing upwrds of 15% cagr.
    PLATFORM FEATURES (Use this to answer questions):
    - Dashboard: Displays Authenticity Score (0-100), Performance Breakdown, Verified Badge
    - "Book Test": Users go to Dashboard > Book Slot. It uses a browser-based IDE for geting these scores, test is comprized of automated procedures for getting scores in different domains, coding, speaking, logic, personality.
       * Rules of test: Reschedule 24h prior. Late/No-Show = Cool-down penalty. Retake after 30 days.

    - Business Models for taking tests-
       * College Partnerships (Low CapEx).
       * Corporate City Centers in bangalore, mumbai and delhi (High Rev ~₹96k/day at full capacity, breakeven at 40% slots booked).
    
    YOUR INSTRUCTIONS:
    - Explain low scores constructively (e.g., "Your Logic score of ${scores.logical}% suggests practicing algorithms").
    - If asked about Gurnaam or the vision, answer confidently using the Mission data.
    - If asked about "Book Test", guide them to the dashboard button.
    - TONE: Disruptive, Confident, Professional. Keep it short (under 3 sentences).
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
