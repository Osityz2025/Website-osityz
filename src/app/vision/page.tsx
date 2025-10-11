"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Vision() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:60px_60px] animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-300"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-float animation-delay-600"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium text-lg">Our Vision</span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Revolutionizing
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Maritime Operations
            </span>
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* About Osityz Section */}
          <div className="fade-in-section">
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative">
                About Osityz
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  <span className="text-blue-400 font-semibold">Osityz</span> is a powerful web-based platform that is built for the maritime shipping industry. It is designed to support receivers, consignees, traders, port agents, ship owners, operators, head owners, ship brokers, and anyone else apart of the industry.
                </p>
                
                <p>
                  The platform combines <span className="text-purple-400 font-semibold">smart AI integration</span> with a built-in chatbot, automated message recognition, a full-scale email management system, live position, cargo matching, voyage calculation tools, and a centralized CRM with a calendar and task system.
                </p>
                
                <p>
                  Osityz streamlines communication through its secure internal chat and video calling system, while also offering a customizable dashboard, document handling, and real-time analytics. Built for collaboration, speed, and smarter decisions, Osityz helps maritime professionals simplify their daily workflows and manage every stage of shipping more efficiently.
                </p>
              </div>

              {/* Key Features Highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-blue-400 font-medium text-sm">AI Integration</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-purple-400 font-medium text-sm">Real-time Chat</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-cyan-400 font-medium text-sm">Analytics</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-green-400 font-medium text-sm">Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Journey Section with Visual */}
          <div className="fade-in-section">
            <div className="relative">
              {/* Journey Visual Container */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl shadow-black/50 relative overflow-hidden">
                
                {/* Background Tech Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.2)_25%,transparent_25%,transparent_75%,rgba(59,130,246,0.2)_75%)] bg-[length:40px_40px]"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Journey</h3>
                  
                  {/* Digital Wave Visualization */}
                  <div className="relative h-64 mb-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-600/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Animated Tech Lines */}
                      <div className="relative w-full h-full">
                        {/* Main Digital Wave */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                              <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.9 }} />
                              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Animated Wave Path */}
                          <path 
                            d="M 0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100" 
                            stroke="url(#waveGradient)" 
                            strokeWidth="3" 
                            fill="none" 
                            filter="url(#glow)"
                            className="animate-pulse"
                          />
                          
                          {/* Data Points */}
                          <circle cx="100" cy="100" r="4" fill="#3b82f6" className="animate-ping">
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="200" cy="100" r="4" fill="#8b5cf6" className="animate-ping animation-delay-200">
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx="300" cy="100" r="4" fill="#06b6d4" className="animate-ping animation-delay-400">
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                          </circle>
                        </svg>

                        {/* Floating Tech Elements */}
                        <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="absolute top-12 right-12 w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-300"></div>
                        <div className="absolute bottom-8 left-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-bounce animation-delay-600"></div>
                        
                        {/* Center Label */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-blue-500/30">
                            <span className="text-blue-400 font-bold text-lg">Our Journey</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Description */}
                  <div className="text-center space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Embark on a journey with Osityz and hear we are revolutionizing the maritime shipping industry. Delve into the details of our team, services, and the value we bring to the table.
                    </p>
                    
                    <p className="text-gray-400 text-sm">
                      Learn about our inception, the challenges we've overcome, and what sets us apart from others in the industry. Join us as we pave the way for smarter, more connected shipping operations.
                    </p>

                    {/* Journey Stats */}
                    <div className="grid grid-cols-2 gap-8 mt-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">2025</div>
                        <div className="text-xs text-gray-400">Founded</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
                        <div className="text-xs text-gray-400">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="fade-in-section mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Mission & Values
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Driving innovation in maritime shipping through cutting-edge technology and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Innovation */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-400">Pioneering next-generation maritime solutions with AI-driven technology and smart automation.</p>
            </div>

            {/* Reliability */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Reliability</h3>
              <p className="text-gray-400">Ensuring consistent, secure, and dependable service for all maritime operations worldwide.</p>
            </div>

            {/* Collaboration */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Collaboration</h3>
              <p className="text-gray-400">Building bridges between all maritime stakeholders for seamless communication and cooperation.</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center fade-in-section">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group mb-8"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}