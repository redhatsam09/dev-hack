
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import PointsDisplay from './PointsDisplay';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="glass-card-strong border-b border-white/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo section - fixed width */}
        <div className="flex items-center w-64">
          <div className="relative">
            <img src="/new_logo.png" alt="Eco-Todo Logo" className="h-12 w-12 mr-3 leaf-sway" />
            <div className="absolute -inset-1 bg-gradient-to-r from-sage-green/30 to-eucalyptus/30 rounded-full blur-sm -z-10"></div>
          </div>
          <Link href="/" className="text-2xl font-bold text-nature-gradient hover:scale-105 transition-transform">
            Eco-Todo
          </Link>
        </div>
        
        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
          {user && (
            <>
              <Link href="/web-app" className="text-text-secondary hover:text-forest-green transition-colors font-medium relative group">
                My Tasks
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/leaderboard" className="text-text-secondary hover:text-forest-green transition-colors font-medium flex items-center relative group">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>
        
        {/* Account section - fixed width */}
        <div className="relative w-64 flex justify-end">
          {loading ? (
            <div className="bg-white/30 w-28 h-10 rounded-lg animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              {/* Points Display */}
              <PointsDisplay size="sm" />
              
              <span className="hidden lg:inline text-text-secondary mr-3 font-medium">
                Welcome, {user.displayName || user.email?.split('@')[0]}
              </span>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn-nature flex items-center"
              >
                <span className="mr-1">Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-xl z-20 border border-white/30">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-white/20">
                      <p className="text-sm text-dark">Signed in as</p>
                      <p className="text-sm font-medium text-text-primary truncate">{user.email}</p>
                    </div>
                    <Link href="/web-app" className="block px-4 py-3 text-text-primary hover:bg-white/20 transition-colors">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Tasks
                      </div>
                    </Link>
                    <Link href="/leaderboard" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Leaderboard
                      </div>
                    </Link>
                    <Link href="/profile" className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </div>
                    </Link>
                    <hr className="border-gray-100" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-[#b4d093] transition-colors font-medium px-3 py-2"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                style={{ backgroundColor: '#b4d093' }}
                className="text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
