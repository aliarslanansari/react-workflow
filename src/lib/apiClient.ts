import { API_BASE } from '@/config/api'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
})

apiClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
