import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';

export const experiencesData = [
  {
    title: 'Computer Science Tutor',
    subtitle: 'Southwestern College',
    location: 'Chula Vista, CA',
    description:
      'I worked as a computer science tutor at Southwestern College. I helped students with their programming assignments and projects. I also held workshops on various programming topics.',
    icon: React.createElement(CgWorkAlt),
    date: '2021 - 2022',
  },
  {
    title: 'Research Assistant',
    subtitle: 'San Diego State University',
    location: 'San Diego, CA',
    description:
      'I worked as a research assistant at San Deigo State University. I worked on a project that involved optimizing data rates for a NOMA (Non-Orthogonal Multiple Access) system. I used Python and MATLAB for this project.',
    icon: React.createElement(CgWorkAlt),
    date: '2023',
  },

  {
    title: 'Attending San Diego State University',
    subtitle: 'Computer Science, Major GPA: 4.0',
    location: 'San Diego, CA',
    description:
      'I am currently attending San Diego State University, majoring in Computer Science. I am expected to graduate in 2025. I am currently looking for a summer internship.',
    icon: React.createElement(LuGraduationCap),
    date: '2023 - present',
  },

  {
    title: 'Internship at AcademicAssist',
    subtitle: 'Frontend Developer',
    location: 'San Diego, CA',
    description:
      'I am currently working as a frontend developer intern at AcademicAssist. I reworked their landing page, and added new features to their web app.',
    icon: React.createElement(CgWorkAlt),
    date: '2024',
  },

  {
    title: 'Paid Internship at San Diego State University',
    subtitle: 'Frontend Developer',
    location: 'San Diego, CA',
    description:
      'Currently building a website for the Computer Science department at San Deigo State University. Implemented authentication with auth.js.',
    icon: React.createElement(CgWorkAlt),
    date: '2024',
  },
  {
    title: 'Freelance Full-Stack Engineer',
    subtitle: 'Oak Outlet Plus',
    location: 'San Diego, CA',
    description:
      'Built a website for the local company Oak Outlet Plus. Utilized a full-stack approach with React, Next.js, TypeScript, Tailwind, Framer Motion and S3 for file storage.',
    icon: React.createElement(FaReact),
    date: '2024',
  },
];

export const projectsData = [
  {
    title: 'Pictionary',
    subtitle: 'Still in development',
    description:
      'Multiplayer game inspired by Skribbl.io. Using Go for WebSocket communication with the client.',
    tags: [
      'TypeScript',
      'Next.js',
      'Go',
      'Tailwind',
      'Prisma',
      'Framer Motion',
      'Zod',
    ],
    imageUrl: '/pictionary.png',
    href: 'https://pictionary-tan.vercel.app/',
  },
  {
    title: 'Pathfinding Visualizer',
    subtitle: 'Completed',
    description: 'Visualize pathfinding algorithms.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    imageUrl: '/pathfinding.png',
    href: 'https://algo-visualizer-nine.vercel.app/',
  },
  {
    title: 'Link Tree Clone',
    subtitle: 'Still in development',
    description: 'Link Tree Clone is a clone of the popular Link Tree website.',
    tags: [
      'TypeScript',
      'Next.js',
      'Postgres',
      'Tailwind',
      'Prisma',
      'Framer Motion',
    ],
    imageUrl: '/link-tree-clone.png',
    href: 'https://ltree-clone.vercel.app/',
  },
] as const;
