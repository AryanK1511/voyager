'use client';

import { FC, useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { Paperclip, ArrowUp } from 'lucide-react';
import { format } from 'date-fns';
import { Hero } from '@/components';
interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const ChatInterface: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Example prompts
  const examplePrompts = [
    {
      title: 'What are the advantages',
      subtitle: 'of using Next.js?',
    },
    {
      title: 'Write code to',
      subtitle: "demonstrate dijkstra's algorithm",
    },
    {
      title: 'Help me write an essay',
      subtitle: 'about silicon valley',
    },
    {
      title: 'What is the weather',
      subtitle: 'in San Francisco?',
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'bot') {
                return [
                  ...prev.slice(0, -1),
                  { role: 'bot', content: lastMessage.content + content },
                ];
              }
              return [...prev, { role: 'bot', content }];
            });
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-black text-white">
      {/* Header */}
      <header className="flex-none flex flex-col items-center justify-center p-4 text-center">
        <Hero />
      </header>

      {/* Chat Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="border border-gray-700 rounded-lg p-4 text-left hover:bg-gray-900 transition-colors"
                onClick={() => handleExampleClick(`${prompt.title} ${prompt.subtitle}`)}
              >
                <p className="text-gray-300">{prompt.title}</p>
                <p className="text-gray-500">{prompt.subtitle}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                  }`}
                >
                  <div className="mb-1 text-sm text-gray-400">
                    {message.role === 'user' ? 'You' : 'AI'} • {format(new Date(), 'h:mm a')}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="flex-none p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative border border-gray-700 rounded-full bg-gray-900">
            <button
              type="button"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Send a message..."
              className="w-full bg-transparent py-4 px-12 focus:outline-none text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full p-1 disabled:opacity-50"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
