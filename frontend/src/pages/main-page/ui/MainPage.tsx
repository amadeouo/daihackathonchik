import classes from './MainPage.module.css'
import { Link } from "react-router-dom";
import { Button } from "@/shared/buttons/button/ui";

export const MainPage = () => {
  return (
    <main className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <h1 className={classes.title}>ДайХакатончик</h1>
        <p className={classes.desc}>
          платформа для удобного поиска команды на хакатонах
        </p>
      </div>
      <Link to="/login">
        <Button className={classes.button}>Войти</Button>
      </Link>
    </main>
  )
}