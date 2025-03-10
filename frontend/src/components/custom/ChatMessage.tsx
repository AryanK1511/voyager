import { FC } from 'react';
import { Copy, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components';

type ChatMessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

export const ChatMessage: FC<ChatMessageProps> = ({ role, content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex gap-4 py-4">
      <div className="flex-shrink-0">
        {role === 'user' ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-zinc-300 mb-1">{role === 'user' ? 'You' : 'Voyager'}</div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {role === 'assistant' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="mt-2 h-8 w-8 text-zinc-400 hover:text-zinc-300"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
