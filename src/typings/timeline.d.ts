export interface BaseEntityProps {
  id: string
  createdAt: string
  updatedAt: string
}

export interface MediaProps extends BaseEntityProps {
  key: string
  url: string
}

export interface TimelineEntryProps extends BaseEntityProps {
  date: string
  title: string
  description: string
  media: MediaProps[]
}

export interface PreWebsiteProps extends BaseEntityProps {
  id: string
  pet_name: string
  sex: string
  birth_date: string
  media: MediaProps[]
  timeLine: TimelineEntryProps[]
  imageShowType: string
  dateShowType: string
  themeShowType: string
}

export interface CreateTimelinePayloadProps {
  date: string
  title: string
  description: string
}

export interface CreateTimelineResponseProps {
  success: boolean
  id: string
}

export interface UploadFileResponseProps {
  success: boolean
  id: string
  url: string
}

export interface DeleteFileResponseProps extends PreWebsiteProps {}

export interface FindOneTimelineResponseProps extends TimelineEntryProps {}

export interface UpdateTimelinePayloadProps {
  date: string
  title: string
  description: string
}

export interface UpdateTimelineResponseProps {
  success: boolean
  id: string
}
