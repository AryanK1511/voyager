'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Globe } from 'lucide-react';
import { Button, ModelSelector } from '@/components';

type NavbarProps = {
  currentModel: string;
  setCurrentModel: (model: string) => void;
};

export const Navbar: FC<NavbarProps> = ({ currentModel, setCurrentModel }) => {
  return (
    <header className="flex h-12 w-full items-center justify-between px-16 py-8">
      <div className="flex items-center gap-2">
        <ModelSelector currentModel={currentModel} setCurrentModel={setCurrentModel} />
      </div>
      <div className="flex items-center gap-2">
        <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
            <Linkedin className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
            <Github className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="https://yourpersonalwebsite.com" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
            <Globe className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};
