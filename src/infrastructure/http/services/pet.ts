import type { PetResponseProps } from '@/typings/pet'

import { api } from '..'

/**
 * @name get_pet_id
 * @category Infrastructure -  HTTP - Services - Pet
 *
 * @param {string} id - The ID of the pet.
 * @return {Promise<PetResponseProps>} - The response from the server.
 */

export async function get_pet_id(id: string): Promise<PetResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-id/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_pet_slug
 * @category Infrastructure -  HTTP - Services - Pet
 *
 * @param {string} slug - The slug of the pet.
 * @return {Promise<PetResponseProps>} - The response from the server.
 */

export async function get_pet_slug(slug: string): Promise<PetResponseProps> {
  try {
    const { data: response } = await api.get(`website/findOne-slug/${slug}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
