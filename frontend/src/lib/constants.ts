// frontend/src/lib/constants.ts

import type { Model, PromptCard } from '@/lib';
import { FileText, Languages, Image } from 'lucide-react';

export const AvailableModels: Model[] = [
  {
    id: 'GPT-4o mini',
    name: 'gpt-4o-mini',
    description: 'Fast, affordable small model for focused tasks',
    badge: {
      text: 'recommended',
      variant: 'secondary',
    },
  },
  {
    id: 'GPT-4o',
    name: 'gpt-4o',
    description: 'Fast, intelligent, flexible GPT model',
  },
  {
    id: 'Gemini 2.0 Flash',
    name: 'gemini-2.0-flash',
    description:
      'Next generation features, speed, and multimodal generation for a diverse variety of tasks',
  },
  {
    id: 'Gemini 1.5 Pro',
    name: 'gemini-1.5-pro',
    description: 'Complex reasoning tasks requiring more intelligence',
  },
];

export const DefaultPrompts: PromptCard[] = [
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
