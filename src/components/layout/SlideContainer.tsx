import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

export function SlideContainer({ children, className = '' }: SlideContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50/80 ${className}`}
    >
      {children}
    </motion.div>
  );
}
