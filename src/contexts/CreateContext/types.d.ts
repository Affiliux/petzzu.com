import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { PetResponseProps, PaymentProps } from '@/typings/pet'
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
  childen: ReactNode
}

export type CreateContextType = {
  //
  pre: string | null
  pre_medias: MediaPreProps[]
  payment: PaymentProps | null
  pet: CreatePrePayloadProps
  plan: PlanProps | undefined
  theme_show_type: ThemeShowTypeEnum
  date_show_type: DateShowTypeEnum
  //
  set_pre: Dispatch<SetStateAction<string | null>>
  set_pre_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  set_payment: Dispatch<SetStateAction<PaymentProps | null>>
  set_pet: Dispatch<SetStateAction<CreatePrePayloadProps>>
  set_plan: Dispatch<SetStateAction<PlanProps | undefined>>
  set_theme_show_type: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  set_date_show_type: Dispatch<SetStateAction<DateShowTypeEnum>>
  //
  onCreatePre: (payload: CreatePrePayloadProps) => Promise<void>
  onUpdatePre: (payload: UpdatePrePayloadProps) => Promise<void>
  onNewMedia: (payload: NewMediaPayloadProps) => Promise<void>
  onRemoveMedia: (payload: RemoveMediaPayloadProps) => Promise<void>
  onCreateFromPre: (payload: CreateFromPrePayloadProps) => Promise<void>
  onCheckPayment: (id: string) => Promise<PetResponseProps>
  onGetPre: (id: string) => Promise<void>
  onUpdatePayment: (payload: UpdatePaymentPayloadProps, id: string) => Promise<void>
}
