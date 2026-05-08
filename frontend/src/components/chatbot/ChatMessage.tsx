import { cn, formatTime } from '@/lib/utils';

export interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: string;
  isLoading?: boolean;
}

export function ChatMessage({ message, sender, timestamp, isLoading }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2',
        sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}

      <div
        className={cn(
          'max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg',
          sender === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        )}
      >
        {isLoading ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        ) : (
          <>
            <p className="text-sm break-words">{message}</p>
            {timestamp && (
              <p className={cn('text-xs mt-1', sender === 'user' ? 'text-blue-100' : 'text-gray-500')}>
                {formatTime(timestamp)}
              </p>
            )}
          </>
        )}
      </div>

      {sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-700 text-xs font-bold">U</span>
        </div>
      )}
    </div>
  );
}
