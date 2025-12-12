import classes from './Home.module.css'
import { Link } from "react-router-dom";
import { Button } from "@/shared/button/ui";

export const Home = () => {
  return (
    <main className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <h1 className={classes.title}>ДайХакатончик</h1>
        <p className={classes.desc}>
          платформа для удобного поиска команды на хакатонах
        </p>
      </div>
      <Link to="/login">
        <Button className={classes.button}>Войти через телеграм</Button>
      </Link>
    </main>
  )
}