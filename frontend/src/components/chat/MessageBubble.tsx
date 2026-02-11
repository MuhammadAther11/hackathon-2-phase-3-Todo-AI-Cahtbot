'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'agent';
  timestamp?: string;
  className?: string;
}

export function MessageBubble({
  text,
  sender,
  timestamp,
  className
}: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'flex gap-3 mb-5',
        { 'flex-row-reverse': isUser },
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1',
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Bubble */}
      <div className={cn('max-w-[75%] space-y-1')}>
        <div
          className={cn(
            'px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-md'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-md shadow-sm'
          )}
        >
          {/* Render text with line breaks and basic formatting */}
          <div className="whitespace-pre-wrap break-words">
            {renderFormattedText(text)}
          </div>
        </div>

        {/* Timestamp */}
        {timestamp && (
          <p className={cn(
            'text-[11px] text-gray-400 dark:text-gray-500 px-1',
            isUser ? 'text-right' : 'text-left'
          )}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Render text with basic formatting:
 * - Lines starting with a number + dot become styled list items
 * - Checkmark/circle symbols get colored
 */
function renderFormattedText(text: string) {
  const lines = text.split('\n');

  return lines.map((line, i) => {
    // Task list item: "1. ✓ Task title" or "1. ○ Task title"
    const taskMatch = line.match(/^(\d+)\.\s*(✓|○)\s*(.*)$/);
    if (taskMatch) {
      const [, num, icon, title] = taskMatch;
      const isComplete = icon === '✓';
      return (
        <div key={i} className="flex items-start gap-2 py-0.5">
          <span className="text-gray-400 dark:text-gray-500 text-xs font-mono min-w-[1.2rem] text-right">{num}.</span>
          <span className={isComplete ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}>{icon}</span>
          <span className={isComplete ? 'line-through text-gray-400 dark:text-gray-500' : ''}>{title}</span>
        </div>
      );
    }

    // Lines starting with "- " become bullet points
    if (line.startsWith('- ')) {
      return (
        <div key={i} className="flex items-start gap-2 py-0.5 pl-1">
          <span className="text-gray-400 dark:text-gray-500 mt-1.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
          <span>{line.slice(2)}</span>
        </div>
      );
    }

    // Lines starting with ✓ get green styling
    if (line.startsWith('✓')) {
      return (
        <div key={i} className="flex items-center gap-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 font-medium">
          {line}
        </div>
      );
    }

    // Empty lines
    if (line.trim() === '') {
      return <div key={i} className="h-2" />;
    }

    // Normal text
    return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>;
  });
}
