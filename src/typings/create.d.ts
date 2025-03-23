import type { MediaProps, PaymentProps } from './child'
import type { TimelineEntryProps } from './timeline'

import { DateShowTypeEnum,ThemeShowTypeEnum } from '@/enums'

// Create pre with the following properties:
export type CreatePreProps = {
  child_name: string
  message: string
  birth_date: string
  parent_name: string
  sex: string
  lang?: string
  themeShowType?: ThemeShowTypeEnum
  dateShowType: DateShowTypeEnum
}
// Create Pre
export interface CreatePrePayloadProps extends CreatePreProps {
  timeLine: TimelineEntryProps[]
}
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
  orderBumps: string[]
}

// Create From Pre
export interface CreateFromPrePayloadProps extends CreateFromPreProps {}
export interface CreateFromPreResponseProps extends PaymentProps {
  success: boolean
}

// Get pre with the following properties:
export type PreProps = {
  id: string
  child_name: string
  message: string
  parent_name: string
  lang: string
  birth_date: string
  sex: string
  media: MediaProps[]
  themeShowType: ThemeShowTypeEnum
  dateShowType: DateShowTypeEnum
  timeLine: TimelineEntryProps[]
  createdAt: string
  updatedAt: string
}

export interface PreResponseProps extends PreProps {}

export type UpdatePaymentProps = {
  gateway: string
  name?: string
  cardToken?: string
  ddd: string
  phoneNumber: string
  cpf: string
  email: string
}

export interface UpdatePaymentPayloadProps extends UpdatePaymentProps {}
export interface UpdatePaymentResponseProps extends PaymentProps {
  success: boolean
}
