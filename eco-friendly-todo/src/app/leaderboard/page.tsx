'use client';

import Header from '@/components/Header';
import Leaderboard from '@/components/Leaderboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LeaderboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
        {/* Floating organic shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
        <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
        
        <Header />
        <main className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12 grow-in">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-green to-eucalyptus rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🏆</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-sage-green/20 to-eucalyptus/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>
            <h1 className="text-6xl font-bold text-nature-gradient mb-6">
              Global Leaderboard
            </h1>
            <p className="text-2xl text-text-light max-w-3xl mx-auto leading-relaxed">
              Discover the top eco-champions making a difference through recycling! 
              Compete with fellow environmentalists and climb the ranks.
            </p>
          </div>
          
          <div className="mb-12">
            <Leaderboard />
          </div>
          
          {/* Motivational Section */}
          <div className="max-w-5xl mx-auto">
            <div className="nature-card p-12 fade-in-up">
              <h2 className="text-4xl font-bold text-nature-gradient mb-12 text-center">Join the Green Revolution</h2>
              <div className="grid md:grid-cols-3 gap-10 text-center">
                <div className="glass-card p-8 rounded-2xl grow-in" style={{animationDelay: '0.1s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-sage-green to-eucalyptus rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🌍</span>
                  </div>
                  <h3 className="font-bold text-forest-green mb-4 text-xl">Make an Impact</h3>
                  <p className="text-text-light leading-relaxed">
                    Every point represents proper recycling that helps our planet thrive for future generations
                  </p>
                </div>
                <div className="glass-card p-8 rounded-2xl grow-in" style={{animationDelay: '0.2s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-eucalyptus to-pine rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <h3 className="font-bold text-forest-green mb-4 text-xl">Climb Higher</h3>
                  <p className="text-text-light leading-relaxed">
                    Scan more items and answer correctly to gain more points and reach new eco-milestones
                  </p>
                </div>
                <div className="glass-card p-8 rounded-2xl grow-in" style={{animationDelay: '0.3s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-moss-green to-olive rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🏅</span>
                  </div>
                  <h3 className="font-bold text-forest-green mb-4 text-xl">Be a Champion</h3>
                  <p className="text-text-light leading-relaxed">
                    Join the top recyclers and inspire others to embrace sustainable living practices
                  </p>
                </div>
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
