'use client';
import { useScroll, useSpring, motion } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

const ScrollProgress = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      ref={containerRef}
      className="overflow-scroll [scrollbar-width:none] text-neutral-700 dark:text-neutral-300 h-full"
    >
      <motion.div
        className="absolute bottom-1 left-1 right-1 origin-[0%] h-[10px] bg-purple-300 rounded-lg"
        style={{ scaleX }}
      />

      {children}
    </motion.div>
  );
};

export default ScrollProgress;
