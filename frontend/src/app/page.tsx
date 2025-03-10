// frontend/src/app/page.tsx

'use client';

import { FC } from 'react';
import { Navbar } from '@/components';

const Home: FC = () => {
  return (
    <main className="min-h-screen flex flex-col text-white">
      <Navbar />
    </main>
  );
};

export default Home;
