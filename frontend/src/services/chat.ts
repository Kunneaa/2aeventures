import { apiClient } from './apiClient';
import type { ApiResponse, ChatMessage, LocaleCode } from '../types';

interface ChatMetadata {
  language?: LocaleCode;
  locale?: LocaleCode;
  pathname?: string;
}

export const chatService = {
  // Send message to chatbot
  async sendMessage(
    message: string,
    sessionId?: string,
    metadata?: ChatMetadata,
  ): Promise<ApiResponse<ChatMessage>> {
    return apiClient.post<ChatMessage>('/chat/send', {
      message,
      sessionId,
      timestamp: new Date().toISOString(),
      ...metadata,
    });
  },

  async getChatHistory(sessionId: string, limit = 50): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get<ChatMessage[]>(`/chat/history/${sessionId}?limit=${limit}`);
  },

  async createSession(): Promise<ApiResponse<{ sessionId: string }>> {
    return apiClient.post<{ sessionId: string }>('/chat/session', {
      createdAt: new Date().toISOString(),
    });
  },

  async clearHistory(sessionId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/chat/history/${sessionId}`);
  },

  async getSuggestedQuestions(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>('/chat/suggestions');
  },
};
