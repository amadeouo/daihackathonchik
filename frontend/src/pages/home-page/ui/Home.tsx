import classes from './Home.module.css'
import { Search } from "@/modules/search/ui";
import { useHackathons } from "@/shared/hooks/useHackathons.ts";
import { useEffect } from "react";

export const Home = () => {
  const { getHacks } = useHackathons()

  useEffect(() => {
    getHacks()
  }, [])

  return (
    <main className={classes.wrapper}>
      <Search />
    </main>
  )
}