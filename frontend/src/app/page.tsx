// frontend/src/app/page.tsx

'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Hero } from '@/components';
import { AvailableModels } from '@/lib';

const Home: FC = () => {
  const [currentModel, setCurrentModel] = useState(AvailableModels[0].id);

  return (
    <main className="min-h-screen flex flex-col text-white">
      <motion.div
        key="welcome"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <Navbar currentModel={currentModel} setCurrentModel={setCurrentModel} />
        <div className="w-full">
          <Hero currentModel={currentModel} />
        </div>
      </motion.div>
    </main>
  );
};

export default Home;
