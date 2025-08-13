
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/web-app');
    } catch (err: any) {
      let errorMessage = 'Failed to login. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Eco-Friendly Todo" className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-6">Log in to access your eco-friendly tasks</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-700 font-medium" htmlFor="password">
                Password
              </label>
              <Link href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#b4d093' }}
              className="w-full text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg shadow-md hover:bg-opacity-90"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#b4d093' }} className="font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
