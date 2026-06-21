import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Extract history array passed from the frontend memory logic
    const { message = "", context, history = [] } = body || {}

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("❌ CRITICAL: GROQ_API_KEY is missing.")
      return NextResponse.json({ reply: "System Config Error: Key missing." }, { status: 500 })
    }

    let systemPrompt = "";

    // DYNAMIC PROMPT ROUTING
    if (typeof context === "string") {
      if (context.includes("Saral Foods")) {
        // ============================================================================
        // SARAL FOODS CASE STUDY MODE
        // ============================================================================
        systemPrompt = `
        IDENTITY: You are the "Saral Nutritionist", an AI assistant representing Saral Foods Ltd.
        TONE: Professional, deeply knowledgeable about business strategy, but helpful and empathetic when calculating nutrition.
        
        YOUR KNOWLEDGE BASE (CASE STUDY FACTS):
        ${context}

        INSTRUCTIONS:
        - If the user asks to calculate protein need, use the standard: 0.83 grams of protein per kilogram of body weight for a healthy Indian adult. Do the math for them.
        - Emphasize that Saral Protein Plus Atta provides >=15% protein seamlessly, meaning they don't have to change their daily chapati habits.
        - Emphasize the FSSAI 2023 compliance and the 120M household reach if asked about business viability.
        - The user may refer back to previous messages. Use the conversation history to understand context (e.g., if they say "what is the price?", look at the previous message to see what product they are talking about).
        - Strictly output PLAIN TEXT ONLY. Keep responses concise and formatted cleanly without using markdown asterisks.
        `;
      } else {
        // ============================================================================
        // VISITOR / CREATOR PAGE MODE (TALENTVISA)
        // ============================================================================
        systemPrompt = `
        IDENTITY: You are "TalentVisa AI", the official AI assistant operating on Gurnaam Singh's personal portfolio page.
        
        YOUR KNOWLEDGE BASE ABOUT GURNAAM:
        ${context}

        INSTRUCTIONS:
        - Strictly output PLAIN TEXT ONLY. Do not use asterisks/markdown for bold.
        - Give short, concise responses like a chat widget.
        - The user may ask follow-up questions. Use the recent chat history to maintain conversational context.
        - Answer questions naturally based on the knowledge provided.
        `;
      }
    } else {
      // ============================================================================
      // DASHBOARD COACH MODE
      // ============================================================================
      const userName = context?.name || "Candidate"
      const scores = context?.skills || { coding: 0, speaking: 0, logical: 0, personality: 0 }
      
      systemPrompt = `
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
      You are the official AI Assistant for TalentVisa. Your tone is professional, insightful, and authoritative yet encouraging.
      Give short responses like a chatbot, trying to save token limits.
      You must strictly output PLAIN TEXT ONLY. Do not use asterisks to create bold as it doesnt work.

      SECTION 1: BRAND STRATEGY
      The Domain is talentvisa.space. Meaning of domain Talent and Visa. Separately, they are high-value words. Combined, they create instant authority implying a Global Passport for Skills.

      SECTION 2: THE PROBLEM (WHY WE EXIST)
      The Crisis is Resume Inflation. Candidates act as Prompt Engineers for their CVs, listing skills they do not possess.
      Recruiters are drowning in noise.

      SECTION 3: THE SOLUTION
      We provide a verified Talent Visa, which is a portable score acting as a Credit Score for professional skills.

      SECTION 4: OPERATIONAL MODELS AND REVENUE
      Model 1: The College Partnership (Low CapEx). 
      Model 2: Corporate City Centers (High Revenue). Total: 120 Candidates daily. Revenue Potential: 96,000 INR per center, per day.

      SECTION 5: VALIDATION AND ENGINEERING
      Validated by industry leaders including Siemens, ICICI Bank, Muthoot Fincorp, Godrej Properties.
      Creator, Ceo of the webapp is Gurnaam Singh.
      `;
    }

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
          ...history, // --- THIS IS THE SLIDING WINDOW MEMORY ---
          { role: "user", content: message.trim() },
        ],
        temperature: 0.6,
        max_tokens: 300, // Keeps responses punchy and cheap
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
