'use client';
import React from 'react';
import SectionHeading from './ui/section-heading';
import { useTheme } from 'next-themes';
import VerticalTimeline from './ui/vertical-timeline';

const Experience = () => {
  return (
    <section
      id="experience"
      className="scroll-mt-6 mt-16 w-full hover:scroll-mt-0"
    >
      <SectionHeading>
        My <span className="text-purple-300">Experience.</span>
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="odd:col-span-1"></div>
      </div>
      <VerticalTimeline />
    </section>
  );
};

export default Experience;
