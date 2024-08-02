'use client';
import React, { useCallback, useEffect, useState } from 'react';
import SectionHeading from './ui/section-heading';
import Image from 'next/image';
import { StickyScroll } from './ui/sticky-scroll-reveal';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const projects = [
  {
    title: 'Pictionary With Friends',
    description: 'A multiplayer game inspired by Skribbl.io',
    tech: ['TypeScript, Next'],
    content: [
      {
        title: 'Collaborative Editing',
        description:
          'Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Collaborative Editing
          </div>
        ),
      },
      {
        title: 'Real time changes',
        description:
          'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src="/linear.webp"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      {
        title: 'Version control',
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Version control
          </div>
        ),
      },
    ],
  },
  {
    title: 'Pathfinding Visualizer',
    description: 'A multiplayer game inspired by Skribbl.io',
    tech: ['TypeScript, Next'],
    content: [
      {
        title: 'Collaborative Editing',
        description:
          'Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Collaborative Editing
          </div>
        ),
      },
      {
        title: 'Real time changes',
        description:
          'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src="/linear.webp"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      {
        title: 'Version control',
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Version control
          </div>
        ),
      },
    ],
  },
  {
    title: 'Pictionary With Friends',
    description: 'A multiplayer game inspired by Skribbl.io',
    tech: ['TypeScript, Next'],
    content: [
      {
        title: 'Collaborative Editing',
        description:
          'Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Collaborative Editing
          </div>
        ),
      },
      {
        title: 'Real time changes',
        description:
          'See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.',
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src="/photo.png"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      {
        title: 'Version control',
        description:
          "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Version control
          </div>
        ),
      },
    ],
  },
];

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const controls = useAnimationControls();

  const handleProjectChange = () => {};

  const renderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string,
  ): React.ReactNode => {
    return (
      <li
        style={{
          background: isSelected ? '#ccc' : '#000',
          width: 10,
          height: 10,
          borderRadius: '50%',
          display: 'inline-block',
          margin: '0 8px',
          cursor: 'pointer',
        }}
        aria-label={`Slide ${label}`}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="button"
        tabIndex={0}
        key={index}
      />
    );
  };

  return (
    <section id="projects" className="scroll-mt-6 mt-12 p-4">
      <SectionHeading>
        Some of my recent <span className="text-purple-300">Projects.</span>
      </SectionHeading>
      <div className="max-w-xl w-full">
        <Carousel
          renderIndicator={renderIndicator}
          onChange={() => handleProjectChange()}
          emulateTouch={true}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          {projects.map((proj, idx) => (
            <AnimatePresence key={idx}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                    >
                      {proj.title}
                    </motion.div>
                  </CardTitle>
                  <CardDescription>{proj.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <StickyScroll
                    projectTitle={proj.title}
                    projectDescription={proj.description}
                    data={proj.content}
                  />
                </CardContent>
              </Card>
            </AnimatePresence>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
