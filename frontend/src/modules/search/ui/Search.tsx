import classes from './Search.module.css'
import { useHackathons } from "@/shared/hooks/useHackathons.ts";
import { type FormEvent, useState } from "react";

export const Search = () => {
  const { filterHacks } = useHackathons()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    filterHacks(searchQuery)
  }

  return (
    <form
      className={classes.wrapper}
      onSubmit={(e) => handleSubmit(e)}
    >
      <svg
        className={classes.icon}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7784 14.7784L11.7221 11.7221M11.7221 11.7221C12.2449 11.1993 12.6596 10.5786 12.9425 9.89556C13.2255 9.2125 13.3711 8.4804 13.3711 7.74106C13.3711 7.00171 13.2255 6.26961 12.9425 5.58655C12.6596 4.90348 12.2449 4.28284 11.7221 3.76004C11.1993 3.23725 10.5787 2.82255 9.8956 2.53961C9.21253 2.25668 8.48043 2.11105 7.74109 2.11105C7.00174 2.11105 6.26964 2.25668 5.58658 2.53961C4.90351 2.82255 4.28287 3.23725 3.76007 3.76004C2.70424 4.81587 2.11108 6.24789 2.11108 7.74106C2.11108 9.23423 2.70424 10.6662 3.76007 11.7221C4.8159 12.7779 6.24792 13.3711 7.74109 13.3711C9.23426 13.3711 10.6663 12.7779 11.7221 11.7221Z"
          stroke="#3E3A40"
          strokeWidth="1.75933"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        className={classes.input}
        id="search"
        name="search"
        type="search"
        placeholder="Поиск"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  )
}