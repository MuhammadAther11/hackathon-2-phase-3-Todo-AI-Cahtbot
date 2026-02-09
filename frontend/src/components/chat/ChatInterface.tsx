'use client';

import { useState, useEffect } from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  message_text: string;
  sender: 'user' | 'agent';
  created_at: string;
}

interface ChatInterfaceProps {
  userId: string;
  className?: string;
}

export function ChatInterface({ userId, className }: ChatInterfaceProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { messages, sendChatMessage, isLoading, error, setError } = useChat(userId, sessionId);

  const handleSendMessage = async (text: string) => {
    try {
      const response = await sendChatMessage(text, sessionId || undefined);
      if (response.session_id && !sessionId) {
        setSessionId(response.session_id);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <div className={cn('flex flex-col h-full max-h-[70vh] border rounded-lg', className)}>
      <div className="border-b p-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold">AI Task Assistant</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage tasks with natural language</p>
      </div>

      <ChatHistory
        messages={messages.map(m => ({
          id: m.id,
          text: m.message_text,
          sender: m.sender as 'user' | 'agent',
          timestamp: m.created_at
        }))}
        isLoading={isLoading}
      />

      <div className="border-t p-4 bg-white dark:bg-gray-900">
        {error && (
          <div className="mb-2 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded text-sm">
            {error}
          </div>
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}