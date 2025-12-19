// ============================================
// PRODUCTION-READY APP COMPONENT
// Connected to .NET Microservices Backend
// ============================================

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CRMDashboard } from './components/CRMDashboard';
import { ApproveOnlineTransaction } from './components/ApproveOnlineTransaction';
import { Toaster } from './components/ui/sonner';

/**
 * Main App Component - Production Version
 * 
 * This version removes all static data and localStorage dependencies.
 * All data is fetched from the backend API through custom hooks.
 * 
 * MIGRATION NOTES:
 * 1. Replace /App.tsx with this file when backend is ready
 * 2. Ensure environment variables are configured
 * 3. Test authentication flow first
 * 4. Verify API endpoints are working
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('crm');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Track today's complaint count for current session (resets on page refresh/logout)
  const [sessionComplaintCount, setSessionComplaintCount] = useState(0);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden relative">
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="skip-to-content"
      >
        Skip to main content
      </a>
      
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Radial gradients */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gradient-to-br from-orange-400/15 to-transparent rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Header - No longer passes static applications array */}
      <Header 
        onNewApplication={() => {}} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      
      <div className="flex flex-1 min-h-0 relative z-10">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            role="button"
            aria-label="Close mobile menu"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                setIsMobileMenuOpen(false);
              }
            }}
          />
        )}

        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'} lg:block lg:relative`}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }} 
          />
        </div>
        
        {/* Main Content Area */}
        <main 
          id="main-content" 
          className="flex-1 overflow-hidden w-full"
          role="main"
          aria-label="Main content"
        >
          {activeTab === 'crm' && (
            <CRMDashboard
              sessionComplaintCount={sessionComplaintCount}
              onComplaintSubmit={() => setSessionComplaintCount((prev) => prev + 1)}
            />
          )}
          {activeTab === 'approve-transaction' && <ApproveOnlineTransaction />}
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        toastOptions={{
          duration: 3000,
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}
