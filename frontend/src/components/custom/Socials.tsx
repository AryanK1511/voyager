// frontend/src/components/custom/Socials.tsx

import { FC } from 'react';
import Link from 'next/link';
import { Linkedin, Github, Globe } from 'lucide-react';

export const Socials: FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-dark-background">
      <div className="flex flex-wrap justify-center gap-2">
        <Link
          href="https://www.linkedin.com/in/aryank1511/"
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded bg-gradient-to-r from-purple-500/70 to-pink-500/70"
        >
          <Linkedin className="w-5 h-5 text-white" />
        </Link>
        <Link
          href="https://github.com/AryanK1511"
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded bg-gradient-to-r from-purple-500/70 to-pink-500/70"
        >
          <Github className="w-5 h-5 text-white" />
        </Link>
        <Link
          href="https://www.aryank.me"
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded bg-gradient-to-r from-purple-500/70 to-pink-500/70"
        >
          <Globe className="w-5 h-5 text-white" />
        </Link>
      </div>
    </div>
  );
};
