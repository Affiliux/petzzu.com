import React, { createContext, useContext, useState } from 'react'

import { useTranslations } from 'next-intl'

import { BackgroundAnimationProps, PlanProps, YouTubeVideoProps } from '@/typings/application'
import { ChildResponseProps, PaymentProps } from '@/typings/child'
import {
  CreateFromPrePayloadProps,
  CreatePrePayloadProps,
  MediaPreProps,
  NewMediaPayloadProps,
  RemoveMediaPayloadProps,
  UpdatePrePayloadProps,
} from '@/typings/create'

import { CreateContextType, CreateProviderProps } from './types'

import { DateShowTypeEnum, PhotosSliderEnum, ThemeShowTypeEnum } from '@/enums'
import { get_search_yt } from '@/infrastructure/http/services/application'
import { get_child_id } from '@/infrastructure/http/services/couple'
import {
  create_from_pre,
  create_pre,
  get_pre,
  new_media,
  remove_media,
  update_pre,
} from '@/infrastructure/http/services/create'

export const CreateContext = createContext<CreateContextType>({} as CreateContextType)

export default function CreateProvider({ children }: CreateProviderProps) {
  const t = useTranslations()

  const [pre, set_pre] = useState<string | null>(null)
  const [pre_medias, set_pre_medias] = useState<MediaPreProps[]>([])
  const [child, set_child] = useState<CreatePrePayloadProps>({} as CreatePrePayloadProps)
  const [media_show_type, set_media_show_type] = useState<PhotosSliderEnum>(PhotosSliderEnum.COVERFLOW)
  const [date_show_type, set_date_show_type] = useState<DateShowTypeEnum>(DateShowTypeEnum.DEFAULT)
  const [theme_show_type, set_theme_show_type] = useState<ThemeShowTypeEnum>(ThemeShowTypeEnum.DEFAULT)
  const [song, set_song] = useState<YouTubeVideoProps | undefined>()
  const [plan, set_plan] = useState<PlanProps | undefined>()
  const [payment, set_payment] = useState<PaymentProps | null>(null)

  async function handleCreatePre(payload: CreatePrePayloadProps): Promise<void> {
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

  async function handleUpdatePre(payload: UpdatePrePayloadProps): Promise<void> {
    try {
      await update_pre(payload)
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function handleNewMedia(payload: NewMediaPayloadProps): Promise<void> {
    const maxRetries = 3
    let retries = 0

    while (retries < maxRetries) {
      try {
        const response = await new_media(payload)
        if (response) set_pre_medias(prev => [...prev, response])

        return
      } catch (error: any) {
        if (error.message === 'File is empty') {
          retries++
          await new Promise(res => setTimeout(res, 500))
        }
      }
    }

    throw new Error('Error save new media')
  }

  async function handleRemoveMedia(payload: RemoveMediaPayloadProps): Promise<void> {
    try {
      await remove_media(payload)
      set_pre_medias(prev => prev.filter(media => media.id !== payload.idFile))
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function handleCreateFromPre(payload: CreateFromPrePayloadProps): Promise<void> {
    try {
      const response = await create_from_pre(payload)
      if (response) set_payment(response)
    } catch (error: any) {
      throw new Error('Error creating pre')
    }
  }

  async function handleCheckPayment(id: string): Promise<ChildResponseProps> {
    try {
      const response = await get_child_id(id)
      return response
    } catch (error: any) {
      console.error(error)
      throw new Error('Error checking payment')
    }
  }

  async function handleGetPre(id: string): Promise<void> {
    try {
      const response = await get_pre(id)

      if (response) {
        set_pre(response.id)
        set_child({
          child_name: response.child_name,
          message: response.message,
          birth_date: response.birth_date,
          parent_name: response.parent_name,
          sex: response.sex,
          yt_song: response.yt_song,
          lang: response.lang,
          imageShowType: response.imageShowType ?? PhotosSliderEnum.COVERFLOW,
          dateShowType: response.dateShowType ?? DateShowTypeEnum.DEFAULT,
          themeShowType: response.themeShowType ?? ThemeShowTypeEnum.DEFAULT,
        })

        set_media_show_type(response.imageShowType ?? PhotosSliderEnum.COVERFLOW)
        set_date_show_type(response.dateShowType ?? DateShowTypeEnum.DEFAULT)
        set_theme_show_type(response.themeShowType ?? ThemeShowTypeEnum.DEFAULT)

        set_pre_medias(response.media)

        if (response.yt_song) {
          const responseYt = await get_search_yt(response.yt_song)
          if (responseYt && responseYt[0]) set_song(responseYt[0])
        }
      }
    } catch (error: any) {
      console.log(error)
      throw new Error('Error get pre')
    }
  }

  return (
    <CreateContext.Provider
      value={{
        //
        pre,
        pre_medias,
        payment,
        child,
        song,
        plan,
        media_show_type,
        date_show_type,
        theme_show_type,
        //
        set_pre,
        set_pre_medias,
        set_payment,
        set_child,
        set_song,
        set_plan,
        set_media_show_type,
        set_date_show_type,
        set_theme_show_type,
        //
        handleCreatePre,
        handleUpdatePre,
        handleNewMedia,
        handleRemoveMedia,
        handleCreateFromPre,
        handleCheckPayment,
        handleGetPre,
      }}
    >
      {children}
    </CreateContext.Provider>
  )
}

export const useCreate = () => {
  const context = useContext(CreateContext)
  return context
}
