import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '../types/index';

interface ChatStore {
  sessionId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  setSessionId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  addMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      sessionId: null,
      messages: [],
      isLoading: false,

      setSessionId: (id) => set({ sessionId: id }),

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      addMessages: (messages) =>
        set((state) => ({
          messages: [...state.messages, ...messages],
        })),

      clearMessages: () => set({ messages: [] }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'chat-store',
    }
  )
);
