import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { DiscountProps, PlanProps, YouTubeVideoProps } from '@/typings/application'

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
  order_bumps: OrderBumpProps[]
  discount: DiscountProps | null
  //
  set_client: Dispatch<SetStateAction<boolean>>
  set_loading_application: Dispatch<SetStateAction<boolean>>
  set_locale: Dispatch<SetStateAction<string>>
  set_currency: Dispatch<SetStateAction<string>>
  set_theme: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  set_plans: Dispatch<SetStateAction<PlanProps[]>>
  set_order_bumps: Dispatch<SetStateAction<OrderBumpProps[]>>
  set_discount: Dispatch<SetStateAction<DiscountProps | null>>
  //
  onChangeLocale: (locale: string) => Promise<void>
  onChangeCurrency: (currency: string, save?: boolean) => Promise<void>
  onChangeTheme: (theme: ThemeShowTypeEnum) => Promise<void>
  onGetPlans: () => Promise<void>
  onGetDiscount: (name: string) => Promise<void>
}
