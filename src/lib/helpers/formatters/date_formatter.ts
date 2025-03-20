import { format } from 'date-fns'

export function formatDate(date: string | Date): { day: string; month: string; year: string } {
  const formattedDate = format(new Date(date), 'dd MMM yyyy')
  const [day, month, year] = formattedDate.split(' ')
  return { day, month, year }
}
