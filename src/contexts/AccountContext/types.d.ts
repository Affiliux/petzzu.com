import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type {
  AccountProps,
  EmailConfirmPayloadProps,
  EmailRequestPayloadProps,
  PageProps,
  UpdatePageResponseProps,
} from '@/typings/account'

export type AccountProviderProps = {
  children: ReactNode
}

export type AccountContextType = {
  account: AccountProps | null
  pages: PageProps[]
  selected: PageProps | null
  //
  set_account: Dispatch<SetStateAction<AccountProps | null>>
  set_pages: Dispatch<SetStateAction<PageProps[]>>
  set_selected: Dispatch<SetStateAction<PageProps | null>>
  //
  onRequestEmail: (payload: EmailRequestPayloadProps) => Promise<void>
  onConfirmEmail: (payload: EmailConfirmPayloadProps) => Promise<void>
  onSignOut: () => void
  onGetPages: () => Promise<void>
  onUpdateStatus: (id: string, status: boolean) => Promise<void>
}
