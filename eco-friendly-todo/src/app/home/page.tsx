
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
      {/* Floating organic shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
      <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 fade-in-up">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src="/new_logo.png" 
                alt="Eco-Friendly Todo" 
                className="h-32 w-auto leaf-sway drop-shadow-lg"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-sage-green/20 to-eucalyptus/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 text-nature-gradient leading-tight">
            Eco-Todo
            <span className="block text-5xl font-light text-text-secondary mt-2">
              Sustainable Living, Simplified
            </span>
          </h1>
          
          <p className="text-xl text-text-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your daily habits with AI-powered recycling guidance, 
            track your environmental impact, and join a community of eco-warriors 
            making a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-nature text-lg px-8 py-4 inline-flex items-center group">
              <span>Start Your Eco Journey</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="text-eucalyptus font-semibold hover:text-forest-green transition-colors flex items-center">
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-sage-green to-forest-green rounded-full flex items-center justify-center icon-container">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Smart AI Guidance</h3>
            <p className="text-dark leading-relaxed">
              Get personalized recycling tips powered by advanced AI. Learn the best practices for every item in your household.
            </p>
          </div>

          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-eucalyptus to-pine rounded-full flex items-center justify-center icon-container">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Impact Tracking</h3>
            <p className="text-dark leading-relaxed">
              Visualize your environmental impact with beautiful charts and see how your actions contribute to a healthier planet.
            </p>
          </div>

          <div className="nature-card p-8 text-center grow-in" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-moss-green to-olive rounded-full flex items-center justify-center icon-container">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-forest-green mb-4">Eco Community</h3>
                        <p className="text-dark leading-relaxed">
              Join our growing community of eco-warriors. Share tips, compete in challenges, and inspire others on their sustainability journey.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center">
          <Link href="/web-app" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-green to-eucalyptus text-white font-semibold rounded-full gentle-glow transition-all duration-300 group">
            Start Your Eco Journey
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="glass-card-strong rounded-3xl p-12 mb-20 text-center mt-20">
          <h2 className="text-4xl font-bold text-nature-gradient mb-8">Making a Real Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="grow-in" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl font-bold text-eucalyptus mb-2">1.2M+</div>
              <div className="text-dark">Items Recycled Properly</div>
            </div>
            <div className="grow-in" style={{animationDelay: '0.5s'}}>
              <div className="text-4xl font-bold text-forest-green mb-2">850+</div>
              <div className="text-dark">Tons of Waste Diverted</div>
            </div>
            <div className="grow-in" style={{animationDelay: '0.6s'}}>
              <div className="text-4xl font-bold text-sage-green mb-2">50K+</div>
              <div className="text-dark">Eco Warriors Joined</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glass-card rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-nature-gradient mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-dark mb-8 max-w-2xl mx-auto">
            Every small action counts. Join our community today and start your journey towards a more sustainable lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-nature text-lg px-10 py-4">
              Get Started for Free
            </Link>
            <Link href="/login" className="px-10 py-4 text-eucalyptus font-semibold border-2 border-eucalyptus rounded-full hover:bg-eucalyptus hover:text-white transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
