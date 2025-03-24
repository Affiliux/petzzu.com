import { format } from 'date-fns'

/**
 * @name formatDate
 * @category Helpers - Formatters
 *
 * @param  {?string} date - the date to be formatted.
 * @return { day: string; month: string; year: string } - the formatted date.
 */

function formatDate(date: string | Date): { day: string; month: string; year: string } {
  const formattedDate = format(new Date(date), 'dd MM yyyy')
  const [day, month, year] = formattedDate.split(' ')
  return { day, month, year }
}

export default formatDate
