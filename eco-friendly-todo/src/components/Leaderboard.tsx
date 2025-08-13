'use client';

import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  uid: string;
  email: string;
  displayName?: string;
  totalPoints: number;
  lastUpdated: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!database) {
      setError('Database not available');
      setIsLoading(false);
      return;
    }

    const usersRef = ref(database, 'users');
    
    // Set up real-time listener
    const unsubscribe = onValue(usersRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const leaderboardData: LeaderboardEntry[] = [];

          Object.keys(usersData).forEach(uid => {
            const userData = usersData[uid];
            if (userData.totalPoints && userData.totalPoints > 0) {
              leaderboardData.push({
                uid,
                email: userData.email || 'Anonymous',
                displayName: userData.displayName,
                totalPoints: userData.totalPoints || 0,
                lastUpdated: userData.lastUpdated || userData.createdAt || 0,
              });
            }
          });

          // Sort by total points (descending)
          leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);
          
          setLeaderboard(leaderboardData);
        } else {
          setLeaderboard([]);
        }
      } catch (err) {
        console.error('Error processing leaderboard data:', err);
        setError('Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    }, (error) => {
      console.error('Firebase listener error:', error);
      setError('Failed to connect to database');
      setIsLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      off(usersRef, 'value', unsubscribe);
    };
  }, []);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-600 to-amber-800';
      default:
        return 'from-[#b4d093] to-[#89aa5a]';
    }
  };

  const getDisplayName = (entry: LeaderboardEntry) => {
    if (entry.displayName) {
      return entry.displayName;
    }
    return entry.email.split('@')[0];
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load leaderboard</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#b4d093] to-[#89aa5a] p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-3xl font-bold">🏆 Eco Champions</h2>
          </div>
          <p className="text-center text-white/90">
            Top recycling enthusiasts making a difference for our planet
          </p>
          {leaderboard.length > 0 && (
            <div className="mt-4 text-center">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {leaderboard.length} eco warriors competing
              </span>
            </div>
          )}
        </div>

        {/* Leaderboard Content */}
        <div className="p-8">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No champions yet!</h3>
              <p className="text-gray-500">Be the first to earn points and claim the top spot!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.uid}
                  className={`
                    flex items-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105
                    ${entry.uid === user?.uid 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 animate-pulse-glow' 
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50'
                    }
                    ${index === 0 ? 'animate-celebration' : ''}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Rank */}
                  <div className={`
                    flex items-center justify-center w-16 h-16 rounded-full font-bold text-white mr-6 shadow-lg
                    bg-gradient-to-r ${getRankColor(index + 1)}
                  `}>
                    <span className="text-lg">
                      {getRankIcon(index + 1)}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {getDisplayName(entry)}
                      </h3>
                      {entry.uid === user?.uid && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {entry.email}
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-1">
                      <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-2xl font-bold text-gray-800 animate-count-up">
                        {entry.totalPoints.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">points</p>
                  </div>

                  {/* Special Effects for Top 3 */}
                  {index < 3 && (
                    <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                      <div className="w-full h-full animate-ping opacity-20 bg-yellow-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            🌱 Keep recycling to climb the leaderboard and help save our planet!
          </p>
        </div>
      </div>
    </div>
  );
}
