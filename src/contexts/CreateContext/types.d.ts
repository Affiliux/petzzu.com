import type { ReactNode } from 'react'

import { BackgroundAnimationProps, PlanProps, YouTubeVideoProps } from '@/typings/application'
import { CoupleResponseProps, PaymentProps } from '@/typings/couple'
import {
  CreateFromPrePayloadProps,
  CreatePrePayloadProps,
  MediaPreProps,
  NewMediaPayloadProps,
  PreResponseProps,
  RemoveMediaPayloadProps,
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
  song: YouTubeVideoProps | undefined
  plan: PlanProps | undefined
  media_show_type: PhotosSliderEnum
  date_show_type: DateShowTypeEnum
  theme_show_type: ThemeShowTypeEnum
  //
  set_pre: Dispatch<SetStateAction<string | null>>
  set_pre_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  set_payment: Dispatch<SetStateAction<PaymentProps | null>>
  set_child: Dispatch<SetStateAction<CreatePrePayloadProps>>
  set_song: Dispatch<SetStateAction<YouTubeVideoProps>>
  set_plan: Dispatch<SetStateAction<PlanProps | undefined>>
  set_media_show_type: Dispatch<SetStateAction<PhotosSliderEnum>>
  set_date_show_type: Dispatch<SetStateAction<DateShowTypeEnum>>
  set_theme_show_type: Dispatch<SetStateAction<ThemeShowTypeEnum>>
  //
  handleCreatePre: (payload: CreatePrePayloadProps) => Promise<void>
  handleUpdatePre: (payload: UpdatePrePayloadProps) => Promise<void>
  handleNewMedia: (payload: NewMediaPayloadProps) => Promise<void>
  handleRemoveMedia: (payload: RemoveMediaPayloadProps) => Promise<void>
  handleCreateFromPre: (payload: CreateFromPrePayloadProps) => Promise<void>
  handleCheckPayment: (id: string) => Promise<CoupleResponseProps>
  handleGetPre: (id: string) => Promise<void>
}
