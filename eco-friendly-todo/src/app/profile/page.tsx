'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';
import { auth, database } from '@/lib/firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import Header from '@/components/Header';
import ProtectedRoute from '@/components/ProtectedRoute';
import PointsDisplay from '@/components/PointsDisplay';

export default function ProfilePage() {
  const { user } = useAuth();
  const { totalPoints, pointsHistory, isLoading: pointsLoading } = usePoints();
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
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });
      
      // Also update Firebase Realtime Database
      if (database) {
        const userRef = ref(database, `users/${user.uid}`);
        await update(userRef, {
          displayName: displayName,
          email: user.email,
        });
      }
      
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
      <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
        {/* Floating organic shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
        <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
        
        <Header />
        <main className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header with Points */}
            <div className="nature-card p-10 mb-12 grow-in">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="w-28 h-28 bg-gradient-to-br from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-8 icon-container">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-nature-gradient mb-3">
                      {user?.displayName || user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-dark text-lg">{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <PointsDisplay size="lg" />
                  <p className="text-sm text-dark mt-3">Lifetime Points</p>
                </div>
              </div>

              {/* Points Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 glass-card-strong p-8 rounded-2xl">
                <div className="text-center fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="text-3xl font-bold text-sage-green mb-2">
                    {totalPoints.toLocaleString()}
                  </div>
                  <div className="text-text-secondary font-medium">Total Points</div>
                </div>
                <div className="text-center fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="text-3xl font-bold text-eucalyptus mb-2">
                    {pointsHistory.length}
                  </div>
                  <div className="text-text-secondary font-medium">Items Recycled</div>
                </div>
                <div className="text-center fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="text-3xl font-bold text-forest-green mb-2">
                    {pointsHistory.length > 0 ? Math.round(totalPoints / pointsHistory.length) : 0}
                  </div>
                  <div className="text-text-secondary font-medium">Avg Points/Item</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Profile Settings */}
              <div className="nature-card p-10 grow-in">
                <h2 className="text-3xl font-bold text-nature-gradient mb-8 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Profile Settings
                </h2>

                {message && (
                  <div className="quiz-correct p-4 rounded-xl mb-8 text-white font-medium">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="quiz-wrong p-4 rounded-xl mb-8 text-white font-medium">
                    {error}
                  </div>
                )}

                {/* Profile Information */}
                <form onSubmit={handleUpdateProfile} className="mb-10">
                  <div className="mb-6">
                    <label className="block text-forest-green mb-3 font-bold text-lg">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-6 py-4 border border-sage-green/30 rounded-xl glass-card text-dark"
                    />
                    <p className="text-sm text-text-secondary mt-2">Email cannot be changed</p>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-forest-green mb-3 font-bold text-lg">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-6 py-4 border border-sage-green/30 rounded-xl glass-card text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green transition-all"
                      placeholder="Enter your display name"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="eco-btn-primary w-full py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>

                {/* Change Password */}
                <div className="border-t border-sage-green/20 pt-10">
                  <h3 className="text-2xl font-bold text-forest-green mb-6">Change Password</h3>
                  <form onSubmit={handleUpdatePassword}>
                    <div className="mb-6">
                      <label className="block text-forest-green mb-3 font-bold text-lg">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-6 py-4 border border-sage-green/30 rounded-xl glass-card text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green transition-all"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-forest-green mb-3 font-bold text-lg">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-6 py-4 border border-sage-green/30 rounded-xl glass-card text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green transition-all"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="eco-btn-secondary w-full py-4 text-lg font-bold transition-all duration-300 hover:scale-105"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Points History */}
              <div className="nature-card p-10 grow-in">
                <h2 className="text-3xl font-bold text-nature-gradient mb-8 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Recent Achievements
                </h2>

                {pointsLoading ? (
                  <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="glass-card p-6 rounded-xl fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
                        <div className="animate-pulse flex items-center">
                          <div className="rounded-full bg-sage-green/30 h-12 w-12 mr-6"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-sage-green/30 rounded w-3/4 mb-3"></div>
                            <div className="h-3 bg-sage-green/20 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : pointsHistory.length > 0 ? (
                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {pointsHistory.slice(0, 10).map((entry, index) => (
                      <div key={entry.id} className="glass-card p-6 rounded-xl border-l-4 border-sage-green fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-6 icon-container">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-forest-green text-lg">{entry.reason}</p>
                              <span className="font-bold text-sage-green text-xl">+{entry.points}</span>
                            </div>
                            <p className="text-text-secondary mt-1">
                              {typeof entry.timestamp === 'number' 
                                ? new Date(entry.timestamp).toLocaleDateString() 
                                : new Date(entry.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <p className="text-dark text-xl font-bold mb-2">No points earned yet</p>
                    <p className="text-text-secondary">Start scanning recyclable items to earn points!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        {/* Additional floating shapes */}
        <div className="absolute bottom-10 right-10 w-20 h-20 organic-shape bg-gradient-to-br from-sage-green/10 to-forest-green/15 floating"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 organic-shape bg-gradient-to-br from-eucalyptus/20 to-mint-cream/25 floating-delayed"></div>
      </div>
    </ProtectedRoute>
  );
}
