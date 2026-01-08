import axios from 'axios'
import type { User } from '@hockey-club/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginEndpoint = error.config?.url?.includes('/auth/login')
      
      if (!isLoginEndpoint) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token')
  },
}
