import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src="/osityz-logo.png?v=1"
                  alt="Osityz Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-gray-200 transition-colors duration-200">
                Osityz
              </span>
            </Link>
          </div>

          {/* Navigation and Contact Button */}
          <div className="flex items-center space-x-1">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-800/50"
              >
                Home
              </Link>
              <Link 
                href="/vision" 
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-800/50"
              >
                Vision
              </Link>
              <Link 
                href="/faq" 
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-800/50"
              >
                FAQ
              </Link>
            </nav>

            {/* Contact Button */}
            <div className="flex items-center ml-4">
              <Link 
                href="/contact"
                className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}