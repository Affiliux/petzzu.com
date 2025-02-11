import {
  CreateFromPrePayloadProps,
  CreateFromPreResponseProps,
  CreatePrePayloadProps,
  NewMediaPayloadProps,
  NewMediaResponseProps,
  PreResponseProps,
  RemoveMediaPayloadProps,
  RemoveMediaResponseProps,
  UpdatePrePayloadProps,
  UpdatePreResponseProps,
} from '@/typings/create'

import { api } from '..'

export async function create_pre(payload: CreatePrePayloadProps): Promise<CreateFromPreResponseProps> {
  try {
    const { data: response } = await api.post('website/pre/create', payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function update_pre(payload: UpdatePrePayloadProps): Promise<UpdatePreResponseProps> {
  try {
    const { data: response } = await api.patch(`website/pre/update/${payload.id}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function new_media(payload: NewMediaPayloadProps): Promise<NewMediaResponseProps> {
  try {
    const { data: response } = await api.patch(`website/pre/file/${payload.id}`, payload.file)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function remove_media(payload: RemoveMediaPayloadProps): Promise<RemoveMediaResponseProps> {
  try {
    const { data: response } = await api.delete(`website/pre/file/${payload.idPreWebsite}/${payload.idFile}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function create_from_pre(payload: CreateFromPrePayloadProps): Promise<CreateFromPreResponseProps> {
  try {
    const { data: response } = await api.post('website/create/from-pre', payload)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function get_pre(id: string): Promise<PreResponseProps> {
  try {
    const { data: response } = await api.get(`website/pre/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
