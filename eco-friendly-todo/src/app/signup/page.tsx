
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
      router.push('/web-app');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Eco-Friendly Todo" className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Join Eco-Todo</h1>
        <p className="text-center text-gray-600 mb-6">Create an account to track your tasks and help the environment</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="mb-4">
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
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              minLength={6}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <div className="mb-2">
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#b4d093' }}
              className="w-full text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg shadow-md hover:bg-opacity-90"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#b4d093' }} className="font-medium hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
