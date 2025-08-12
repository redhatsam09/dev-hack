'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await updateProfile(user, { displayName });
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setError('Please log out and log back in to change your password');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#b5d091] to-[#a0bb7c]">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-[#b5d091] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>

              {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Profile Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5d091]"
                      placeholder="Enter your display name"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: '#b5d091' }}
                    className="text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                <form onSubmit={handleUpdatePassword}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5d091]"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b5d091]"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: '#b5d091' }}
                    className="text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
