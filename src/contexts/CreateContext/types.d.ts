import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { ChildResponseProps, PaymentProps } from '@/typings/child'
import type {
  CreateFromPrePayloadProps,
  CreatePrePayloadProps,
  MediaPreProps,
  NewMediaPayloadProps,
  PreResponseProps,
  RemoveMediaPayloadProps,
  UpdatePaymentPayloadProps,
  UpdatePrePayloadProps,
} from '@/typings/create'

import { DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

export type CreateProviderProps = {
  children: ReactNode
}

export type CreateContextType = {
  //
  pre: string | null
  pre_medias: MediaPreProps[]
  payment: PaymentProps | null
  child: CreatePrePayloadProps
  plan: PlanProps | undefined
  theme_show_type: ThemeShowTypeEnum
  date_show_type: DateShowTypeEnum
  payment_info: {
    email: string
    phone: string
  } | null
  //
  set_pre: Dispatch<SetStateAction<string | null>>
  set_pre_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  set_payment: Dispatch<SetStateAction<PaymentProps | null>>
  set_child: Dispatch<SetStateAction<CreatePrePayloadProps>>
  set_plan: Dispatch<SetStateAction<PlanProps | undefined>>
  set_theme_show_type: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  set_date_show_type: Dispatch<SetStateAction<DateShowTypeEnum>>
  set_payment_info: Dispatch<SetStateAction<{ email: string; phone: string } | null>>
  //
  onCreatePre: (payload: CreatePrePayloadProps) => Promise<void>
  onUpdatePre: (payload: UpdatePrePayloadProps) => Promise<void>
  onNewMedia: (payload: NewMediaPayloadProps) => Promise<void>
  onRemoveMedia: (payload: RemoveMediaPayloadProps) => Promise<void>
  onCreateFromPre: (payload: CreateFromPrePayloadProps) => Promise<void>
  onCheckPayment: (id: string) => Promise<ChildResponseProps>
  onGetPre: (id: string) => Promise<void>
  onUpdatePayment: (payload: UpdatePaymentPayloadProps, id: string) => Promise<void>
}
