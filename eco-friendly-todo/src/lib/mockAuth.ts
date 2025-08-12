'use client';

// Mock authentication system for testing
export interface User {
  id: string;
  email: string;
  displayName: string;
}

// Simple localStorage-based auth simulation
export const mockAuth = {
  currentUser: null as User | null,
  
  // Mock sign up
  async createUserWithEmailAndPassword(email: string, password: string) {
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }
    
    const user: User = {
      id: Date.now().toString(),
      email,
      displayName: email.split('@')[0]
    };
    
    // Store in localStorage
    localStorage.setItem('mockUser', JSON.stringify(user));
    this.currentUser = user;
    
    return { user };
  },
  
  // Mock sign in
  async signInWithEmailAndPassword(email: string, password: string) {
    // For demo purposes, accept any email/password combo
    const user: User = {
      id: Date.now().toString(),
      email,
      displayName: email.split('@')[0]
    };
    
    localStorage.setItem('mockUser', JSON.stringify(user));
    this.currentUser = user;
    
    return { user };
  },
  
  // Mock sign out
  async signOut() {
    localStorage.removeItem('mockUser');
    this.currentUser = null;
  },
  
  // Check if user is logged in
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    }
    return null;
  },
  
  // Update profile
  async updateProfile(updates: { displayName?: string }) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      localStorage.setItem('mockUser', JSON.stringify(this.currentUser));
    }
  }
};
