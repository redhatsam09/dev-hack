'use client';

import { usePoints } from '@/contexts/PointsContext';
import { useAuth } from '@/contexts/AuthContext';

export default function PointsDebugPanel() {
  const { totalPoints, sessionPoints, addPoints, isLoading } = usePoints();
  const { user } = useAuth();

  const handleTestPoints = async () => {
    await addPoints(50, 'Test points from debug panel');
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg gentle-glow border-2 border-green-400 z-50">
      <h3 className="font-bold text-sm mb-2">🐛 Points Debug Panel</h3>
      <div className="text-xs space-y-1">
        <div>User: {user.email}</div>
        <div>Total Points: {totalPoints}</div>
        <div>Session Points: {sessionPoints}</div>
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      </div>
      <button
        onClick={handleTestPoints}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
      >
        Add Test Points (+50)
      </button>
    </div>
  );
}
