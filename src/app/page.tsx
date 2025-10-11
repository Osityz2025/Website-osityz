"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NoSSR from "../components/NoSSR";

// Dynamically import supabase to prevent SSR issues
const supabasePromise = typeof window !== 'undefined' ? 
  import("../../lib/supabase").then(mod => mod.supabase) : 
  null;

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'duplicate'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('submitting');

    try {
      // Check if we're in the browser and supabase is available
      if (typeof window === 'undefined' || !supabasePromise) {
        throw new Error('Newsletter subscription only available in browser');
      }

      const supabase = await supabasePromise;
      
      // First, check if email already exists
      const { data: existingEmail, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('email')
        .eq('email', newsletterEmail)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is what we want
        console.error('Error checking for existing email:', checkError);
        throw checkError;
      }

      if (existingEmail) {
        // Email already exists
        setNewsletterStatus('duplicate');
        setTimeout(() => setNewsletterStatus('idle'), 4000);
        return;
      }

      // If email doesn't exist, proceed with insertion
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: newsletterEmail }]);

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      setNewsletterStatus('success');
      setNewsletterEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setNewsletterStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all feature cards and advantage cards
    const featureCards = document.querySelectorAll('.feature-card');
    const advantageCards = document.querySelectorAll('.advantage-card');
    
    featureCards.forEach((card) => observer.observe(card));
    advantageCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:60px_60px]"></div>
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50 animate-pulse delay-700"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center min-h-screen">
            <div className="w-full lg:w-2/3 py-20">
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                <span className="block">Smarter Software</span>
                <span className="block">For a</span>
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Smarter Shipping
                </span>
                <span className="block">World.</span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
                Osityz is a web-based platform designed for shipping professionals.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/vision"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  Learn More
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:40px_40px]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(59,130,246,0.4),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Simplify and Accelerate Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Maritime Workflow
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Osityz is built to streamline the varied needs of brokers, charterers, and shipping professionals. With our software, experience streamlined operations, accurate data handling, and seamless collaboration in one powerful platform.
            </p>
          </div>

          {/* Feature Cards Grid - 4x2 Layout */}
          <div className="space-y-8">
            {/* First Row - 4 Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Port, Cargo, and Vessel Intelligence */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300">Port, Cargo, and Vessel Intelligence</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Get comprehensive port data, vessel specifications, and cargo insights for informed maritime decisions.
                  </p>
                </div>
              </div>

              {/* Automated Fixture Range */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">Automated Fixture Range</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Our automated engine scans for top-tier deals based on your criteria and optimizes with precision.
                  </p>
                </div>
              </div>

              {/* Smart Calendar and Scheduling */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">Smart Calendar and Scheduling</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Plan meetings, voyages, and inspections automatically with our AI-powered scheduling system.
                  </p>
                </div>
              </div>

              {/* Integrated Maritime Chat and Calling */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">Integrated Maritime Chat and Calling</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Seamlessly communicate with your network through integrated chat and calling features worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row - 4 Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Intelligent Dashboard and Analytics */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-400">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">Intelligent Dashboard and Analytics</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Gain actionable insights with comprehensive analytics and intelligent dashboards for your business.
                  </p>
                </div>
              </div>

              {/* Live Position and Order Matching */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-500">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors duration-300">Live Position and Order Matching</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Track vessel positions in real-time and automatically match orders with available vessels.
                  </p>
                </div>
              </div>

              {/* Mobile Access and Offline Sync */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-600">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">Mobile Access and Offline Sync</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Stay connected with full mobile access and offline synchronization for uninterrupted operations.
                  </p>
                </div>
              </div>

              {/* Built-in Voyage Calculator */}
              <div className="group feature-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden animation-delay-700">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-500 group-hover:scale-110">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">Built-in Voyage Calculator</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Calculate voyage costs, fuel consumption, port charges, and estimated arrival times comprehensively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionize Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            {/* Animated Concentric Circles */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border-2 border-red-500/40 rounded-full animate-pulse animation-delay-200"></div>
                <div className="absolute inset-8 border-2 border-red-500/50 rounded-full animate-pulse animation-delay-400"></div>
                <div className="absolute inset-12 border-2 border-red-500/60 rounded-full animate-pulse animation-delay-600"></div>
                <div className="absolute inset-16 border border-red-500/70 rounded-full animate-pulse animation-delay-800"></div>
                
                {/* Floating Dots */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce animation-delay-300"></div>
                <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-red-300 rounded-full animate-bounce animation-delay-500"></div>
                <div className="absolute bottom-0 right-1/3 w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce animation-delay-700"></div>
              </div>
            </div>
            
            {/* Curved Lines */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 600" fill="none">
              <path d="M100 300 Q300 100 500 300 T900 300" stroke="url(#redGradient)" strokeWidth="2" fill="none" opacity="0.3" className="animate-pulse">
                <animate attributeName="stroke-dasharray" values="0 1000;1000 0;0 1000" dur="4s" repeatCount="indefinite"/>
              </path>
              <path d="M150 350 Q350 150 550 350 T950 350" stroke="url(#redGradient)" strokeWidth="1" fill="none" opacity="0.2" className="animate-pulse animation-delay-300">
                <animate attributeName="stroke-dasharray" values="0 1000;1000 0;0 1000" dur="5s" repeatCount="indefinite"/>
              </path>
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0"/>
                  <stop offset="50%" stopColor="rgb(239, 68, 68)" stopOpacity="1"/>
                  <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Visual Element */}
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Central Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-red-500/5 to-transparent rounded-full blur-3xl"></div>
                
                {/* Animated Concentric Circles */}
                <div className="relative">
                  <div className="w-80 h-80 border-2 border-red-500/40 rounded-full absolute animate-ping animation-delay-0"></div>
                  <div className="w-64 h-64 border-2 border-red-400/50 rounded-full absolute top-8 left-8 animate-ping animation-delay-500"></div>
                  <div className="w-48 h-48 border-2 border-red-300/60 rounded-full absolute top-16 left-16 animate-ping animation-delay-1000"></div>
                  <div className="w-32 h-32 border-2 border-red-500/80 rounded-full absolute top-24 left-24 animate-pulse"></div>
                  
                  {/* Center Core */}
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full absolute top-32 left-32 shadow-2xl shadow-red-500/50 animate-pulse">
                    <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-red-600 rounded-full"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-red-300 to-red-500 rounded-full animate-spin"></div>
                  </div>
                </div>

                {/* Floating Particles - Enhanced Triangle Formation */}
                <div className="absolute inset-0">
                  {/* Main Triangle Formation - 3 Primary Dots */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-float shadow-2xl shadow-red-500/80 ring-2 ring-red-400/30">
                    <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-1 bg-red-300 rounded-full"></div>
                  </div>
                  
                  <div className="absolute bottom-20 left-16 w-4 h-4 bg-red-500 rounded-full animate-float animation-delay-400 shadow-2xl shadow-red-500/80 ring-2 ring-red-400/30">
                    <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="absolute inset-1 bg-red-300 rounded-full"></div>
                  </div>
                  
                  <div className="absolute bottom-20 right-16 w-4 h-4 bg-red-500 rounded-full animate-float animation-delay-800 shadow-2xl shadow-red-500/80 ring-2 ring-red-400/30">
                    <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse animation-delay-400"></div>
                    <div className="absolute inset-1 bg-red-300 rounded-full"></div>
                  </div>

                  {/* Secondary Scattered Dots */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-float animation-delay-600 shadow-xl shadow-red-400/60"></div>
                  <div className="absolute top-3/4 right-1/4 w-2.5 h-2.5 bg-red-300 rounded-full animate-float animation-delay-1000 shadow-lg shadow-red-300/50"></div>
                  <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-red-200 rounded-full animate-float animation-delay-1200 shadow-md shadow-red-200/40"></div>
                  
                  {/* Additional Prominent Pulsing Dot */}
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-float animation-delay-300 shadow-2xl shadow-red-500/70 ring-1 ring-red-400/40">
                    <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse animation-delay-100"></div>
                    <div className="absolute inset-0.5 bg-red-300 rounded-full animate-pulse animation-delay-300"></div>
                    <div className="absolute inset-1 bg-red-500 rounded-full"></div>
                  </div>
                  
                  {/* Connecting Lines (Subtle) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                    <path d="M200 64 L64 336 L336 336 Z" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-pulse">
                      <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:pl-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="block">Revolutionize</span>
                <span className="block">Your</span>
                <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Shipping Operations
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
                Osityz combines powerful speed with rock-solid reliability, equipping your shipping business with intelligent tools to lead in a fast-moving industry.
              </p>

              <div>
                <Link 
                  href="/learn-more"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/40"
                >
                  Learn More
                  <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Osityz Advantage Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Animated Waveform Background */}
        <NoSSR fallback={
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="flex items-end space-x-1 h-64">
              {Array.from({ length: 150 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-600/70 to-blue-300/30 rounded-t-sm"
                  style={{
                    width: '2px',
                    height: '70px',
                  }}
                ></div>
              ))}
            </div>
          </div>
        }>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="flex items-end space-x-1 h-64">
              {Array.from({ length: 150 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-600/70 to-blue-300/30 rounded-t-sm animate-wave"
                  style={{
                    width: '2px',
                    height: `${Math.sin(i * 0.08) * 50 + 70}px`,
                    animationDelay: `${i * 0.03}s`,
                    animationDuration: '3s',
                  }}
                ></div>
              ))}
            </div>
          </div>
        </NoSSR>

        {/* Additional Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Experience the{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                Osityz Advantage
              </span>
            </h2>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Built for the Maritime Industry */}
            <div className="advantage-card group text-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover:shadow-red-500/60 transition-all duration-500 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5l-1-1z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400/20 border-2 border-red-400 rounded-full opacity-80 animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors duration-300">
                Built for the Maritime Industry
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Industry-specific workflows and compliance requirements built-in.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-red-500 via-red-400 to-transparent mx-auto rounded-full mt-4"></div>
            </div>

            {/* Seamless Communication */}
            <div className="advantage-card group text-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-all duration-500 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400/20 border-2 border-blue-400 rounded-full opacity-80 animate-ping animation-delay-200"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                Seamless Communication
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Integrated chat, video calls, and messaging connecting all stakeholders instantly.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent mx-auto rounded-full mt-4"></div>
            </div>

            {/* Smart AI Integration */}
            <div className="advantage-card group text-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all duration-500 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-400/20 border-2 border-purple-400 rounded-full opacity-80 animate-ping animation-delay-400"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                Smart AI Integration
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                AI-powered analytics and predictive insights to optimize shipping operations.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 via-purple-400 to-transparent mx-auto rounded-full mt-4"></div>
            </div>

            {/* Secure Cloud Platform */}
            <div className="advantage-card group text-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/40 group-hover:shadow-green-500/60 transition-all duration-500 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.40A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400/20 border-2 border-green-400 rounded-full opacity-80 animate-ping animation-delay-600"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                Secure Cloud Platform
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Enterprise-grade security with end-to-end encryption and 99.9% uptime.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 via-green-400 to-transparent mx-auto rounded-full mt-4"></div>
            </div>

            {/* Customizable Dashboards */}
            <div className="advantage-card group text-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-all duration-500 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400/20 border-2 border-orange-400 rounded-full opacity-80 animate-ping animation-delay-800"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                Customizable Dashboards
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Personalized interfaces with drag-and-drop widgets and custom KPIs.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent mx-auto rounded-full mt-4"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Unlock the Potential Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Particle Network */}
          <NoSSR>
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                  }}
                ></div>
              ))}
            </div>
          </NoSSR>

          {/* Geometric Patterns */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-10">
            <div className="w-full h-full border border-red-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-8 border border-blue-500/20 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-16 border border-purple-500/15 rounded-full animate-pulse"></div>
          </div>

          {/* Curved Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800">
            <path
              d="M100 400 Q300 200 600 400 T1100 400"
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
              strokeDasharray="5,5"
            >
              <animate attributeName="stroke-dashoffset" values="0;20" dur="4s" repeatCount="indefinite"/>
            </path>
            <path
              d="M200 600 Q500 300 800 600"
              stroke="url(#connectionGradient2)"
              strokeWidth="1"
              fill="none"
              opacity="0.15"
              strokeDasharray="3,7"
            >
              <animate attributeName="stroke-dashoffset" values="0;15" dur="5s" repeatCount="indefinite"/>
            </path>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0"/>
                <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="1"/>
                <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0"/>
                <stop offset="50%" stopColor="rgb(239, 68, 68)" stopOpacity="1"/>
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="block">Unlock the Potential</span>
                  <span className="block">of</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                    Osityz
                  </span>
                  <span className="block">for Your Business</span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Discover how Osityz can accelerate your shipping business with advanced AI integration, seamless communication, and data-driven decision making. Take the first step towards transformation today.
                </p>

                {/* Key Benefits */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Advanced AI Integration</h4>
                      <p className="text-gray-400 text-sm">Intelligent automation and predictive analytics</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Seamless Communication</h4>
                      <p className="text-gray-400 text-sm">Connect all stakeholders instantly</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Data-Driven Decisions</h4>
                      <p className="text-gray-400 text-sm">Real-time insights and analytics</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Transformation Ready</h4>
                      <p className="text-gray-400 text-sm">Quick deployment and implementation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative">
              {/* Central Hub Visualization */}
              <div className="relative w-full h-96 flex items-center justify-center">
                
                {/* Main Central Node */}
                <div className="relative z-20">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0">
                  {/* Communication Node */}
                  <div className="absolute top-8 right-16 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>

                  {/* AI Node */}
                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  {/* Analytics Node */}
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-600">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>

                  {/* Security Node */}
                  <div className="absolute top-8 left-16 w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg animate-float animation-delay-900">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.40A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite"/>
                  </line>
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="2.5s" repeatCount="indefinite"/>
                  </line>
                  <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite"/>
                  </line>
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="3.5s" repeatCount="indefinite"/>
                  </line>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:60px_60px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-3">
                <Image
                  src="/Osityz Logoo.png"
                  alt="Osityz Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-white font-bold text-2xl">Osityz</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                AI-powered maritime software connecting brokers and shippers on one smart platform.
              </p>
              
              {/* Contact Section */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Connect With Us:</h4>
                
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.instagram.com/osityz.ai/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center hover:from-pink-600 hover:to-pink-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/40"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/company/osityz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/40"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Contact Email */}
                <div className="space-y-3">
                  <h5 className="text-white font-medium">Contact us at:</h5>
                  <a 
                    href="mailto:info@osityz.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@osityz.com</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg">Quick Links</h4>
              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Home
                </Link>
                <Link 
                  href="/vision" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Vision
                </Link>
                <Link 
                  href="/faq" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  FAQ
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  Contact
                </Link>
              </nav>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Subscribe to our newsletter for the latest maritime industry insights and Osityz updates.</p>
              
              <NoSSR fallback={
                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value=""
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                      disabled
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    disabled
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm cursor-not-allowed"
                  >
                    <span>Loading...</span>
                  </button>
                </form>
              }>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                      required
                      disabled={newsletterStatus === 'submitting' || newsletterStatus === 'duplicate'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'submitting' || newsletterStatus === 'duplicate'}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center space-x-2 group text-sm"
                  >
                    {newsletterStatus === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : newsletterStatus === 'success' ? (
                      <>
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Subscribed!</span>
                      </>
                    ) : newsletterStatus === 'duplicate' ? (
                      <>
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>Already Subscribed!</span>
                      </>
                    ) : newsletterStatus === 'error' ? (
                      <>
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </NoSSR>
              
              {/* Status Messages */}
              {newsletterStatus === 'duplicate' && (
                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-orange-400 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>This email has already been used for newsletter subscription.</span>
                  </div>
                </div>
              )}
              
              {newsletterStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-400 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Successfully subscribed! Welcome to our newsletter.</span>
                  </div>
                </div>
              )}
              
              {/* Newsletter Features */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Weekly industry insights</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Platform updates & features</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg">Our Location</h4>
              
              {/* Interactive Map */}
              <div className="relative group">
                <div className="w-full h-48 rounded-xl border border-gray-700 overflow-hidden relative shadow-2xl">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977249847!2d-79.54286805!3d43.718371449999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                  
                  {/* Custom Overlay Elements */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs font-medium shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Osityz HQ</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/70 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>View Larger Map</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location Label */}
                <div className="mt-3 text-center">
                  <p className="text-gray-400 font-medium">Toronto, Ontario</p>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">© 2025 by Osityz. All rights reserved.</p>
            
            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
