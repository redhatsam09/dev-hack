'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-nature-gradient mb-6">About Eco-Todo</h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Eco-Todo is a revolutionary platform that combines daily productivity with environmental consciousness. 
            Our mission is to help individuals track their sustainable practices while building better habits 
            for both personal growth and planetary health.
          </p>
        </div>
      </main>
      
      {/* Copyright Footer */}
      <footer className="py-6 text-center text-text-light border-t border-sage-green/20 bg-mint-cream/30">
        <p className="text-sm">© 2025 Sayandeep Dutta</p>
      </footer>
    </div>
  );
}