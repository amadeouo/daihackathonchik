import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await api.post('/auth/refresh')
        return api(originalRequest)
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401 || refreshError.response?.status === 422) {
          throw Error('Не получилось получить данные пользователя')
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);