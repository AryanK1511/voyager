// frontend/src/app/page.tsx

'use client';

import { FC, useState } from 'react';
import { Navbar, Hero } from '@/components';
import { AVAILABLE_MODELS } from '@/lib/constants';

const Home: FC = () => {
  const [currentModel, setCurrentModel] = useState(AVAILABLE_MODELS[0].name);

  return (
    <main className="min-h-screen flex flex-col text-white">
      <Navbar currentModel={currentModel} setCurrentModel={setCurrentModel} />
      <Hero />
    </main>
  );
};

export default Home;
