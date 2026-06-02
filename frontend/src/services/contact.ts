import type { ContactRequestPayload, ContactResponse } from '../types';
import { apiClient } from './apiClient';

export const contactService = {
  sendMessage(payload: ContactRequestPayload) {
    return apiClient.post<ContactResponse>('/contact', payload);
  },
};
