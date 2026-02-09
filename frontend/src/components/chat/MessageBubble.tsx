'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex mb-4',
        {
          'justify-end': isUser,
          'justify-start': !isUser
        },
        className
      )}
    >
      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg',
          {
            'bg-blue-500 text-white rounded-br-none': isUser,
            'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none': !isUser
          }
        )}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-1">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}