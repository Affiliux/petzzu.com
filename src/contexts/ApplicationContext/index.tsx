'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { DiscountProps, OrderBumpProps, PlanProps } from '@/typings/application'

import { useQueryParams } from '@/hooks/use-query-params'

import type { ApplicationContextType, ApplicationProviderProps } from './types'
import { locales } from '../../i18n'

import { NEXT_CURRENCY, NEXT_LOCALE } from '@/constants'
import { ThemeShowTypeEnum } from '@/enums'
import { delete_cookie, set_cookie } from '@/infrastructure/cache/cookies'
import { delete_storage, set_storage } from '@/infrastructure/cache/storage'
import { get_discount, get_order_bump, get_plans } from '@/infrastructure/http/services/application'

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType)

export default function ApplicationProvider({ children }: ApplicationProviderProps) {
  // hooks
  const queryParams = useQueryParams()

  // states
  const [client, set_client] = useState<boolean>(false)
  const [loading_application, set_loading_application] = useState<boolean>(false)

  const [locale, set_locale] = useState<string>('')
  const [currency, set_currency] = useState<string>('')
  const [theme, set_theme] = useState<ThemeShowTypeEnum>(ThemeShowTypeEnum.YELLOW)

  const [plans, set_plans] = useState<PlanProps[]>([])
  const [order_bumps, set_order_bumps] = useState<OrderBumpProps[]>([])
  const [discount, set_discount] = useState<DiscountProps | null>(null)

  // variables
  const themes = {
    blue: {
      '--theme-100': '#D6E2FF',
      '--theme-200': '#B8CDFF',
      '--theme-300': '#9AB8FF',
      '--theme-400': '#7DA2FF',
      '--theme-500': '#5F8DFF',
      '--theme-600': '#4178FF',
      '--theme-700': '#2363FF',
      '--theme-800': '#054EFF',
      '--theme-900': '#0039E6',
    },
    pink: {
      '--theme-100': '#FDD0E6',
      '--theme-200': '#FBB8DB',
      '--theme-300': '#F9A0D0',
      '--theme-400': '#F789C5',
      '--theme-500': '#F571BA',
      '--theme-600': '#F35AAE',
      '--theme-700': '#F142A3',
      '--theme-800': '#EF2A98',
      '--theme-900': '#ED138D',
    },
    yellow: {
      '--theme-100': ' #FFF9DB',
      '--theme-200': ' #FFF3C2',
      '--theme-300': ' #FFEDAA',
      '--theme-400': ' #FFE890',
      '--theme-500': ' #FFE277',
      '--theme-600': ' #FFDC5E',
      '--theme-700': ' #FFD545',
      '--theme-800': ' #FFCF2C',
      '--theme-900': ' #FFC812',
    },
  }

  async function onChangeLocale(new_locale: string): Promise<void> {
    try {
      await set_cookie(NEXT_LOCALE, new_locale)

      set_storage(NEXT_LOCALE, new_locale)
      set_locale(new_locale)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  async function onChangeCurrency(new_currency: string, save?: boolean): Promise<void> {
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

  async function onGetPlans(): Promise<void> {
    try {
      const response = await get_plans()
      if (response) set_plans(response.plans)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetOrderBump(): Promise<void> {
    try {
      const response = await get_order_bump()
      if (response && response.orderBumps) set_order_bumps(response.orderBumps)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetDiscount(name: string): Promise<void> {
    try {
      const response = await get_discount({ name })
      if (response && response.isActive) set_discount(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onInitLocale() {
    set_loading_application(true)
    set_client(true)

    try {
      const saved_locale = localStorage.getItem(NEXT_LOCALE)

      if (locale === queryParams?.lang) return

      if (queryParams?.lang && locales.includes(queryParams?.lang as any)) {
        await onChangeLocale(queryParams?.lang)
      } else if (saved_locale && saved_locale.includes('-') && locales.includes(saved_locale.split('-')[0] as any)) {
        await onChangeLocale(saved_locale.split('-')[0])
      } else if (saved_locale && locales.includes(saved_locale as any)) {
        await onChangeLocale(saved_locale)
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      set_loading_application(false)
    }
  }

  useEffect(() => {
    if (plans.length === 0) onGetPlans()
    if (order_bumps.length === 0) onGetOrderBump()
    if (queryParams?.dc && !discount) onGetDiscount(queryParams?.dc)
  }, [queryParams?.dc])

  useEffect(() => {
    const root = document.documentElement
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
  }, [theme])

  useEffect(() => {
    onInitLocale()
  }, [queryParams?.lang])

  useEffect(() => {
    const saved_currency = localStorage.getItem(NEXT_CURRENCY)

    if (queryParams?.currency) onChangeCurrency(queryParams?.currency, true)
    else if (saved_currency) onChangeCurrency(saved_currency)
    else if (locale === 'pt') onChangeCurrency('brl')
    else if (locale === 'en') onChangeCurrency('usd')
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
        order_bumps,
        discount,

        set_client,
        set_loading_application,
        set_locale,
        set_currency,
        set_theme,
        set_plans,
        set_order_bumps,
        set_discount,

        onChangeLocale,
        onChangeCurrency,
        onGetPlans,
        onGetDiscount,
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
