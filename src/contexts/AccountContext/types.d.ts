import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type {
  AccountProps,
  EmailConfirmPayloadProps,
  EmailRequestPayloadProps,
  NewPageMediaPayloadProps,
  PageProps,
  RemovePageMediaPayloadProps,
  UpdatePageResponseProps,
} from '@/typings/account'
import type { PlanProps } from '@/typings/application'
import type { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import { ThemeShowTypeEnum } from '@/enums'

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
  account: AccountProps | null
  pages: PageProps[]
  selected: PageProps | null
  medias: MediaPreProps[]
  child: CreatePrePayloadProps
  plan: PlanProps | undefined
  theme_show_type: ThemeShowTypeEnum
  date_show_type: DateShowTypeEnum
  //
  set_account: Dispatch<SetStateAction<AccountProps | null>>
  set_pages: Dispatch<SetStateAction<PageProps[]>>
  set_selected: Dispatch<SetStateAction<PageProps | null>>
  set_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  set_child: Dispatch<SetStateAction<CreatePrePayloadProps>>
  set_plan: Dispatch<SetStateAction<PlanProps | undefined>>
  set_theme_show_type: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  set_date_show_type: Dispatch<SetStateAction<DateShowTypeEnum>>
  //
  onRequestEmail: (payload: EmailRequestPayloadProps) => Promise<void>
  onConfirmEmail: (payload: EmailConfirmPayloadProps) => Promise<void>
  onSignOut: () => void
  onGetPages: () => Promise<void>
  onUpdatePage: (id: string, page: UpdatePageResponseProps) => Promise<void>
  onNewMedia: (payload: NewPageMediaPayloadProps) => Promise<void>
  onRemoveMedia: (payload: RemovePageMediaPayloadProps) => Promise<void>
  onUpdateStatus: (id: string, status: boolean) => Promise<void>
}
