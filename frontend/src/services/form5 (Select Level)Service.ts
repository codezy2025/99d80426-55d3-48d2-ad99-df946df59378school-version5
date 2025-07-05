/**
 * 🏗️  DEVELOPMENT GUIDE - Form5 (Select Level) Service
 * 
 * 📋 Original Requirements: Create a React TSX component for a level selection form that:
1. Fetches and displays academic levels from an API
2. Shows levels in a selectable list (similar to ListView)
3. Allows selecting a level and passing data back to parent component
4. Handles empty state (changes button to Cancel)
5. Matches the workflow described in the documentation
 * 
 * 🚀 Enhancement Ideas:
 * - Add request/response interceptors for error handling
 * - Implement retry logic for failed requests
 * - Add caching layer (React Query, SWR)
 * - Include request cancellation support
 * - Add batch operations (bulkCreate, bulkUpdate)
 * - Implement optimistic updates
 * 
 * 💡 Methods to Consider Adding:
 * - search(query: string): Promise<Form5 (Select Level)[]>
 * - bulkDelete(ids: string[]): Promise<void>
 * - export(): Promise<Blob>
 * - getStats(): Promise<{Form5 (Select Level)Stats}>
 * 
 * 🔧 Error Handling:
 * - Create custom error classes
 * - Add request/response logging
 * - Implement exponential backoff for retries
 * 
 * 🚀 Performance:
 * - Add request deduplication
 * - Implement response caching
 * - Consider using React Query for state management
 */

import axios from 'axios';
import { Form5SelectLevel, Form5SelectLevelCreate, Form5SelectLevelUpdate } from '../types/Form5 (Select Level)Types';

const API_BASE_URL = 'http://localhost:3000/api/form5-select-level';

export const form5SelectLevelService = {
    getAll: async (): Promise<Form5SelectLevel[]> => {
        const response = await axios.get<Form5SelectLevel[]>(API_BASE_URL);
        return response.data;
    },
    create: async (data: Form5SelectLevelCreate): Promise<Form5SelectLevel> => {
        const response = await axios.post<Form5SelectLevel>(API_BASE_URL, data);
        return response.data;
    },
    update: async (id: string, data: Form5SelectLevelUpdate): Promise<Form5SelectLevel> => {
        const response = await axios.put<Form5SelectLevel>(`${API_BASE_URL}/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};