'use client';

import Image from 'next/image';
import VideoRecorder from "@/components/VideoRecorder";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ProtectedRoute>
      <div 
      className="min-h-screen py-8"
      style={{ 
        backgroundColor: 'var(--background)', 
      }}
    >
      {/* Top header bar */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] h-16 shadow-md z-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Eco-Todo Logo" width={50} height={50} className="mr-2" />
            <span className="text-white font-medium text-xl">Eco-Todo</span>
          </div>
          <div>
            <a href="#" className="text-white hover:text-[var(--accent)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements - triangle patterns like in the logo */}
      <div className="fixed top-20 left-10 w-16 h-16 opacity-10 z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L100 100H0L50 0Z" fill="var(--logo-teal)"/>
        </svg>
      </div>
      <div className="fixed bottom-20 right-10 w-24 h-24 opacity-10 z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L100 100H0L50 0Z" fill="var(--logo-teal)"/>
        </svg>
      </div>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full pt-24 px-4 sm:px-6 relative z-10">
        <div 
          className="rounded-xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full relative overflow-hidden animate-fade-in"
          style={{ 
            backgroundColor: 'var(--content-background)',
            border: `1px solid var(--primary)`,
            boxShadow: `0 10px 25px -5px rgba(77, 138, 132, 0.2)`
          }}
        >
          {/* Logo centered at top */}
          <div className="mx-auto mb-6 text-center">
            <div className="inline-block relative">
              <Image 
                src="/logo.png" 
                alt="Eco-Todo Logo" 
                width={180} 
                height={180} 
                className="mx-auto"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-medium mb-6 text-center" style={{ color: 'var(--foreground)' }}>
            Scan a recyclable item to learn how to properly recycle it
          </h2>
          
          <div className="mb-8 relative z-10 bg-white bg-opacity-50 p-4 rounded-lg">
            <VideoRecorder />
          </div>

          {/* Recycling Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-[var(--neutral)] shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Why Recycle?</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--foreground-light)' }}>
                Recycling reduces waste sent to landfills and conserves natural resources
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[var(--neutral)] shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Make an Impact</h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--foreground-light)' }}>
                Every properly recycled item helps build a more sustainable planet
              </p>
            </div>
          </div>

          {/* Tip of the day */}
          <div className="p-4 rounded-lg relative z-10 border-l-4 bg-[var(--accent)]" style={{ borderColor: 'var(--primary)' }}>
            <div className="flex items-start">
              <div className="p-1 rounded-full bg-[var(--primary)] text-white mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase" style={{ color: 'var(--primary)' }}>Eco Tip of the Day</h3>
                <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                  Remember that rinsing containers before recycling them helps prevent contamination and ensures they can be properly processed!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="w-full text-center mt-8 pb-4 text-sm" style={{ color: 'var(--primary-dark)' }}>
          <p className="opacity-70">© {new Date().getFullYear()} Eco-Todo • Helping you make better recycling choices</p>
        </footer>
      </main>
    </div>
    </ProtectedRoute>
  );
}
