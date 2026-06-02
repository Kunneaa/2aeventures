import type { QuoteRequestPayload, QuoteResponse } from '../types';
import { apiClient } from './apiClient';

export const quoteService = {
  createQuote(payload: QuoteRequestPayload) {
    return apiClient.post<QuoteResponse>('/quotes', payload);
  },
};
