import { FC, useRef, useEffect, useState } from 'react';
import { Mic, ArrowRight } from 'lucide-react';
import { Button, Textarea } from '@/components';

export const SearchBar: FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = '24px';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 200;
    const newHeight = Math.min(scrollHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <div className="group relative flex w-full flex-col gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 shadow-lg transition-all duration-200 hover:border-zinc-600 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message Voyager..."
        className="w-full resize-none border-none bg-transparent px-0 py-0 text-white placeholder:text-zinc-500 focus:ring-0 focus-visible:ring-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-zinc-800/50 [&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500"
        rows={1}
      />
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50"
        >
          <Mic />
        </Button>
        <Button size="icon" className="h-10 w-10 bg-purple-500 text-white hover:bg-purple-600">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
