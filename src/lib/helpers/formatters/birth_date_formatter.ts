export function getFormattedAge(t: (key: string) => string, birthDate?: string): { value: number; unit: string } {
  if (!birthDate) return { value: 0, unit: '' }

  const daysOld = Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))

  if (daysOld < 30) return { value: daysOld, unit: `${t('slug.birth_date.day')}${daysOld !== 1 ? 's' : ''}` }
  if (daysOld < 365)
    return {
      value: Math.floor(daysOld / 30),
      unit: `${t('slug.birth_date.month')}${Math.floor(daysOld / 30) !== 1 ? 'es' : ''}`,
    }
  return {
    value: Math.floor(daysOld / 365),
    unit: `${t('slug.birth_date.year')}${Math.floor(daysOld / 365) !== 1 ? 's' : ''}`,
  }
}
