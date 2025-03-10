import { FC } from 'react';
import { DefaultPrompts, SearchBar } from '@/components';

export const Hero: FC = () => {
  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Voyager
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto">
            A personalized AI chatbot designed to know everything about Aryan Khurana.
          </p>
        </div>
        <DefaultPrompts />
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
