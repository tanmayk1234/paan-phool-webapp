'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-brand-green-600 to-brand-green-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl flex items-center">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 8.5H19.5L15.5 13L17.5 19.5L12 15.5L6.5 19.5L8.5 13L4.5 8.5H9.5L12 2Z" fill="white"/>
                </svg>
                Paan Phool
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <Link
                  href="/Dashboard"
                  className="nav-link"
                >
                  Dashboard
                </Link>
                <Link
                  href="/plants"
                  className="nav-link"
                >
                  My Plants
                </Link>
                <Link
                  href="/schedule"
                  className="nav-link"
                >
                  Schedule
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-white hover:bg-white/10 focus:outline-none relative">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-brand-accent-red"></span>
              </button>

              {/* Profile dropdown */}
              <div className="ml-4 relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-medium mr-2 shadow-soft">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button
                    onClick={signOut}
                    className="text-white hover:text-gray-200 text-sm font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 p-2 rounded-md"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/Dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-dark hover:bg-brand-green-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/plants"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-dark hover:bg-brand-green-50"
              onClick={() => setIsMenuOpen(false)}
            >
              My Plants
            </Link>
            <Link
              href="/schedule"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-dark hover:bg-brand-green-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>
            <div className="border-t border-gray-100 my-2"></div>
            <button
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-accent-red hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}