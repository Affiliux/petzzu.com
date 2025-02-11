import type { ReactNode } from 'react'

import { CoupleResponseProps, PaymentProps } from '@/typings/couple'

export type CoupleProviderProps = {
  children: ReactNode
}

export type CoupleContextType = {
  couple: CoupleResponseProps | null
  //
  set_couple: (couple: CoupleResponseProps | null) => void
  //
  handleGetCoupleBySlug: (slug: string) => Promise<void>
  handleGetCoupleById: (id: string) => Promise<void>
}
