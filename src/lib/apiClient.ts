import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://content.guardianapis.com',
  timeout: 10000,
  params: {
    "api-key": import.meta.env.VITE_GUARDIAN_API_KEY
  }
});
