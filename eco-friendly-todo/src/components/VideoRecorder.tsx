'use client';

import { useRef, useState } from "react";

interface Analysis {
  productName: string;
  description: string;
  material: string;
  points: number;
  bestRecyclingMethod: string;
  easyRecyclingMethod: string;
}

interface VideoRecorderProps {
  onPointsUpdate: (points: number) => void;
}

export default function VideoRecorder({ onPointsUpdate }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    setAnalysis(null);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    recorder.start();
    setIsRecording(true);

    const videoChunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      videoChunks.push(event.data);
    };

    recorder.onstop = async () => {
      setIsLoading(true);
      const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
      const reader = new FileReader();
      reader.readAsDataURL(videoBlob);
      reader.onloadend = async () => {
        const base64Video = (reader.result as string).split(",")[1];
        
        const res = await fetch("/api/analyze-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video: base64Video }),
        });

        const data = await res.json();
        setAnalysis(data.analysis);
        onPointsUpdate(data.analysis.points);
        setIsLoading(false);
      };
    };
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-md rounded-lg bg-black h-72 mb-4 overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
      </div>
      <button
        onClick={handleRecording}
        className="px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : isRecording ? "Stop Recording & Analyze" : "Start Recording"}
      </button>
      {analysis && (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-lg text-left w-full max-w-md animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{analysis.productName}</h3>
          <p className="text-gray-600 mb-4">{analysis.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-bold text-gray-700">Material</p>
              <p className="text-gray-600">{analysis.material}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700">Points</p>
              <p className="text-2xl font-bold text-green-500">+{analysis.points}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-2">Recycling Methods</h4>
            <div className="bg-green-100 p-4 rounded-lg mb-2">
              <p className="font-semibold text-green-800">Best Way</p>
              <p className="text-green-700">{analysis.bestRecyclingMethod}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="font-semibold text-blue-800">Easy Way</p>
              <p className="text-blue-700">{analysis.easyRecyclingMethod}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
