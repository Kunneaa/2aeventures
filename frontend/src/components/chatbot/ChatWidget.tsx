"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Sparkles, Phone } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { brandCopy } from '../../config/brand';
import { siteConfig } from '../../config/site';
import { normalizeLocalePath } from '../../lib/localePath';
import { useCart } from '../../store/CartContext';
import { useLanguage } from '../../store/LanguageContext';
import { chatService } from '../../services/chat';
import { useCatalog } from '../../store/CatalogContext';

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

const createMessageId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
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

const formatCountMessage = (template: string, count: number): string =>
  template.replace('{count}', count.toString());

export function ChatWidget({ locale }: ChatWidgetProps) {
  const { language, t } = useLanguage();
  const copy = brandCopy[language].chatWidget;
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
  const { getProduct } = useCatalog();

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
      return copy.homeGreeting;
    }

    if (normalizedPath.startsWith('/products/')) {
      return copy.productGreeting;
    }

    if (normalizedPath === '/products') {
      return copy.productsGreeting;
    }

    if (normalizedPath === '/cart') {
      const itemCount = items.length;
      if (itemCount > 0) {
        return formatCountMessage(copy.quoteListHasItems, itemCount);
      }
      return copy.quoteListEmpty;
    }

    return copy.defaultGreeting;
  }, [copy, items, pathname]);

  const getQuickActions = useCallback((): QuickAction[] => {
    const normalizedPath = normalizeLocalePath(pathname);

    if (normalizedPath === '/') {
      return [
        {
          label: copy.browseProducts,
          action: () => router.push(`/${locale}/products`),
        },
      ];
    }

    if (normalizedPath.startsWith('/products/')) {
      const id = normalizedPath.split('/')[2];
      const product = getProduct(id);
      const actions: QuickAction[] = [];

      if (product) {
        actions.push({
          label: copy.addToQuoteList,
          action: () => addToCart(product),
        });
      }

      actions.push({
        label: copy.goToQuoteRequest,
        action: () => router.push(`/${locale}/cart`),
      });

      return actions;
    }

    if (normalizedPath === '/products') {
      return [
        {
          label: copy.openQuoteRequest,
          action: () => router.push(`/${locale}/cart`),
        },
      ];
    }

    if (normalizedPath === '/cart') {
      return [
        {
          label: copy.continueBrowsing,
          action: () => router.push(`/${locale}/products`),
        },
      ];
    }

    return [];
  }, [addToCart, copy, getProduct, locale, pathname, router]);

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

  const addMessage = (
    sender: Message['sender'],
    text: string,
    actions?: QuickAction[],
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createMessageId(),
        text,
        sender,
        timestamp: new Date(),
        actions,
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isBotTyping) return;

    const rawInput = input.trim();
    addMessage('user', rawInput);
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
        const botText = resolveBotText(response.data) || copy.received;
        addMessage('bot', botText);
      } else {
        addMessage('bot', copy.busy);
      }
    } catch {
      addMessage('bot', copy.offline);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      {showWelcomeAlert && (
        <div className="fixed right-4 top-20 z-50 w-[330px] rounded-lg border border-white/20 bg-[#17324d] p-4 text-white shadow-[0_18px_45px_rgba(12,54,96,0.42)] animate-in fade-in slide-in-from-right-5 duration-500">
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
                {copy.alertTitle}
              </p>
              <p className="mt-1 text-xs text-white/80">
                {copy.alertBody}
              </p>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setShowWelcomeAlert(false);
                }}
                className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#17324d] transition-colors hover:bg-[#f2f7fb]"
              >
                {copy.openChatbot}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-2">
        <div className="flex items-center gap-2 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-200">
          <a
            href={siteConfig.zalo.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e3df] bg-white text-[#17324d] shadow-[0_10px_24px_rgba(23,36,45,0.12)] transition-transform hover:scale-105"
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
            href={siteConfig.hotline.href}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f6f63] text-white shadow-[0_10px_24px_rgba(47,111,99,0.24)] transition-transform hover:scale-105"
            aria-label="Hotline"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#17324d] text-white shadow-[0_20px_45px_rgba(23,50,77,0.4)] ring-4 ring-white/70 transition-all hover:scale-105 hover:bg-[#244f78]"
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
        <div className="fixed bottom-24 left-4 right-4 z-50 flex h-[500px] flex-col overflow-hidden rounded-lg border border-[#d8e3df] bg-white text-[14px] shadow-[0_30px_70px_rgba(15,23,42,0.28)] sm:left-auto sm:right-6 sm:w-96">
          <div className="bg-[#17324d] p-4 text-white">
            <h3 className="font-semibold text-sm">
              {copy.panelTitle}
            </h3>
            <p className="text-[11px] text-white/70">{copy.panelSubtitle}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-[#17324d] text-white'
                        : 'bg-[#f2f7fb] text-[#17242d]'
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
                          className="block w-full rounded-lg border border-[#336699] bg-white px-3 py-1.5 text-left text-[12px] font-bold text-[#336699] hover:bg-[#f2f7fb]"
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
                <div className="rounded-lg bg-[#f2f7fb] p-3 text-[#17242d]">
                  <p className="text-sm">{copy.typing}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#d8e3df] bg-white p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ai_placeholder')}
                className="field-input flex-1 px-3 py-2 text-[13px]"
              />
              <button
                onClick={handleSend}
                disabled={isBotTyping}
                aria-label={t('send')}
                className="rounded-lg bg-[#17324d] p-2 text-white hover:bg-[#244f78] disabled:cursor-not-allowed disabled:opacity-50"
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
