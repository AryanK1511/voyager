import { FC } from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Navbar: FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container flex h-16 w-full items-center justify-between mx-auto backdrop-blur-sm bg-background/70">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            Voyager
          </Link>
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Portfolio</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
