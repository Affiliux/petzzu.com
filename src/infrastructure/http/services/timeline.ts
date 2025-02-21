import {
  CreateTimelinePayloadProps,
  CreateTimelineResponse,
  DeleteFileResponse,
  FindOneTimelineResponse,
  UpdateTimelinePayloadProps,
  UpdateTimelineResponse,
  UploadFileResponse,
} from '../../../typings/timeline'
import { api } from '..'

export async function create_timeline(
  idPreWebsite: string,
  payload: CreateTimelinePayloadProps,
): Promise<CreateTimelineResponse> {
  try {
    const { data: response } = await api.post(`website/pre/timeLine/create/${idPreWebsite}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function delete_timeline(idPreWebsiteTimeLine: string): Promise<void> {
  try {
    const { data: response } = await api.delete(`website/pre/timeLine/${idPreWebsiteTimeLine}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function upload_timeline_file(idPreWebsiteTimeLine: string, file: File): Promise<UploadFileResponse> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const { data: response } = await api.patch(`website/pre/timeLine/file/${idPreWebsiteTimeLine}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function delete_timeline_file(idPreWebsiteTimeLine: string, idFile: string): Promise<DeleteFileResponse> {
  try {
    const { data: response } = await api.delete(`website/pre/timeLine/file/${idPreWebsiteTimeLine}/${idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function find_one_timeline(idPreWebsite: string): Promise<FindOneTimelineResponse> {
  try {
    const { data: response } = await api.get(`website/pre/timeLine/findOne-id/${idPreWebsite}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function update_timeline(
  idPreWebsiteTimeLine: string,
  payload: UpdateTimelinePayloadProps,
): Promise<UpdateTimelineResponse> {
  try {
    const { data: response } = await api.patch(`website/pre/timeLine/update/${idPreWebsiteTimeLine}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
