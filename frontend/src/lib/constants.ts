// frontend/src/lib/constants.ts

import type { Model, PromptCard } from '@/lib';
import { Briefcase, Code2, FolderKanban } from 'lucide-react';

export const AvailableModels: Model[] = [
  {
    id: 'GPT-4o mini',
    name: 'gpt-4o-mini',
    description: 'Uses OpenAI and gives quick responses for basic professional queries.',
    badge: {
      text: 'Most Popular',
      variant: 'default',
    },
  },
  {
    id: 'GPT-4o',
    name: 'gpt-4o',
    description: 'Uses OpenAI and gives better responses than GPT 4o mini but is slower.',
  },
  {
    id: 'Gemini 2.0 Flash',
    name: 'gemini-2.0-flash',
    description: 'Similar to GPT 4o Mini but uses Google.',
  },
  {
    id: 'Gemini 1.5 Pro',
    name: 'gemini-1.5-pro',
    description: 'Similar to GPT 4o but uses Google.',
  },
];

export const DefaultPrompts: PromptCard[] = [
  {
    icon: Briefcase,
    title: 'Professional Experience',
    description: "What are Aryan's key achievements and roles in his career?",
  },
  {
    icon: Code2,
    title: 'Technical Skills',
    description: 'What technologies and programming languages does Aryan specialize in?',
  },
  {
    icon: FolderKanban,
    title: 'Projects & Portfolio',
    description: "Tell me about Aryan's notable projects and contributions",
  },
];
