import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 max-w-4xl",
      isUser ? "ml-auto flex-row-reverse" : "mr-auto"
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-chat-user text-chat-user-foreground" 
          : "bg-chat-bot text-chat-bot-foreground"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[80%] shadow-soft",
        isUser
          ? "bg-chat-user text-chat-user-foreground rounded-br-md"
          : "bg-chat-bot text-chat-bot-foreground rounded-bl-md"
      )}>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message}
        </p>
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-chat-user-foreground" : "text-chat-bot-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}