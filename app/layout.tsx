import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { HomeIcon, MessageCircleIcon, UserIcon, Code2Icon } from 'lucide-react';
import { FloatingNav } from '@/components/ui/floating-navbar';

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetBrains',
});

export const metadata: Metadata = {
  title: 'Alex Straight | Portfolio',
  description:
    "Explore Alex Straight's portfolio, showcasing skills in front-end and back-end development, including projects, achievements, and a journey in the tech industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background', jetBrains.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          <FloatingNav navItems={navItems} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

const navItems = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'About',
    link: '#about',
    icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Projects',
    link: '#projects',
    icon: <Code2Icon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Contact',
    link: '#contact',
    icon: (
      <MessageCircleIcon className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];
