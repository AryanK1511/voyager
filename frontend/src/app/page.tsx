// frontend/src/app/page.tsx

'use client';

import { FC, useState } from 'react';
import { ChatInterface, Hero, Navbar } from '@/components';

const Home: FC = () => {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col text-white">
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
          <Hero chatStarted={chatStarted} />
          <ChatInterface setChatStarted={setChatStarted} />
        </div>
      </div>
    </main>
  );
};

export default Home;
