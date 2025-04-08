// Definition: Pet types

import type { TimelineEntryProps } from '@/typings/timeline'

import { BackgroundAnimationEnum, DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

// Payment Props with the following properties:
export type PaymentProps = {
  id: string
  urlPayment: string
  qrCodeCode: string
  qrCode64: string
}

// Media Props with the following properties:
export type MediaProps = {
  id: string
  key?: string
  url: string
  createdAt?: string
  updatedAt?: string
}

// Pet Props with the following properties:
export type PetProps = {
  id: string
  pet_name: string
  slug: string
  message: string
  birth_date: string
  ddd: string
  phoneNumber: string
  email: string
  media: MediaProps[]
  timeLine: TimelineEntryProps[]
  isActive: boolean
  inactiveReason: string
  qrCodeUrl: string
  yt_song: string
  lang: string
  backgroundAnimation: BackgroundAnimationEnum
  backgroundEmojis?: string
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
  createdAt: string
  updatedAt: string
}

interface DefaultThemeProps {
  pet: PetResponseProps
}

// Get Pet
export interface PetPayloadProps {}
export interface PetResponseProps extends PetProps, PaymentProps {
  description: ReactNode
  name: ReactNode
  media: MediaProps[]
}
