import About from '@/components/about';
import Contact from '@/components/contact';
import Hero from '@/components/hero';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24 p-3">
      <div className="w-full max-w-screen-lg">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
