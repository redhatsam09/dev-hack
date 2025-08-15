'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, database } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      // If user is authenticated and database is available, ensure user data exists
      if (user && database) {
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          
          // If user data doesn't exist in database, create it
          if (!snapshot.exists()) {
            console.log('Creating user data in database for existing user:', user.uid);
            await set(userRef, {
              email: user.email,
              displayName: user.displayName || 'Eco Warrior',
              points: 0,
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('Error ensuring user data in database:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
