import { ChildResponseProps } from '@/typings/child'

import { api } from '..'

export async function get_child_id(id: string): Promise<ChildResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function get_child_slug(slug: string): Promise<ChildResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-slug/${slug}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
