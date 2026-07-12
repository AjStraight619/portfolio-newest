import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const experiencesData = [
  {
    title: "Computer Science Tutor",
    subtitle: "Southwestern College",
    location: "Chula Vista, CA",
    description:
      "Provided tutoring support to computer science students at Southwestern College, assisting with programming assignments and projects. Conducted workshops on various programming languages and topics to enhance student understanding.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - 2022",
  },
  {
    title: "Research Assistant",
    subtitle: "San Diego State University",
    location: "San Diego, CA",
    description:
      "Contributed to a research project at San Diego State University focused on optimizing data rates for a Non-Orthogonal Multiple Access (NOMA) system. Utilized Python and MATLAB for data analysis and simulations.",
    icon: React.createElement(CgWorkAlt),
    date: "2023",
  },

  {
    title: "B.S. Computer Science",
    subtitle: "San Diego State University, Major GPA: 3.8",
    location: "San Diego, CA",
    description:
      "Graduated with a Bachelor’s degree in Computer Science from San Diego State University, maintaining a 3.8 Major GPA. Named to the Dean’s List three times.",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - 2025",
  },

  {
    title: "Frontend Developer Intern",
    subtitle: "AcademicAssist",
    location: "San Diego, CA",
    description:
      "Serving as a frontend developer intern at AcademicAssist, leading the redesign of the landing page and implementing new features to enhance the functionality of the web app.",
    icon: React.createElement(CgWorkAlt),
    date: "2024",
  },

  {
    title: "Teaching Assistant",
    subtitle: "San Diego State University",
    location: "San Diego, CA",
    description:
      "Served as a Teaching Assistant for the Data Structures & Algorithms and Advanced Algorithms courses at San Diego State University, holding office hours, leading review sessions, and helping students work through assignments and core concepts.",
    icon: React.createElement(CgWorkAlt),
    date: "2024 - 2025",
  },
  {
    title: "Freelance Full-Stack Engineer",
    subtitle: "Oak Outlet Plus",
    location: "San Diego, CA",
    description:
      "Designed and developed a full-stack website for Oak Outlet Plus, a local business, using React, Next.js, TypeScript, Tailwind, Framer Motion, and S3 for file storage.",
    icon: React.createElement(FaReact),
    date: "2024",
  },
  {
    title: "Software Engineer",
    subtitle: "Sansay Inc",
    location: "La Jolla, San Diego, CA",
    description:
      "Building an AI support agent (LangGraph/Node.js) that automates telecom configuration for Sansay’s VSXi platform through internal system integration, schema validation, and real-time simulation. Developing a hybrid search and ranking system over internal documentation and support tickets using full-text search, vector search, and neural reranking to improve answer quality. Improving backend integration, data flow, and reliability across legacy and modern parts of a production support platform.",
    icon: React.createElement(CgWorkAlt),
    date: "June 2025 - Present",
  },
];

export const projectsData = [
  {
    title: "Pictionary",
    subtitle: "Still in development",
    description:
      "Multiplayer game inspired by Skribbl.io. Using Go for WebSocket communication with the client.",
    tags: [
      "TypeScript",
      "Next.js",
      "Go",
      "Tailwind",
      "Prisma",
      "Framer Motion",
      "Zod",
    ],
    imageUrl: "/pictionary.png",
    href: "https://pictionary-tan.vercel.app/",
  },
  {
    title: "Pathfinding Visualizer",
    subtitle: "Completed",
    description: "Visualize pathfinding algorithms.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    imageUrl: "/pathfinding.png",
    href: "https://algo-visualizer-nine.vercel.app/",
  },
  {
    title: "Link Tree Clone",
    subtitle: "Still in development",
    description: "Link Tree Clone is a clone of the popular Link Tree website.",
    tags: [
      "TypeScript",
      "Next.js",
      "Postgres",
      "Tailwind",
      "Prisma",
      "Framer Motion",
    ],
    imageUrl: "/link-tree-clone.png",
    href: "https://ltree-clone.vercel.app/",
  },
] as const;
