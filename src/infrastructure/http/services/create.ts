import type {
  CreateFromPrePayloadProps,
  CreateFromPreResponseProps,
  CreatePrePayloadProps,
  NewMediaPayloadProps,
  NewMediaResponseProps,
  PreResponseProps,
  RemoveMediaPayloadProps,
  RemoveMediaResponseProps,
  UpdatePaymentPayloadProps,
  UpdatePrePayloadProps,
  UpdatePreResponseProps,
} from '@/typings/create'

import { api } from '..'

/**
 * @name create_pre
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @interface CreatePrePayloadProps
 * @return {Promise<CreateFromPreResponseProps>} - The response from the server.
 */

export async function create_pre(payload: CreatePrePayloadProps): Promise<CreateFromPreResponseProps> {
  try {
    const { data: response } = await api.post('website/pre/create', payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name update_pre
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @interface UpdatePrePayloadProps
 * @return {Promise<UpdatePreResponseProps>} - The response from the server.
 */

export async function update_pre(payload: UpdatePrePayloadProps): Promise<UpdatePreResponseProps> {
  try {
    const { data: response } = await api.patch(`website/pre/update/${payload.id}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name new_media
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @interface NewMediaPayloadProps
 * @return {Promise<NewMediaResponseProps>} - The response from the server.
 */

export async function new_media(payload: NewMediaPayloadProps): Promise<NewMediaResponseProps> {
  try {
    const { data: response } = await api.patch(`website/pre/file/${payload.id}`, payload.file)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name remove_media
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @interface RemoveMediaPayloadProps
 * @return {Promise<RemoveMediaResponseProps>} - The response from the server.
 */

export async function remove_media(payload: RemoveMediaPayloadProps): Promise<RemoveMediaResponseProps> {
  try {
    const { data: response } = await api.delete(`website/pre/file/${payload.idPreWebsite}/${payload.idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name create_from_pre
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @interface CreateFromPrePayloadProps
 * @return {Promise<CreateFromPreResponseProps>} - The response from the server.
 */

export async function create_from_pre(payload: CreateFromPrePayloadProps): Promise<CreateFromPreResponseProps> {
  try {
    const { data: response } = await api.post('website/create/from-pre', payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name update_payment
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @param {string} id - The id of the payment method to update.
 * @return {Promise<CreateFromPreResponseProps>} - The response from the server.
 */

export async function update_payment(
  payload: UpdatePaymentPayloadProps,
  id: string,
): Promise<CreateFromPreResponseProps> {
  try {
    const { data: response } = await api.patch(`website/payment-method/${id}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_pre
 * @category Infrastructure -  HTTP - Services - Create
 *
 * @param {string} id - The id of the pre to get.
 * @return {Promise<PreResponseProps>} - The response from the server.
 */

export async function get_pre(id: string): Promise<PreResponseProps> {
  try {
    const { data: response } = await api.get(`website/pre/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
