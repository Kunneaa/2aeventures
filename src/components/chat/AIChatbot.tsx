"use client";

import { useChat } from 'ai/react';
import { Send, Bot, User, Loader2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function AIChatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[60] w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#0d1821]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform origin-bottom-right transition-all animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#071018] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#c9a86a]/20 text-[#c9a86a]">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-[#f5f5f5] font-serif font-medium tracking-wide">2AE Virtual Assistant</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[#8d9ba8] text-[10px] uppercase tracking-widest font-bold">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-[#8d9ba8] hover:text-[#c9a86a] transition-colors p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#c9a86a]/30 scrollbar-track-transparent">
        
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
            <Bot size={40} className="text-[#c9a86a]/50" />
            <p className="text-[#8d9ba8] text-sm leading-relaxed max-w-[80%]">
              Xin chào! Tôi là Trợ lý ảo AI của 2AE Ventures. Tôi có thể giúp gì cho bạn hôm nay?
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
              m.role === 'user' 
                ? 'bg-[#c9a86a] text-[#071018]' 
                : 'bg-white/10 text-[#c9a86a]'
            }`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#c9a86a] text-[#071018] rounded-tr-none'
                : 'bg-white/5 text-[#f5f5f5] rounded-tl-none border border-white/5'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-[#c9a86a]">
              <Bot size={16} />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 text-[#f5f5f5] rounded-tl-none border border-white/5 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-[#c9a86a]" />
              <span className="text-xs text-[#8d9ba8]">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#071018] border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Nhập câu hỏi của bạn..."
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#8d9ba8] focus:outline-none focus:border-[#c9a86a]/50 transition-colors disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a86a] text-[#071018] hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:bg-[#c9a86a] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <Send size={16} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
