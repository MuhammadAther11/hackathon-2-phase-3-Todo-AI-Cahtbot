'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  className?: string;
}

export function ChatHistory({ messages, isLoading, className }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className={cn('flex-1 overflow-y-auto px-4 py-6', className)}>
      {messages.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-900/50 dark:to-emerald-900/50 flex items-center justify-center mb-4">
            <MessageSquare className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">Start a conversation</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Try &quot;show my tasks&quot;, &quot;add task Buy groceries&quot;, or &quot;mark task #1 as done&quot;
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
