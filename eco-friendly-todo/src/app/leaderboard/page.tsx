'use client';

import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LeaderboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#b4d093] to-[#9fba7b]">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-4 shadow-text">
              🏆 Global Leaderboard
            </h1>
            <p className="text-xl text-white/90 shadow-text max-w-2xl mx-auto">
              Discover the top eco-champions making a difference through recycling! 
              Compete with fellow environmentalists and climb the ranks.
            </p>
          </div>
          
          <Leaderboard />
          
          {/* Motivational Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">🌍</div>
                  <h3 className="font-bold text-gray-800 mb-2">Make an Impact</h3>
                  <p className="text-sm text-gray-600">
                    Every point represents proper recycling that helps our planet
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="font-bold text-gray-800 mb-2">Climb Higher</h3>
                  <p className="text-sm text-gray-600">
                    Scan more items and answer correctly to gain more points
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🏅</div>
                  <h3 className="font-bold text-gray-800 mb-2">Be a Champion</h3>
                  <p className="text-sm text-gray-600">
                    Join the top recyclers and inspire others to go green
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
