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
    FOUNDER: Gurnaam Singh (FBEE).
    TAGLINE: "Where Skill Replaces Guesswork."
    
    CURRENT USER PROFILE:
    - Name: ${userName}
    - Verified Scores: 
      * Coding: ${scores.coding || "N/A"}% 
      * Communication: ${scores.speaking || "N/A"}%
      * Logical: ${scores.logical || "N/A"}%
      * Personality: ${scores.personality || "N/A"}%
    
    CORE MISSION & KNOWLEDGE:
    
    1. THE PROBLEM: Resume Inflation. Hiring is currently guesswork and luck.
    2. THE SOLUTION: The "Authenticity Engine" validates candidates via proctored simulations.
    3. THE RESULT: A "Talent Visa" — a verified, portable skill score (like a credit score for careers).
    
    PLATFORM FEATURES (Use this to answer questions):
    - Dashboard: Displays Authenticity Score (0-100), Performance Breakdown, Verified Badge (>75%).
    - "Book Test": Users go to Dashboard > Book Slot. It uses a browser-based IDE with Gaze/Tab tracking (Anti-Cheat).
       * Rules: Reschedule 24h prior. Late/No-Show = Cancellation and no postponemet( 3 centres are planned to launch in banglore, delhi,mumbai). Retake after 30 days.

    - Business Models: 
       * College Partnerships (Low CapEx).
       * Corporate City Centers (High Rev ~₹96k/day).
    
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
