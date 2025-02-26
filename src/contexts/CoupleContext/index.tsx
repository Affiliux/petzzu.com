import React, { createContext, useContext, useState } from 'react'

import { ChildResponseProps } from '@/typings/child'

import type { ChildContextType, ChildProviderProps } from './types'
import { useApplication } from '../ApplicationContext'

import { get_child_id, get_child_slug } from '@/infrastructure/http/services/couple'

export const ChildContext = createContext<ChildContextType>({} as ChildContextType)

export default function ChildProvider({ children }: ChildProviderProps) {
  const { handleChangeLocale } = useApplication()
  const [child, set_child] = useState<ChildResponseProps | null>(null)

  async function handleGetChildBySlug(slug: string): Promise<void> {
    try {
      const response = await get_child_slug(slug)

      if (response) {
        if (!response.isActive && response.inactiveReason !== 'Awaiting payment') {
          window.location.href = `/`
          return
        }

        set_child(response)
        handleChangeLocale(response.lang.split('-')[0])
      }
    } catch (error: any) {
      throw new Error('Website not found')
    }
  }

  async function handleGetChildById(id: string): Promise<void> {
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
        handleGetChildBySlug,
        handleGetChildById,
      }}
    >
      {children}
    </ChildContext.Provider>
  )
}

export const useCouple = () => {
  const context = useContext(ChildContext)
  return context
}
