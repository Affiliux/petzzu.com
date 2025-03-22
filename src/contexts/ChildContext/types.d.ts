import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { ChildResponseProps, PaymentProps } from '@/typings/child'

export type ChildProviderProps = {
  children: ReactNode
}

export type ChildContextType = {
  child: ChildResponseProps | null
  //
  set_child: Dispatch<SetStateAction<ChildResponseProps | null>>
  //
  onGetChildBySlug: (slug: string) => Promise<void>
  onGetChildById: (id: string) => Promise<void>
}
