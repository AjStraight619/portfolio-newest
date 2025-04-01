import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiAmazonaws,
  SiFramer,
  SiGo,
  SiHtml5,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
  SiZod,
  SiZig,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import React from "react";

export const COMMON_FRONTEND_TECH = ["Tailwind CSS", "Framer Motion"];

export const tech = [
  {
    label: "TypeScript",
    icon: React.createElement(SiTypescript, { color: "#3178C6", size: "100%" }),
  },
  {
    label: "Go",
    icon: React.createElement(FaGolang, { color: "#00ADD8", size: "100%" }),
  },
  {
    label: "React",
    icon: React.createElement(FaReact, { color: "#61DAFB", size: "100%" }),
  },
  {
    label: "Next.JS",
    icon: React.createElement(RiNextjsFill, { color: "#FFF00", size: "100%" }),
  },
  {
    label: "Tailwind",
    icon: React.createElement(SiTailwindcss, {
      color: "#38B2AC",
      size: "100%",
    }),
  },
  {
    label: "HTML5",
    icon: React.createElement(SiHtml5, { color: "#E34F26", size: "100%" }),
  },
  {
    label: "Zod",
    icon: React.createElement(SiZod, { color: "#FF0000", size: "100%" }),
  },
  {
    label: "Framer Motion",
    icon: React.createElement(SiFramer, { color: "#0055FF", size: "100%" }),
  },
  {
    label: "AWS",
    icon: React.createElement(SiAmazonaws, { color: "#FF9900", size: "100%" }),
  },
  {
    label: "Prisma",
    icon: React.createElement(SiPrisma, { color: "#2D3748", size: "100%" }),
  },
  {
    label: "Zig",
    icon: React.createElement(SiZig, { color: "#F7A41D", size: "100%" }),
  },
];
