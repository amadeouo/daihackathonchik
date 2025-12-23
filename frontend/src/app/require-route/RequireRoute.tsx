import {type ReactNode, useEffect} from "react";
import {api} from "@/shared/utils/api.ts";
import {useNavigate} from "react-router-dom";
import {useLogin} from "@/shared/hooks/useLogin.ts";
import {useAuth} from "@/app/auth-context/hooks/useAuth.ts";

export const RequireRoute = ({children} : {children: ReactNode}) => {
  const {user, setUser} = useLogin()
  const navigate = useNavigate()
  const {setIsRedirectFromRoot} = useAuth()

  useEffect(() => {
    if (user) {
      return
    }

    api
      .get('/auth/me')
      .then((response) => {
        setUser(response.data.user)
        if (location.pathname === '/') {
          navigate('/home', { replace: true })
        }
      })
      .catch(() => {
        navigate('/main', { replace: true })
        setIsRedirectFromRoot(true)
      })
  }, [user])

  return children
}