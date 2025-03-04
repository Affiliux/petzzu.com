import React, { createContext, useCallback, useContext, useState } from 'react'

import {
  CreateTimelinePayloadProps,
  DeleteFileResponse,
  UpdateTimelinePayloadProps,
  UploadFileResponse,
} from '@/typings/timeline'

import { TimelineContextProps } from './types'
import { MediaPreProps, NewMediaPayloadProps } from '../../typings/create'

import {
  create_timeline,
  delete_timeline,
  delete_timeline_file,
  find_one_timeline,
  update_timeline,
  upload_timeline_file,
} from '@/infrastructure/http/services/timeline'

// Definindo o contexto com a interface TimelineContextProps
export const TimelineContext = createContext<TimelineContextProps>({} as TimelineContextProps)

export default function TimelineProvider({ children }: { children: React.ReactNode }) {
  const [timeline_medias, set_timeline_medias] = useState<MediaPreProps[]>([])

  const [timelineEntries, setTimelineEntries] = useState<any[]>([])

  const createTimeline = useCallback(async (idPreWebsite: string, payload: CreateTimelinePayloadProps) => {
    try {
      return await create_timeline(idPreWebsite, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error creating timeline')
    }
  }, [])

  const deleteTimeline = useCallback(async (idPreWebsiteTimeLine: string) => {
    try {
      return await delete_timeline(idPreWebsiteTimeLine)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }, [])

  const uploadTimelineFile = useCallback(
    async (idPreWebsiteTimeLine: string, file: FormData): Promise<UploadFileResponse> => {
      try {
        const payload: NewMediaPayloadProps = { id: idPreWebsiteTimeLine, file }

        const response = await upload_timeline_file(idPreWebsiteTimeLine, payload)

        if (response) {
          set_timeline_medias(prev => [...prev, response])
          setTimelineEntries(prev =>
            prev.map(entry =>
              entry.id === idPreWebsiteTimeLine ? { ...entry, media: [...entry.media, response] } : entry,
            ),
          )
        }
        return response
      } catch (error: any) {
        throw new Error(error.response?.data?.message ?? 'Error uploading file')
      }
    },
    [],
  )

  const deleteTimelineFile = useCallback(async (idPreWebsiteTimeLine: string, idFile: string): Promise<void> => {
    try {
      const response = await delete_timeline_file(idPreWebsiteTimeLine, idFile)
      if (response) set_timeline_medias(prev => prev.filter(media => media.id !== idFile))
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error deleting file')
    }
  }, [])

  const findOneTimeline = useCallback(async (idPreWebsite: string) => {
    try {
      return await find_one_timeline(idPreWebsite)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error finding timeline')
    }
  }, [])

  const updateTimeline = useCallback(async (idPreWebsiteTimeLine: string, payload: UpdateTimelinePayloadProps) => {
    try {
      return await update_timeline(idPreWebsiteTimeLine, payload)
    } catch (error: any) {
      throw new Error(error.response?.data?.message ?? 'Error updating timeline')
    }
  }, [])

  return (
    <TimelineContext.Provider
      value={{
        createTimeline,
        uploadTimelineFile,
        deleteTimelineFile,
        findOneTimeline,
        updateTimeline,
        deleteTimeline,
        //
        set_timeline_medias,
        timeline_medias,
      }}
    >
      {children}
    </TimelineContext.Provider>
  )
}

export const useTimeline = () => {
  const context = useContext(TimelineContext)
  return context
}
