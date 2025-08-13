'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen organic-bg leaf-pattern relative overflow-hidden">
      {/* Floating organic shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 organic-shape bg-gradient-to-br from-sage-green/20 to-eucalyptus/20 floating"></div>
      <div className="absolute top-40 right-20 w-24 h-24 organic-shape bg-gradient-to-br from-forest-green/15 to-mint-cream/30 floating-delayed"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 organic-shape bg-gradient-to-br from-seafoam/25 to-sage-green/15 floating"></div>
      
      <Header />
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="nature-card p-12 mb-12 grow-in">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <img src="/new_logo.png" alt="Eco-Todo" className="h-24 w-24 leaf-sway" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-sage-green/20 to-eucalyptus/20 rounded-full blur-xl -z-10"></div>
                </div>
              </div>
              <h1 className="text-6xl font-bold text-nature-gradient mb-6">About Eco-Todo</h1>
              <p className="text-2xl text-dark">Making sustainability simple, one task at a time</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
                <h2 className="text-3xl font-bold text-forest-green mb-6">Our Mission</h2>
                <p className="text-text-secondary leading-relaxed text-lg">
                  Eco-Todo was created with a simple yet powerful vision: to help individuals make 
                  environmentally conscious decisions in their daily lives. By combining task management 
                  with AI-powered sustainability insights, we're making it easier than ever to live greener.
                </p>
              </div>
              <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
                <h2 className="text-3xl font-bold text-forest-green mb-6">How It Works</h2>
                <p className="text-text-secondary leading-relaxed text-lg">
                  Our innovative platform uses advanced AI to analyze your daily activities and provide 
                  personalized recommendations for more sustainable alternatives. Simply record your tasks, 
                  and we'll help you discover eco-friendly ways to accomplish them.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-bold text-nature-gradient mb-12 text-center">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card p-8 text-center grow-in" style={{animationDelay: '0.3s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-sage-green to-forest-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-forest-green mb-4">Smart Task Management</h3>
                  <p className="text-dark leading-relaxed">Organize your daily activities with our intuitive task management system.</p>
                </div>
                
                <div className="glass-card p-8 text-center grow-in" style={{animationDelay: '0.4s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-eucalyptus to-pine rounded-full flex items-center justify-center mx-auto mb-6 icon-container">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-forest-green mb-4">AI-Powered Analysis</h3>
                  <p className="text-dark leading-relaxed">Advanced AI analyzes your activities to suggest sustainable alternatives.</p>
                </div>
                
                <div className="glass-card p-8 text-center grow-in" style={{animationDelay: '0.5s'}}>
                  <div className="w-20 h-20 bg-gradient-to-br from-moss-green to-olive rounded-full flex items-center justify-center mx-auto mb-6 icon-container">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-forest-green mb-4">Environmental Impact</h3>
                  <p className="text-dark leading-relaxed">Track your positive environmental impact and see the difference you're making.</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-bold text-nature-gradient mb-12 text-center">Why Choose Eco-Todo?</h2>
              <div className="glass-card-strong rounded-3xl p-10">
                <ul className="space-y-6">
                  <li className="flex items-start fade-in-up" style={{animationDelay: '0.6s'}}>
                    <div className="w-8 h-8 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-forest-green mb-2">Science-Based Recommendations</h4>
                      <p className="text-dark text-lg leading-relaxed">Our suggestions are backed by environmental research and data.</p>
                    </div>
                  </li>
                  <li className="flex items-start fade-in-up" style={{animationDelay: '0.7s'}}>
                    <div className="w-8 h-8 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-forest-green mb-2">User-Friendly Interface</h4>
                      <p className="text-dark text-lg leading-relaxed">Clean, intuitive design that makes sustainable living accessible to everyone.</p>
                    </div>
                  </li>
                  <li className="flex items-start fade-in-up" style={{animationDelay: '0.8s'}}>
                    <div className="w-8 h-8 bg-gradient-to-r from-sage-green to-eucalyptus rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-forest-green mb-2">Community Impact</h4>
                      <p className="text-dark text-lg leading-relaxed">Join a growing community of environmentally conscious individuals.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-nature-gradient mb-8">Join the Movement</h2>
              <p className="text-dark mb-12 text-xl leading-relaxed max-w-3xl mx-auto">
                Ready to make a positive impact on the environment? Start your eco-friendly journey today 
                with Eco-Todo and discover how small changes in your daily routine can create lasting change.
              </p>
              <div className="space-y-6 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-center">
                <a
                  href="/signup"
                  className="eco-btn-primary px-10 py-4 text-lg font-semibold inline-flex items-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  Get Started
                </a>
                <a
                  href="/home"
                  className="eco-btn-secondary px-10 py-4 text-lg font-semibold inline-flex items-center transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating footer shapes */}
      <div className="absolute bottom-10 right-10 w-20 h-20 organic-shape bg-gradient-to-br from-sage-green/10 to-forest-green/15 floating"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 organic-shape bg-gradient-to-br from-eucalyptus/20 to-mint-cream/25 floating-delayed"></div>
    </div>
  );
}
