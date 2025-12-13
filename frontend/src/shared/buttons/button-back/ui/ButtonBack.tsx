import classes from './ButtonBack.module.css'
import classNames from "classnames";

type ButtonBackProps = {
  arrow: boolean,
  onClick?: () => void,
  className: string,
}

export const ButtonBack = (props: ButtonBackProps) => {
  const {
    arrow,
    onClick,
    className,
  } = props

  return (
    <button
      className={classNames(classes.wrapper, className)}
      onClick={onClick}
    >
      {
        arrow
        ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="15" fill="white"/>
              <path d="M22.2 8.39999L8.39995 22.2" stroke="black" stroke-width="1.2" stroke-linecap="round"/>
              <path d="M8.3999 8.39999L22.1999 22.2" stroke="black" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          )
        : (
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="39" height="39" rx="19.5" fill="white"/>
              <path d="M9.29289 18.7929C8.90237 19.1834 8.90237 19.8166 9.29289 20.2071L15.6569 26.5711C16.0474 26.9616 16.6805 26.9616 17.0711 26.5711C17.4616 26.1805 17.4616 25.5474 17.0711 25.1569L11.4142 19.5L17.0711 13.8431C17.4616 13.4526 17.4616 12.8195 17.0711 12.4289C16.6805 12.0384 16.0474 12.0384 15.6569 12.4289L9.29289 18.7929ZM29 19.5V18.5H10V19.5V20.5H29V19.5Z" fill="#3E3A40"/>
            </svg>
          )
      }
    </button>
  )
}