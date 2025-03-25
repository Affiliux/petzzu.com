'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { DiscountProps, OrderBumpProps, PlanProps } from '@/typings/application'

import { useQueryParams } from '@/hooks/use-query-params'

import type { ApplicationContextType, ApplicationProviderProps } from './types'
import { locales } from '../../i18n'

import { NEXT_CURRENCY, NEXT_LOCALE, NEXT_THEME, THEMES } from '@/constants'
import { ThemeShowTypeEnum } from '@/enums'
import { delete_cookie, set_cookie } from '@/infrastructure/cache/cookies'
import { delete_storage, get_storage, set_storage } from '@/infrastructure/cache/storage'
import { get_discount, get_order_bump, get_plans } from '@/infrastructure/http/services/application'

export const ApplicationContext = createContext<ApplicationContextType>({} as ApplicationContextType)

export default function ApplicationProvider({ children }: ApplicationProviderProps) {
  // hooks
  const queryParams = useQueryParams()

  // states
  const [client, set_client] = useState<boolean>(false)
  const [loading_application, set_loading_application] = useState<boolean>(false)

  const [locale, set_locale] = useState<string>(get_storage(NEXT_LOCALE) ?? 'pt')
  const [currency, set_currency] = useState<string>(get_storage(NEXT_LOCALE) ?? 'brl')
  const [theme, set_theme] = useState<ThemeShowTypeEnum>(
    (get_storage(NEXT_THEME) as ThemeShowTypeEnum) ?? ThemeShowTypeEnum.BLUE,
  )

  const [plans, set_plans] = useState<PlanProps[]>([])
  const [order_bumps, set_order_bumps] = useState<OrderBumpProps[]>([])
  const [discount, set_discount] = useState<DiscountProps | null>(null)

  async function onChangeLocale(new_locale: string): Promise<void> {
    try {
      await set_cookie(NEXT_LOCALE, new_locale)

      set_storage(NEXT_LOCALE, new_locale)
      set_locale(new_locale)

      const saved_currency = localStorage.getItem(NEXT_CURRENCY)

      if (saved_currency) onChangeCurrency(saved_currency)
      else if (locale === 'pt') onChangeCurrency('brl')
      else onChangeCurrency('usd')
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

  async function onChangeTheme(new_theme: ThemeShowTypeEnum): Promise<void> {
    try {
      await set_cookie(NEXT_THEME, new_theme)

      set_storage(NEXT_THEME, new_theme)
      set_theme(new_theme)
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
    onInitLocale()
  }, [queryParams?.lang])

  useEffect(() => {
    const saved_theme = localStorage.getItem(NEXT_THEME)

    if (theme) {
      const root = document.documentElement
      Object.entries(THEMES[theme]).forEach(([key, value]) => {
        root.style.setProperty(key, value as string)
      })
    } else if (saved_theme) {
      onChangeTheme(saved_theme as ThemeShowTypeEnum)
    } else {
      onChangeTheme(ThemeShowTypeEnum.BLUE)
    }
  }, [theme])

  useEffect(() => {
    if (queryParams?.currency) onChangeCurrency(queryParams?.currency, true)
  }, [queryParams?.currency])

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
        onChangeTheme,
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
