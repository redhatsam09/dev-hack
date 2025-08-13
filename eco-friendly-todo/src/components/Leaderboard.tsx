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
        <div className="nature-card p-10 grow-in">
          <div className="h-8 bg-sage-green/30 rounded-xl w-1/3 mb-8"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-card p-6 mb-6 rounded-xl fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
              <div className="animate-pulse flex items-center">
                <div className="w-16 h-16 bg-sage-green/30 rounded-full mr-6"></div>
                <div className="flex-1">
                  <div className="h-4 bg-sage-green/30 rounded-xl w-1/2 mb-3"></div>
                  <div className="h-3 bg-sage-green/20 rounded-xl w-1/4"></div>
                </div>
                <div className="h-6 bg-sage-green/30 rounded-xl w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="nature-card p-10">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-quiz-wrong/20 to-quiz-wrong/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-quiz-wrong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Unable to load leaderboard</h3>
            <p className="text-dark text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 grow-in">
      <div className="nature-card overflow-hidden">
        {/* Header */}
          <div className="text-center glass-card p-8">
            <h2 className="text-4xl font-bold text-nature-gradient mb-4">🏆 Eco Champions</h2>
            <p className="text-xl text-dark mb-6">
              Top recycling enthusiasts making a difference for our planet
            </p>
            {leaderboard.length > 0 && (
              <p className="text-lg text-forest-green font-semibold">
                {leaderboard.length} eco warriors competing
              </p>
            )}
          </div>

        {/* Leaderboard Content */}
        <div className="p-10">
          {leaderboard.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-forest-green mb-4">No champions yet!</h3>
              <p className="text-dark text-lg">Be the first to earn points and claim the top spot!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.uid}
                  className={`
                    glass-card p-8 rounded-2xl transition-all duration-300 hover:scale-105 fade-in-up
                    ${entry.uid === user?.uid 
                      ? 'border-2 border-sage-green bg-gradient-to-r from-sage-green/10 to-eucalyptus/10' 
                      : 'hover:border-sage-green/30 gentle-glow'
                    }
                    ${index === 0 ? 'ring-2 ring-sage-green/30' : ''}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center">
                    {/* Rank */}
                    <div className={`
                      flex items-center justify-center w-20 h-20 rounded-full font-bold text-white mr-8 icon-container
                      bg-gradient-to-r ${getRankColor(index + 1)}
                    `}>
                      <span className="text-2xl">
                        {getRankIcon(index + 1)}
                      </span>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold text-forest-green">
                          {getDisplayName(entry)}
                        </h3>
                        {entry.uid === user?.uid && (
                          <span className="ml-4 px-4 py-2 bg-sage-green/20 text-sage-green text-sm font-bold rounded-full border border-sage-green/30">
                            You
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-3xl font-bold text-sage-green">
                          {entry.totalPoints.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-text-secondary font-medium">points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="glass-card-strong p-6 border-t border-sage-green/20">
          <p className="text-center text-dark text-lg font-medium">
            🌱 Keep recycling to climb the leaderboard and help save our planet!
          </p>
        </div>
      </div>
    </div>
  );
}
