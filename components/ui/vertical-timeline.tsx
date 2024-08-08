'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TracingBeam } from './tracing-beam';
import { experiencesData } from '@/lib/data';

const VerticalTimeline = () => {
  const timelineRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRefs.current.length === 0) return;

      const tracingBeamY = window.scrollY;

      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementY = rect.top + window.scrollY;
          const distance = Math.abs(elementY - tracingBeamY);

          if (distance < closestDistance) {
            closestIndex = index;
            closestDistance = distance;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // TODO: Add subtle animation for active index

  return (
    <TracingBeam>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {experiencesData.map((item, index) => (
          <li
            key={index}
            ref={el => {
              timelineRefs.current[index] = el;
            }}
            className="mb-10 ml-6"
            // className={`mb-10 ml-6 ${
            //   activeIndex === index
            //     ? 'border border-blue-500 rounded-md'
            //     : 'border border-transparent'
            // }`}
          >
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 p-2 ">
              {item.date}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white p-2">
              {item.title}
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400 p-2">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </TracingBeam>
  );
};

export default VerticalTimeline;

// [
//   {
//     date: 'February 2022',
//     title: 'Application UI code in Tailwind CSS',
//     description:
//       'Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',
//   },
//   {
//     date: 'March 2022',
//     title: 'Marketing UI design in Figma',
//     description:
//       'All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
//   {
//     date: 'April 2022',
//     title: 'E-Commerce UI code in Tailwind CSS',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//   },
// ]
