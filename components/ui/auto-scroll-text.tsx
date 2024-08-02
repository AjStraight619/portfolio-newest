'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useMotionValue,
  useAnimationControls,
  useTransform,
  useAnimate,
  useMotionValueEvent,
  useScroll,
  useInView,
} from 'framer-motion';
import useMeasure from 'react-use-measure';

const AutoScrollText = ({
  text,
  containerClassName,
  textClassName,
  decreaseOpacity = true,
  stopOnHover = true,
  resumeOnLeave = true,
  manualScrollOnHover = true,
  duration = 10000,
}: {
  text: string;
  containerClassName?: string;
  textClassName?: string;
  decreaseOpacity?: boolean;
  stopOnHover?: boolean;
  resumeOnLeave?: boolean;
  manualScrollOnHover?: boolean;
  duration?: number;
}) => {
  const [ref, { height }] = useMeasure();
  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);

  const isInView = useInView(scope);

  const { scrollYProgress, scrollY } = useScroll({ container: scope });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    y.set(latest);
  });

  useMotionValueEvent(y, 'change', latest => {
    y.set(latest);
  });

  const containerHeight = scope.current?.getBoundingClientRect().height || 0;
  const targetY = -height + containerHeight;

  const scrollAnimation = useCallback(
    (duration: number, delay?: number) => {
      animate(
        '#textContainer',
        { y: [y.get(), targetY] },
        { ease: 'linear', duration, delay },
      );
    },
    [animate, targetY, y],
  );

  useEffect(() => {
    if (!scope.current) return;

    if (isInView) {
      scrollAnimation(duration / 1000);
    }
  }, [scrollAnimation, duration, isInView, scope]);

  const handleMouseEnter = () => {
    const currentY = y.get();
    console.log('Current Y: ', currentY);
    if (currentY > 0.95) {
      animate(
        '#textContainer',
        { y: [y.get(), 0] },
        { duration: 2, type: 'spring' },
      );
    } else {
      animate('#textContainer', { y: y.get() }, { duration: 0 });
    }
  };

  const handleMouseLeave = () => {
    console.log('In handleMouseLeave');
    console.log('Current y value: ', y.get());
    const remainingDistance = Math.abs(targetY - y.get());
    console.log('Remaining Distance: ', remainingDistance);
    if (y.get() === 1) {
      console.log('Reached Final Position returning');
      return;
    }
    const remainingDuration =
      (remainingDistance / Math.abs(targetY)) * (duration / 1000);

    animate(
      '#textContainer',
      { y: [y.get(), targetY] },
      {
        ease: 'linear',
        duration: remainingDuration,
        delay: 1,
      },
    );
  };

  const handleScrollAfterAnimationComplete = (
    event: React.UIEvent<HTMLDivElement>,
  ) => {
    console.log('Scroll y: ', scrollY);
    const currentY = y.get();
    if (currentY > 0.95) {
      scrollAnimation(duration);
    }
  };

  return (
    <div
      ref={scope}
      className={`relative h-full w-full ${
        manualScrollOnHover
          ? 'overflow-scroll [scrollbar-width:none]'
          : 'overflow-hidden'
      }`}
      onScroll={e => handleScrollAfterAnimationComplete(e)}
    >
      <motion.div
        id="textContainer"
        ref={ref}
        className="absolute w-full"
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        style={{ y }}
      >
        <motion.p className={textClassName}>{text}</motion.p>
      </motion.div>
    </div>
  );
};

export default AutoScrollText;
