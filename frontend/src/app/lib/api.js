import axios from 'axios';

// FastAPI URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const ticketAPI = {
  // Submit a ticket - FastAPI handles everything (saves to DB + forwards to n8n)
  submitTicket: async (data) => {
    try {
      console.log('📤 Sending to FastAPI...');
      console.log('📍 URL:', `${API_BASE_URL}/ticket`);
      console.log('📦 Data:', data);
      
      const response = await axios.post(`${API_BASE_URL}/ticket`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      });
      
      console.log('✅ FastAPI response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Submit ticket error:', error);
      
      if (error.response) {
        throw new Error(error.response.data?.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('Cannot connect to server. Make sure FastAPI is running.');
      } else {
        throw new Error(error.message || 'Failed to submit ticket');
      }
    }
  },

  // Get all tickets from FastAPI
  getTickets: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tickets`);
      return response.data;
    } catch (error) {
      console.error('Get tickets error:', error);
      throw new Error('Failed to fetch tickets');
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Get stats error:', error);
      throw new Error('Failed to fetch statistics');
    }
  },
};

export default ticketAPI;