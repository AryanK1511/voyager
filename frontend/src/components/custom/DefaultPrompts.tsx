// frontend/src/components/custom/DefaultPrompts.tsx

import { FC } from 'react';
import { FileText, Image, Languages, LucideIcon } from 'lucide-react';

interface PromptCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const defaultPrompts: PromptCard[] = [
  {
    icon: FileText,
    title: 'Resume-related Question',
    description: "What's Aryan's work experience?",
  },

  {
    icon: Languages,
    title: 'Job-specific questions',
    description: 'Is Aryan qualified for {job_description}?',
  },
  {
    icon: Image,
    title: 'Generic Questions',
    description: "What is Aryan's favorite food?",
  },
];

export const DefaultPrompts: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto">
      {defaultPrompts.map((prompt, index) => {
        const Icon = prompt.icon;
        return (
          <div
            key={index}
            className="group bg-zinc-800/40 backdrop-blur-lg px-6 py-4 rounded-xl flex flex-col items-center text-center transition-all duration-200  hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-400"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-200">
              <Icon className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-white font-medium mb-2 text-md">{prompt.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{prompt.description}</p>
          </div>
        );
      })}
    </div>
  );
};
