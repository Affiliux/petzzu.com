'use client'

import React, { createContext, useContext, useState } from 'react'

import type { PlanProps } from '@/typings/application'
import type { PetResponseProps, PaymentProps } from '@/typings/pet'
import type {
  CreateFromPrePayloadProps,
  CreatePrePayloadProps,
  MediaPreProps,
  NewMediaPayloadProps,
  RemoveMediaPayloadProps,
  UpdatePaymentPayloadProps,
  UpdatePrePayloadProps,
} from '@/typings/create'

import type { CreateContextType, CreateProviderProps } from './types'

import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'
import { get_pet_id } from '@/infrastructure/http/services/pet'
import {
  create_from_pre,
  create_pre,
  get_pre,
  new_media,
  remove_media,
  update_payment,
  update_pre,
} from '@/infrastructure/http/services/create'

export const CreateContext = createContext<CreateContextType>({} as CreateContextType)

export default function CreateProvider({ childen }: CreateProviderProps) {
  // states
  const [pre, set_pre] = useState<string | null>(null)
  const [pre_medias, set_pre_medias] = useState<MediaPreProps[]>([])
  const [pet, set_pet] = useState<CreatePrePayloadProps>({} as CreatePrePayloadProps)
  const [theme_show_type, set_theme_show_type] = useState<ThemeShowTypeEnum>(ThemeShowTypeEnum.BLUE)
  const [date_show_type, set_date_show_type] = useState<DateShowTypeEnum>(DateShowTypeEnum.DEFAULT)
  const [plan, set_plan] = useState<PlanProps | undefined>()
  const [payment, set_payment] = useState<PaymentProps | null>(null)

  async function onCreatePre(payload: CreatePrePayloadProps): Promise<void> {
    try {
      const response = await create_pre(payload)

      if (response) {
        set_pre(response.id)
        localStorage.setItem('hasSavePre', response.id)
      }
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function onUpdatePre(payload: UpdatePrePayloadProps): Promise<void> {
    try {
      await update_pre(payload)
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function onNewMedia(payload: NewMediaPayloadProps): Promise<void> {
    try {
      const response = await new_media(payload)
      if (response) set_pre_medias(prev => [...prev, response])

      return
    } catch (error: any) {
      console.error(error)
    }

    throw new Error('Error save new media')
  }

  async function onRemoveMedia(payload: RemoveMediaPayloadProps): Promise<void> {
    try {
      await remove_media(payload)
      set_pre_medias(prev => prev.filter(media => media.id !== payload.idFile))
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function onCreateFromPre(payload: CreateFromPrePayloadProps): Promise<void> {
    try {
      const response = await create_from_pre(payload)
      if (response) set_payment(response)
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function onCheckPayment(id: string): Promise<PetResponseProps> {
    try {
      const response = await get_pet_id(id)
      return response
    } catch (error: any) {
      console.error(error)
      throw new Error('Error checking payment')
    }
  }

  async function onGetPre(id: string): Promise<void> {
    try {
      const response = await get_pre(id)

      if (response) {
        set_pre(response.id)
        set_pet({
          pet_name: response.pet_name,
          birth_date: response.birth_date,
          phoneNumber: response.phoneNumber,
          ddd: response.ddd,
          email: response.email,
          sex: response.sex,
          lang: response.lang,
          timeLine: response.timeLine,
          themeShowType: response.themeShowType ?? ThemeShowTypeEnum.BLUE,
          dateShowType: response.dateShowType ?? DateShowTypeEnum.DEFAULT,
        })

        set_theme_show_type(response.themeShowType ?? ThemeShowTypeEnum.BLUE)
        set_pre_medias(response.media)
      }
    } catch (error: any) {
      console.log(error)
      throw new Error('Error get pre')
    }
  }

  async function onUpdatePayment(payload: UpdatePaymentPayloadProps, id: string): Promise<void> {
    try {
      const response = await update_payment(payload, id)
      if (response) set_payment(response)
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  return (
    <CreateContext.Provider
      value={{
        //
        pre,
        pre_medias,
        payment,
        pet,
        plan,
        theme_show_type,
        date_show_type,
        //
        set_pre,
        set_pre_medias,
        set_payment,
        set_pet,
        set_plan,
        set_theme_show_type,
        set_date_show_type,
        //
        onCreatePre,
        onUpdatePre,
        onNewMedia,
        onRemoveMedia,
        onCreateFromPre,
        onCheckPayment,
        onGetPre,
        onUpdatePayment,
      }}
    >
      {childen}
    </CreateContext.Provider>
  )
}

export const useCreate = () => {
  const context = useContext(CreateContext)
  return context
}
