'use client';

import { motion, useReducedMotion } from 'motion/react';

export function BackgroundPatterns() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
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
    </div>
  );
}
