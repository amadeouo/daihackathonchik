import classes from './ButtonBack.module.css'

type ButtonBackProps = {
  arrow: boolean,
}

export const ButtonBack = (props: ButtonBackProps) => {
  const {
    arrow = false,
  } = props

  return (
    <button className={classes.wrapper}>
      {
        arrow
      }
    </button>
  )
}