'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { jwtDecode } from 'jwt-decode'

import type { AccountProps, EmailConfirmPayloadProps, EmailRequestPayloadProps, PageProps } from '@/typings/account'

import type { AccountContextType, AccountProviderProps } from './types'

import { NEXT_REFRESH_TOKEN, NEXT_USER_TOKEN } from '@/constants'
import { delete_cookie, get_cookie, set_cookie } from '@/infrastructure/cache/cookies'
import { confirm_email, get_pages, request_email, update_status_page } from '@/infrastructure/http/services/account'

export const AccountContext = createContext<AccountContextType>({} as AccountContextType)

export default function AccountProvider({ children }: AccountProviderProps) {
  // states
  const [account, set_account] = useState<AccountProps | null>(null)
  const [pages, set_pages] = useState<PageProps[]>([])
  const [selected, set_selected] = useState<PageProps | null>(null)

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
    refresh()
  }, [])

  return (
    <AccountContext.Provider
      value={{
        account,
        pages,
        selected,
        //
        set_account,
        set_pages,
        set_selected,
        //
        onRequestEmail,
        onConfirmEmail,
        onSignOut,
        onGetPages,
        onUpdateStatus,
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
