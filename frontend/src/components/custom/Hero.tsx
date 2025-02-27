// frontend/src/components/custom/Hero.tsx

'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  chatStarted: boolean;
}

export const Hero: FC<HeroProps> = ({ chatStarted }) => {
  if (chatStarted) return null;

  return (
    <div>
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 pb-12 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center mx-auto">
          <motion.h1
            className="text-4xl font-bold tracking-tight mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome to Voyager
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            This is Aryan's chat bot, ask anything about him
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
