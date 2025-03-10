// frontend/src/components/custom/Hero.tsx

import { FC, useState, useRef, useEffect } from 'react';
import { DefaultPromptsSection, SearchBar, AuroraText, ChatMessage } from '@/components';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const Hero: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatMode, setIsChatMode] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsChatMode(true);

    const aiMessage: Message = {
      role: 'assistant',
      content:
        'This is a sample response in **markdown** format. You can use *italics* and `code` blocks too!',
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {!isChatMode ? (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-300">
                Welcome to <AuroraText>Voyager</AuroraText>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto">
                A personalized AI chatbot designed to know everything about Aryan Khurana.
              </p>
            </div>
            <DefaultPromptsSection />
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar onSend={handleSendMessage} />
              <p className="mt-2 text-xs text-zinc-500 text-center">
                Note: Voyager can make mistakes. Please verify important information and consider
                double-checking critical details.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4">
            <div className="max-w-3xl mx-auto mt-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} role={message.role} content={message.content} />
              ))}
              <div ref={messagesEndRef} className="h-48" />
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 mt-4 bg-dark-background">
            <div className="max-w-3xl mx-auto">
              <SearchBar onSend={handleSendMessage} />
              <p className="mt-6 text-xs text-zinc-500 text-center">
                Note: Voyager can make mistakes. Please verify important information and consider
                double-checking critical details.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
