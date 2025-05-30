"use client";
import React from "react";
import SectionHeading from "./ui/section-heading";
import Image from "next/image";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import pathfinding from "@/assets/pathfinding.png";
import pictionaryLanding from "@/assets/pictionary-landing.png";
import pictionaryGameplay from "@/assets/pictionary-gameplay.png";
import zig2d1 from "@/assets/zig2d_1.gif";
import zig2d2 from "@/assets/zig2d_2.gif";
import { AnimatePresence, motion } from "framer-motion";
import { tech } from "@/lib/constants";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FaGithub } from "react-icons/fa";

// Description: On left side of container, Content: Right side of container

const projects = [
  {
    title: "Pictionary",
    githubLinks: ["https://github.com/AjStraight619/pictionary"],
    description:
      "My take on the classic drawing and guessing game, similar to Skribbl.io. Built the backend with Go to handle real-time WebSocket connections between players. Still working on it, but planning to release mobile versions for iOS and Android.",
    tech: [
      "TypeScript",
      "Next.js",
      "React Native",
      "Go",
      "Tailwind",
      "Prisma",
      "Framer Motion",
      "Zod",
    ],
    content: [
      {
        title: "Landing Page",
        isImage: true,
        description:
          "Clean, simple landing page where players can join rooms and start drawing. The real magic happens with WebSocket connections that let everyone see drawings in real-time as they're being made.",
        content: (
          <Image
            src={pictionaryLanding}
            className="rounded-md object-cover"
            quality={100}
            alt="Pictionary game screenshot"
          />
        ),
      },
      {
        title: "Dynamic Gameplay",
        isImage: true,
        description:
          "Turn-based drawing game where players take turns sketching while others guess. Built a custom canvas with drag-and-drop functionality, undo/redo controls, and real-time drawing sync. The Go backend handles all WebSocket communication between players.",
        content: (
          <Image
            src={pictionaryGameplay}
            className="rounded-md object-cover"
            quality={100}
            alt="Pictionary game screenshot"
          />
        ),
      },
      {
        title: "Leaderboard System",
        isImage: false,
        description:
          "Currently implementing a live leaderboard that tracks player scores and statistics across multiple rounds. Updates in real-time as players guess correctly and earn points.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Currently Being Implemented
          </div>
        ),
      },
    ],
  },
  {
    title: "2D Physics Engine",
    githubLinks: ["https://github.com/AjStraight619/Zig2DEngine"],
    description:
      "A physics engine I built from scratch using Zig and raylib. Handles gravity, collisions, and object movement. Wanted to understand how physics engines actually work under the hood.",
    tech: ["Zig", "raylib"],
    content: [
      {
        title: "Impulse-Based Collision System",
        isImage: true,
        description:
          "Built a collision system that handles bouncing, friction, and objects coming to rest. Implements impulse-based physics calculations for realistic interactions between different geometric shapes.",
        content: (
          <Image
            src={zig2d1}
            className="rounded-md object-cover"
            quality={100}
            unoptimized={true}
            alt="Physics engine collision demo"
          />
        ),
      },
      {
        title: "Real-Time Debug Visualization",
        isImage: true,
        description:
          "Added visual debugging tools so I could actually see what was happening during collisions. Shows contact points, velocity vectors, and collision normals - super helpful when things weren't working right.",
        content: (
          <Image
            src={zig2d2}
            className="rounded-md object-cover"
            quality={100}
            unoptimized={true}
            alt="Physics engine debug visualization"
          />
        ),
      },
      {
        title: "Built in Zig with raylib",
        isImage: false,
        description:
          "Wrote everything from scratch in Zig without using any physics libraries. Was a great way to learn both low-level programming and the math behind physics simulations.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--green-500),var(--lime-500))] flex items-center justify-center text-white">
            Zig Implementation
          </div>
        ),
      },
    ],
  },
  {
    title: "Pathfinding Visualizer",
    githubLinks: ["https://github.com/AjStraight619/PathfindingVisualizer"],
    description:
      "A visual tool for comparing different pathfinding algorithms like A*, Dijkstra, and BFS. Built it to better understand how these algorithms work and which ones perform best in different scenarios.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    content: [
      {
        title: "Algorithm Visualization",
        isImage: true,
        description:
          "Watch algorithms like A*, Dijkstra, and BFS find the shortest path in real-time. Each algorithm explores the grid differently - some are fast, others are thorough.",
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
        title: "Customizable Grids",
        isImage: false,
        description:
          "Draw walls, move start and end points around, and see how different algorithms handle various maze layouts. Working on auto-generated mazes to make testing more interesting.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Customizable Grids
          </div>
        ),
      },
      {
        title: "Interactive Demo",
        isImage: false,
        description:
          "Click around to create obstacles, drag the start and end points, then watch the algorithms do their thing. Much more fun than just reading about them in textbooks.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Interactive Demo
          </div>
        ),
      },
    ],
  },

  {
    title: "Discord Bot",
    githubLinks: ["https://github.com/AjStraight619/discord-bot"],
    description:
      "A Discord bot written in Go that does a bunch of useful stuff. Connects to OpenAI for smart responses, fetches news from NewsAPI, plays music in voice channels, and sends scheduled updates using cron jobs.",
    tech: [
      "Go",
      "DiscordGo",
      "OpenAI API",
      "NewsAPI",
      "Cron",
      "REST",
      "WebSocket",
    ],
    content: [
      {
        title: "Multi-Command Functionality",
        isImage: false,
        description:
          "Handles a variety of commands - from asking AI questions to getting the latest news. Built it to be responsive and handle multiple users simultaneously without breaking a sweat.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--indigo-500))] flex items-center justify-center text-white">
            Multi-Command Functionality
          </div>
        ),
      },
      {
        title: "Voice & Music Integration",
        isImage: false,
        description:
          "Can join voice channels and stream music for the server. Used Go's concurrency features to handle audio streaming without blocking other bot functions.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--teal-500))] flex items-center justify-center text-white">
            Voice & Music Integration
          </div>
        ),
      },
      {
        title: "API Integrations & Scheduled Updates",
        isImage: false,
        description:
          "Pulls data from OpenAI and NewsAPI to keep conversations interesting and informative. Set up cron jobs for scheduled messages so the bot can send daily updates automatically.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--green-500),var(--lime-500))] flex items-center justify-center text-white">
            API Integrations & Scheduled Updates
          </div>
        ),
      },
    ],
  },
];

