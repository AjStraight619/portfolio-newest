'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion';

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconCode,
  IconBriefcase,
} from '@tabler/icons-react';
import { EvervaultCard } from './ui/evervault-card';
import { tech } from '@/lib/constants';
import SectionHeading from './ui/section-heading';

const TechStack = () => {
  const [isHovering, setIsHovering] = useState(false);

  const container = {
    hidden: {
      opacity: 0.5,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const items = {
    hidden: {
      opacity: 0.5,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full h-full"
    >
      <motion.ul
        variants={container}
        initial="hidden"
        animate={isHovering ? 'animate' : 'hidden'}
        className="flex items-center gap-2 flex-wrap justify-center w-full mx-auto h-full"
      >
        {tech.map((item, idx) => (
          <motion.li className="size-8 " variants={items} key={idx}>
            {item.icon}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

const CareerInterests = () => {
  return (
    <div className="sm:h-full max-h-[10rem]">
      <p className="text-balance">
        My primary interest lies in front-end development, where I enjoy
        creating intuitive and dynamic user interfaces. However, as I have
        gained experience with Go, I have also developed a strong interest in
        backend development. This dual focus allows me to appreciate the full
        spectrum of software development, from designing seamless user
        experiences to building robust and scalable server-side applications.
        Additionally, I am excited about exploring areas such as cloud computing
        and DevOps, where I can leverage my skills in both front-end and
        back-end development to create comprehensive and efficient solutions.
      </p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-12 scroll-mt-6 hover:scroll-mt-0">
      <SectionHeading>
        About <span className="text-purple-300">Me.</span>
      </SectionHeading>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: 'Career Interests',
    description:
      'My interests span various tech careers, continually growing as I learn more. Always willing to learn more.',
    header: <CareerInterests />,
    className: 'md:col-span-2',
    icon: <IconBriefcase className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Tech Stack',
    description: 'Some technolgies I am familiar with, some more than others.',
    header: <TechStack />,
    className: 'md:col-span-1',
    icon: <IconCode className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'San Diego State University',
    description: 'Bachelor of Science in Computer Science, Expected May 2025.',
    header: (
      <EvervaultCard className="h-full max-h-[8rem]" text="4.0 Major GPA" />
    ),
    className: 'md:col-span-1',
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Achievments',
    description: 'Highlights of my academic and professional accomplishments.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

export default About;

// TODO: MAKE A CLEANER IMPLEMENTATION OF THIS LATER

// const ref = useRef(null);
// const isInView = useInView(ref, { once: false });
// const [isHovering, setIsHovering] = useState(false);
// const [scrollY, setScrollY] = useState(0);
// const motionScrolly = useMotionValue(0);

// useEffect(() => {
//   if (!isInView) {
//     setScrollY(0);
//   }
// }, [isInView]);

// useEffect(() => {
//   if (!isHovering) {
//     setScrollY(0);
//   }
// }, [isHovering]);

// useEffect(() => {
//   console.log('Element is in view: ', isInView);
// }, [isInView]);

// const handleScroll = useCallback(() => {
//   if (isInView && !isHovering) {
//     setScrollY(prev => (prev <= -100 ? 0 : prev - 0.25));
//   } else if (isInView && isHovering) {
//     setScrollY(prev => (prev <= -200 ? 0 : prev - 1));
//   }
// }, [isHovering, isInView]);

// useEffect(() => {
//   const interval = setInterval(handleScroll, 50);
//   return () => clearInterval(interval);
// }, [isInView, isHovering, handleScroll]);
