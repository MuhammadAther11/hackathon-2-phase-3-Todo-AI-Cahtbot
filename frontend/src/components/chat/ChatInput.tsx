'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function ChatInput({
  onSendMessage,
  isLoading = false,
  className
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2 w-full', className)}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Type your message"
      />
      <Button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="px-4 py-2 rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Send</span>
          </>
        )}
      </Button>
    </form>
  );
}