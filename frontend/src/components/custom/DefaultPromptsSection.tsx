// frontend/src/components/custom/DefaultPromptsSection.tsx

import { FC } from 'react';
import { DefaultPrompts } from '@/lib';

export const DefaultPromptsSection: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {DefaultPrompts.map((prompt, index) => {
        const Icon = prompt.icon;
        return (
          <div
            key={index}
            className="group bg-zinc-800/40 backdrop-blur-lg px-6 py-4 rounded-xl flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-sm hover:shadow-purple-500 cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-200">
              <Icon className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-white font-medium mb-2 text-md">{prompt.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{prompt.description}</p>
          </div>
        );
      })}
    </div>
  );
};
