"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  ChevronDown,
  ExternalLink,
  GitPullRequest,
  Maximize2,
  MessageSquare,
  Music,
  Newspaper,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import SectionHeading from "./ui/section-heading";
import { tech } from "@/lib/constants";
import { cn } from "@/lib/utils";

import pathfinding from "@/assets/pathfinding.png";
import pictionaryLanding from "@/assets/pictionary-landing.png";
import pictionaryLobby from "@/assets/pictionary-lobby.png";
import pictionaryWordSelect from "@/assets/pictionary-word-select.png";
import pictionaryGameplay from "@/assets/pictionary-gameplay.png";
import zig2d1 from "@/assets/zig2d_1.gif";
import zig2d2 from "@/assets/zig2d_2.gif";
import zwag1 from "@/assets/zwag_1.png";
import zwag2 from "@/assets/zwag_2.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Media = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Letterbox color behind the image, matched to the screenshot's edges. */
  bg: string;
  animated?: boolean;
};

type Highlight = {
  title: string;
  description: string;
  /** Index into `media` to show when this highlight is opened. */
  media?: number;
};

type Status = { label: string; tone: "dev" | "merged" | "live" | "oss" };

type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "live" | "prs";
};

type Project = {
  id: string;
  title: string;
  tagline: string;
  status: Status;
  description: string;
  tech: string[];
  links: ProjectLink[];
  media: Media[];
  highlights: Highlight[];
  /** Accent color (hex) for glows, dots and the active tab. */
  accent: string;
  /** Illustration used when a project has no screenshots. */
  art?: "ghostty" | "discord";
};

