import type { NewMediaPayloadProps } from '@/typings/create'
import type {
  CreateTimelinePayloadProps,
  CreateTimelineResponse,
  DeleteFileResponse,
  FindOneTimelineResponse,
  UpdateTimelinePayloadProps,
  UpdateTimelineResponse,
  UploadFileResponse,
} from '@/typings/timeline'

export interface TimelineContextProps {
  timeline_medias: MediaPreProps[]
  //
  set_timeline_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  //
  onCreateTimeline: (idPreWebsite: string, payload: CreateTimelinePayloadProps) => Promise<CreateTimelineResponse>
  onUploadTimelineFile: (idPreWebsiteTimeLine: string, file: FormData) => Promise<UploadFileResponse>
  onDeleteTimelineFile: (idPreWebsiteTimeLine: string, idFile: string) => Promise<void>
  onFindOneTimeline: (idPreWebsite: string) => Promise<FindOneTimelineResponse>
  onUpdateTimeline: (
    idPreWebsiteTimeLine: string,
    payload: UpdateTimelinePayloadProps,
  ) => Promise<UpdateTimelineResponse>
  onDeleteTimeline: (idPreWebsiteTimeLine: string) => Promise<void>
}
