import {type ReactNode, useEffect, useState} from "react";
import {AuthContext} from "@/app/auth-context/AuthContext.ts";
import {api} from "@/shared/utils/api.ts";
import type {UserResponse} from "@/shared/hooks/useLogin.ts";

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const {
    children,
  } = props

  const [userContext, setUserContext] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get('/auth/me')
      .then((response) => {
        setUserContext(response.data.user)
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setUserContext(null);
        } else {
          console.error(error);
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{userContext, loading, setUserContext}}>
      {children}
    </AuthContext.Provider>
  )
}