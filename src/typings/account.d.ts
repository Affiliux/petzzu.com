/**
 *
 * @name RefreshToken
 * @category Interfaces - Account - RefreshToken
 * @version 0.0.1
 *
 */

import { MediaPreProps } from './create'

import { BackgroundAnimationEnum, DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'

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
  slug: string
  planSku: string
  isActive: boolean
  inactiveReason: string
  gateway: string
  urlPayment: string
  qrCodeCode: string
  qrCode64: string
  qrCodeUrl: string
  lang: string
  createdAt: string
  updatedAt: string
}

export interface PageResponseProps {
  websites: PageProps[]
}
