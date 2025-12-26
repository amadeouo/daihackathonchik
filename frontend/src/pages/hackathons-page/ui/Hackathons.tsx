import classes from './Hackathons.module.css'
import { Search } from "@/modules/search/ui";
import { useHackathons } from "@/shared/hooks/useHackathons.ts";
import { useEffect } from "react";
import { HackCard } from "@/pages/hackathons-page/hack-card/ui";

const colors = [
  "#C1D6AB",
  "#FFFFFF",
  "#B1AFFF",
  "#F0E092",
  "#DA92F0",
]

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
      <div className={classes.cardWrapper}>
        {filteredHackathons.map((hack, index) => (
          <HackCard
            hackData={{
              ...hack,
              format: 'offline',
              color: colors[index % colors.length]
            }}
          />
        ))}
      </div>

    </main>
  )
}