'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LayoutDashboard, CheckCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check if mobile on client side only
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      id: 'crm',
      label: 'CRM Dashboard',
      icon: LayoutDashboard,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-500/50',
    },
    {
      id: 'approve-transaction',
      label: 'Approve Online Transaction',
      icon: CheckCircle,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      shadowColor: 'shadow-emerald-500/50',
    },
  ];

  return (
    <motion.div
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl border-r-4 border-white shadow-2xl overflow-hidden flex-shrink-0"
      onMouseEnter={() => !isMobile && setIsCollapsed(false)}
      onMouseLeave={() => !isMobile && setIsCollapsed(true)}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Animated glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-0 w-48 h-48 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl"
      />

      {/* Sidebar Header */}
      <div className="relative p-5 border-b-4 border-white shadow-lg bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-md">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center shadow-2xl border-3 border-white ring-4 ring-orange-400/30"
          >
            <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
          </motion.div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-sm text-slate-900 drop-shadow-sm" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                  Municipal Portal
                </div>
                <div className="text-xs text-slate-600" style={{ fontWeight: 600 }}>
                  Dashboard System
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="relative py-6 space-y-3 px-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => onTabChange(item.id)}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, x: 6 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className={`
                  relative w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl ${item.shadowColor} border-3 border-white ring-4 ring-black/10` 
                    : 'bg-white/70 text-slate-700 hover:bg-white hover:shadow-xl border-3 border-white/80 shadow-lg'
                  }
                `}
                style={{ fontWeight: isActive ? 900 : 700 }}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Animated background for active state */}
                {isActive && (
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-transparent"
                  />
                )}

                <div className={`
                  relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
                  ${isActive 
                    ? 'bg-white/30 backdrop-blur-sm shadow-xl' 
                    : `bg-gradient-to-br ${item.gradient} shadow-lg`
                  }
                `}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'} drop-shadow-lg relative z-10`} />
                  {isActive && (
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-xl"
                    />
                  )}
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs truncate drop-shadow-sm relative z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-white rounded-l-full shadow-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Info Section */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-3 right-3 p-4 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white shadow-2xl border-3 border-white ring-4 ring-orange-400/30"
          >
            <div className="text-xs mb-1" style={{ fontWeight: 800 }}>
              🇮🇳 Government of India
            </div>
            <div className="text-xs opacity-90" style={{ fontWeight: 600 }}>
              Digital India Initiative
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle Button */}
      <motion.button
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={prefersReducedMotion ? {} : { scale: 1.15 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        className="absolute bottom-6 right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl border-3 border-white ring-4 ring-orange-400/30 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 drop-shadow-lg" aria-hidden="true" />
        ) : (
          <ChevronLeft className="w-5 h-5 drop-shadow-lg" aria-hidden="true" />
        )}
      </motion.button>
    </motion.div>
  );
}