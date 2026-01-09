import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context } = body;

    // 1. SECURE KEY: Fetches from Vercel Environment Variables
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { reply: "API key is turned off in production to save tokens." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. MODEL: Using the latest Gemini 3 Flash Preview
    // This is the most cost-effective high-intelligence model currently available.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });

    const systemPrompt = `
      You are an expert Career Coach named TalentVisa AI.
      
      Here is the candidate's profile data:
      - Name: ${context.name}
      - Verified Skill Scores:
        * Coding: ${context.skills.coding}%
        * Speaking: ${context.skills.speaking}%
        * Logical: ${context.skills.logical}%
        * Personality: ${context.skills.personality}%

      RULES:
      1. CORE IDENTITY - TalentVisa verifies candidate skills through AI-driven interviews to eliminate resume fraud.
      2. SCORING SYSTEM - Range: 0-100 based on Technical, Communication, and Behavioral.
      3. SLOT BOOKING - Candidates must book via dashboard.
      4. FEEDBACK - Give specific areas for improvement.
      5. TONE - Professional, encouraging, and futuristic.
      6. ANTI-CHEAT - Firmly state that the Authenticity Engine tracks gaze/tabs if asked about cheating.
      7.Dont use astersisks,(for making bold, so just dont bold anything)
      CRITICAL: Be concise. Save tokens. Answer like a chat bot.

      User Question: "${message}"
    `;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ 
      reply: `Error: ${error.message}` 
    }, { status: 500 });
  }
}
