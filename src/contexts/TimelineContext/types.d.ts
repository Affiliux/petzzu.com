import type { NewMediaPayloadProps } from '@/typings/create'
import type {
  CreateTimelinePayloadProps,
  CreateTimelineResponseProps,
  DeleteFileResponseProps,
  FindOneTimelineResponse,
  UpdateTimelinePayloadProps,
  UpdateTimelineResponseProps,
  UploadFileResponseProps,
} from '@/typings/timeline'

export interface TimelineContextProps {
  timeline_medias: MediaPreProps[]
  //
  set_timeline_medias: Dispatch<SetStateAction<MediaPreProps[]>>
  //
  onCreateTimeline: (idPreWebsite: string, payload: CreateTimelinePayloadProps) => Promise<CreateTimelineResponseProps>
  onUploadTimelineFile: (idPreWebsiteTimeLine: string, file: FormData) => Promise<UploadFileResponseProps>
  onDeleteTimelineFile: (idPreWebsiteTimeLine: string, idFile: string) => Promise<void>
  onFindOneTimeline: (idPreWebsite: string) => Promise<FindOneTimelineResponse>
  onUpdateTimeline: (
    idPreWebsiteTimeLine: string,
    payload: UpdateTimelinePayloadProps,
  ) => Promise<UpdateTimelineResponseProps>
  onDeleteTimeline: (idPreWebsiteTimeLine: string) => Promise<void>
  //
  onCreateTimelineEdit: (idWebsite: string, payload: CreateTimelinePayloadProps) => Promise<CreateTimelineResponseProps>
  onUploadTimelineFileEdit: (idTimeLine: string, file: FormData) => Promise<UploadFileResponseProps>
  onDeleteTimelineFileEdit: (idTimeLine: string, idFile: string) => Promise<void>
  onUpdateTimelineEdit: (
    idTimeLine: string,
    payload: UpdateTimelinePayloadProps,
  ) => Promise<UpdateTimelineResponseProps>
  onDeleteTimelineEdit: (idTimeLine: string) => Promise<void>
}
