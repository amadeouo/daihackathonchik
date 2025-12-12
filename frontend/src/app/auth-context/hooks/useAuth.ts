import {useContext} from "react";
import {AuthContext} from "@/app/auth-context/AuthContext.ts";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}