const Projects = () => {
  const renderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ): React.ReactNode => {
    return (
      <li
        style={{
          background: isSelected ? "#ccc" : "#000",
          width: 10,
          height: 10,
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 8px",
          cursor: "pointer",
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
          emulateTouch={true}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          {projects.map((proj, idx) => (
            <AnimatePresence key={idx}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
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
                        <div className="flex flex-row items-center gap-x-2">
                          {proj.title}
                          {proj.githubLinks?.map((url, idx) => (
                            <GitHubLink key={idx} url={url} />
                          ))}
                        </div>
                      </motion.div>
                    </CardTitle>
                    <ProjectTechIcons technologies={proj.tech} />
                  </div>
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

function GitHubLink({ url }: { url: string }) {
  return (
    <a href={url} target="_blank">
      <FaGithub />
    </a>
  );
}

function ProjectTechIcons({ technologies }: { technologies: string[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  // Find matching icons from tech constant
  const getIconForTech = (techName: string) => {
    const techItem = tech.find(
      (t) => t.label.toLowerCase() === techName.toLowerCase()
    );
    return techItem?.icon;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-2 justify-end"
    >
      {technologies.map((techName, index) => {
        const icon = getIconForTech(techName);
        return icon ? (
          <motion.div
            key={index}
            variants={item}
            className="size-5 flex items-center justify-center"
            title={techName}
          >
            {icon}
          </motion.div>
        ) : null;
      })}
    </motion.div>
  );
}
