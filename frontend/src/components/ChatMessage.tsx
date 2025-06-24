import React from 'react'
// import { BotIcon, UserRound } from "lucide-react";
import ReactMarkdown from 'react-markdown'
export type MessageType = {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  isTyping?: boolean
}

interface ChatMessageProps {
  message: MessageType
  isLast: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isUser = message.sender === 'user'

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4 animate-slide-up opacity-0`}
      style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
    >
      {/* {!isUser && (
        <div className="mr-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <BotIcon className="w-4 h-4 text-primary" />
          </div>
        </div>
      )} */}

      <div
        className={`max-w-[85%] w-fit rounded-[5px] py-2 px-4 message-transition ${
          isUser
            ? 'bg-chat-bubble-user dark:bg-chat-bubble-user-dark text-white'
            : 'bg-chat-bubble-bot dark:bg-chat-bubble-bot-dark text-foreground shadow-sm'
        }`}
      >
        {message.isTyping ? (
          <span className='typing-indicator text-sm md:text-base'>
            Thinking
          </span>
        ) : (
          <div className='whitespace-pre-wrap text-sm sm:text-base'>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* {isUser && (
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <UserRound className="w-4 h-4 text-primary" />
          </div>
        </div>
      )} */}
    </div>
  )
}

export default ChatMessage
