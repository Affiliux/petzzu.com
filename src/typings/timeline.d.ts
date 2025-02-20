export interface BaseProps {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Media extends BaseProps {
  key: string
  url: string
}

export interface TimelineEntry extends BaseProps {
  date: string
  title: string
  description: string
  media: Media[]
}

export interface PreWebsite extends BaseProps {
  birth_date: string
  sex: string
  media: Media[]
  timeLine: TimelineEntry[]
  imageShowType: string
  dateShowType: string
  themeShowType: string
}

export interface CreateTimelinePayloadProps {
  date: string
  title: string
  description: string
}

export interface CreateTimelineResponse {
  success: boolean
  id: string
}

export interface UploadFileResponse {
  success: boolean
  id: string
  url: string
}

export interface DeleteFileResponse extends PreWebsite {}

export interface FindOneTimelineResponse extends TimelineEntry {}

export interface UpdateTimelinePayloadProps {
  date: string
  title: string
  description: string
}

export interface UpdateTimelineResponse {
  success: boolean
  id: string
}
