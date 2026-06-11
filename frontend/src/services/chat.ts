import { apiClient } from './apiClient';
import type { ApiResponse, ChatMessage, LocaleCode } from '../types';

interface ChatMetadata {
  language?: LocaleCode;
  locale?: LocaleCode;
  pathname?: string;
}

export const chatService = {
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

  async createSession(): Promise<ApiResponse<{ sessionId: string }>> {
    return apiClient.post<{ sessionId: string }>('/chat/session', {
      createdAt: new Date().toISOString(),
    });
  },
};
