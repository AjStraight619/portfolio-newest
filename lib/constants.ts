import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiAmazonaws,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiHtml5,
  SiLinux,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiZig,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { Waypoints } from "lucide-react";
import React from "react";

export const COMMON_FRONTEND_TECH = ["Tailwind CSS", "Framer Motion"];

export const tech = [
  {
    label: "TypeScript",
    icon: React.createElement(SiTypescript, { color: "#3178C6", size: "100%" }),
  },
  {
    label: "Node.js",
    icon: React.createElement(SiNodedotjs, { color: "#5FA04E", size: "100%" }),
  },
  {
    label: "Go",
    icon: React.createElement(FaGolang, { color: "#00ADD8", size: "100%" }),
  },
  {
    label: "Zig",
    icon: React.createElement(SiZig, { color: "#F7A41D", size: "100%" }),
  },
  {
    label: "Express",
    icon: React.createElement(SiExpress, { color: "#9CA3AF", size: "100%" }),
  },
  {
    label: "React",
    icon: React.createElement(FaReact, { color: "#61DAFB", size: "100%" }),
  },
  {
    label: "Next.JS",
    icon: React.createElement(RiNextjsFill, { color: "#FFFFFF", size: "100%" }),
  },
  {
    label: "Docker",
    icon: React.createElement(SiDocker, { color: "#2496ED", size: "100%" }),
  },
  {
    label: "Git",
    icon: React.createElement(SiGit, { color: "#F05032", size: "100%" }),
  },
  {
    label: "Linux",
    icon: React.createElement(SiLinux, { color: "#FCC624", size: "100%" }),
  },
  {
    label: "AWS",
    icon: React.createElement(SiAmazonaws, { color: "#FF9900", size: "100%" }),
  },
  {
    label: "LangChain",
    icon: React.createElement(Waypoints, { color: "#4B9E91", size: "100%" }),
  },
  {
    label: "Tailwind",
    icon: React.createElement(SiTailwindcss, {
      color: "#38B2AC",
      size: "100%",
    }),
  },
  {
    label: "Framer Motion",
    icon: React.createElement(SiFramer, { color: "#0055FF", size: "100%" }),
  },
  {
    label: "HTML5",
    icon: React.createElement(SiHtml5, { color: "#E34F26", size: "100%" }),
  },
];
