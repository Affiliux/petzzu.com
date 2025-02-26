import type { ReactNode } from 'react'

import { ChildResponseProps, PaymentProps } from '@/typings/child'

export type ChildProviderProps = {
  children: ReactNode
}

export type ChildContextType = {
  child: ChildResponseProps | null
  //
  set_child: (Child: ChildResponseProps | null) => void
  //
  handleGetChildBySlug: (slug: string) => Promise<void>
  handleGetChildById: (id: string) => Promise<void>
}
