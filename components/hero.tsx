import React from 'react';
import { HeroHighlight } from './ui/hero-highlight';
import { TextGenerateEffect } from './ui/text-generate-effect';
import Image from 'next/image';
import { Button } from './ui/button';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { ArrowRight, DownloadIcon } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Spotlight } from './ui/spotlight';

const Hero = () => {
  return (
    <HeroHighlight className="flex flex-col items-center justify-evenly h-full">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-30"
        fill="white"
      />
      <Intro />
      <TextGenerateEffect
        className="text-center"
        words="Combining Creativity and Engineering Principles into Seamless User Experience."
      />
      <div className="flex flex-col items-center sm:flex-row gap-x-2 gap-y-3">
        <CallToAction />
        <Socials />
      </div>
    </HeroHighlight>
  );
};

export default Hero;

const Intro = () => {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-4 w-full max-w-[40rem] p-2">
      <div className="w-[150px] h-[150px] border animate-shimmer transition-colors bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] border-white rounded-full flex-shrink-0 sm:self-start self-center">
        <div className="relative h-full w-full rounded-full">
          <Image
            src="/photo.png"
            alt=""
            fill
            priority
            quality={100}
            className="object-contain rounded-full z-10"
          />
        </div>
      </div>
      <p className="text-center text-balance text-sm sm:text-lg md:text-xl leading-relaxed ">
        Hello, I am Alex, an aspiring full stack engineer. I have developed
        multiple projects using{' '}
        <span className="underline text-purple-300 underline-offset-2">
          React
        </span>{' '}
        and{' '}
        <span className="underline text-purple-300 underline-offset-2">
          Next.js
        </span>
        . Recently, I have integrated{' '}
        <span className="underline text-purple-300 underline-offset-2">Go</span>{' '}
        into my tech stack.
        {/* My most recent project,{' '} */}
        {/* <span className="font-bold">Pictionary With Friends</span>, leverages
          Go&apos;s concurrency model for WebSockets. <br />
          This model efficiently handles the real-time rendering of drawing
          data, allowing players to see each other&apos;s creations seamlessly. */}
      </p>
    </div>
  );
};

const CallToAction = () => {
  return (
    <div className="flex items-center justify-evenly gap-x-1">
      <HoverBorderGradient>
        <a download href="/Alex_Straight_Resume.pdf" className="inline-flex">
          Resume <DownloadIcon className="ml-2" />
        </a>
      </HoverBorderGradient>
      <HoverBorderGradient>
        <Link className="inline-flex" href="#contact">
          Contact <ArrowRight className="ml-2" />
        </Link>
      </HoverBorderGradient>
    </div>
  );
};

const Socials = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full hover:scale-105 transition-all duration-150 p-2"
      >
        <a target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="size-8" />
        </a>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full hover:scale-105 transition-all duration-150 p-2"
      >
        <a target="_blank" rel="noopener noreferrer">
          <FaGithub className="size-8" />
        </a>
      </Button>
    </div>
  );
};
