import type { ChildResponseProps } from '@/typings/child'

import { api } from '..'

/**
 * @name get_child_id
 * @category Infrastructure -  HTTP - Services - Child
 *
 * @param {string} id - The ID of the child.
 * @return {Promise<ChildResponseProps>} - The response from the server.
 */

export async function get_child_id(id: string): Promise<ChildResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_child_slug
 * @category Infrastructure -  HTTP - Services - Child
 *
 * @param {string} slug - The slug of the child.
 * @return {Promise<ChildResponseProps>} - The response from the server.
 */

export async function get_child_slug(slug: string): Promise<ChildResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-slug/${slug}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
