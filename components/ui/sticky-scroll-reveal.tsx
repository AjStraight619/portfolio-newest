'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export const StickyScroll = ({
  data,
  projectTitle,
  projectDescription,
  contentClassName,
}: {
  data: {
    title: string;
    isImage: boolean;
    description: string;
    content?: React.ReactNode | any;
  }[];
  projectTitle?: string;
  projectDescription?: string;
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  });
  const cardLength = data.length;

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const cardsBreakpoints = data.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    'var(--slate-900)',
    'var(--black)',
    'var(--neutral-900)',
  ];
  const linearGradients = [
    'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
    'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
    'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))',
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 overflow-x-hidden [scrollbar-width:none]"
      ref={ref}
    >
      <div className="div relative flex flex-row items-start px-4">
        <div className="max-w-2xl">
          {data.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {data[activeCard].isImage ? (
        <div className="hidden lg:block w-80 rounded-md sticky top-10">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {data[activeCard].content ?? null}
          </AspectRatio>
        </div>
      ) : (
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            'hidden lg:block h-60 w-80 rounded-md sticky top-10',
            contentClassName,
          )}
        >
          {data[activeCard].content ?? null}
        </div>
      )}
    </motion.div>
  );
};
