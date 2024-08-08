import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import VerticalTimeline from '@/components/ui/vertical-timeline';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24 p-3">
      <div className="w-full max-w-screen-lg">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
