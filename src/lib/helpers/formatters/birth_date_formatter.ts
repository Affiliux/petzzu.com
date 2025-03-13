//recebe o t do pages para translate
export function getFormattedAge(t: (key: string) => string, birthDate?: string): string {
  if (!birthDate) return ''

  const daysOld = Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))

  if (daysOld < 30) return `${daysOld} ${t('slug.birth_date.day')}${daysOld !== 1 ? 's' : ''}`

  if (daysOld < 365)
    return `${Math.floor(daysOld / 30)} ${t('slug.birth_date.month')}${Math.floor(daysOld / 30) !== 1 ? 's' : ''}`

  return `${Math.floor(daysOld / 365)} ${t('slug.birth_date.year')}${Math.floor(daysOld / 365) !== 1 ? 's' : ''}`
}
