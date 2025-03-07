'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { FileText, ChevronDown, Github, Linkedin, Globe } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { AVAILABLE_MODELS } from '@/lib/constants';

export const Navbar: FC = () => {
  const [model, setModel] = useState(AVAILABLE_MODELS[0].name);

  return (
    <header className="flex h-12 w-full items-center justify-between bg-black px-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
          <FileText className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 text-white">
              {model}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {AVAILABLE_MODELS.map((model) => (
              <DropdownMenuItem key={model.value} onClick={() => setModel(model.name)}>
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
