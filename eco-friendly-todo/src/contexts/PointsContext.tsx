'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { ref, set, get, push, update } from 'firebase/database';
import { database } from '@/lib/firebase';

interface PointsContextType {
  totalPoints: number;
  sessionPoints: number;
  addPoints: (points: number, reason?: string) => Promise<void>;
  resetSessionPoints: () => void;
  isLoading: boolean;
  pointsHistory: PointsHistory[];
}

interface PointsHistory {
  id: string;
  points: number;
  reason: string;
  timestamp: number;
  type: 'earned' | 'bonus';
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user points from Firebase Realtime Database
  useEffect(() => {
    if (!user || authLoading) {
      setIsLoading(false);
      return;
    }

    const loadUserPoints = async () => {
      try {
        // Check if database is available
        if (!database) {
          console.warn('Firebase database not available, using localStorage');
          throw new Error('Database not initialized');
        }

        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setTotalPoints(userData.totalPoints || 0);
          
          // Convert history object to array
          const historyObj = userData.pointsHistory || {};
          const historyArray = Object.keys(historyObj).map(key => ({
            id: key,
            ...historyObj[key]
          })).sort((a, b) => b.timestamp - a.timestamp);
          
          setPointsHistory(historyArray);
        } else {
          // Create initial user document
          const initialData = {
            email: user.email,
            totalPoints: 0,
            pointsHistory: {},
            createdAt: Date.now(),
          };
          await set(userRef, initialData);
        }
      } catch (error) {
        console.error('Error loading user points from Firebase:', error);
        // Fallback to localStorage
        const savedPoints = localStorage.getItem(`points_${user.uid}`);
        if (savedPoints) {
          try {
            const data = JSON.parse(savedPoints);
            setTotalPoints(data.totalPoints || 0);
            setPointsHistory(data.pointsHistory || []);
          } catch (e) {
            console.error('Error parsing saved points:', e);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPoints();
  }, [user, authLoading]);

  const addPoints = async (points: number, reason: string = 'Quiz completed') => {
    if (!user) return;

    console.log(`🎯 Adding ${points} points for: ${reason}`);

    try {
      const newTotalPoints = totalPoints + points;
      const newSessionPoints = sessionPoints + points;
      
      const newHistoryEntry: PointsHistory = {
        id: `${Date.now()}-${Math.random()}`,
        points,
        reason,
        timestamp: Date.now(),
        type: 'earned',
      };

      // Check if database is available
      if (!database) {
        throw new Error('Database not initialized');
      }

      // Update Firebase Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const historyRef = ref(database, `users/${user.uid}/pointsHistory`);
      const newHistoryRef = push(historyRef);

      // Use Firebase batch operations
      const updates: { [key: string]: any } = {};
      updates[`users/${user.uid}/totalPoints`] = newTotalPoints;
      updates[`users/${user.uid}/lastUpdated`] = Date.now();
      updates[`users/${user.uid}/pointsHistory/${newHistoryRef.key}`] = {
        points,
        reason,
        timestamp: Date.now(),
        type: 'earned',
      };

      await update(ref(database), updates);
      console.log('✅ Points successfully saved to Firebase!');

      // Update local state
      setTotalPoints(newTotalPoints);
      setSessionPoints(newSessionPoints);
      setPointsHistory(prev => [{ ...newHistoryEntry, id: newHistoryRef.key! }, ...prev]);

      // Also save to localStorage as backup
      const backupData = {
        totalPoints: newTotalPoints,
        pointsHistory: [{ ...newHistoryEntry, id: newHistoryRef.key! }, ...pointsHistory],
      };
      localStorage.setItem(`points_${user.uid}`, JSON.stringify(backupData));

      // Trigger celebration animation
      triggerPointsAnimation(points);
    } catch (error) {
      console.error('❌ Error adding points to Firebase:', error);
      
      // Fallback to localStorage
      const newTotalPoints = totalPoints + points;
      const newSessionPoints = sessionPoints + points;
      const newHistoryEntry: PointsHistory = {
        id: `${Date.now()}-${Math.random()}`,
        points,
        reason,
        timestamp: Date.now(),
        type: 'earned',
      };

      setTotalPoints(newTotalPoints);
      setSessionPoints(newSessionPoints);
      setPointsHistory(prev => [newHistoryEntry, ...prev]);

      const backupData = {
        totalPoints: newTotalPoints,
        pointsHistory: [newHistoryEntry, ...pointsHistory],
      };
      localStorage.setItem(`points_${user.uid}`, JSON.stringify(backupData));
      console.log('📱 Points saved to localStorage as fallback');
      
      triggerPointsAnimation(points);
    }
  };

  const resetSessionPoints = () => {
    setSessionPoints(0);
  };

  const triggerPointsAnimation = (points: number) => {
    // Create floating points animation
    const pointsElement = document.createElement('div');
    pointsElement.textContent = `+${points}`;
    pointsElement.className = `
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      text-3xl font-bold text-green-600 pointer-events-none z-50
      animate-points-earned
    `;
    
    document.body.appendChild(pointsElement);
    
    setTimeout(() => {
      if (document.body.contains(pointsElement)) {
        document.body.removeChild(pointsElement);
      }
    }, 1500);
  };

  const value = {
    totalPoints,
    sessionPoints,
    addPoints,
    resetSessionPoints,
    isLoading,
    pointsHistory,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
}
