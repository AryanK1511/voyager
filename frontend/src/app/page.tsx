// frontend/src/app/page.tsx

'use client';

import { FC } from 'react';
import { Navbar, ChatInterface } from '@/components';

const Home: FC = () => {
  return (
    <main className="min-h-screen flex flex-col text-white">
      <Navbar />
      <ChatInterface />
    </main>
  );
};

export default Home;
