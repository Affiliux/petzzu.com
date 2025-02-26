import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return format(date, 'dd MMM yyyy', { locale: ptBR }).toUpperCase()
}