const projects: Project[] = [
  {
    id: "zwag",
    title: "zwag",
    tagline: "Terminal coding agent, 100% Zig",
    status: { label: "In development · closed source", tone: "dev" },
    description:
      "A TUI coding agent I'm building in pure Zig: a command-line AI assistant you chat with right in your terminal. I built it as an internal tool for work and my own daily driver, because I didn't want to be locked into Codex or Claude Code and wanted a serious Zig project to sink my teeth into.",
    tech: ["Zig", "libvaxis", "Anthropic API"],
    links: [],
    accent: "#F7A41D",
    media: [
      {
        src: zwag1,
        alt: "zwag TUI coding agent session with banner and capabilities",
        caption: "session",
        bg: "#010304",
      },
      {
        src: zwag2,
        alt: "zwag explaining its scrollback-aware renderer",
        caption: "renderer walkthrough",
        bg: "#010304",
      },
    ],
    highlights: [
      {
        title: "Terminal-native coding agent",
        media: 0,
        description:
          "Reads and edits workspace files, searches by content or pattern, and grounds its answers in your actual code. Ships with session management and slash commands (/sessions, /clear, /help), and can resume your latest session with --latest.",
      },
      {
        title: "Scrollback-aware renderer",
        media: 1,
        description:
          "Finished messages are committed as raw ANSI straight into the terminal's real scrollback and never redrawn, while the live region (input, pickers, session browser) repaints in place with libvaxis. Synchronized updates batch both into one atomic frame, so there's no flicker.",
      },
      {
        title: "Compile-time tool schemas",
        description:
          "Each tool's JSON Schema and argument parser are generated from the same Zig struct at compile time, so the schema the model sees and the validation of its calls can never drift apart.",
      },
      {
        title: "Built from scratch",
        description:
          "libvaxis is the only dependency. It targets the Anthropic API today, with OpenAI and Ollama support on the way. Fast, low-overhead, and fully under my control, which is the whole reason I started it.",
      },
    ],
  },
  {
    id: "ghostty",
    title: "Ghostty",
    tagline: "Open source contributions to a Zig terminal emulator",
    status: { label: "Merged upstream", tone: "merged" },
    description:
      "Contributions to Ghostty, the fast, native terminal emulator written in Zig. I worked in its terminal state and input handling to improve hyperlink support and add an xterm cursor mode.",
    tech: ["Zig"],
    links: [
      {
        label: "Merged PRs",
        href: "https://github.com/ghostty-org/ghostty/pulls?q=is%3Apr+author%3AAjStraight619+is%3Amerged",
        kind: "prs",
      },
    ],
    accent: "#A78BFA",
    media: [],
    art: "ghostty",
    highlights: [
      {
        title: "OSC 8 hyperlinks",
        description:
          "Improved OSC 8 hyperlinks with cross-platform modifier detection and accurate URI copying.",
      },
      {
        title: "Mode 1048",
        description:
          "Added mode 1048 to save and restore the cursor position without switching to the alternate screen.",
      },
    ],
  },
  {
    id: "pictionary",
    title: "Pictionary",
    tagline: "Real-time multiplayer drawing game",
    status: { label: "Playable · in development", tone: "live" },
    description:
      "My take on the classic draw-and-guess game. A Go server built on Echo and gorilla/websocket runs every room in real time, syncing strokes, guesses, timers, and scores between players, with Postgres and Redis behind it. A React Native version is in early development.",
    tech: [
      "TypeScript",
      "React",
      "Go",
      "WebSocket",
      "Fabric.js",
      "PostgreSQL",
      "Redis",
      "Tailwind",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/AjStraight619/pictionary",
        kind: "github",
      },
      {
        label: "Live demo",
        href: "https://pictionary-tan.vercel.app/",
        kind: "live",
      },
    ],
    accent: "#7AA2D6",
    media: [
      {
        src: pictionaryGameplay,
        alt: "Pictionary turn in progress, seen by a guesser",
        caption: "live turn",
        bg: "#F8F6F1",
      },
      {
        src: pictionaryLobby,
        alt: "Pictionary lobby with three ready players",
        caption: "lobby",
        bg: "#BBBCB6",
      },
      {
        src: pictionaryWordSelect,
        alt: "Pictionary word selection dialog",
        caption: "word pick",
        bg: "#BBBCB6",
      },
      {
        src: pictionaryLanding,
        alt: "Pictionary landing page",
        caption: "landing page",
        bg: "#F8F6F1",
      },
    ],
    highlights: [
      {
        title: "Real-time drawing sync",
        media: 0,
        description:
          "Strokes stream from the drawer's Fabric.js canvas to every guesser over WebSockets, along with the drawer's live cursor, chat guesses, letter hints, and the turn timer.",
      },
      {
        title: "Rooms and lobbies",
        media: 1,
        description:
          "Create a room, share the code, and ready up. The host decides when to start, and players who drop can rejoin within a reconnection grace period.",
      },
      {
        title: "Race-free game loop",
        media: 2,
        description:
          "The drawer picks one of three words before the clock runs out. The Go backend runs rounds, timers, word selection, and state snapshots without races.",
      },
      {
        title: "Sketchbook redesign",
        media: 3,
        description:
          "A light sketchbook look with hand-drawn doodles on the landing page, plus accounts with sign-up and sign-in.",
      },
    ],
  },
  {
    id: "physics",
    title: "2D Physics Engine",
    tagline: "Rigid-body physics from scratch in Zig",
    status: { label: "Open source", tone: "oss" },
    description:
      "A rigid-body physics engine written from scratch in Zig with raylib. It handles gravity, collisions, and objects coming to rest, using the Separating Axis Theorem for collision detection. I wanted to understand how physics engines actually work under the hood.",
    tech: ["Zig", "raylib"],
    links: [
      {
        label: "Source",
        href: "https://github.com/AjStraight619/Zig2DEngine",
        kind: "github",
      },
    ],
    accent: "#84CC16",
    media: [
      {
        src: zig2d1,
        alt: "Physics engine collision demo",
        caption: "collisions",
        bg: "#4D5600",
        animated: true,
      },
      {
        src: zig2d2,
        alt: "Physics engine debug visualization",
        caption: "debug overlay",
        bg: "#4D5600",
        animated: true,
      },
    ],
    highlights: [
      {
        title: "Impulse-based collisions",
        media: 0,
        description:
          "Collision detection with the Separating Axis Theorem and impulse-based resolution handle bouncing, friction, and objects coming to rest across different shapes.",
      },
      {
        title: "Real-time debug visualization",
        media: 1,
        description:
          "Visual debugging shows contact points, velocity vectors, and collision normals, which was a lifesaver when things weren't working right.",
      },
      {
        title: "No physics libraries",
        description:
          "Everything is written from scratch in Zig, which made it a great way to learn both low-level programming and the math behind physics simulation.",
      },
    ],
  },
  {
    id: "pathfinding",
    title: "Pathfinding Visualizer",
    tagline: "Watch A*, Dijkstra, and BFS race",
    status: { label: "Open source", tone: "oss" },
    description:
      "A visual tool for comparing pathfinding algorithms like A*, Dijkstra, and BFS. I built it to better understand how these algorithms work and which ones perform best in different scenarios.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    links: [
      {
        label: "Source",
        href: "https://github.com/AjStraight619/PathfindingVisualizer",
        kind: "github",
      },
      {
        label: "Live demo",
        href: "https://algo-visualizer-nine.vercel.app/",
        kind: "live",
      },
    ],
    accent: "#22D3EE",
    media: [
      {
        src: pathfinding,
        alt: "Pathfinding Visualizer grid mid-search",
        caption: "visualizer",
        bg: "#121826",
      },
    ],
    highlights: [
      {
        title: "Algorithm visualization",
        media: 0,
        description:
          "Watch each algorithm find the shortest path in real time. Each one explores the grid differently: some are fast, others are thorough.",
      },
      {
        title: "Customizable grids",
        description:
          "Draw walls, move the start and end points, and see how each algorithm handles different maze layouts.",
      },
      {
        title: "Interactive demo",
        description:
          "Click around to create obstacles, drag the endpoints, then watch the algorithms do their thing. Much more fun than reading about them in a textbook.",
      },
    ],
  },
  {
    id: "discord",
    title: "Discord Bot",
    tagline: "Go bot with AI, news, and music",
    status: { label: "Open source", tone: "oss" },
    description:
      "A Discord bot written in Go that does a bunch of useful stuff: it connects to OpenAI for smart responses, fetches news from NewsAPI, plays music in voice channels, and sends scheduled updates with cron jobs.",
    tech: ["Go", "DiscordGo", "OpenAI API", "NewsAPI", "Cron", "WebSocket"],
    links: [
      {
        label: "Source",
        href: "https://github.com/AjStraight619/discord-bot",
        kind: "github",
      },
    ],
    accent: "#5865F2",
    media: [],
    art: "discord",
    highlights: [
      {
        title: "Multi-command bot",
        description:
          "Handles everything from AI questions to the latest news, and stays responsive with many users at once.",
      },
      {
        title: "Voice and music",
        description:
          "Joins voice channels and streams music, using Go's concurrency so audio never blocks the bot's other work.",
      },
      {
        title: "Scheduled updates",
        description:
          "Pulls from OpenAI and NewsAPI, and cron jobs post daily updates automatically.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const Projects = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<{ project: number; media: number } | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportHeight, setViewportHeight] = useState<number>();

  // Size the viewport to the active slide so short projects don't inherit
  // the tallest slide's empty space. Tracks accordion/resize changes too.
  useEffect(() => {
    const slide = slideRefs.current[selected];
    if (!slide) return;
    const update = () => setViewportHeight(slide.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(slide);
    return () => ro.disconnect();
  }, [selected]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla]);

  // Keep the active tab visible in the (horizontally scrollable) tab strip
  // without moving the page vertically.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    if (!strip || !tab) return;
    const left = tab.offsetLeft - (strip.clientWidth - tab.clientWidth) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [selected]);

  const scrollTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);
  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (lightbox) return; // arrows belong to the lightbox while it's open
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section id="projects" className="scroll-mt-6 mt-16 w-full">
      <SectionHeading>
        Some of my recent <span className="text-purple-300">Projects.</span>
      </SectionHeading>

      {/* Project tabs */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Projects"
        className="relative mx-auto mb-6 flex max-w-full gap-1 overflow-x-auto rounded-full border bg-muted/40 p-1 [scrollbar-width:none] sm:w-fit [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            data-index={i}
            aria-selected={selected === i}
            onClick={() => scrollTo(i)}
            className={cn(
              "relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
              selected === i
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected === i && (
              <motion.span
                layoutId="project-tab-pill"
                className="absolute inset-0 rounded-full border bg-background shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: p.accent }}
              />
              {p.title}
            </span>
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Project showcase"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
      >
        <div
          ref={viewportRef}
          className="overflow-hidden transition-[height] duration-300 ease-out"
          style={{ height: viewportHeight }}
        >
          <div className="flex touch-pan-y items-start">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${projects.length}: ${p.title}`}
                className="min-w-0 shrink-0 grow-0 basis-full px-1 sm:px-2 lg:basis-[92%]"
              >
                <ProjectSlide
                  project={p}
                  index={i}
                  total={projects.length}
                  active={selected === i}
                  onOpenMedia={(m) => setLightbox({ project: i, media: m })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4 px-1">
        <NavButton label="Previous project" onClick={prev}>
          <ArrowLeft className="size-4" />
        </NavButton>
        <div className="flex flex-1 items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.title}`}
                onClick={() => scrollTo(i)}
                className="group py-2"
              >
                <span
                  className={cn(
                    "block h-1 rounded-full transition-all duration-300",
                    selected === i
                      ? "w-8"
                      : "w-3 bg-muted-foreground/25 group-hover:bg-muted-foreground/50",
                  )}
                  style={selected === i ? { backgroundColor: p.accent } : undefined}
                />
              </button>
            ))}
          </div>
          <span className="font-primary text-xs tabular-nums text-muted-foreground">
            {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <NavButton label="Next project" onClick={next}>
          <ArrowRight className="size-4" />
        </NavButton>
      </div>

      <Lightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onChange={(media) => setLightbox((s) => (s ? { ...s, media } : s))}
      />
    </section>
  );
};

