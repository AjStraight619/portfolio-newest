'use client';
import React, { useCallback, useEffect, useState } from 'react';
import SectionHeading from './ui/section-heading';
import Image from 'next/image';
import { StickyScroll } from './ui/sticky-scroll-reveal';
import pathfinding from '@/assets/pathfinding.png';
import pictionary from '@/assets/pictionary.png';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

// Description: On left side of container, Content: Right side of container

const projects = [
  {
    title: 'Pictionary',
    description:
      'A multiplayer game inspired by Skribbl.io. Developed using Go for WebSocket communication with the client.',
    tech: [
      'TypeScript',
      'Next.js',
      'Go',
      'Tailwind',
      'Prisma',
      'Framer Motion',
      'Zod',
    ],
    content: [
      {
        title: 'Real-Time Drawing',
        isImage: true,
        description:
          'Players can draw and guess in real-time, making the game interactive and engaging. The game uses WebSocket technology to ensure low-latency communication between players.',
        content: (
          <Image
            src={pictionary}
            className="rounded-md object-cover"
            quality={100}
            alt="Pictionary game screenshot"
          />
        ),
      },
      {
        title: 'Dynamic Gameplay',
        isImage: false,
        description:
          'The game dynamically adjusts the difficulty level and drawing prompts based on the number of players, ensuring a fun experience for everyone involved.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Dynamic Gameplay
          </div>
        ),
      },
      {
        title: 'Leaderboard System',
        isImage: false,
        description:
          'A real-time leaderboard keeps track of player scores, adding a competitive element to the game. Players can see their ranking and strive to be the top guesser or artist.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Leaderboard System
          </div>
        ),
      },
    ],
  },
  {
    title: 'Pathfinding Visualizer',
    description:
      'A tool to visualize and compare various pathfinding algorithms.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    content: [
      {
        title: 'Algorithm Visualization',
        isImage: true,
        description:
          'Visualize popular pathfinding algorithms like A*, Dijkstra, and BFS. See how each algorithm finds the shortest path in a grid-based layout.',
        content: (
          <Image
            src={pathfinding}
            className="rounded-md object-cover"
            quality={100}
            alt="Pathfinding Visualizer screenshot"
          />
        ),
      },
      {
        title: 'Customizable Grids',
        isImage: false,
        description:
          'Create and modify grids with obstacles, start, and end points to see how different algorithms perform under various conditions. Currently implementing auto-generatable mazes to enhance the complexity and challenge of pathfinding.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Customizable Grids
          </div>
        ),
      },
      {
        title: 'Interactive Demo',
        isImage: false,
        description:
          'Interact with the visualizer by placing obstacles, changing start and end points, and watching the algorithms in action.',
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Interactive Demo
          </div>
        ),
      },
    ],
  },
  // {
  //   title: 'Link Tree Clone',
  //   description:
  //     'A clone of the popular Link Tree website with additional customization options.',
  //   tech: [
  //     'TypeScript',
  //     'Next.js',
  //     'Postgres',
  //     'Tailwind',
  //     'Prisma',
  //     'Framer Motion',
  //   ],
  //   content: [
  //     {
  //       title: 'Customizable Links',
  //       description:
  //         'Users can customize the appearance and order of their links, making it easy to create a personalized landing page.',
  //       content: (
  //         <div className="h-full w-full flex items-center justify-center text-white">
  //           <Image
  //             src="/link-tree-clone.png"
  //             width={300}
  //             height={300}
  //             className="h-full w-full object-cover"
  //             alt="Link Tree Clone screenshot"
  //           />
  //         </div>
  //       ),
  //     },
  //     {
  //       title: 'Analytics Dashboard',
  //       description:
  //         'An integrated analytics dashboard allows users to track clicks and engagement on their links, providing insights into their audience.',
  //       content: (
  //         <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
  //           Analytics Dashboard
  //         </div>
  //       ),
  //     },
  //     {
  //       title: 'Responsive Design',
  //       description:
  //         'The site is fully responsive, ensuring that it looks great on all devices, from mobile phones to large desktop monitors.',
  //       content: (
  //         <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
  //           Responsive Design
  //         </div>
  //       ),
  //     },
  //   ],
  // },
];

const Projects = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 640);
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

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
    <section id="projects" className="scroll-mt-6 mt-16 p-4">
      <SectionHeading>
        Some of my recent <span className="text-purple-300">Projects.</span>
      </SectionHeading>
      <div>
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
