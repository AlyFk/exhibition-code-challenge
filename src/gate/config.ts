import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
