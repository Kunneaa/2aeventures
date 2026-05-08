import { apiClient } from './apiClient';
import { ChatMessage, ApiResponse } from '../types/index';

export const chatService = {
  // Send message to chatbot
  async sendMessage(
    message: string,
    sessionId?: string,
    metadata?: { language?: 'vi' | 'en'; locale?: 'vi' | 'en'; pathname?: string }
  ): Promise<ApiResponse<ChatMessage>> {
    return apiClient.post<ChatMessage>('/chat/send', {
      message,
      sessionId,
      timestamp: new Date().toISOString(),
      ...metadata,
    });
  },

  // Get chat history
  async getChatHistory(sessionId: string, limit = 50): Promise<ApiResponse<ChatMessage[]>> {
    return apiClient.get<ChatMessage[]>(`/chat/history/${sessionId}?limit=${limit}`);
  },

  // Create new chat session
  async createSession(): Promise<ApiResponse<{ sessionId: string }>> {
    return apiClient.post<{ sessionId: string }>('/chat/session', {
      createdAt: new Date().toISOString(),
    });
  },

  // Clear chat history
  async clearHistory(sessionId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/chat/history/${sessionId}`);
  },

  // Get suggested questions
  async getSuggestedQuestions(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>('/chat/suggestions');
  },
};
