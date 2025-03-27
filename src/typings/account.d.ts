/**
 *
 * @name RefreshToken
 * @category Interfaces - Account - RefreshToken
 * @version 0.0.1
 *
 */

import { MediaProps } from './child'
import type { MediaPreProps } from './create'
import { TimelineEntryProps } from './timeline'

import { BackgroundAnimationEnum, DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

export interface RefreshTokenProps {
  access_token: string
  refresh_token: string
}

/**
 *
 * @name Account
 * @category Interfaces - Account - Account
 * @version 0.0.1
 *
 */

export interface AccountProps {
  email: string
  name: string
}

/**
 *
 * @name EmailRequest
 * @category Interfaces - Auth - Email Request
 * @version 0.0.1
 *
 */

export interface EmailRequestPayloadProps {
  email: string
}

/**
 *
 * @name EmailConfirm
 * @category Interfaces - Auth - Email Confirm
 * @version 0.0.1
 *
 */

export interface EmailConfirmPayloadProps {
  email: string
  code: string
}

export interface EmailConfirmResponseProps extends RefreshTokenProps {
  user: AccountProps
}

/**
 *
 * @name Page
 * @category Interfaces - Account - Page
 * @version 0.0.1
 *
 */

export type PageProps = {
  id: string
  child_name: string
  slug: string
  birth_date: string
  planSku: string
  sex: string
  media: MediaProps[]
  timeLine: TimelineEntryProps[]
  isActive: boolean
  inactiveReason: string
  urlPayment: string
  qrCodeCode: string
  qrCode64: string
  qrCodeUrl: string
  lang: string
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
  createdAt: string
  updatedAt: string
}

export interface PageResponseProps {
  websites: PageProps[]
}

// Update Page
export type UpdatePage = {
  child_name: string
  birth_date: string
  sex: string
  timeLine: TimelineEntryProps[]
  dateShowType: DateShowTypeEnum
  themeShowType: ThemeShowTypeEnum
}

export interface UpdatePageResponseProps extends UpdatePage {}

// New Media
export interface NewPageMediaPayloadProps {
  id: string
  file: FormData
}

export interface NewPageMediaResponseProps extends MediaPreProps {}

// Remove Media
export interface RemovePageMediaPayloadProps {
  idWebsite: string
  idFile: string
}
