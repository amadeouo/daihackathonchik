import classes from './Login.module.css'
import {Button} from "@/shared/button/ui";
import {type ChangeEvent, type FormEvent, useState} from "react";
import { useLogin } from "@/shared/hooks/useLogin.ts";
import {useNavigate} from "react-router-dom";

type PostDataUserType = {
  telegram: string
}

export const Login = () => {
  const { user, login } = useLogin()
  const [formData, setFormData] = useState<PostDataUserType>({
    telegram: '',
  })
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login(formData.telegram)
    if (!user) {
      navigate('')
    }
  }

  const handleData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
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
    </main>
  )
}