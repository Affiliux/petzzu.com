import { getRequestConfig } from 'next-intl/server'

import { get_cookie } from './infrastructure/cache/cookies'
import { NEXT_LOCALE } from './constants'

export type Locale = (typeof locales)[number]

export const locales = ['pt', 'en', 'es'] as const

export default getRequestConfig(async () => {
  const storedLocale = await get_cookie(NEXT_LOCALE)
  const locale = storedLocale && locales.includes(storedLocale as any) ? storedLocale : 'pt'

  return {
    locale,
    messages: (await import(`./translate/${locale}.json`)).default,
  }
})
