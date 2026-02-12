// src/api/axios.js
import axios from 'axios';
import { API_CONFIG } from '../config';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;