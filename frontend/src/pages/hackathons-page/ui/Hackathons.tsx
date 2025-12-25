import classes from './Hackathons.module.css'
import { Search } from "@/modules/search/ui";
import { useHackathons } from "@/shared/hooks/useHackathons.ts";
import { useEffect } from "react";
import { HackCard } from "@/pages/hackathons-page/hack-card/ui";

export const Hackathons = () => {
  const { filteredHackathons, getHacks, filterHacks } = useHackathons()

  useEffect(() => {
    getHacks()
  }, [])

  return (
    <main className={classes.wrapper}>
      <Search
        placeholder='Поиск'
        onFilter={filterHacks}
      />
      {filteredHackathons.map(hack => (
        <HackCard
          id={hack.id}
          name={hack.name}
          start_date={hack.start_date}
          end_date={hack.end_date}
          description={hack.description}
          format='offline'
          key={hack.id}
        />
      ))}

    </main>
  )
}