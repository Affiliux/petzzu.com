import { MediaProps, PaymentProps } from './couple'

import { DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

// Create pre with the following properties:
export type CreatePreProps = {
  coupleName: string
  message?: string
  startDate?: string
  yt_song?: string
  lang?: string
  backgroundAnimation?: string
  backgroundEmojis?: string[]
  imageShowType: PhotosSliderEnum
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
}

// Create Pre
export interface CreatePrePayloadProps extends CreatePreProps {}
export interface CreatePreResponseProps {
  success: boolean
  id: string
}

// Update
export interface UpdatePrePayloadProps extends CreatePreProps {
  id: string
}

export interface UpdatePreResponseProps {
  success: boolean
  id: string
}

// Media pre with the following properties:
export type MediaPreProps = {
  id: string
  url: string
}

// New Media
export interface NewMediaPayloadProps {
  id: string
  file: FormData
}

export interface NewMediaResponseProps extends MediaPreProps {}

// Remove Media
export interface RemoveMediaPayloadProps {
  idPreWebsite: string
  idFile: string
}

export interface RemoveMediaResponseProps {}

// Create from pre with the following properties:
export type CreateFromPreProps = {
  idPreWebsite: string
  lang: string
  plan: string
  gateway: string
  affiliateCode: string
  affiliateCampaignCode: string
  cpf?: string
  email: string
  phoneNumber: string
  ddd: string
  name?: string
  cardToken?: string
  idDiscountCupom: string | null
  ttclid: string | null
  fbclid: string | null
  utm_source: string | null
  utm_campaign: string | null
  utm_medium: string | null
  utm_content: string | null
  utm_term: string | null
  xcod: string | null
  gclid: string | null
}

// Create From Pre
export interface CreateFromPrePayloadProps extends CreateFromPreProps {}
export interface CreateFromPreResponseProps extends PaymentProps {
  success: boolean
}

// Get pre with the following properties:
export type PreProps = {
  id: string
  coupleName: string
  message: string
  startDate: string
  media: MediaProps[]
  yt_song: string
  backgroundAnimation: string
  backgroundEmojis: string
  imageShowType: PhotosSliderEnum
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
  createdAt: string
  updatedAt: string
}

export interface PreResponseProps extends PreProps {}
