// frontend/src/components/custom/Hero.tsx

import { FC, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { DefaultPromptsSection, SearchBar, AuroraText, ChatMessage } from '@/components';
import { ApiHelper } from '@/lib';
import type { Message } from '@/lib';

export const Hero: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatMode, setIsChatMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiHelper = useRef(new ApiHelper());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedContent]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsChatMode(true);
    setIsStreaming(true);
    setStreamedContent('');

    try {
      const response = await apiHelper.current.post('chat', {
        query: message,
        model: 'gpt-4o-mini',
        history: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      if (!response.status) {
        throw new Error(response.message || 'Failed to fetch response');
      }

      const responseData = response.data as Response;
      if (!responseData) {
        throw new Error('No response data available');
      }

      const reader = responseData.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            accumulatedContent += content;
            setStreamedContent(accumulatedContent);
          }
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: accumulatedContent }]);
      setStreamedContent('');
    } catch (error) {
      console.error('Error streaming response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 overflow-hidden">
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
                <p className="text-md sm:text-lg lg-text-xl text-zinc-500 max-w-2xl mx-auto">
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
                className="w-full max-w-4xl mx-auto"
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
            className="flex-1 flex flex-col w-full"
          >
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto w-full flex justify-center"
            >
              <div className="w-full max-w-2xl px-4 mt-6">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-full"
                    >
                      <ChatMessage role={message.role} content={message.content} />
                    </motion.div>
                  ))}
                  {isStreaming && streamedContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-full"
                    >
                      <div className="flex gap-4 py-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src="/images/logo.png"
                              alt="Voyager Logo"
                              width={32}
                              height={32}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="font-medium text-zinc-300 mb-1">Voyager</div>
                          <div className="prose prose-invert max-w-none w-full">
                            <ReactMarkdown>{streamedContent}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-48" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}
              className="fixed bottom-0 left-0 right-0 p-4 bg-dark-background flex justify-center"
            >
              <div className="w-full max-w-2xl">
                <SearchBar onSend={handleSendMessage} disabled={isStreaming} />
                <p className="mt-2 text-xs text-zinc-500 text-center">
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
