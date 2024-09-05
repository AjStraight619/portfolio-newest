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
      'Provided tutoring support to computer science students at Southwestern College, assisting with programming assignments and projects. Conducted workshops on various programming languages and topics to enhance student understanding.',
    icon: React.createElement(CgWorkAlt),
    date: '2021 - 2022',
  },
  {
    title: 'Research Assistant',
    subtitle: 'San Diego State University',
    location: 'San Diego, CA',
    description:
      'Contributed to a research project at San Diego State University focused on optimizing data rates for a Non-Orthogonal Multiple Access (NOMA) system. Utilized Python and MATLAB for data analysis and simulations.',
    icon: React.createElement(CgWorkAlt),
    date: '2023',
  },

  {
    title: 'Computer Science Student',
    subtitle: 'San Diego State University, Major GPA: 4.0',
    location: 'San Diego, CA',
    description:
      'Currently pursuing a Bachelor’s degree in Computer Science at San Diego State University, maintaining a 4.0 GPA. Expected graduation in 2025, actively seeking summer internship opportunities.',
    icon: React.createElement(LuGraduationCap),
    date: '2023 - present',
  },

  {
    title: 'Frontend Developer Intern',
    subtitle: 'AcademicAssist',
    location: 'San Diego, CA',
    description:
      'Serving as a frontend developer intern at AcademicAssist, leading the redesign of the landing page and implementing new features to enhance the functionality of the web app.',
    icon: React.createElement(CgWorkAlt),
    date: '2024',
  },

  {
    title: 'Frontend Developer Intern',
    subtitle: 'San Diego State University',
    location: 'San Diego, CA',
    description:
      'Developing a website for the Computer Science department at San Diego State University, incorporating authentication mechanisms using auth.js.',
    icon: React.createElement(CgWorkAlt),
    date: '2024',
  },
  {
    title: 'Freelance Full-Stack Engineer',
    subtitle: 'Oak Outlet Plus',
    location: 'San Diego, CA',
    description:
      'Designed and developed a full-stack website for Oak Outlet Plus, a local business, using React, Next.js, TypeScript, Tailwind, Framer Motion, and S3 for file storage.',
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
