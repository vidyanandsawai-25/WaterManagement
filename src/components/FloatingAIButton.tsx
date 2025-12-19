import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, BarChart3, X } from 'lucide-react';
import { AIAnalyticsDashboard } from './AIAnalyticsDashboard';

interface FloatingAIButtonProps {
  applications: any[];
}

export function FloatingAIButton({ applications }: FloatingAIButtonProps) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setShowAnalytics(true)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-60"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.8 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Main Button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Label Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  AI Delay Analytics
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge Counter */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">
              {applications.filter(app => 
                (app.status === 'Pending Verified' || app.status === 'Under Review') && 
                app.days >= 5
              ).length}
            </span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <AIAnalyticsDashboard
          open={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          applications={applications}
        />
      )}
    </>
  );
}
