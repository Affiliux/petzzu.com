import type { ReactNode } from 'react'

import { DiscountProps, PlanProps, YouTubeVideoProps } from '@/typings/application'

import { ThemeShowTypeEnum } from '@/enums'

export type ApplicationProviderProps = {
  children: ReactNode
}

export type ApplicationContextType = {
  client: boolean
  loading_application: boolean
  locale: string
  currency: string
  theme: ThemeShowTypeEnum
  plans: PlanProps[]
  discount: DiscountProps | null
  yt_search_list: YouTubeVideoProps[]
  //
  set_client: (client: boolean) => void
  set_loading_application: (loading: boolean) => void
  set_locale: (locale: string) => void
  set_currency: (currency: string) => void
  set_theme: (theme: ThemeShowTypeEnum) => void
  set_plans: (plans: PlanProps[]) => void
  set_discount: (discount: DiscountProps | null) => void
  set_yt_search_list: (videos: YouTubeVideoProps[]) => void
  //
  handleChangeLocale: (locale: string) => Promise<void>
  handleChangeCurrency: (currency: string, save?: boolean) => Promise<void>
  handleGetPlans: () => Promise<void>
  handleGetDiscount: (name: string) => Promise<void>
  handleGetYtVideos: (name: string) => Promise<void>
}
