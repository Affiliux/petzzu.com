import React, { createContext, useContext, useState } from 'react'

import { CoupleResponseProps } from '@/typings/couple'

import type { CoupleContextType, CoupleProviderProps } from './types'
import { useApplication } from '../ApplicationContext'

import { get_couple_id, get_couple_slug } from '@/infrastructure/http/services/couple'

export const CoupleContext = createContext<CoupleContextType>({} as CoupleContextType)

export default function CoupleProvider({ children }: CoupleProviderProps) {
  const { handleChangeLocale } = useApplication()
  const [couple, set_couple] = useState<CoupleResponseProps | null>(null)

  async function handleGetCoupleBySlug(slug: string): Promise<void> {
    try {
      const response = await get_couple_slug(slug)

      if (response) {
        if (!response.isActive && response.inactiveReason !== 'Awaiting payment') {
          window.location.href = `/`
          return
        }

        set_couple(response)
        handleChangeLocale(response.lang.split('-')[0])
      }
    } catch (error: any) {
      throw new Error('Website not found')
    }
  }

  async function handleGetCoupleById(id: string): Promise<void> {
    try {
      const response = await get_couple_id(id)
      if (response) set_couple(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <CoupleContext.Provider
      value={{
        couple,

        //
        set_couple,

        //
        handleGetCoupleBySlug,
        handleGetCoupleById,
      }}
    >
      {children}
    </CoupleContext.Provider>
  )
}

export const useCouple = () => {
  const context = useContext(CoupleContext)
  return context
}
