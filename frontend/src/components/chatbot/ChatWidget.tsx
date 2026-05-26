"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Sparkles, Phone } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../../store/CartContext';
import { useLanguage } from '../../store/LanguageContext';
import { chatService } from '../../services/chat';
import { products } from '../../lib/mockData';

type QuickAction = { label: string; action: () => void };

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: QuickAction[];
}

interface ChatWidgetProps {
  locale: 'vi' | 'en';
}

const normalizeLocalePath = (path: string | null): string =>
  path?.replace(/^\/(vi|en)(?=\/|$)/, '') || '/';

const createMessageId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export function ChatWidget({ locale }: ChatWidgetProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { items, addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const key = `chat-welcome-alert-${locale}`;
    const hasSeenWelcome = sessionStorage.getItem(key);
    if (!hasSeenWelcome) {
      setShowWelcomeAlert(true);
      setHasUnread(true);
      sessionStorage.setItem(key, '1');
    }
  }, [locale]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setShowWelcomeAlert(false);
    }
  }, [isOpen]);

  const getContextualGreeting = useCallback((): string => {
    const normalizedPath = normalizeLocalePath(pathname);

    if (normalizedPath === '/') {
      return language === 'vi'
        ? 'Xin chào! Tôi là trợ lý ảo của 2AEVENTURES. Bạn đang tìm kiếm sản phẩm gì để nhập hàng?'
        : 'Hello! I am the 2AEVENTURES virtual assistant. What products are you looking for today?';
    }

    if (normalizedPath.startsWith('/products/')) {
      return language === 'vi'
        ? 'Tôi thấy bạn đang xem sản phẩm. Bạn cần tư vấn thêm hoặc tìm sản phẩm tương tự không?'
        : 'I see you are viewing a product. Do you want more details or similar product suggestions?';
    }

    if (normalizedPath === '/products') {
      return language === 'vi'
        ? 'Bạn đang tìm sản phẩm nào? Tôi có thể giúp bạn tìm kiếm hoặc gợi ý sản phẩm phù hợp!'
        : 'Which product are you looking for? I can help you search and suggest suitable options.';
    }

    if (normalizedPath === '/cart') {
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      if (itemCount > 0) {
        return language === 'vi'
          ? `Bạn đã có ${itemCount} sản phẩm trong giỏ. Bạn muốn gửi yêu cầu báo giá ngay không?`
          : `You already have ${itemCount} items in your cart. Do you want to submit a quote request now?`;
      }
      return language === 'vi'
        ? 'Giỏ hàng của bạn đang trống. Hãy để tôi giúp bạn tìm sản phẩm phù hợp!'
        : 'Your cart is currently empty. Let me help you find the right products.';
    }

    return language === 'vi'
      ? 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?'
      : 'Hello! How can I help you today?';
  }, [items, language, pathname]);

  const getQuickActions = useCallback((): QuickAction[] => {
    const normalizedPath = normalizeLocalePath(pathname);

    if (normalizedPath === '/') {
      return [
        {
          label: language === 'vi' ? 'Xem sản phẩm ngay' : 'Browse products',
          action: () => router.push(`/${locale}/products`),
        },
      ];
    }

    if (normalizedPath.startsWith('/products/')) {
      const id = normalizedPath.split('/')[2];
      const product = products.find((item) => item.id === id);
      const actions: QuickAction[] = [];

      if (product) {
        actions.push({
          label: language === 'vi' ? 'Thêm sản phẩm này vào giỏ' : 'Add this product to cart',
          action: () => addToCart(product, 1),
        });
      }

      actions.push({
        label: language === 'vi' ? 'Tới giỏ yêu cầu báo giá' : 'Go to quote cart',
        action: () => router.push(`/${locale}/cart`),
      });

      return actions;
    }

    if (normalizedPath === '/products') {
      return [
        {
          label: language === 'vi' ? 'Mở giỏ báo giá' : 'Open quote cart',
          action: () => router.push(`/${locale}/cart`),
        },
      ];
    }

    if (normalizedPath === '/cart') {
      return [
        {
          label: language === 'vi' ? 'Tiếp tục xem sản phẩm' : 'Continue browsing products',
          action: () => router.push(`/${locale}/products`),
        },
      ];
    }

    return [];
  }, [addToCart, language, locale, pathname, router]);

  useEffect(() => {
    if (hasUserInteracted) return;

    setMessages([
      {
        id: 'welcome-message',
        text: getContextualGreeting(),
        sender: 'bot',
        timestamp: new Date(),
        actions: getQuickActions(),
      },
    ]);
  }, [getContextualGreeting, getQuickActions, hasUserInteracted]);

  const addBotMessage = (text: string, actions?: QuickAction[]) => {
    const message: Message = {
      id: createMessageId(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      actions,
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: createMessageId(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const resolveBotText = (payload: unknown): string | null => {
    if (!payload) return null;
    if (typeof payload === 'string') return payload;

    if (typeof payload === 'object') {
      const data = payload as Record<string, unknown>;
      if (typeof data.message === 'string') return data.message;
      if (typeof data.reply === 'string') return data.reply;
      if (typeof data.text === 'string') return data.text;
      if (typeof data.content === 'string') return data.content;
    }

    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || isBotTyping) return;

    const rawInput = input.trim();
    addUserMessage(rawInput);
    setInput('');
    setHasUserInteracted(true);
    setIsBotTyping(true);

    try {
      let currentSession = sessionId;
      if (!currentSession) {
        const createSessionResponse = await chatService.createSession();
        if (createSessionResponse.success && createSessionResponse.data?.sessionId) {
          currentSession = createSessionResponse.data.sessionId;
          setSessionId(currentSession);
        }
      }

      const response = await chatService.sendMessage(rawInput, currentSession, {
        language,
        locale,
        pathname: pathname || '/',
      });

      if (response.success) {
        const botText =
          resolveBotText(response.data) ||
          (language === 'vi'
            ? 'Tôi đã nhận yêu cầu của bạn và đang xử lý.'
            : 'I received your request and I am processing it.');
        addBotMessage(botText);
      } else {
        addBotMessage(
          language === 'vi'
            ? 'Hiện tại hệ thống AI đang bận. Bạn vui lòng thử lại sau ít phút.'
            : 'The AI service is currently busy. Please try again in a few minutes.'
        );
      }
    } catch {
      addBotMessage(
        language === 'vi'
          ? 'Kết nối AI tạm thời gián đoạn. Vui lòng thử lại.'
          : 'The AI connection is temporarily unavailable. Please try again.'
      );
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      {showWelcomeAlert && (
        <div className="fixed top-20 right-4 z-50 w-[330px] rounded-[22px] bg-[#336699] text-white shadow-[0_18px_45px_rgba(12,54,96,0.42)] border border-white/20 p-4 animate-in fade-in slide-in-from-right-5 duration-500">
          <button
            onClick={() => setShowWelcomeAlert(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
            aria-label="Close welcome alert"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {language === 'vi' ? 'Trợ lý 2AEVENTURES luôn sẵn sàng' : '2AEVENTURES assistant is online'}
              </p>
              <p className="text-xs text-white/85 mt-1">
                {language === 'vi'
                  ? 'Chat ngay để được gợi ý sản phẩm phù hợp và báo giá nhanh.'
                  : 'Start chatting for quick product suggestions and fast quotation support.'}
              </p>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setShowWelcomeAlert(false);
                }}
                className="mt-3 text-xs font-medium bg-white text-[#336699] px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                {language === 'vi' ? 'Mở Chatbot' : 'Open Chatbot'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-2">
        <div className="flex items-center gap-2 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200">
          <a
            href="https://zalo.me/"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-[#0a66ff] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(10,102,255,0.35)] hover:scale-105 transition-transform"
            aria-label="Zalo OA"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              alt="Zalo"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </a>
          <a
            href="tel:+84000000000"
            className="w-11 h-11 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(22,163,74,0.35)] hover:scale-105 transition-transform"
            aria-label="Hotline"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-[0_20px_45px_rgba(37,99,235,0.45)] ring-4 ring-white/70 flex items-center justify-center transition-all hover:scale-110"
        >
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
              1
            </span>
          )}
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-[0_30px_70px_rgba(15,23,42,0.36)] border border-blue-100 z-50 flex flex-col text-[14px] overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3 className="font-semibold text-sm">
              {language === 'vi' ? 'Trợ lý ảo 2AEVENTURES' : '2AEVENTURES AI Assistant'}
            </h3>
            <p className="text-[11px] text-blue-100">{language === 'vi' ? 'Hỗ trợ 24/7' : '24/7 support'}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-[13px] whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                  {message.actions && (
                    <div className="mt-2 space-y-1">
                      {message.actions.map((action) => (
                        <button
                          key={action.label}
                          onClick={action.action}
                          className="block w-full text-left text-[12px] bg-white border border-blue-600 text-blue-600 rounded px-3 py-1.5 hover:bg-blue-50"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl p-3 bg-gray-100 text-gray-900">
                  <p className="text-sm">{language === 'vi' ? 'AI đang trả lời...' : 'AI is typing...'}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-blue-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type your message...'}
                className="flex-1 border rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSend}
                disabled={isBotTyping}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
