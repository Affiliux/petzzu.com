// Definition: Child types

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

// Child Props with the following properties:
export type ChildProps = {
  id: string
  child_name: string
  slug: string
  message: string
  sex: string
  birth_date: string
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
  child: ChildResponseProps
}

// Get Child
export interface ChildPayloadProps {}
export interface ChildResponseProps extends ChildProps, PaymentProps {
  description: ReactNode
  name: ReactNode
  media: MediaProps[]
}
