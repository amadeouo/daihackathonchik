import classNames from 'classnames';
import classes from './Button.module.css'
import type { ReactNode } from "react";

type buttonPropsTypes = {
  children: ReactNode,
  className?: string | object,
  submit?: boolean,
  onClick?: () => void
  onSubmit?: () => void
}

export const Button = (props: buttonPropsTypes) => {
  const {
    children,
    className,
    submit,
    onClick,
    onSubmit,
  } = props

  return (
    <button
      className={classNames(className, classes.button)}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  )
}