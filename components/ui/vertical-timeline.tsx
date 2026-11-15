'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  Code2,
  FlaskConical,
  GraduationCap,
  MapPin,
  Presentation,
} from 'lucide-react';
import { experiencesData, type Experience, type ExperienceKind } from '@/lib/data';
import { cn } from '@/lib/utils';

const kindIcon: Record<ExperienceKind, React.ElementType> = {
  work: Briefcase,
  teaching: Presentation,
  education: GraduationCap,
  research: FlaskConical,
  freelance: Code2,
};

const VerticalTimeline = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ol ref={listRef} className="relative mx-auto w-full max-w-4xl">
      {/* Rail: a faint track plus a gradient fill that follows scroll */}
      <div
        aria-hidden
        className="absolute bottom-2 top-2 left-5 w-px bg-border md:left-[calc(9rem+1.5rem+1.25rem)]"
      >
        <motion.div
          style={{ scaleY: progress }}
          className="h-full w-full origin-top bg-gradient-to-b from-purple-300 via-fuchsia-400 to-sky-400"
        />
      </div>

      {experiencesData.map((item, index) => (
        <TimelineItem key={item.title + item.org} item={item} index={index} />
      ))}
    </ol>
  );
};

export default VerticalTimeline;

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const Icon = kindIcon[item.kind];

  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-10 last:pb-0 md:grid-cols-[9rem_2.5rem_1fr] md:gap-x-6">
      {/* Date column (desktop) */}
      <div className="hidden pt-2.5 text-right md:block">
        <span
          className={cn(
            'font-primary text-xs leading-5 tracking-tight',
            item.current
              ? 'text-purple-600 dark:text-purple-300'
              : 'text-muted-foreground',
          )}
        >
          {item.date}
        </span>
      </div>

      {/* Node */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className={cn(
            'relative z-10 grid size-10 place-items-center rounded-full border bg-background shadow-sm',
            item.current
              ? 'border-purple-300/70 text-purple-600 dark:text-purple-300'
              : 'text-muted-foreground',
          )}
        >
          {item.current && (
            <span className="absolute inset-0 animate-ping rounded-full bg-purple-400/20 [animation-duration:2.5s]" />
          )}
          <Icon className="size-[18px]" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: index === 0 ? 0.05 : 0 }}
        className={cn(
          'group relative min-w-0 overflow-hidden rounded-xl border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-purple-300/40 sm:p-6',
          item.current && 'border-purple-300/30',
        )}
      >
        {item.current && (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-purple-400/10 blur-3xl"
          />
        )}

        <header className="relative">
          <p className="mb-1 font-primary text-xs text-muted-foreground md:hidden">
            {item.date}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {item.title}
            </h3>
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Current
              </span>
            )}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-medium text-purple-600 dark:text-purple-300">
              {item.org}
            </span>
            <span className="text-muted-foreground/60">/</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3.5" />
              {item.location}
            </span>
          </p>
        </header>

        {item.summary && (
          <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
        )}

        {item.metrics && (
          <dl
            className={cn(
              'relative mt-4 grid gap-2',
              item.metrics.length >= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2',
            )}
          >
            {item.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border bg-muted/40 px-3 py-2.5"
              >
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-primary text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {m.value}
                </dd>
                <dd className="text-xs leading-snug text-muted-foreground">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {item.groups?.map((group) => (
          <div key={group.name} className="relative mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                {group.name}
              </h4>
              {group.status && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                  {group.status}
                </span>
              )}
            </div>
            <BulletList bullets={group.bullets} />
          </div>
        ))}

        {item.bullets && <BulletList bullets={item.bullets} />}

        {item.tech && (
          <ul className="relative mt-4 flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border bg-background/60 px-2 py-0.5 font-primary text-[11px] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </li>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {bullets.map((b) => (
        <li
          key={b}
          className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-purple-300/70"
        >
          {b}
        </li>
      ))}
    </ul>
  );
}
