
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b4d093] to-[#9fba7b]">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 shadow-text">
            <span className="text-eco-gradient">Eco-Todo</span>
          </h1>
          <p className="text-xl text-white mb-8 shadow-text">
            The smart todo list that helps you recycle better and live greener.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Eco-Friendly Todo" className="h-48 w-auto animate-leaf-sway" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-primary-darker text-left transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold text-deep-green mb-4">Smart Recycling Tips</h2>
              <p className="text-gray-700 mb-4">
                Our AI-powered assistant analyzes your tasks and provides personalized recycling guidance for the items you use. Learn how to properly dispose of everyday items and reduce your environmental footprint.
              </p>
              <div className="flex items-center text-secondary-dark font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Powered by advanced AI technology</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-secondary-dark text-left transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold text-deep-green mb-4">Track Your Eco Impact</h2>
              <p className="text-gray-700 mb-4">
                Monitor your recycling habits and see the positive impact you're making. Our dashboard shows you metrics on how much waste you've diverted from landfills and your carbon footprint reduction.
              </p>
              <div className="flex items-center text-secondary-dark font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Visual progress tracking</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-deep-green mb-4">Join our growing community of eco-conscious individuals</h3>
            <p className="text-gray-700 mb-8">
              Together, we can make a significant impact on our planet's health. Start your eco-friendly journey today!
            </p>
            <Link href="/signup" className="bg-deep-green text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center">
              <span>Join Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-deep-green bg-opacity-80 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Did You Know?</h3>
            <p className="text-neutral-light">
              Proper recycling can reduce landfill waste by up to 75% and save energy equivalent to powering millions of homes each year.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
