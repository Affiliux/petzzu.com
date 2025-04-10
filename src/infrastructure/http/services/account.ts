import type {
  EmailConfirmPayloadProps,
  EmailConfirmResponseProps,
  EmailRequestPayloadProps,
  NewPageMediaPayloadProps,
  NewPageMediaResponseProps,
  PageResponseProps,
  RemovePageMediaPayloadProps,
  UpdatePageResponseProps,
} from '@/typings/account'

import { api } from '..'

/**
 * @name request_email
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @interface EmailRequestPayloadProps
 * @return {void}
 */

export async function request_email(payload: EmailRequestPayloadProps): Promise<void> {
  try {
    await api.post(`auth/send-verification-code`, payload)
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name confirm_email
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @interface EmailConfirmPayloadProps
 * @return {Promise<EmailConfirmResponseProps>} - The response from the server.
 */

export async function confirm_email(payload: EmailConfirmPayloadProps): Promise<EmailConfirmResponseProps> {
  try {
    const { data: response } = await api.post(`auth/login`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_pages
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @return {Promise<PageResponseProps>} - The response from the server.
 */

export async function get_pages(): Promise<PageResponseProps> {
  try {
    const { data: response } = await api.get(`website/find-all`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name update_page
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @param {string} id - The id of the page to update.
 * @param {UpdatePageResponseProps} page - The new data for the page.
 * @return {Promise<void>} - The response from the server.
 */

export async function update_page(id: string, page: UpdatePageResponseProps): Promise<void> {
  try {
    await api.patch(`website/update/${id}`, page)
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name update_status_page
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @param {string} id - The id of the page to update.
 * @param {boolean} status - The new status of the page.
 * @return {Promise<void>} - The response from the server.
 */

export async function update_status_page(id: string, status: boolean): Promise<void> {
  try {
    await api.patch(`website/update-status/${id}`, {
      status,
    })
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name new_page_media
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @interface NewPageMediaPayloadProps
 * @return {Promise<NewPageMediaResponseProps>} - The response from the server.
 */

export async function new_page_media(payload: NewPageMediaPayloadProps): Promise<NewPageMediaResponseProps> {
  try {
    const { data: response } = await api.patch(`website/file/${payload.id}`, payload.file)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name remove_page_media
 * @category Infrastructure -  HTTP - Services - Account
 *
 * @interface RemovePageMediaPayloadProps
 * @return {Promise<void>} - The response from the server.
 */

export async function remove_page_media(payload: RemovePageMediaPayloadProps): Promise<void> {
  try {
    const { data: response } = await api.delete(`website/file/${payload.idWebsite}/${payload.idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
