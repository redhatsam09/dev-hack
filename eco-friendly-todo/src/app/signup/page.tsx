'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Also save user info to Realtime Database
      const db = getDatabase();
      await set(dbRef(db, `users/${userCredential.user.uid}`), {
        email: userCredential.user.email,
        displayName: name,
        points: 0,
      });

      router.push('/web-app');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen organic-bg leaf-pattern flex items-center justify-center py-8 relative overflow-hidden">
      {/* Floating organic shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
      
      <div className="nature-card p-10 w-full max-w-lg grow-in shadow-medium">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img src="/new_logo.png" alt="Eco-Todo" className="h-20 w-20 leaf-sway" />
            <div className="absolute -inset-2 bg-gradient-to-r from-sage-green/30 to-eucalyptus/30 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center text-nature-gradient mb-3">Join Eco-Todo</h1>
        <p className="text-center text-text-light mb-8 text-lg">Start your sustainable journey today</p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-text-primary mb-3 font-semibold text-lg" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-sage-green/30 rounded-xl focus:outline-none focus:border-eucalyptus focus:ring-4 focus:ring-eucalyptus/20 transition-all bg-white/80"
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-text-primary mb-3 font-semibold text-lg" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-sage-green/30 rounded-xl focus:outline-none focus:border-eucalyptus focus:ring-4 focus:ring-eucalyptus/20 transition-all bg-white/80"
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label className="block text-text-primary mb-3 font-semibold text-lg" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 border-2 border-sage-green/30 rounded-xl focus:outline-none focus:border-eucalyptus focus:ring-4 focus:ring-eucalyptus/20 transition-all bg-white/80"
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-text-primary mb-3 font-semibold text-lg" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-sage-green/30 rounded-xl focus:outline-none focus:border-eucalyptus focus:ring-4 focus:ring-eucalyptus/20 transition-all bg-white/80"
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-nature w-full text-lg py-4 font-bold relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t border-sage-green/20">
          <p className="text-center text-text-light text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-eucalyptus font-semibold hover:text-forest-green transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
