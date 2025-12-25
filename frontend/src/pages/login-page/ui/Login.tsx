import classes from './Login.module.css'
import {Button} from "@/shared/buttons/button/ui";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import { useLogin } from "@/shared/hooks/useLogin.ts";
import {useNavigate} from "react-router-dom";
import {api} from "@/shared/utils/api.ts";
import {useAuth} from "@/app/auth-context/hooks/useAuth.ts";
import {ButtonBack} from "@/shared/buttons/button-back/ui";

type PostDataUserType = {
  telegram: string
}

export const Login = () => {
  const { login, setUser, error, setError } = useLogin()
  const [formData, setFormData] = useState<PostDataUserType>({
    telegram: '',
  })
  const [loadingAutoAuth, setLoadingAutoAuth] = useState<boolean>(false)
  const navigate = useNavigate()
  const {isRedirectFromRoot, setIsRedirectFromRoot} = useAuth()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login(formData.telegram)
  }

  const handleData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (isRedirectFromRoot) {
      setIsRedirectFromRoot(false)
      return
    }

    setLoadingAutoAuth(true)
    api
      .get('/auth/me')
      .then((response) => {
        setUser(response.data.user)
        navigate('/hackathons')
      })
      .catch(() => {})
      .finally(() => setLoadingAutoAuth(false))
  }, [])

  if (loadingAutoAuth) {
    return (
      <div className={classes.loading}>Loading...</div>
    )
  }

  return (
    <main className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <h1 className={classes.title}>Вход</h1>
        <p className={classes.desc}>
          Введите ваш ник telegram
        </p>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <input
          className={classes.input}
          type="text"
          required
          name="telegram"
          id="login"
          placeholder="ваш ник без @"
          pattern="^[A-Za-z]+$"
          value={formData.telegram}
          onChange={handleData}
        />
        <Button
          submit
        >
          Войти
        </Button>
      </form>

      {error && (
        <div className={classes.errorOverlay}>
          <div className={classes.errorModal}>
            <div className={classes.buttonWrapper}>
              <ButtonBack
                className={classes.errorButtonBack}
                arrow
                onClick={() => setError(null)}
              />
            </div>
            <div className={classes.errorMessage}>
              <h2 className={classes.errorHeader}>Ошибка входа</h2>
              <p className={classes.errorDesc}>
                Кажется, то‑то пошло не так. Проверьте корректность ника и попробуйте ещё раз.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}