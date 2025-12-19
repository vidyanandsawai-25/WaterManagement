'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CRMDashboard } from './Dashboard';
import { ApproveOnlineTransaction } from './ApproveOnlineTransaction';
import { Toaster } from './ui/sonner';
import { applications as initialApplications } from '@/data/applications';

const STORAGE_KEY = 'akola_crm_applications';

export function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('crm');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Track today's complaint count for current session (resets on page refresh/logout)
  const [sessionComplaintCount, setSessionComplaintCount] = useState(0);
  
  // Load applications from localStorage or use initial data
  const [applications, setApplications] = useState(() => {
    if (typeof window === 'undefined') return initialApplications;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        // Merge stored data with initial data, prioritizing stored data
        const storedIds = new Set(parsedData.map((app: any) => app.id));
        const mergedData = [
          ...parsedData,
          ...initialApplications.filter((app) => !storedIds.has(app.id))
        ];
        return mergedData;
      }
    } catch (error) {
      console.error('Error loading applications from localStorage:', error);
    }
    return initialApplications;
  });

  // Save applications to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications to localStorage:', error);
    }
  }, [applications]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : -320,
        }}
        transition={{
          type: prefersReducedMotion ? 'tween' : 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="fixed inset-y-0 left-0 z-50 lg:hidden"
      >
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 -right-12 p-2 bg-white rounded-r-lg shadow-lg lg:hidden"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setIsMobileMenuOpen(true)}
          applications={applications}
        />

        <div className="flex-1 overflow-hidden">
          {activeTab === 'crm' && (
            <CRMDashboard
              applications={applications}
              onUpdateApplications={setApplications}
              sessionComplaintCount={sessionComplaintCount}
              onSessionComplaintIncrement={() =>
                setSessionComplaintCount((prev) => prev + 1)
              }
            />
          )}
          {activeTab === 'dd_cheque_approval' && (
            <ApproveOnlineTransaction type="dd_cheque" />
          )}
          {activeTab === 'online_transactions' && (
            <ApproveOnlineTransaction type="online" />
          )}
        </div>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}
