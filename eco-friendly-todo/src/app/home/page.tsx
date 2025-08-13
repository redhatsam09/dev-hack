
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue, off, get } from 'firebase/database';

export default function HomePage() {
  const [totalUsers, setTotalUsers] = useState(50000); // Base number of eco warriors
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Manual refresh function for testing
  const refreshUserCount = async () => {
    if (!database) return;
    
    setIsLoading(true);
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const userCount = Object.keys(usersData).length;
        console.log('Manual refresh - User count:', userCount);
        setTotalUsers(userCount + 50000);
        setLastUpdated(new Date());
      } else {
        console.log('Manual refresh - No users found');
        setTotalUsers(50000);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Manual refresh error:', error);
    }
    setIsLoading(false);
  };

  // Get total users count from Firebase
  useEffect(() => {
    if (!database) {
      console.log('Firebase database not available');
      setIsLoading(false);
      return;
    }

    console.log('Setting up real-time user count listener...');
    const usersRef = ref(database, 'users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      console.log('Users data received:', snapshot.exists());
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const userCount = Object.keys(usersData).length;
        console.log('Actual user count:', userCount);
        // Add base amount for impressive display
        const displayCount = userCount + 50000;
        console.log('Display count:', displayCount);
        setTotalUsers(displayCount);
        setLastUpdated(new Date());
      } else {
        console.log('No users data found, using fallback');
        setTotalUsers(50000);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Firebase users listener error:', error);
      console.log('Using fallback value for user count');
      setTotalUsers(50000);
      setIsLoading(false);
    });

    return () => {
      console.log('Cleaning up user count listener');
      off(usersRef, 'value', unsubscribe);
    };
  }, []);

  // Helper function to format large numbers
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
      {/* Floating organic shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
      <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 fade-in-up">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src="/new_logo.png" 
                alt="Eco-Friendly Todo" 
                className="h-32 w-auto leaf-sway drop-shadow-lg"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-sage-green/20 to-eucalyptus/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 text-nature-gradient leading-tight">
            Eco-Todo
            <span className="block text-5xl font-light text-text-secondary mt-2">
              Transforming Sustainability with to-do lists
            </span>
          </h1>
          
          <p className="text-xl text-text-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your daily habits with AI-powered recycling guidance, 
            track your environmental impact, and join a community of eco-warriors 
            making a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-nature text-lg px-8 py-4 inline-flex items-center group">
              <span>Start Your Eco Journey</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.1s'}}>
            <h3 className="text-2xl font-bold text-forest-green mb-4">AI Quizzing</h3>
            <p className="text-dark leading-relaxed">
              Take personalized quizzes about your products powered by AI. Get immediate feedback on recycling practices for your household items.
            </p>
          </div>

          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Impact Tracking</h3>
            <p className="text-dark leading-relaxed">
              Visualize your environmental impact with competitive leaderboards and see how your contributions make a difference across the community.
            </p>
          </div>

          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Eco Community</h3>
                        <p className="text-dark leading-relaxed">
              Join our growing community of eco-warriors. Share tips, compete in challenges, and inspire others on their sustainability journey.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center">
          <Link href="/web-app" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-green to-eucalyptus text-white font-semibold rounded-full gentle-glow transition-all duration-300 group">
            Start Your Eco Journey
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="glass-card-strong rounded-3xl p-12 mb-20 text-center mt-20">
          <h2 className="text-4xl font-bold text-nature-gradient mb-8">Join Our Growing Community</h2>
          <div className="flex justify-center">
            <div className="grow-in" style={{animationDelay: '0.5s'}}>
              <div className="text-6xl font-bold text-sage-green mb-4">
                {isLoading ? (
                  <div className="animate-pulse bg-sage-green/20 h-16 w-32 mx-auto rounded"></div>
                ) : (
                  formatLargeNumber(totalUsers)
                )}
              </div>
              <div className="text-dark text-xl font-medium">Eco Warriors Joined</div>
              
              {/* Debug Info */}
              <div className="mt-4 text-sm text-gray-600">
                <div>Last Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}</div>
                <button 
                  onClick={refreshUserCount}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2 bg-sage-green text-white rounded hover:bg-sage-green/80 disabled:opacity-50"
                >
                  {isLoading ? 'Refreshing...' : 'Refresh Count'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glass-card rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-nature-gradient mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-dark mb-8 max-w-2xl mx-auto">
            Every small action counts. Join our community today and start your journey towards a more sustainable lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-nature text-lg px-10 py-4">
              Get Started for Free
            </Link>
            <Link href="/login" className="px-10 py-4 text-eucalyptus font-semibold border-2 border-eucalyptus rounded-full hover:bg-eucalyptus hover:text-white transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
