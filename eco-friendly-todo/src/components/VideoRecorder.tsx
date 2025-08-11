'use client';

import { useRef, useState } from "react";

interface Analysis {
  productName: string;
  description: string;
  material: string;
  pointsForCorrect: number;
  question: string;
  options: string[];
  correctAnswers: {
    best: string;
    easy: string;
  };
}

interface VideoRecorderProps {}

export default function VideoRecorder({}: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    setAnalysis(null);
    setShowReport(false);
    setSelectedOption(null);
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

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowReport(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!analysis && (
        <>
          <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6 relative">
            {/* Triangle accents inspired by the logo */}
            <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none opacity-70" 
                 style={{ color: 'var(--logo-teal)' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L100 0L0 100L0 0Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-12 h-12 z-10 pointer-events-none opacity-70 rotate-90" 
                 style={{ color: 'var(--logo-teal)' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L100 0L0 100L0 0Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12 z-10 pointer-events-none opacity-70 -rotate-90" 
                 style={{ color: 'var(--logo-teal)' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L100 0L0 100L0 0Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12 z-10 pointer-events-none opacity-70 rotate-180" 
                 style={{ color: 'var(--logo-teal)' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L100 0L0 100L0 0Z" fill="currentColor"/>
              </svg>
            </div>
            
            {/* Camera frame design */}
            <div className="absolute inset-0 border-2 rounded-lg z-20 pointer-events-none"
                 style={{ borderColor: 'var(--primary)', borderStyle: 'solid' }}></div>
            
            {/* Video display */}
            <div className="w-full h-64 bg-black relative">
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center z-20">
                  <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                  <span className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-full">
                    Recording...
                  </span>
                </div>
              )}
              
              {/* Scanning overlay when loading */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10">
                  <div className="w-20 h-20">
                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" stroke="var(--logo-teal)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-white text-sm mt-2 font-medium">Analyzing with AI...</p>
                </div>
              )}

              {/* Triangle overlay at bottom for logo consistency */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-30 pointer-events-none" 
                   style={{ color: 'var(--logo-teal)' }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0L100 100H0L50 0Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleRecording}
            className="px-8 py-3 font-medium text-white rounded-md disabled:opacity-50 transition-all duration-300 ease-in-out hover:shadow-lg flex items-center justify-center"
            style={{ 
              background: isRecording 
                ? 'var(--error)' 
                : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              boxShadow: '0 4px 12px rgba(77, 138, 132, 0.25)'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : isRecording ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                Stop & Analyze
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Scan Recyclable Item
              </>
            )}
          </button>
          
          {/* Scanning instructions */}
          <p className="mt-3 text-sm text-center px-4" style={{ color: 'var(--foreground-light)' }}>
            Position your recyclable item in the frame and tap the button to scan
          </p>
        </>
      )}

      {analysis && !showReport && (
        <div className="mt-6 p-8 rounded-3xl shadow-lg text-left w-full max-w-md animate-fade-in" 
             style={{ backgroundColor: 'var(--neutral)', borderLeft: '4px solid var(--primary)' }}>
          <div className="flex items-start mb-4">
            <div className="p-3 rounded-full eco-gradient mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary-dark)' }}>{analysis.productName}</h3>
              <p className="text-sm" style={{ color: 'var(--foreground-light)' }}>{analysis.description}</p>
            </div>
          </div>
          
          <h4 className="font-bold mb-3" style={{ color: 'var(--foreground)' }}>{analysis.question}</h4>
          <div className="flex flex-col space-y-3">
            {analysis.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="p-4 text-left rounded-xl transition-all flex items-center hover:translate-x-1"
                style={{ 
                  backgroundColor: 'var(--neutral-dark)', 
                  color: 'var(--foreground)',
                  border: '1px solid transparent',
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs"
                      style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {showReport && analysis && (
        <div className="mt-6 p-8 rounded-3xl shadow-lg text-left w-full max-w-md animate-fade-in"
             style={{ backgroundColor: 'var(--primary)' }}>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Recycling Report</h3>
            <div className={`p-2 rounded-full ${selectedOption && (selectedOption === analysis.correctAnswers.best || selectedOption === analysis.correctAnswers.easy) ? 'bg-green-100' : 'bg-red-100'}`}>
              {selectedOption && (selectedOption === analysis.correctAnswers.best || selectedOption === analysis.correctAnswers.easy) ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          
          {selectedOption && (selectedOption === analysis.correctAnswers.best || selectedOption === analysis.correctAnswers.easy) ? (
            <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-bold">Well done! +{analysis.pointsForCorrect} points</p>
                  <p className="text-sm opacity-90">You selected a correct recycling method</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'var(--error)', color: 'white' }}>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-bold">Try again next time</p>
                  <p className="text-sm opacity-90">The best method was: {analysis.correctAnswers.best}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="font-bold mb-3 flex items-center"
                style={{ color: 'var(--foreground)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to Recycle {analysis.productName}
            </h4>
            
            <div className="p-5 rounded-lg mb-3 shadow-sm" 
                 style={{ backgroundColor: 'var(--leaf-green)', color: 'white', opacity: '0.9' }}>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="font-bold">Best Way to Recycle</span>
              </div>
              <p className="text-sm pl-7">{analysis.correctAnswers.best}</p>
            </div>
            
            <div className="p-5 rounded-lg shadow-sm" 
                 style={{ backgroundColor: 'var(--water-blue)', color: 'white', opacity: '0.9' }}>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">Easy Way to Recycle</span>
              </div>
              <p className="text-sm pl-7">{analysis.correctAnswers.easy}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setAnalysis(null)}
              className="flex-1 px-6 py-4 font-bold text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Scan Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
