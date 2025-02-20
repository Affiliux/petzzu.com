export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Media extends BaseEntity {
  key: string
  url: string
}

export interface TimelineEntry extends BaseEntity {
  date: string
  title: string
  description: string
  media: Media[]
}

export interface PreWebsite extends BaseEntity {
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
