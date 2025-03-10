// frontend/src/components/custom/ModelSelector.tsx

import { FC } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { cn } from '@/lib';

type Model = {
  id: string;
  name: string;
  description: string;
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
};

const models: Model[] = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    description: 'Advanced reasoning capabilities',
  },
  {
    id: 'gpt4o',
    name: 'GPT-4o mini',
    description: 'Fast at advanced reasoning',
    badge: {
      text: 'BETA',
      variant: 'secondary',
    },
  },
  {
    id: 'gemini',
    name: 'Gemini Flash 2.0',
    description: 'Great for coding and logic',
  },
];

type ModelSelectorProps = {
  currentModel: string;
  setCurrentModel: (model: string) => void;
};

export const ModelSelector: FC<ModelSelectorProps> = ({ currentModel, setCurrentModel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700">
          {currentModel}
          <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[280px] rounded-lg border-zinc-700 bg-zinc-900 p-1 text-zinc-200"
      >
        <div className="px-3 py-2 text-xs font-medium text-zinc-400">Model</div>
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className={cn(
              'flex flex-col items-start gap-1 rounded-md px-3 py-2.5 focus:bg-zinc-800 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
              currentModel === model.id && 'bg-purple-900/30'
            )}
            onSelect={() => setCurrentModel(model.id)}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{model.name}</span>
                {model.badge && (
                  <span className="rounded bg-zinc-700 px-1 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                    {model.badge.text}
                  </span>
                )}
              </div>
              {currentModel === model.id && <Check className="h-4 w-4 text-purple-400" />}
            </div>
            <span className="text-xs text-zinc-400">{model.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
