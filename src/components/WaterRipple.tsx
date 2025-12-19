import { motion } from 'motion/react';
import { useState, useRef } from 'react';

interface RippleProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  color?: string;
  as?: React.ElementType;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export function WaterRipple({ children, className = '', duration = 0.8, color = 'rgba(255, 255, 255, 0.5)', as: Component = 'div' }: RippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, duration * 1000);
  };

  return (
    <Component
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={addRipple}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration, ease: 'easeOut' }}
        />
      ))}
    </Component>
  );
}

// Ambient Water Ripple Component for background effects
export function AmbientWaterRipple() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated water bubbles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
      />
    </div>
  );
}