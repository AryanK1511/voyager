// frontend/src/components/custom/SearchBar.tsx

import { FC, useRef, useEffect, useState } from 'react';
import { Mic, Send, Square } from 'lucide-react';
import { Button, Textarea } from '@/components';
import { SpeechRecognition, SpeechRecognitionEvent } from '@/lib';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export const SearchBar: FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>('');

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window.webkitSpeechRecognition as any)();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = Array.from(event.results);
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          const transcript = result[0].transcript.trim();

          if (result.isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the final transcript reference
        if (finalTranscript) {
          finalTranscriptRef.current = finalTranscript.trim();
        }

        // Combine final and interim transcripts for smooth display
        const displayText =
          finalTranscriptRef.current + (interimTranscript ? ' ' + interimTranscript : '');
        setValue(displayText.trim());
      };

      recognition.onend = () => {
        // Restart recognition if we're still recording
        if (isRecording) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    }
  }, [isRecording]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      finalTranscriptRef.current = ''; // Reset the final transcript
    } else {
      setValue(''); // Clear the textarea when starting new recording
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSend = async () => {
    if (!value.trim() || isSending) return;

    setIsSending(true);
    console.log('Message:', value);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setValue('');
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
    <div className="group relative flex w-full flex-col gap-2 rounded-3xl bg-zinc-800/50 px-4 py-3 shadow-lg transition-all duration-200 hover:border-zinc-600 ">
      <div className=" px-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Anything about Aryan"
          className="w-full resize-none border-none bg-transparent px-0 py-0 text-zinc-300 placeholder:text-zinc-500 focus:ring-0 focus-visible:ring-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-zinc-800/50 [&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500"
          rows={1}
        />
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={`h-10 w-10 rounded-full ${isRecording ? 'bg-red-500/50 text-red-500 hover:bg-red-500/50' : 'bg-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'}`}
          >
            {isRecording ? <Square /> : <Mic />}
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!value.trim() || isSending}
            className={`h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 ${!value.trim() || isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};
