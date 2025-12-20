'use client';

import { Home, HelpCircle, Globe, LogIn, Brain, Bell, Search, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AIAnalyticsDashboard } from './AIAnalyticsDashboard';

interface HeaderProps {
  onNewApplication?: (app: any) => void;
  applications?: any[];
  onMenuClick?: () => void;
}

export function Header({ onNewApplication, applications, onMenuClick }: HeaderProps) {
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <header 
      className="sticky top-0 z-50 bg-[#1976D2] text-white border-b-4 border-white/20 backdrop-blur-xl"
      role="banner"
    >
      {/* Indian Tricolor Accent Bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
      
      <div className="px-3 md:px-6 py-2 md:py-2.5">
        <div className="flex items-center justify-between">
          {/* Left Side - Mobile Menu + Logo and Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4"
          >
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={onMenuClick}
              className="lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
              aria-label="Toggle mobile menu"
              aria-expanded="false"
            >
              <Menu className="w-4 h-4 text-white" aria-hidden="true" />
            </motion.button>

            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-br from-white to-orange-50 rounded-xl p-2 shadow-2xl ring-2 ring-white/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-green-400/20 rounded-xl blur-xl" />
              {/* Logo Placeholder - using emoji for demo */}
              <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center relative z-10 text-2xl">
                🏛️
              </div>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm md:text-xl m-0 drop-shadow-lg" 
                style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                <span className="hidden sm:inline">WaterBill Management</span>
                <span className="sm:hidden">Smart Water Management</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[9px] md:text-xs text-blue-100 mt-0.5 hidden sm:block" 
                style={{ fontWeight: 500 }}
              >
                Water Tax 
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 md:gap-3"
          >
            {/* All buttons removed as per requirement */}
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      {showAIAnalytics && applications && (
        <AIAnalyticsDashboard 
          open={showAIAnalytics}
          applications={applications} 
          onClose={() => setShowAIAnalytics(false)} 
        />
      )}
    </header>
  );
}
