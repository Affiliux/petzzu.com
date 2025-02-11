// Definition: Couple types

import { BackgroundAnimationEnum, DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

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
  name?: string
  url: string
  createdAt?: string
  updatedAt?: string
}

// Couple Props with the following properties:
export type CoupleProps = {
  coupleName: string
  slug: string
  message: string
  startDate: string
  isActive: boolean
  inactiveReason: string
  qrCodeUrl: string
  yt_song: string
  lang: string
  backgroundAnimation: BackgroundAnimationEnum
  backgroundEmojis?: string
  imageShowType: PhotosSliderEnum
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
  createdAt: string
  updatedAt: string
}

// Get Couple
export interface CouplePayloadProps {}
export interface CoupleResponseProps extends CoupleProps, PaymentProps {
  media: MediaProps[]
}
