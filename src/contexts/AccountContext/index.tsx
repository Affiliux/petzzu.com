'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { jwtDecode } from 'jwt-decode'

import type {
  AccountProps,
  EmailConfirmPayloadProps,
  EmailRequestPayloadProps,
  NewPageMediaPayloadProps,
  PageProps,
  RemovePageMediaPayloadProps,
  UpdatePageResponseProps,
} from '@/typings/account'
import { PlanProps } from '@/typings/application'
import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import type { AccountContextType, AccountProviderProps } from './types'

import { NEXT_REFRESH_TOKEN, NEXT_USER_TOKEN } from '@/constants'
import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'
import { delete_cookie, get_cookie, set_cookie } from '@/infrastructure/cache/cookies'
import {
  confirm_email,
  get_pages,
  new_page_media,
  remove_page_media,
  request_email,
  update_page,
  update_status_page,
} from '@/infrastructure/http/services/account'

export const AccountContext = createContext<AccountContextType>({} as AccountContextType)

export default function AccountProvider({ children }: AccountProviderProps) {
  // states
  const [account, set_account] = useState<AccountProps | null>(null)
  const [pages, set_pages] = useState<PageProps[]>([])
  const [selected, set_selected] = useState<PageProps | null>(null)
  const [medias, set_medias] = useState<MediaPreProps[]>([])
  const [child, set_child] = useState<CreatePrePayloadProps>({} as CreatePrePayloadProps)
  const [theme_show_type, set_theme_show_type] = useState<ThemeShowTypeEnum>(ThemeShowTypeEnum.BLUE)
  const [date_show_type, set_date_show_type] = useState<DateShowTypeEnum>(DateShowTypeEnum.DEFAULT)
  const [plan, set_plan] = useState<PlanProps | undefined>()

  async function onRequestEmail({ email }: EmailRequestPayloadProps): Promise<void> {
    try {
      await request_email({ email })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function onConfirmEmail(payload: EmailConfirmPayloadProps): Promise<void> {
    try {
      const response = await confirm_email(payload)

      await set_cookie(NEXT_USER_TOKEN, response.access_token)
      await set_cookie(NEXT_REFRESH_TOKEN, response.refresh_token)

      const acc = jwtDecode<AccountProps>(response.access_token)
      set_account(acc)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function onSignOut() {
    try {
      set_account(null)

      await delete_cookie(NEXT_USER_TOKEN)
      await delete_cookie(NEXT_REFRESH_TOKEN)

      window.location.href = '/auth'
    } catch (error: any) {
      console.error(error)
    }
  }

  async function onGetPages(): Promise<void> {
    try {
      const response = await get_pages()
      set_pages(response.websites)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function onUpdateStatus(id: string, status: boolean): Promise<void> {
    try {
      await update_status_page(id, status)

      const newPages = pages.map(page => {
        if (page.id === id) {
          return {
            ...page,
            isActive: !page.isActive,
          }
        }

        return page
      })

      set_pages(newPages)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function onUpdatePage(id: string, page: UpdatePageResponseProps): Promise<void> {
    try {
      await update_page(id, page)

      const newPages = pages.map(old => {
        if (old.id === id) {
          return {
            ...old,
            child_name: page.child_name,
            birth_date: page.birth_date,
            sex: page.sex,
            dateShowType: page.dateShowType,
            themeShowType: page.themeShowType,
            timeLine: page.timeLine.map(entry => ({
              ...entry,
              media: entry.media.map(media => ({
                ...media,
                key: media.id,
              })),
            })),
          }
        }

        return old
      })

      set_pages(newPages)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function onNewMedia(payload: NewPageMediaPayloadProps): Promise<void> {
    try {
      const response = await new_page_media(payload)
      if (response) set_medias(prev => [...prev, response])

      const newPages = pages.map(old => {
        if (old.id === payload.id) {
          return {
            ...old,
            medias: [
              ...old.media,
              {
                id: response.id,
                url: response.url,
                key: response.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          }
        }

        return old
      })

      set_pages(newPages)
    } catch (error: any) {
      throw new Error('Error save new media website')
    }
  }

  async function onRemoveMedia(payload: RemovePageMediaPayloadProps): Promise<void> {
    try {
      await remove_page_media(payload)
      set_medias(prev => prev.filter(media => media.id !== payload.idFile))
    } catch (error: any) {
      throw new Error('Error removing media website')
    }
  }

  async function refresh() {
    try {
      const response = await get_cookie(NEXT_USER_TOKEN)

      if (response) {
        const acc = jwtDecode<AccountProps>(response)
        set_account(acc)
      } else {
        set_account(null)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!account?.name || !account?.email) refresh()
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        pages,
        selected,
        medias,
        child,
        plan,
        date_show_type,
        theme_show_type,
        //
        set_account,
        set_pages,
        set_selected,
        set_medias,
        set_child,
        set_plan,
        set_theme_show_type,
        set_date_show_type,
        //
        onRequestEmail,
        onConfirmEmail,
        onSignOut,
        onGetPages,
        onUpdatePage,
        onUpdateStatus,
        onNewMedia,
        onRemoveMedia,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)
  return context
}
