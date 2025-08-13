'use client';

import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b4d093] to-[#9fba7b]">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About Eco-Todo</h1>
              <p className="text-xl text-gray-600">Making sustainability simple, one task at a time</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Eco-Todo was created with a simple yet powerful vision: to help individuals make 
                  environmentally conscious decisions in their daily lives. By combining task management 
                  with AI-powered sustainability insights, we're making it easier than ever to live greener.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our innovative platform uses advanced AI to analyze your daily activities and provide 
                  personalized recommendations for more sustainable alternatives. Simply record your tasks, 
                  and we'll help you discover eco-friendly ways to accomplish them.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-[#b4d093] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Task Management</h3>
                  <p className="text-gray-600">Organize your daily activities with our intuitive task management system.</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-[#b4d093] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600">Advanced AI analyzes your activities to suggest sustainable alternatives.</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-[#b4d093] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Environmental Impact</h3>
                  <p className="text-gray-600">Track your positive environmental impact and see the difference you're making.</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Choose Eco-Todo?</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#b4d093] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">Science-Based Recommendations</h4>
                      <p className="text-gray-600">Our suggestions are backed by environmental research and data.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#b4d093] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">User-Friendly Interface</h4>
                      <p className="text-gray-600">Clean, intuitive design that makes sustainable living accessible to everyone.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#b4d093] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">Community Impact</h4>
                      <p className="text-gray-600">Join a growing community of environmentally conscious individuals.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#b4d093] mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800">Continuous Innovation</h4>
                      <p className="text-gray-600">Regular updates with new features and improved sustainability insights.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Start Your Eco-Journey?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of users who are already making a positive impact on the environment.
              </p>
              <a
                href="/signup"
                style={{ backgroundColor: '#b4d093' }}
                className="inline-block text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
