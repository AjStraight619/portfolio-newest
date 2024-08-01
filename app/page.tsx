import Hero from '@/components/hero';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <Hero />
      <Projects />
    </main>
  );
}
