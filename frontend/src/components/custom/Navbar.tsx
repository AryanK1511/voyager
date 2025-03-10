'use client';

import { FC } from 'react';
import { ModelSelector, Socials } from '@/components';

type NavbarProps = {
  currentModel: string;
  setCurrentModel: (model: string) => void;
};

export const Navbar: FC<NavbarProps> = ({ currentModel, setCurrentModel }) => {
  return (
    <header className="flex h-12 w-full items-center justify-between px-16 pt-12 pb-4">
      <div className="flex items-center gap-2">
        <ModelSelector currentModel={currentModel} setCurrentModel={setCurrentModel} />
      </div>
      <div className="flex items-center gap-2">
        <Socials />
      </div>
    </header>
  );
};
