'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { XIcon, InstagramIcon } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Thank you for subscribing. You will receive an email confirmation soon.');
        setName('');
        setEmail('');
      } else {
        setMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-customWhite flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8">
            <div className="flex items-center mb-2">
              <Image src="/LifeXP.png" alt="LifeXP Logo" width={24} height={24} className="mr-2" />
              <h2 className="text-xl font-semibold text-gray-700">LifeXP</h2>
            </div>
            <h1 className="text-4xl font-bold text-customBlack mb-4">
              Level-up in real life 🚀 
            </h1>
            <p className="text-gray-600 mb-4">
              Fill your information below to join the waitlist. 
              We will notify you when we are accepting beta users!
            </p>
          </div>
          <div className="md:w-1/2 bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-customGreen text-white py-2 px-4 rounded-md hover:bg-customGreenHover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Join The Waitlist
              </button>
            </form>
            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
          </div>
        </div>
        <div className="bg-white px-8 py-4 flex justify-between items-center border-t">
          <div className="flex space-x-4">
            <a href="https://x.com/LaiYZJ" target="_blank" rel="noopener noreferrer">
              <XIcon className="h-5 w-5 text-gray-400 hover:text-blue-500" />
            </a>
            <a href="instagram.com/jason.yslai" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-5 w-5 text-gray-400 hover:text-pink-500" />
            </a>
            <a href="https://www.youtube.com/@Jason_lai" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5 text-gray-400 hover:text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-500">&copy; LifeXP. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}