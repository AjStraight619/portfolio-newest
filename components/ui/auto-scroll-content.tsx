'use client';
import {
  useMotionValue,
  useMotionValueEvent,
  motion,
  useTransform,
  animate,
  useAnimationControls,
  useScroll,
  useInView,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';

const AutoScrollContent = ({ text }: { text: string }) => {
  const [ref, { height }] = useMeasure();
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimationControls();
  const isInView = useInView(containerRef);
  const currentYPos = useRef(0);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    y.set(latest);
  });

  useMotionValueEvent(y, 'change', latest => {
    console.log('Y value changed: ', latest);
    if (latest > 0.98) controls.stop();
  });

  const containerHeight =
    containerRef.current?.getBoundingClientRect().height || 0;
  const targetY = -height + containerHeight;

  useEffect(() => {
    if (!containerRef.current) return;
    controls.start({
      y: [0, targetY],
      transition: {
        duration: 10,
        ease: 'linear',
      },
    });
  }, [targetY]);

  const handleMouseEnter = () => {
    controls.stop();
    controls.set({
      y: y.get(),
      transition: {
        duration: 0.5,
      },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      y: targetY,
      transition: {
        duration: 10,
        ease: 'linear',
        delay: 1,
      },
    });
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-scroll">
      <motion.div
        ref={ref}
        className="absolute w-full"
        animate={controls}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        style={{
          y,
        }}
      >
        <p>{text}</p>
      </motion.div>
    </div>
  );
};

export default AutoScrollContent;
