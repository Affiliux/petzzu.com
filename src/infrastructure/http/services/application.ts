import type {
  GetDiscountPayloadProps,
  GetDiscountResponseProps,
  GetOrderBumpResponseProps,
  GetPlanResponseProps,
} from '@/typings/application'

import { api } from '..'

/**
 * @name get_plans
 * @category Infrastructure -  HTTP - Services - Application
 *
 * @return {Promise<GetPlanResponseProps>} - The response from the server.
 */

export async function get_plans(): Promise<GetPlanResponseProps> {
  try {
    const { data: response } = await api.get(`plan/find-all`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_order_bump
 * @category Infrastructure -  HTTP - Services - Application
 *
 * @return {Promise<GetOrderBumpResponseProps>} - The response from the server.
 */

export async function get_order_bump(): Promise<GetOrderBumpResponseProps> {
  try {
    const { data: response } = await api.get(`order-bump/findAll`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}

/**
 * @name get_discount
 * @category Infrastructure -  HTTP - Services - Application
 *
 * @interface GetDiscountPayloadProps
 * @return {Promise<GetDiscountResponseProps>} - The response from the server.
 */

export async function get_discount(payload: GetDiscountPayloadProps): Promise<GetDiscountResponseProps> {
  try {
    const { data: response } = await api.get(`discount-cupom/find-by-name/${payload.name}`)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message ?? '')
  }
}
