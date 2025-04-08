'use client'

import React, { createContext, useContext, useState } from 'react'

import type {
  CreateTimelinePayloadProps,
  UpdateTimelinePayloadProps,
  UploadFileResponseProps,
} from '@/typings/timeline'

import type { TimelineContextProps } from './types'
import type { MediaPreProps, NewMediaPayloadProps } from '../../typings/create'

import {
  create_timeline,
  create_timeline_edit,
  delete_timeline,
  delete_timeline_edit,
  delete_timeline_file,
  delete_timeline_file_edit,
  find_one_timeline,
  update_timeline,
  update_timeline_edit,
  upload_timeline_file,
  upload_timeline_file_edit,
} from '@/infrastructure/http/services/timeline'

export const TimelineContext = createContext<TimelineContextProps>({} as TimelineContextProps)

export default function TimelineProvider({ childen }: { childen: React.ReactNode }) {
  const [timeline_medias, set_timeline_medias] = useState<MediaPreProps[]>([])

  async function onCreateTimeline(idPreWebsite: string, payload: CreateTimelinePayloadProps) {
    try {
      return await create_timeline(idPreWebsite, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error creating timeline')
    }
  }

  async function onDeleteTimeline(idPreWebsiteTimeLine: string) {
    try {
      return await delete_timeline(idPreWebsiteTimeLine)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }

  async function onUploadTimelineFile(idPreWebsiteTimeLine: string, file: FormData): Promise<UploadFileResponseProps> {
    try {
      const payload: NewMediaPayloadProps = { id: idPreWebsiteTimeLine, file }

      const response = await upload_timeline_file(idPreWebsiteTimeLine, payload)

      if (response) set_timeline_medias(prev => [...prev, response])

      return response
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error uploading file')
    }
  }

  async function onDeleteTimelineFile(idPreWebsiteTimeLine: string, idFile: string): Promise<void> {
    try {
      const response = await delete_timeline_file(idPreWebsiteTimeLine, idFile)
      if (response) set_timeline_medias(prev => prev.filter(media => media.id !== idFile))
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }

  async function onFindOneTimeline(idPreWebsite: string) {
    try {
      return await find_one_timeline(idPreWebsite)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error finding timeline')
    }
  }

  async function onUpdateTimeline(idPreWebsiteTimeLine: string, payload: UpdateTimelinePayloadProps) {
    try {
      return await update_timeline(idPreWebsiteTimeLine, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error updating timeline')
    }
  }

  //edit timeline methods

  async function onCreateTimelineEdit(idWebsite: string, payload: CreateTimelinePayloadProps) {
    try {
      return await create_timeline_edit(idWebsite, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error creating timeline')
    }
  }

  async function onDeleteTimelineEdit(idTimeLine: string) {
    try {
      return await delete_timeline_edit(idTimeLine)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }

  async function onUploadTimelineFileEdit(idTimeLine: string, file: FormData): Promise<UploadFileResponseProps> {
    try {
      const payload: NewMediaPayloadProps = { id: idTimeLine, file }

      const response = await upload_timeline_file_edit(idTimeLine, payload)

      if (response) set_timeline_medias(prev => [...prev, response])

      return response
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error uploading file')
    }
  }

  async function onDeleteTimelineFileEdit(idTimeLine: string, idFile: string): Promise<void> {
    try {
      const response = await delete_timeline_file_edit(idTimeLine, idFile)
      if (response) set_timeline_medias(prev => prev.filter(media => media.id !== idFile))
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }

  async function onUpdateTimelineEdit(idTimeLine: string, payload: UpdateTimelinePayloadProps) {
    try {
      return await update_timeline_edit(idTimeLine, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error updating timeline')
    }
  }

  return (
    <TimelineContext.Provider
      value={{
        timeline_medias,
        //
        set_timeline_medias,
        //
        onCreateTimeline,
        onUploadTimelineFile,
        onDeleteTimelineFile,
        onFindOneTimeline,
        onUpdateTimeline,
        onDeleteTimeline,
        //
        onCreateTimelineEdit,
        onUploadTimelineFileEdit,
        onDeleteTimelineFileEdit,
        onUpdateTimelineEdit,
        onDeleteTimelineEdit,
        //
      }}
    >
      {childen}
    </TimelineContext.Provider>
  )
}

export const useTimeline = () => {
  const context = useContext(TimelineContext)
  return context
}
