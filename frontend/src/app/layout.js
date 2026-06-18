// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { Sparkles, Home, LayoutDashboard, PlusCircle } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Ticket System',
  description: 'AI-Powered Ticket Intelligence System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 glass border-b border-white/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-1.5 gradient-bg rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">AI Ticket System</span>
              </Link>
              <div className="flex items-center gap-2">
                <Link 
                  href="/ticket" 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200 font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  Submit Ticket
                </Link>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {children}
        </main>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}