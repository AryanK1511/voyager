// frontend/src/components/custom/Hero.tsx

'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Hero: FC = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-8 py-12 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
        <Image
          src="/placeholder.svg?height=192&width=192"
          alt="Aryan's profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <motion.h1
          className="text-4xl font-bold tracking-tight mb-4 text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Voyager
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          This is Aryan's chat bot, ask anything about him
        </motion.p>
      </div>
    </motion.div>
  );
};
