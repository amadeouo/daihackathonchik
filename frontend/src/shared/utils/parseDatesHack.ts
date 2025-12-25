export function parseDatesHack(dateStart: string, dateEnd: string) {
  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)

  const getNumberFormatted = (number: number) => {
    if (number <= 9) {
      return `0${number}`
    } else {
      return number.toString()
    }
  }

  const startDateParsed = `${getNumberFormatted(startDate.getDate())}.${getNumberFormatted(startDate.getMonth() + 1)}`
  const endDateParsed = `${getNumberFormatted(endDate.getDate())}.${getNumberFormatted(endDate.getMonth() + 1)}`

  return `${startDateParsed} - ${endDateParsed}`
}