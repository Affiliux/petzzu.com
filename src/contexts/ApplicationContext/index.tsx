import React, { createContext, useContext, useEffect, useState } from 'react'

import { DiscountProps, PlanProps, YouTubeVideoProps } from '@/typings/application'

import { useQueryParams } from '@/hooks/use-query-params'

import type { ApplicationContextType, ApplicationProviderProps } from './types'

import { NEXT_CURRENCY, NEXT_LOCALE } from '@/constants'
import { ThemeShowTypeEnum } from '@/enums'
import { locales } from '@/i18n'
import { delete_cookie, set_cookie } from '@/infrastructure/cache/cookies'
import { delete_storage, set_storage } from '@/infrastructure/cache/storage'
import { get_discount, get_plans, get_search_yt } from '@/infrastructure/http/services/application'

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType)

export default function ApplicationProvider({ children }: ApplicationProviderProps) {
  const queryParams = useQueryParams()

  const [client, set_client] = useState<boolean>(false)
  const [loading_application, set_loading_application] = useState<boolean>(false)

  const [locale, set_locale] = useState<string>('')
  const [currency, set_currency] = useState<string>('')
  const [theme, set_theme] = useState<ThemeShowTypeEnum>(ThemeShowTypeEnum.DEFAULT)

  const [plans, set_plans] = useState<PlanProps[]>([])
  const [discount, set_discount] = useState<DiscountProps | null>(null)

  const [yt_search_list, set_yt_search_list] = useState<YouTubeVideoProps[]>([])

  async function handleChangeLocale(new_locale: string): Promise<void> {
    try {
      await set_cookie(NEXT_LOCALE, new_locale)

      set_storage(NEXT_LOCALE, new_locale)
      set_locale(new_locale)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function handleChangeCurrency(new_currency: string, save?: boolean): Promise<void> {
    try {
      if (save) {
        await set_cookie(NEXT_CURRENCY, new_currency)
        set_storage(NEXT_CURRENCY, new_currency)
      } else {
        await delete_cookie(NEXT_CURRENCY)
        delete_storage(NEXT_CURRENCY)
      }

      set_currency(new_currency)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function handleGetPlans(): Promise<void> {
    try {
      const response = await get_plans({})
      if (response) set_plans(response.plans)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleGetDiscount(name: string): Promise<void> {
    try {
      const response = await get_discount({ name })
      if (response && response.isActive) set_discount(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function handleGetYtVideos(name: string): Promise<void> {
    try {
      const response = await get_search_yt(name)
      if (response) set_yt_search_list(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function initLocale() {
    set_loading_application(true)
    set_client(true)

    try {
      const saved_locale = localStorage.getItem(NEXT_LOCALE)

      if (locale === queryParams?.lang) return

      if (queryParams?.lang && locales.includes(queryParams?.lang as any)) {
        await handleChangeLocale(queryParams?.lang)
      } else if (saved_locale && saved_locale.includes('-') && locales.includes(saved_locale.split('-')[0] as any)) {
        await handleChangeLocale(saved_locale.split('-')[0])
      } else if (saved_locale && locales.includes(saved_locale as any)) {
        await handleChangeLocale(saved_locale)
      } else if (
        typeof navigator !== 'undefined' &&
        navigator.language &&
        locales.includes(navigator.language.split('-')[0] as any)
      ) {
        await handleChangeLocale(navigator.language.split('-')[0])
      } else {
        await handleChangeLocale('pt')
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading_application(false)
    }
  }

  useEffect(() => {
    if (queryParams?.theme && Object.values(ThemeShowTypeEnum).includes(queryParams?.theme as ThemeShowTypeEnum)) {
      set_theme(queryParams?.theme as ThemeShowTypeEnum)
    }
  }, [queryParams?.theme])

  useEffect(() => {
    initLocale()

    if (!plans.length) handleGetPlans()
    if (queryParams?.dc && !discount) handleGetDiscount(queryParams?.dc)
  }, [queryParams?.lang])

  useEffect(() => {
    const saved_currency = localStorage.getItem(NEXT_CURRENCY)

    if (queryParams?.currency) handleChangeCurrency(queryParams?.currency, true)
    else if (locale.includes('pt')) handleChangeCurrency('brl')
    else if (saved_currency) handleChangeCurrency(saved_currency)
    else handleChangeCurrency('usd')
  }, [locale, queryParams?.currency])

  return (
    <ApplicationContext.Provider
      value={{
        client,
        loading_application,
        locale,
        currency,
        theme,
        plans,
        discount,
        yt_search_list,

        set_client,
        set_loading_application,
        set_locale,
        set_currency,
        set_theme,
        set_plans,
        set_discount,
        set_yt_search_list,

        handleChangeLocale,
        handleChangeCurrency,
        handleGetPlans,
        handleGetDiscount,
        handleGetYtVideos,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplication = () => {
  const context = useContext(ApplicationContext)
  return context
}
