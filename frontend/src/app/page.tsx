// frontend/src/app/page.tsx

import { FC } from 'react';
import { ChatInterface, Hero, Navbar } from '@/components';

const Home: FC = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <Hero />
        <ChatInterface />
      </div>
    </main>
  );
};

export default Home;
