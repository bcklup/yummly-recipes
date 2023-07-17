import { AxiosInstance } from 'axios';
import Constants from 'expo-constants';

import { API_BASE_URL } from '../constants/api';
import { useAmplifyAuth } from '../hooks/auth-hooks';

const apiInterceptor = async (instance: AxiosInstance) => {
  const { getAuth } = useAmplifyAuth();
  // Interceptors
  instance.interceptors.request.use(
    async (config) => {
      const token = await getAuth();
      config.headers.Authorization = `Bearer ${token}`;

      config.baseURL = API_BASE_URL;
      return config;
    },
    async (error) => {
      console.log('[AXIOS] Error in request: ', error);
      // Do something with request error
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response) => {
      // Do something with response data
      return {
        data: response.data.data,
        status: response.status,
      };
    },
    (error) => {
      console.log('[AXIOS] Error in response: ', error);
      // Do something with request error
      return {
        data: error.response.data.message,
        status: false,
      };
    },
  );
};

export default apiInterceptor;
