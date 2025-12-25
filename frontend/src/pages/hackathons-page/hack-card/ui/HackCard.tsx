import classes from './HackCard.module.css'
import classNames from "classnames/bind";
import { useState } from "react";
import { parseDatesHack } from "@/shared/utils/parseDatesHack.ts";
import { Button } from "@/shared/buttons/button/ui";
import { useNavigate } from "react-router-dom";


type HackCardProps = {
  id: number,
  name: string,
  start_date: string,
  end_date: string,
  description: string,
  format: 'offline' | 'online',
}

export const HackCard = (props: HackCardProps) => {
  const {
    id,
    name,
    start_date,
    end_date,
    description,
    format,
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

  const onButtonClick = () => navigate(`/hackathons/${id}`)

  return (
    <div className={className}>
      <h3 className={classes.name}>{name}</h3>
      <div className={classes.wrapperSecondary}>
        <span className={classes.dates}>{parseDatesHack(start_date, end_date)}</span>
        <span className={classes.format}>{format}</span>
      </div>
      <div className={classes.format}>
        <span className={classes.desc}>{description}</span>
      </div>
      <Button onClick={onButtonClick} className={classes.button}>Участвовать</Button>
    </div>
  )
}