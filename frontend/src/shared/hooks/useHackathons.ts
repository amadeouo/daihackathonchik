import { useState } from "react";
import { api } from "@/shared/utils/api";

type HackathonDataType = {
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
  const [hackathons, setHackathons] = useState<Array<HackathonDataType>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getHacks = () => {
    setLoading(true)
    api
      .get('/hackathons')
      .then((response) => {
        setHackathons(response.data.items)
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setLoading(false))
  }

  return {hackathons, loading, getHacks}
}