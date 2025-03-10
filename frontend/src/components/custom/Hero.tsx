// frontend/src/components/custom/Hero.tsx

import { FC, useState, useRef, useEffect } from 'react';
import { DefaultPromptsSection, SearchBar, AuroraText, ChatMessage } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen flex flex-col pt-16 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isChatMode ? (
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="w-full max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: 'easeInOut' }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-300">
                  Welcome to <AuroraText>Voyager</AuroraText>
                </h1>
                <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto">
                  A personalized AI chatbot designed to know everything about{' '}
                  <a
                    href="https://www.linkedin.com/in/aryank1511/"
                    target="_blank"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity"
                  >
                    Aryan
                  </a>
                  .
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: 'easeInOut' }}
              >
                <DefaultPromptsSection />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4, ease: 'easeInOut' }}
                className="w-full max-w-2xl mx-auto"
              >
                <SearchBar onSend={handleSendMessage} />
                <p className="mt-2 text-xs text-zinc-500 text-center">
                  Note: Voyager can make mistakes. Please verify important information and consider
                  double-checking critical details.
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4">
              <div className="max-w-3xl mx-auto mt-6">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <ChatMessage role={message.role} content={message.content} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-48" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}
              className="fixed bottom-0 left-0 right-0 p-4 mt-4 bg-dark-background"
            >
              <div className="max-w-3xl mx-auto">
                <SearchBar onSend={handleSendMessage} />
                <p className="mt-6 text-xs text-zinc-500 text-center">
                  Note: Voyager can make mistakes. Please verify important information and consider
                  double-checking critical details.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
