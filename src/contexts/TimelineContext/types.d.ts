import {
  CreateTimelinePayloadProps,
  CreateTimelineResponse,
  DeleteFileResponse,
  FindOneTimelineResponse,
  UpdateTimelinePayloadProps,
  UpdateTimelineResponse,
  UploadFileResponse,
} from '@/typings/timeline'

import { NewMediaPayloadProps } from '../../typings/create'

export interface TimelineContextProps {
  createTimeline: (idPreWebsite: string, payload: CreateTimelinePayloadProps) => Promise<CreateTimelineResponse>
  uploadTimelineFile: (idPreWebsiteTimeLine: string, file: FormData) => Promise<UploadFileResponse>
  deleteTimelineFile: (idPreWebsiteTimeLine: string, idFile: string) => Promise<void>
  findOneTimeline: (idPreWebsite: string) => Promise<FindOneTimelineResponse>
  updateTimeline: (idPreWebsiteTimeLine: string, payload: UpdateTimelinePayloadProps) => Promise<UpdateTimelineResponse>
  deleteTimeline: (idPreWebsiteTimeLine: string) => Promise<void>
  //
  timeline_medias: MediaPreProps[]
  set_timeline_medias: (medias: MediaPreProps[]) => void
}
