'use client';

import React from 'react';
import { usePoints } from '@/contexts/PointsContext';
import { useAuth } from '@/contexts/AuthContext';

export default function PointsDebug() {
  const { totalPoints, sessionPoints, addPoints, isLoading } = usePoints();
  const { user } = useAuth();

  const testAddPoints = async () => {
    await addPoints(10, 'Test points');
  };

  if (!user) return null;

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg mb-4">
      <h3 className="font-bold text-yellow-800 mb-2">Points Debug Panel</h3>
      <div className="text-sm text-yellow-700 mb-2">
        <p>User ID: {user.uid}</p>
        <p>Total Points: {totalPoints}</p>
        <p>Session Points: {sessionPoints}</p>
        <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      </div>
      <button
        onClick={testAddPoints}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        Add 10 Test Points
      </button>
    </div>
  );
}
