'use client';

import VideoRecorder from "@/components/VideoRecorder";
import { useState } from "react";

export default function Home() {
  const [totalPoints, setTotalPoints] = useState(0);

  const handlePointsUpdate = (points: number) => {
    setTotalPoints((prevPoints) => prevPoints + points);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 py-8">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl w-full">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
            Eco-Recycle Challenge
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Record a video of you recycling an item to earn points!
          </p>
          
          <div className="mb-8">
            <VideoRecorder onPointsUpdate={handlePointsUpdate} />
          </div>

          <div className="w-full bg-gray-200 rounded-full h-12 shadow-inner overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-500 ease-out"
              style={{ width: `${Math.min((totalPoints / 500) * 100, 100)}%` }}
            >
              <span className="drop-shadow-md">{totalPoints} Points</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Goal: 500 Points</p>
        </div>
      </main>
    </div>
  );
}
