import { useState } from "react";
import { api } from "@/shared/utils/api.ts";
import {useNavigate} from "react-router-dom";

export interface UserResponse {
  id: number;
  telegram_username: string;
  role: string;
  full_name: string | null;
  position: string | null;
  about: string | null;
  contacts: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  skills: [];
}

export interface LoginResponse {
  user: UserResponse;
}

export const useLogin = () => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = (username: string) => {
    setLoading(true)

    api
      .post('/auth/login', {telegram_username: username,})
      .then((response) => {
        const { user } = response.data
        setUser(user)
        navigate('/home')
      })
      .catch((error) => {
        setError(error.response?.data?.detail || error.message || "Ошибка авторизации")
        throw error
      })
      .finally(() => setLoading(false))
  }

  const logout = () => {
    setLoading(true)
    api
      .post('auth/logout')
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        setError(error.response?.data?.detail || error.message || "Ошибка авторизации")
        throw error
      })
      .finally(() => setLoading(false))
  }

  return {
    user,
    error,
    loading,
    login,
    logout,
    setUser,
    setError,
  }
}
