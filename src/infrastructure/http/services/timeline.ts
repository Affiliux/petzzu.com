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

import { api } from '..'

/**
 * @name create_timeline
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsite - The ID of the pre-website.
 * @param {CreateTimelinePayloadProps} payload - The payload to create a timeline.
 * @return {Promise<CreateTimelineResponse>} - The response from the server.
 */

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

/**
 * @name delete_timeline
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsiteTimeLine - The ID of the pre-website timeline.
 * @return {Promise<void>} - The response from the server.
 */

export async function delete_timeline(idPreWebsiteTimeLine: string): Promise<void> {
  try {
    const { data: response } = await api.delete(`website/pre/timeLine/${idPreWebsiteTimeLine}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name upload_timeline_file
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsiteTimeLine - The ID of the pre-website timeline.
 * @param {NewMediaPayloadProps} payload - The payload to upload a file.
 * @return {Promise<UploadFileResponse>} - The response from the server.
 */

export async function upload_timeline_file(
  idPreWebsiteTimeLine: string,
  payload: NewMediaPayloadProps,
): Promise<UploadFileResponse> {
  try {
    const { data: response } = await api.patch(`website/pre/timeLine/file/${idPreWebsiteTimeLine}`, payload.file)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name delete_timeline_file
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsiteTimeLine - The ID of the pre-website timeline.
 * @param {string} idFile - The ID of the file to delete.
 * @return {Promise<DeleteFileResponse>} - The response from the server.
 */

export async function delete_timeline_file(idPreWebsiteTimeLine: string, idFile: string): Promise<DeleteFileResponse> {
  try {
    const { data: response } = await api.delete(`website/pre/timeLine/file/${idPreWebsiteTimeLine}/${idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name find_one_timeline
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsite - The ID of the pre-website.
 * @return {Promise<FindOneTimelineResponse>} - The response from the server.
 */

export async function find_one_timeline(idPreWebsite: string): Promise<FindOneTimelineResponse> {
  try {
    const { data: response } = await api.get(`website/pre/timeLine/findOne-id/${idPreWebsite}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name update_timeline
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsiteTimeLine - The ID of the pre-website timeline.
 * @param {UpdateTimelinePayloadProps} payload - The payload to update a timeline.
 * @return {Promise<UpdateTimelineResponse>} - The response from the server.
 */

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
