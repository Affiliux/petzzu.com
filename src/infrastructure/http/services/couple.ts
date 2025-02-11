import { CoupleResponseProps } from '@/typings/couple'

import { api } from '..'

export async function get_couple_id(id: string): Promise<CoupleResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function get_couple_slug(slug: string): Promise<CoupleResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-slug/${slug}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
