'use client'

import React, { createContext, useContext, useState } from 'react'

import type { ChildResponseProps } from '@/typings/child'

import type { ChildContextType, ChildProviderProps } from './types'
import { useApplication } from '../ApplicationContext'

import { get_child_id, get_child_slug } from '@/infrastructure/http/services/child'

export const ChildContext = createContext<ChildContextType>({} as ChildContextType)

export default function ChildProvider({ children }: ChildProviderProps) {
  // hooks
  const { onChangeLocale } = useApplication()

  // states
  const [child, set_child] = useState<ChildResponseProps | null>(null)

  async function onGetChildBySlug(slug: string): Promise<void> {
    try {
      const response = await get_child_slug(slug)

      if (response) {
        if (!response.isActive && response.inactiveReason !== 'Awaiting payment') {
          window.location.href = `/`
          return
        }

        set_child(response)
        onChangeLocale(response.lang.split('-')[0])
      }
    } catch (error: any) {
      throw new Error('Website not found')
    }
  }

  async function onGetChildById(id: string): Promise<void> {
    try {
      const response = await get_child_id(id)
      if (response) set_child(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <ChildContext.Provider
      value={{
        child,
        //
        set_child,
        //
        onGetChildBySlug,
        onGetChildById,
      }}
    >
      {children}
    </ChildContext.Provider>
  )
}

export const useChild = () => {
  const context = useContext(ChildContext)
  return context
}
