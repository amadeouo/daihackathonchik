import { useState } from "react";
import { api } from "@/shared/utils/api";

export interface HackathonDataType {
  name: string,
  description: string,
  start_date: string,
  end_date: string,
  status: string,
  min_team_size: number,
  max_team_size: number,
  id: number,
  created_at: string,
  updated_at: string,
}

export const useHackathons = () => {
  const [hackathons, setHackathons] = useState<HackathonDataType[]>([])
  const [filteredHackathons, setFilteredHackathons] = useState<HackathonDataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getHacks = () => {
    setLoading(true)
    api
      .get('/hackathons')
      .then((response) => {
        setHackathons(response.data.items)
        setFilteredHackathons(response.data.items)
      })
      .catch((error) => {
        console.error('Ошибка загрузки:', error)
        setHackathons([])
      })
      .finally(() => setLoading(false))
  }

  const filterHacks = (query: string) => {
    const queryString = query.trim().toLowerCase()

    if (!queryString) {
      setFilteredHackathons(hackathons)
      return
    }

    const filteredHackathons = hackathons.filter((hack) => {
      return hack.name.toLowerCase().includes(queryString) ||
        hack.description.toLowerCase().includes(queryString)
    })

    setFilteredHackathons(filteredHackathons)
  }
  return {hackathons, loading, filteredHackathons, getHacks, filterHacks }
}