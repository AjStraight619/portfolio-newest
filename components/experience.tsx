'use client';
import React from 'react';
import SectionHeading from './ui/section-heading';
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
      <VerticalTimeline />
    </section>
  );
};

export default Experience;
