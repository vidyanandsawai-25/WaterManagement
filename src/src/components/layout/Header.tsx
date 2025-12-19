'use client';

import { Home, HelpCircle, Globe, LogIn, Brain, Bell, Search, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AIAnalyticsDashboard } from '@/components/modules/AIAnalyticsDashboard';
import panvelLogo from 'figma:asset/d989d628a46c82df21065b381c72df938e966b11.png';

interface HeaderProps {
  onNewApplication?: (app: any) => void;
  applications?: any[];
  onMenuToggle?: () => void;
}

export function Header({ onNewApplication, applications, onMenuToggle }: HeaderProps) {
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <header 
      className="sticky top-0 z-50 bg-blue-600 text-white px-4 md:px-6 py-4 shadow-lg border-b border-blue-700/20"
      role="banner"
    >
      {/* Indian Tricolor Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
      
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu + Logo and Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 md:gap-5"
        >
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={onMenuToggle}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            aria-label="Toggle mobile menu"
            aria-expanded="false"
          >
            <Menu className="w-5 h-5 text-white" aria-hidden="true" />
          </motion.button>

          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-br from-white to-orange-50 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-2xl ring-2 md:ring-4 ring-white/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-green-400/20 rounded-xl md:rounded-2xl blur-xl" />
            <img
              src={panvelLogo}
              alt="Panvel Municipal Corporation logo"
              className="w-8 h-8 md:w-12 md:h-12 object-contain relative z-10"
            />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-2xl m-0 drop-shadow-lg" 
              style={{ fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              <span className="hidden sm:inline">Panvel Municipal Corporation</span>
              <span className="sm:hidden">Panvel MC</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] md:text-xs text-blue-100 mt-0.5 hidden sm:block" 
              style={{ fontWeight: 500 }}
            >
              Water Tax Management Portal • पनवेल महानगरपालिका
            </motion.p>
          </div>
        </motion.div>

        {/* Right Side - Navigation Links */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 md:gap-3"
        >
          {/* Search Button - Hidden on small mobile */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm items-center gap-2 transition-all border border-white/20 shadow-lg"
            style={{ fontWeight: 600 }}
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search</span>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse" />
          </motion.button>

          {/* Divider - Hidden on mobile */}
          <div className="hidden md:block w-px h-8 bg-white/20" />

          {/* Navigation Links - Simplified on mobile */}
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white no-underline text-sm items-center gap-2 transition-all border border-white/20 shadow-lg"
            style={{ fontWeight: 600 }}
          >
            <Home className="w-4 h-4" />
            <span className="hidden lg:inline">Home</span>
          </motion.a>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex px-3 md:px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white no-underline text-sm items-center gap-2 transition-all border border-white/20 shadow-lg"
            style={{ fontWeight: 600 }}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden lg:inline">Language</span>
          </motion.a>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white no-underline text-sm items-center gap-2 transition-all border border-white/20 shadow-lg"
            style={{ fontWeight: 600 }}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden lg:inline">Help</span>
          </motion.a>

          {/* Divider - Hidden on mobile */}
          <div className="hidden md:block w-px h-8 bg-white/20" />
          
          {/* AI Analytics Button - Icon only on mobile */}
          <motion.button 
            onClick={() => setShowAIAnalytics(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm flex items-center gap-2 transition-all shadow-xl border-2 border-white/30 ring-2 ring-purple-400/20"
            style={{ fontWeight: 700 }}
          >
            <Brain className="w-4 h-4" />
            <span className="hidden md:inline">AI Analytics</span>
          </motion.button>

          {/* Login Button - Icon only on mobile */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm flex items-center gap-2 transition-all shadow-xl border-2 border-white/30 ring-2 ring-orange-400/20"
            style={{ fontWeight: 700 }}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </motion.button>
        </motion.div>
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