import {type ReactNode, useState} from "react";
import {AuthContext} from "@/app/auth-context/AuthContext.ts";

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const {
    children,
  } = props

  const [isRedirectFromRoot, setIsRedirectFromRoot] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{isRedirectFromRoot, setIsRedirectFromRoot}}>
      {children}
    </AuthContext.Provider>
  )
}