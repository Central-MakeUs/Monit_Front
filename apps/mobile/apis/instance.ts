import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
