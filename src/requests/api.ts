import axios from 'axios';
import { getToken } from './auth';
import { getAccessToken, getRefreshToken, removeTokens, setTokens } from '../utils/token';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    if (error.response.status === 403 && !originalRequest._retry) {
      if (refreshToken) {
        originalRequest._retry = true;
        return getToken(refreshToken)
          .then((res) => {
            const { accessToken, refreshToken } = res;
            setTokens(accessToken, refreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return api(originalRequest);
          })
          .catch(() => {
            removeTokens();
            window.location.href = '/auth';
            return Promise.reject(error);
          });
      } else {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);
