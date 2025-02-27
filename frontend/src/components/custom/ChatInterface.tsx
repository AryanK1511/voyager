'use client';

import { useState, useRef, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Card, Avatar, AvatarFallback, AvatarImage, Button, Input } from '@/components';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const sampleQuestions = [
  "What are Aryan's skills?",
  "Tell me about Aryan's background",
  'What projects has Aryan worked on?',
];

const placeholderTexts = [
  "Ask about Aryan's experience...",
  "Ask about Aryan's projects...",
  "Ask about Aryan's education...",
  "Ask about Aryan's hobbies...",
];

interface ChatInterfaceProps {
  setChatStarted: (started: boolean) => void;
}

export const ChatInterface: FC<ChatInterfaceProps> = ({ setChatStarted }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStartedState] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEndRef]);

  const handleSendMessage = (messageText: string = input) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setChatStarted(true);
    setChatStartedState(true);
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for asking about Aryan! This is a simulated response to: "${messageText}"`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      {!chatStarted ? (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholderTexts[placeholderIndex]}
              className="pr-10 py-6 text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleSampleQuestion(question)}
                >
                  <p className="text-sm font-medium">{question}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col space-y-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className={message.sender === 'user' ? 'bg-primary' : 'bg-secondary'}>
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'V'}</AvatarFallback>
                    {message.sender === 'bot' && (
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Voyager" />
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-4 ${
                      message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="bg-secondary">
                    <AvatarFallback>V</AvatarFallback>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Voyager" />
                  </Avatar>
                  <div className="rounded-lg p-4 bg-muted">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />

          <div className="sticky bottom-4 mt-4">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholderTexts[placeholderIndex]}
                className="pr-10 py-6 text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
