import {
  GetDiscountPayloadProps,
  GetDiscountResponseProps,
  GetPlanPayloadProps,
  GetPlanResponseProps,
  YouTubeVideoProps,
} from '@/typings/application'

import { api } from '..'

export async function get_plans({}: GetPlanPayloadProps): Promise<GetPlanResponseProps> {
  try {
    const { data: response } = await api.get(`plan/find-all`)
    console.log(response)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function get_discount({ name }: GetDiscountPayloadProps): Promise<GetDiscountResponseProps> {
  try {
    const { data: response } = await api.get(`discount-cupom/find-by-name/${name}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

export async function get_search_yt(name: string): Promise<YouTubeVideoProps[]> {
  try {
    const { data: response } = await api.post(`website/yt-search`, {
      name,
    })
    return response.videos
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
