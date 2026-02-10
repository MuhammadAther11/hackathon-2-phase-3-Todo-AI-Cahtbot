'use client';

import { useState } from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { Bot, AlertCircle, X } from 'lucide-react';

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
    <div className={cn(
      'flex flex-col h-full max-h-[75vh] bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden',
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
          <Bot size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">AI Task Assistant</h2>
          <p className="text-xs text-gray-500">Manage your tasks with natural language</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages area */}
      <ChatHistory
        messages={messages.map(m => ({
          id: m.id,
          text: m.message_text,
          sender: m.sender as 'user' | 'agent',
          timestamp: m.created_at
        }))}
        isLoading={isLoading}
      />

      {/* Error banner */}
      {error && (
        <div className="mx-4 mb-2 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
