import classes from './HackCard.module.css'
import classNames from "classnames/bind";
import { parseDatesHack } from "@/shared/utils/parseDatesHack.ts";
import { Button } from "@/shared/buttons/button/ui";
import { useNavigate } from "react-router-dom";
import type { HackathonDataType } from "@/shared/hooks/useHackathons.ts";
import { useState } from "react";


type HackCardProps = {
  hackData: HackathonDataType & {
    format: 'offline' | 'online',
    color: string
  }
}

export const HackCard = (props: HackCardProps) => {
  const {
    hackData,
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  // for styles
  const cx = classNames.bind(classes)
  const className = cx({
    wrapper: true,
    cardOpen: isOpen,
    cardClose: !isOpen,
  })

  return (
    <div
      className={className}
      style={{ backgroundColor: hackData.color }}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <div className={classes.header}>
        <h3 className={classes.name}>{hackData.name}</h3>
        <div className={classes.wrapperSecondary}>
          <span className={classes.dates}>{parseDatesHack(hackData.start_date, hackData.end_date)}</span>
          <span className={classes.format}>{hackData.format}</span>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.wrapperDesc}>
          <span className={classes.desc}>{hackData.description}</span>
        </div>
        <Button
          onClick={() => navigate(`/hackathons/${hackData.id}`)}
          className={classes.button}
        >
          Участвовать
        </Button>
      </div>
    </div>
  )
}