import { Triangle, MessageSquare } from 'lucide-react';

export const Hero = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Triangle className="h-6 w-6" />
        <span className="text-xl">+</span>
        <MessageSquare className="h-6 w-6" />
      </div>
      <div className="max-w-2xl">
        <p className="mb-2 text-sm">
          This is an <span className="underline">open source</span> chatbot template built with
          Next.js and the AI SDK by Vercel. It uses the{' '}
          <code className="bg-gray-800 px-1 rounded">streamText</code> function in the server and
          the
          <code className="bg-gray-800 px-1 rounded">useChat</code> hook on the client to create a
          seamless chat experience.
        </p>
        <p className="text-sm">
          You can learn more about the AI SDK by visiting the{' '}
          <span className="underline">docs</span>.
        </p>
      </div>
    </div>
  );
};
