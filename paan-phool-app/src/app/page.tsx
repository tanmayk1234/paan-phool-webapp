'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-b from-brand-light to-white">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-brand-green-50 rounded-full mb-4">
            <svg className="w-10 h-10 text-brand-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.5 8.5H19.5L15.5 13L17.5 19.5L12 15.5L6.5 19.5L8.5 13L4.5 8.5H9.5L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Welcome to Paan Phool</h1>
          <p className="text-lg md:text-xl mb-8 text-brand-gray max-w-2xl mx-auto">
            Your personal green space management solution for healthier, happier plants
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
          <div className="card-accent flex-1 max-w-md">
            <h3 className="text-xl font-semibold mb-3 text-brand-dark">Track Your Plants</h3>
            <p className="text-brand-gray mb-4">Keep detailed records of all your plants and their care requirements.</p>
            <div className="h-40 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-16 h-16 text-brand-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <div className="card-accent flex-1 max-w-md">
            <h3 className="text-xl font-semibold mb-3 text-brand-dark">Schedule Care</h3>
            <p className="text-brand-gray mb-4">Never forget to water, fertilize, or repot with smart reminders.</p>
            <div className="h-40 bg-brand-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-16 h-16 text-brand-accent-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          {user ? (
            <Link 
              href="/Dashboard" 
              className="btn-primary text-lg px-8 py-3"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
              <Link 
                href="/auth/login" 
                className="btn-primary text-lg px-8 py-3"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="btn-secondary text-lg px-8 py-3"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-brand-gray text-sm">
            Join thousands of plant enthusiasts who trust Paan Phool
          </p>
        </div>
      </div>
    </main>
  );
}