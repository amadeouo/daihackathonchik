export function parseHackDate(date: string) {
  const rawDate = new Date(date)

  return `${getNumberFormatted(rawDate.getDate())}.${getNumberFormatted(rawDate.getMonth() + 1)}`
}

const getNumberFormatted = (number: number) => {
  if (number <= 9) {
    return `0${number}`
  } else {
    return number.toString()
  }
}