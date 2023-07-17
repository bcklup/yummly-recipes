import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../constants/api';
import apiInterceptor from './interceptors';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
});

apiInterceptor(axiosInstance);

export default axiosInstance;