export default Projects;

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

function ProjectSlide({
  project,
  index,
  total,
  active,
  onOpenMedia,
}: {
  project: Project;
  index: number;
  total: number;
  active: boolean;
  onOpenMedia: (media: number) => void;
}) {
  const [openHighlight, setOpenHighlight] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);

  const selectHighlight = (i: number) => {
    setOpenHighlight((cur) => (cur === i ? -1 : i));
    const m = project.highlights[i]?.media;
    if (m !== undefined) setActiveMedia(m);
  };

  const selectMedia = (m: number) => {
    setActiveMedia(m);
    const h = project.highlights.findIndex((x) => x.media === m);
    if (h !== -1) setOpenHighlight(h);
  };

  return (
    <article
      aria-hidden={!active}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card transition-[opacity,transform] duration-500",
        active ? "opacity-100" : "opacity-40 lg:scale-[0.97]",
      )}
    >
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full opacity-[0.12] blur-3xl"
        style={{ backgroundColor: project.accent }}
      />

      <div className="relative p-5 sm:p-7">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-primary tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          {project.links.length > 0 && (
            <div className="flex shrink-0 flex-wrap gap-2">
              {project.links.map((l) => (
                <LinkButton key={l.href} link={l} tabbable={active} />
              ))}
            </div>
          )}
        </header>

        {/* Body */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <div className="min-w-0">
            {project.media.length > 0 ? (
              <MediaViewer
                project={project}
                active={activeMedia}
                onSelect={selectMedia}
                onOpen={() => onOpenMedia(activeMedia)}
                tabbable={active}
              />
            ) : (
              <ArtFrame project={project} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <ul className="mt-5 divide-y rounded-xl border bg-background/40">
              {project.highlights.map((h, i) => {
                const open = openHighlight === i;
                return (
                  <li key={h.title}>
                    <button
                      type="button"
                      tabIndex={active ? 0 : -1}
                      onClick={() => selectHighlight(i)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-300/60"
                    >
                      <span
                        className="font-primary text-xs tabular-nums transition-colors"
                        style={{ color: open ? project.accent : undefined }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{h.title}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 text-muted-foreground transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 pl-[3.25rem] text-sm leading-relaxed text-muted-foreground">
                            {h.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Tech */}
        <ul className="mt-6 flex flex-wrap gap-2 border-t pt-5">
          {project.tech.map((t) => (
            <TechChip key={t} name={t} />
          ))}
        </ul>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

function WindowChrome({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-neutral-900 px-3">
      <div className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="flex-1 truncate text-center font-primary text-[11px] text-neutral-400">
        {title}
      </span>
      <span className="w-[42px] text-right font-primary text-[11px] tabular-nums text-neutral-500">
        {right}
      </span>
    </div>
  );
}

function MediaViewer({
  project,
  active,
  onSelect,
  onOpen,
  tabbable,
}: {
  project: Project;
  active: number;
  onSelect: (i: number) => void;
  onOpen: () => void;
  tabbable: boolean;
}) {
  const media = project.media[active];
  const many = project.media.length > 1;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg shadow-black/20">
        <WindowChrome
          title={`${project.id} · ${media.caption}`}
          right={many ? `${active + 1}/${project.media.length}` : undefined}
        />
        <button
          type="button"
          tabIndex={tabbable ? 0 : -1}
          onClick={onOpen}
          aria-label={`Expand ${media.caption}`}
          className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-300"
          style={{ backgroundColor: media.bg }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                quality={90}
                unoptimized={media.animated}
                placeholder={media.animated ? "empty" : "blur"}
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white opacity-100 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            <Maximize2 className="size-3" /> Expand
          </span>
        </button>
      </div>

      {many && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {project.media.map((m, i) => (
            <button
              key={m.caption}
              type="button"
              tabIndex={tabbable ? 0 : -1}
              onClick={() => onSelect(i)}
              aria-label={`Show ${m.caption}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
                active === i
                  ? "opacity-100 ring-2 ring-offset-2 ring-offset-card"
                  : "opacity-50 hover:opacity-90",
              )}
              style={{
                backgroundColor: m.bg,
                ...(active === i ? { ["--tw-ring-color" as string]: project.accent } : {}),
              }}
            >
              <Image
                src={m.src}
                alt=""
                fill
                sizes="140px"
                unoptimized={m.animated}
                className="object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Illustrations for projects without screenshots. */
function ArtFrame({ project }: { project: Project }) {
  if (project.art === "ghostty") {
    const lines: { prompt?: boolean; text: React.ReactNode }[] = [
      { prompt: true, text: "printf '\\e]8;;https://alexcodes.io\\e\\\\alexcodes.io\\e]8;;\\e\\\\\\n'" },
      {
        text: (
          <span>
            <span className="text-sky-300 underline decoration-sky-300/60 underline-offset-4">
              alexcodes.io
            </span>
            <span className="ml-3 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-neutral-300">
              ⌘/Ctrl + click
            </span>
          </span>
        ),
      },
      { prompt: true, text: <>printf &apos;\e[?1048h&apos;  <span className="text-neutral-500"># save cursor</span></> },
      { prompt: true, text: <>printf &apos;\e[?1048l&apos;  <span className="text-neutral-500"># restore cursor</span></> },
      { prompt: true, text: <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-neutral-300" /> },
    ];
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg shadow-black/20">
        <WindowChrome title="ghostty · ~" />
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0b14] p-4 font-primary text-[11px] leading-6 text-neutral-200 sm:p-6 sm:text-[13px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-violet-500/20 blur-3xl"
          />
          {lines.map((l, i) => (
            <div key={i} className="relative truncate">
              {l.prompt && <span className="mr-2 text-violet-300">~ ❯</span>}
              {l.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Discord bot: feature tiles in a Discord-ish palette.
  const features = [
    { icon: MessageSquare, title: "AI replies", sub: "OpenAI" },
    { icon: Newspaper, title: "News", sub: "NewsAPI" },
    { icon: Music, title: "Music", sub: "Voice channels" },
    { icon: CalendarClock, title: "Daily updates", sub: "Cron jobs" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg shadow-black/20">
      <WindowChrome title="discord-bot · go" />
      <div className="relative grid aspect-[16/10] grid-cols-2 gap-3 overflow-hidden bg-[#1e1f22] p-4 sm:gap-4 sm:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-[#5865F2]/25 blur-3xl"
        />
        {features.map((f) => (
          <div
            key={f.title}
            className="relative flex flex-col justify-between rounded-lg border border-white/5 bg-[#2b2d31] p-3 sm:p-4"
          >
            <span className="grid size-8 place-items-center rounded-md bg-[#5865F2]/20 text-[#a5adff] sm:size-9">
              <f.icon className="size-4 sm:size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-100">{f.title}</p>
              <p className="font-primary text-[11px] text-neutral-400">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Lightbox({
  state,
  onClose,
  onChange,
}: {
  state: { project: number; media: number } | null;
  onClose: () => void;
  onChange: (media: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const media = state ? projects[state.project].media : [];
  const current = state ? media[state.media] : null;
  const count = media.length;

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") onChange((state.media + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") onChange((state.media - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, count, onClose, onChange]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {state && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[6000] flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <motion.div
            key={state.media}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <Image
              src={current.src}
              alt={current.alt}
              quality={95}
              unoptimized={current.animated}
              sizes="92vw"
              className="h-auto max-h-[80vh] w-auto max-w-[92vw] rounded-lg object-contain"
            />
          </motion.div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 text-sm text-white/80"
          >
            {count > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => onChange((state.media - 1 + count) % count)}
                className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <span className="min-w-[10rem] text-center">
              {current.caption}
              {count > 1 && (
                <span className="ml-2 font-primary text-xs text-white/50">
                  {state.media + 1}/{count}
                </span>
              )}
            </span>
            {count > 1 && (
              <button
                type="button"
                aria-label="Next image"
                onClick={() => onChange((state.media + 1) % count)}
                className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Status }) {
  const tone = {
    dev: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    merged: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    oss: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  }[status.tone];
  const dot = {
    dev: "bg-amber-500",
    merged: "bg-violet-500",
    live: "bg-emerald-500",
    oss: "bg-sky-500",
  }[status.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium",
        tone,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot)} />
      {status.label}
    </span>
  );
}

function LinkButton({ link, tabbable }: { link: ProjectLink; tabbable: boolean }) {
  const Icon =
    link.kind === "github" ? FaGithub : link.kind === "prs" ? GitPullRequest : ExternalLink;
  const primary = link.kind === "live" || link.kind === "prs";
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabbable ? 0 : -1}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
        primary
          ? "border-transparent bg-foreground text-background hover:opacity-90"
          : "bg-background/60 hover:bg-muted",
      )}
    >
      <Icon className="size-4" />
      {link.label}
    </a>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 shrink-0 place-items-center rounded-full border bg-background/60 text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
    >
      {children}
    </button>
  );
}

function TechChip({ name }: { name: string }) {
  const match = tech.find((t) => t.label.toLowerCase() === name.toLowerCase());
  let icon: React.ReactNode = match?.icon;
  // Monochrome brand icons (white) disappear in light mode; let them inherit.
  if (React.isValidElement<{ color?: string }>(icon) && icon.props.color === "#FFFFFF") {
    icon = React.cloneElement(icon, { color: "currentColor" });
  }
  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border bg-background/60 px-2 py-1 font-primary text-xs text-muted-foreground">
      {icon && <span className="size-3.5 shrink-0">{icon}</span>}
      {name}
    </li>
  );
}
