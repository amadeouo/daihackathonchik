import { useAuth } from "@/app/auth-context/hooks/useAuth.ts";
import { Navigate } from "react-router-dom";
import type {ReactNode} from "react";

export const RequireAuth = ({children} : {children: ReactNode}) => {
  const { userContext, loading } = useAuth()
  console.log(userContext)

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (!userContext) {
    return <Navigate to="/" replace />;
  }

  return children;
}