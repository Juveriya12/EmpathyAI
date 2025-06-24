import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { Mic, Plus, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ChatMessage, { MessageType } from './ChatMessage'

interface ChatInterfaceProps {
  className?: string
}

const INITIAL_MESSAGES: MessageType[] = [
  {
    id: '1',
    content:
      "Hello! I'm your Mental Health Companion. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  },
]

const SUGGESTIONS = [
  "I'm feeling anxious today",
  'Can you suggest a breathing exercise?',
  'I need help with stress management',
  'Tell me about mindfulness techniques',
]

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<MessageType[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const botReply = await getBotResponse(input)

      const botResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content: botReply,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error('Error fetching bot response:', error)
    }

    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleMicClick = () => {
    toast({
      title: 'Voice Input',
      description: 'Voice recognition is coming soon!',
      duration: 3000,
    })
  }

  const API_URL = import.meta.env.VITE_BACKEND_URL

  const getBotResponse = async (userInput: string): Promise<string> => {
    try {
      const response = await axios.post(API_URL, { query: userInput })

      return response.data.response || "I'm sorry, I couldn't understand that."
    } catch (error) {
      return '⚠ Error connecting to chatbot. Please try again later.'
    }
  }

  return (
    <div
      className={`flex flex-col h-full chat-container rounded-none overflow-hidden ${className}`}
    >
      <div className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isLast={index === messages.length - 1}
          />
        ))}

        {isTyping && (
          <ChatMessage
            message={{
              id: 'typing',
              content: '',
              sender: 'bot',
              timestamp: new Date(),
              isTyping: true,
            }}
            isLast={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className='px-4 py-2 flex gap-2 overflow-x-auto scrollbar-thin w-[90%] flex-wrap max-sm:hidden'>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className='explore-button whitespace-nowrap animate-fade-in pr-4 py-2'
            style={{ animationDelay: '300ms' }}
          >
            <Plus className='w-3 h-3' />
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className='p-4 chat-input-container'>
        <div className='flex items-center gap-2'>
          <div className='relative flex-1'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder='Type your message...'
              className='w-full py-3 px-4 pr-12 rounded-full chat-input focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm'
            />
            <button
              onClick={handleMicClick}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mic-button'
            >
              <Mic className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-full chat-button ${
              input.trim()
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
