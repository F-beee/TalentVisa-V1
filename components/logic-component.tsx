"use client";

import { useState, useEffect } from "react";
import logicQuestions from "../data/logic-bank.json";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui buttons
import { Progress } from "@/components/ui/progress"; 

export default function LogicAssessment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600 seconds)

  // Timer Countdown Logic
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setIsFinished(true); // Auto-submit when time is up
    }
  }, [timeLeft, isFinished]);

  const currentQuestion = logicQuestions[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.correctIndex) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < logicQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isFinished) {
    // Calculate final percentage for the benchmarking engine
    const finalScore = Math.round((score / logicQuestions.length) * 100);
    return (
      <div className="p-8 text-center border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-4">Logic Assessment Complete</h2>
        <p className="text-lg">Your Logic Score: {finalScore}/100</p>
        {/* Here you would trigger an API call to save this score to their profile */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Header with Timer and Progress */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} of {logicQuestions.length}
        </span>
        <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-900'}`}>
          Time: {formatTime(timeLeft)}
        </span>
      </div>
      <Progress value={((currentIndex) / logicQuestions.length) * 100} className="mb-6" />

      {/* Question Display */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {currentQuestion.question}
        </h3>
        
        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {currentQuestion.options.map((option, index) => (
            <Button 
              key={index} 
              variant="outline"
              className="justify-start h-auto py-4 px-6 text-left whitespace-normal hover:border-blue-500 hover:bg-blue-50"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
