'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
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

  const [lightboxContent, setLightboxContent] =
    useState<React.ReactNode>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeLightbox = useCallback(() => setLightboxContent(null), []);

  useEffect(() => {
    if (!lightboxContent) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxContent, closeLightbox]);

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

              {/* Inline visual for mobile / tablet, where the sticky side
                  panel is hidden. Images are tappable to open the lightbox. */}
              {item.isImage ? (
                <button
                  type="button"
                  onClick={() => setLightboxContent(item.content)}
                  aria-label="Expand image"
                  className="group lg:hidden mt-6 block w-full max-w-sm overflow-hidden rounded-md cursor-zoom-in"
                >
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    {item.content ?? null}
                    <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
                      <Maximize2 className="size-3" /> Tap to expand
                    </div>
                  </AspectRatio>
                </button>
              ) : (
                <div
                  style={{
                    background:
                      linearGradients[index % linearGradients.length],
                  }}
                  className="lg:hidden mt-6 h-48 w-full max-w-sm rounded-md"
                >
                  {item.content ?? null}
                </div>
              )}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      {data[activeCard].isImage ? (
        <button
          type="button"
          onClick={() => setLightboxContent(data[activeCard].content)}
          aria-label="Expand image"
          className="group hidden lg:block w-80 rounded-md sticky top-10 cursor-zoom-in overflow-hidden ring-offset-2 ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {data[activeCard].content ?? null}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white">
                <Maximize2 className="size-3.5" /> Expand
              </span>
            </div>
          </AspectRatio>
        </button>
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="size-5" />
                </button>
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                  className="relative flex max-h-[90vh] max-w-[92vw] cursor-zoom-out items-center justify-center [&_img]:!h-auto [&_img]:!max-h-[90vh] [&_img]:!w-auto [&_img]:!max-w-[92vw] [&_img]:rounded-lg [&_img]:!object-contain"
                >
                  {lightboxContent}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.div>
  );
};
