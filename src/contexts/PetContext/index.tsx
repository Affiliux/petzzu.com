'use client'

import React, { createContext, useContext, useState } from 'react'

import type { PetResponseProps } from '@/typings/pet'

import type { PetContextType, PetProviderProps } from './types'
import { useApplication } from '../ApplicationContext'

import { get_pet_id, get_pet_slug } from '@/infrastructure/http/services/pet'

export const PetContext = createContext<PetContextType>({} as PetContextType)

export default function PetProvider({ childen }: PetProviderProps) {
  // hooks
  const { onChangeLocale } = useApplication()

  // states
  const [pet, set_pet] = useState<PetResponseProps | null>(null)

  async function onGetPetBySlug(slug: string): Promise<void> {
    try {
      const response = await get_pet_slug(slug)

      if (response) {
        if (!response.isActive && response.inactiveReason !== 'Awaiting payment') {
          window.location.href = `/`
          return
        }

        set_pet(response)
        onChangeLocale(response.lang.split('-')[0])
      }
    } catch (error: any) {
      throw new Error('Website not found')
    }
  }

  async function onGetPetById(id: string): Promise<void> {
    try {
      const response = await get_pet_id(id)
      if (response) set_pet(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <PetContext.Provider
      value={{
        pet,
        //
        set_pet,
        //
        onGetPetBySlug,
        onGetPetById,
      }}
    >
      {childen}
    </PetContext.Provider>
  )
}

export const usePet = () => {
  const context = useContext(PetContext)
  return context
}
