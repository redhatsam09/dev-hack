'use client';

import Image from 'next/image';
import VideoRecorder from "@/components/VideoRecorder";
import ProtectedRoute from "@/components/ProtectedRoute";
import PointsDisplay from "@/components/PointsDisplay";
import { usePoints } from "@/contexts/PointsContext";
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { resetSessionPoints } = usePoints();
  
  useEffect(() => {
    setMounted(true);
    // Reset session points when entering the app
    resetSessionPoints();
  }, [resetSessionPoints]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
        {/* Floating organic shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
        <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
        
        {/* Top header bar */}
        <div className="fixed top-0 left-0 w-full glass-card-strong h-16 gentle-glow z-20 border-b border-sage-green/20">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center">
              <img src="/new_logo.png" alt="Eco-Todo Logo" className="w-12 h-12 mr-3 leaf-sway" />
              <span className="text-nature-gradient font-bold text-xl">Eco-Todo</span>
            </div>
            <div className="flex items-center gap-4">
              <PointsDisplay size="sm" showSession={true} />
              <a href="/profile" className="text-sage-green hover:text-eucalyptus transition-all duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center w-full pt-24 px-4 sm:px-6 relative z-10">
          <div className="nature-card max-w-2xl w-full relative overflow-hidden grow-in">
            {/* Logo centered at top */}
            <div className="mx-auto mb-8 text-center">
              <div className="inline-block relative">
                <img 
                  src="/new_logo.png" 
                  alt="Eco-Todo Logo" 
                  className="w-44 h-44 mx-auto leaf-sway"
                />
                <div className="absolute -inset-8 bg-gradient-to-r from-sage-green/20 to-eucalyptus/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-8 text-center text-nature-gradient">
              Scan a recyclable item to learn how to properly recycle it
            </h2>
            
            <div className="mb-10 relative z-10 glass-card p-6 rounded-2xl">
              <VideoRecorder />
            </div>

            {/* Recycling Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="glass-card p-6 rounded-2xl fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sage-green to-eucalyptus text-white flex items-center justify-center mr-4 icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-forest-green">Why Recycle?</h3>
                </div>
                <p className="text-dark leading-relaxed">
                  Recycling reduces waste sent to landfills and conserves natural resources
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-eucalyptus to-pine text-white flex items-center justify-center mr-4 icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-forest-green">Make an Impact</h3>
                </div>
                <p className="text-dark leading-relaxed">
                  Every properly recycled item helps build a more sustainable planet
                </p>
              </div>
            </div>

            {/* Tip of the day */}
            <div className="glass-card-strong p-6 rounded-2xl border-l-4 border-sage-green fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-gradient-to-r from-sage-green to-eucalyptus text-white mr-4 mt-1 icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm uppercase text-nature-gradient mb-2">Eco Tip of the Day</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Remember that rinsing containers before recycling them helps prevent contamination and ensures they can be properly processed!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="w-full text-center mt-12 pb-8 text-sm text-dark fade-in-up" style={{animationDelay: '0.4s'}}>
            <p className="opacity-70">© {new Date().getFullYear()} Eco-Todo • Helping you make better recycling choices</p>
          </footer>
        </main>
        
        {/* Additional floating shapes */}
        <div className="absolute bottom-10 right-10 w-20 h-20 organic-shape bg-gradient-to-br from-sage-green/10 to-forest-green/15 floating"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 organic-shape bg-gradient-to-br from-eucalyptus/20 to-mint-cream/25 floating-delayed"></div>
      </div>
    </ProtectedRoute>
  );
}
