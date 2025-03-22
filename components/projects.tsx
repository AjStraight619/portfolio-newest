"use client";
import React, { useCallback, useEffect, useState } from "react";
import SectionHeading from "./ui/section-heading";
import Image from "next/image";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import pathfinding from "@/assets/pathfinding.png";
import pictionary from "@/assets/pictionary.png";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

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
      "A multiplayer game inspired by Skribbl.io. Developed using Go for WebSocket communication with the client. Currently in development. Will be available on iOS and Android soon.",
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
        title: "Real-Time Drawing",
        isImage: true,
        description:
          "Players can draw and guess in real-time, making the game interactive and engaging. The game uses WebSocket technology to ensure low-latency communication between players.",
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
        title: "Dynamic Gameplay",
        isImage: false,
        description:
          "The game dynamically adjusts the difficulty level and drawing prompts based on the number of players, ensuring a fun experience for everyone involved.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Dynamic Gameplay
          </div>
        ),
      },
      {
        title: "Leaderboard System",
        isImage: false,
        description:
          "A real-time leaderboard keeps track of player scores, adding a competitive element to the game. Players can see their ranking and strive to be the top guesser or artist.",
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
            Leaderboard System
          </div>
        ),
      },
    ],
  },
  {
    title: "Pathfinding Visualizer",
    githubLinks: ["https://github.com/AjStraight619/PathfindingVisualizer"],
    description:
      "A tool to visualize and compare various pathfinding algorithms.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    content: [
      {
        title: "Algorithm Visualization",
        isImage: true,
        description:
          "Visualize popular pathfinding algorithms like A*, Dijkstra, and BFS. See how each algorithm finds the shortest path in a grid-based layout.",
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
          "Create and modify grids with obstacles, start, and end points to see how different algorithms perform under various conditions. Currently implementing auto-generatable mazes to enhance the complexity and challenge of pathfinding.",
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
          "Interact with the visualizer by placing obstacles, changing start and end points, and watching the algorithms in action.",
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
      "A feature-rich Discord bot built with Go and DiscordGo. It integrates AI responses via OpenAI, fetches real-time news using NewsAPI, manages music playback in voice channels, and uses cron jobs for scheduled updates.",
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
          "Supports multiple commands such as AI queries, news updates, and music playback. Designed to handle real-time events and user interactions within Discord.",
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
          "Seamlessly joins voice channels to stream music and manage voice interactions using Go concurrency and DiscordGo.",
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
          "Integrates with external services such as OpenAI for intelligent responses and NewsAPI for up-to-date headlines. Cron jobs are used to send scheduled updates.",
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
