import type { NewMediaPayloadProps } from '@/typings/create'
import type {
  CreateTimelinePayloadProps,
  CreateTimelineResponseProps,
  DeleteFileResponseProps,
  FindOneTimelineResponseProps,
  UpdateTimelinePayloadProps,
  UpdateTimelineResponseProps,
  UploadFileResponseProps,
} from '@/typings/timeline'

import { api } from '..'

/**
 * @name create_timeline
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idPreWebsite - The ID of the pre-website.
 * @param {CreateTimelinePayloadProps} payload - The payload to create a timeline.
 * @return {Promise<CreateTimelineResponseProps>} - The response from the server.
 */

export async function create_timeline(
  idPreWebsite: string,
  payload: CreateTimelinePayloadProps,
): Promise<CreateTimelineResponseProps> {
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
 * @return {Promise<UploadFileResponseProps>} - The response from the server.
 */

export async function upload_timeline_file(
  idPreWebsiteTimeLine: string,
  payload: NewMediaPayloadProps,
): Promise<UploadFileResponseProps> {
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
 * @return {Promise<DeleteFileResponseProps>} - The response from the server.
 */

export async function delete_timeline_file(
  idPreWebsiteTimeLine: string,
  idFile: string,
): Promise<DeleteFileResponseProps> {
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
 * @return {Promise<FindOneTimelineResponseProps>} - The response from the server.
 */

export async function find_one_timeline(idPreWebsite: string): Promise<FindOneTimelineResponseProps> {
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
 * @return {Promise<UpdateTimelineResponseProps>} - The response from the server.
 */

export async function update_timeline(
  idPreWebsiteTimeLine: string,
  payload: UpdateTimelinePayloadProps,
): Promise<UpdateTimelineResponseProps> {
  try {
    const { data: response } = await api.patch(`website/pre/timeLine/update/${idPreWebsiteTimeLine}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

// edit timeline

/**
 * @name create_timeline_edit
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idWebsite - The ID of the website.
 * @param {CreateTimelinePayloadProps} payload - The payload to create a timeline.
 * @return {Promise<CreateTimelineResponseProps>} - The response from the server.
 */

export async function create_timeline_edit(
  idWebsite: string,
  payload: CreateTimelinePayloadProps,
): Promise<CreateTimelineResponseProps> {
  try {
    const { data: response } = await api.put(`website/timeLine/create/${idWebsite}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name delete_timeline_edit
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idTimeLine - The ID of the website timeline.
 * @return {Promise<void>} - The response from the server.
 */

export async function delete_timeline_edit(idTimeLine: string): Promise<void> {
  try {
    const { data: response } = await api.delete(`website/timeLine/${idTimeLine}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name upload_timeline_file_edit
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idTimeLine - The ID of the website timeline.
 * @param {NewMediaPayloadProps} payload - The payload to upload a file.
 * @return {Promise<UploadFileResponseProps>} - The response from the server.
 */

export async function upload_timeline_file_edit(
  idTimeLine: string,
  payload: NewMediaPayloadProps,
): Promise<UploadFileResponseProps> {
  try {
    const { data: response } = await api.patch(`website/timeLine/file/${idTimeLine}`, payload.file)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name delete_timeline_file_edit
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idTimeLine - The ID of the website timeline.
 * @param {string} idFile - The ID of the file to delete.
 * @return {Promise<DeleteFileResponseProps>} - The response from the server.
 */

export async function delete_timeline_file_edit(idTimeLine: string, idFile: string): Promise<DeleteFileResponseProps> {
  try {
    const { data: response } = await api.delete(`website/timeLine/file/${idTimeLine}/${idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}


/**
 * @name update_timeline_edit
 * @category Infrastructure -  HTTP - Services - Timeline
 *
 * @param {string} idTimeLine - The ID of the website timeline.
 * @param {UpdateTimelinePayloadProps} payload - The payload to update a timeline.
 * @return {Promise<UpdateTimelineResponseProps>} - The response from the server.
 */

export async function update_timeline_edit(
  idTimeLine: string,
  payload: UpdateTimelinePayloadProps,
): Promise<UpdateTimelineResponseProps> {
  try {
    const { data: response } = await api.patch(`website/timeLine/update/${idTimeLine}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}