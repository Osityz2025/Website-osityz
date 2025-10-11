"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

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

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Platform Basics",
      questions: [
        {
          question: "What is Osityz and how does it work?",
          answer: "Osityz is a comprehensive web-based platform designed specifically for the maritime shipping industry. It combines AI integration, real-time communication, cargo matching, voyage calculation tools, and a centralized CRM system to streamline all aspects of shipping operations from a single dashboard."
        },
        {
          question: "Who can use Osityz?",
          answer: "Osityz is designed for all maritime industry professionals including receivers, consignees, traders, port agents, ship owners, operators, head owners, ship brokers, and anyone else involved in the shipping industry."
        },
        {
          question: "Is Osityz a cloud-based platform?",
          answer: "Yes, Osityz is a fully web-based platform that runs in the cloud. This means you can access it from anywhere with an internet connection, on any device, without needing to install software."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "What AI features does Osityz offer?",
          answer: "Osityz includes smart AI integration with automated message recognition, intelligent cargo matching, predictive analytics for voyage planning, and an AI-powered chatbot that helps streamline communication and decision-making processes."
        },
        {
          question: "How does the communication system work?",
          answer: "Our platform features secure internal chat and video calling systems, automated email management, real-time messaging between stakeholders, and integrated communication tools that keep all parties connected throughout the shipping process."
        },
        {
          question: "Can I track shipments in real-time?",
          answer: "Yes, Osityz provides live position tracking, real-time analytics, and comprehensive voyage monitoring tools that give you complete visibility into your shipments and operations at all times."
        },
        {
          question: "What kind of analytics and reporting does Osityz provide?",
          answer: "The platform offers real-time analytics, customizable dashboards, voyage performance reports, cargo matching insights, communication analytics, and comprehensive business intelligence tools to help optimize your operations."
        }
      ]
    },
    {
      category: "Integration & Setup",
      questions: [
        {
          question: "How long does it take to set up Osityz?",
          answer: "Setup time varies based on your organization's size and complexity. Most users can start using basic features immediately after registration, while full integration and customization typically takes 1-2 weeks with our support team's assistance."
        },
        {
          question: "Can Osityz integrate with existing systems?",
          answer: "Yes, Osityz is designed to integrate with existing maritime systems, ERP solutions, and third-party applications through our API and integration tools. Our team can help customize integrations based on your specific needs."
        },
        {
          question: "What kind of training and support do you provide?",
          answer: "We provide comprehensive onboarding, video tutorials, documentation, and 24/7 customer support. Our team offers personalized training sessions and ongoing assistance to ensure you get the most out of the platform."
        }
      ]
    },
    {
      category: "Security & Compliance",
      questions: [
        {
          question: "How secure is my data on Osityz?",
          answer: "Security is our top priority. We use enterprise-grade encryption, secure data centers, regular security audits, and comply with international maritime and data protection standards to ensure your information is always protected."
        },
        {
          question: "Is Osityz compliant with maritime regulations?",
          answer: "Yes, Osityz is designed to comply with international maritime regulations and industry standards. We regularly update our platform to meet evolving compliance requirements and regulatory changes."
        },
        {
          question: "Who has access to my data?",
          answer: "You maintain full control over your data access permissions. Only authorized users within your organization and approved stakeholders you designate can access your information, with detailed audit trails for all access activities."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "How much does Osityz cost?",
          answer: "We offer flexible pricing plans based on your organization's size and needs. Contact our sales team for a personalized quote that includes all the features relevant to your maritime operations."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a comprehensive free trial that allows you to explore all platform features. Contact us to set up your trial account and experience how Osityz can transform your shipping operations."
        },
        {
          question: "What's included in the support package?",
          answer: "All plans include 24/7 customer support, regular platform updates, basic training resources, and access to our knowledge base. Premium plans include dedicated account management and priority support."
        }
      ]
    }
  ];

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

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium text-lg">Support Center</span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Osityz, our maritime platform, features, and how we can help streamline your shipping operations.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="fade-in-section">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{categoryIndex + 1}</span>
                  </div>
                  {category.category}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-12"></div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div
                      key={questionIndex}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-blue-500/30"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/20 transition-colors duration-300 group"
                      >
                        <span className="text-lg font-semibold text-white pr-4 group-hover:text-blue-300 transition-colors duration-300">
                          {faq.question}
                        </span>
                        <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-gray-700/50 pt-4">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-20 fade-in-section">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-blue-500/20 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Our support team is available 24/7 to help you with any questions or concerns about Osityz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 inline-flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Support</span>
                </Link>
                
                <a
                  href="mailto:info@osityz.com"
                  className="bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600 hover:border-gray-500 inline-flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12 fade-in-section">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
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