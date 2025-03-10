// frontend/src/app/page.tsx

'use client';

import { FC, useState } from 'react';
import { Navbar, Hero } from '@/components';
import { AvailableModels } from '@/lib';
const Home: FC = () => {
  const [currentModel, setCurrentModel] = useState(AvailableModels[0].id);

  return (
    <main className="min-h-screen flex flex-col text-white">
      <Navbar currentModel={currentModel} setCurrentModel={setCurrentModel} />
      <Hero />
    </main>
  );
};

export default Home;
