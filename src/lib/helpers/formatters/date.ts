import { format } from 'date-fns'

/**
 * @name formatDate
 * @category Helpers - Formatters
 *
 * @param  {string | Date | null | undefined} date - the date to be formatted.
 * @return { day: string; month: string; year: string } - the formatted date or empty strings if invalid.
 */
function formatDate(date: string | Date | null | undefined): { day: string; month: string; year: string } {
  // Se a data for null/undefined ou string vazia, retorna valores vazios
  if (!date) {
    return { day: '', month: '', year: '' }
  }

  try {
    const dateObj = new Date(date)

    // Verifica se a data é válida
    if (isNaN(dateObj.getTime())) {
      return { day: '', month: '', year: '' }
    }

    const formattedDate = format(dateObj, 'dd MM yyyy')
    const [day, month, year] = formattedDate.split(' ')
    return { day, month, year }
  } catch (error) {
    console.error('Error formatting date:', error)
    return { day: '', month: '', year: '' }
  }
}

export default formatDate
