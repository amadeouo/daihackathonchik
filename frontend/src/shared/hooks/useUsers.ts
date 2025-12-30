import { useState } from "react";
import { api } from "@/shared/utils/api.ts";

export type UserType = {
  id: 0,
  telegram_username: string,
  role: string,
  full_name: string,
  position: string,
  about: string,
  contacts: {},
  created_at: string,
  updated_at: string,
  skills: Array<string>
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getUsers = () => {
    api
      .get('/profile')
      .then((response) => setUsers(response.data.items))
      .catch((error) => console.error('Ошибка загрузки:', error))
      .finally(() => setLoading(false))
  }

  return { users, loading, getUsers }
}